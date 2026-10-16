"""Restore the existing test signer; never silently generate a replacement key."""
import base64
import hashlib
import os
from pathlib import Path
import re
import subprocess
import sys


def restore(destination):
    encoded = os.environ.get('HALO_SIGNING_BASE64', '')
    expected = os.environ.get('HALO_SIGNING_CERT_SHA256', '').lower()
    if not encoded or not re.fullmatch(r'[0-9a-f]{64}', expected):
        raise ValueError('Signing secrets are missing or invalid; refusing to generate a new key.')
    payload = base64.b64decode(encoded, validate=True)
    if not payload:
        raise ValueError('Signing key is empty.')
    destination.parent.mkdir(parents=True, exist_ok=True)
    # Exclusive creation prevents accidentally overwriting an existing key.
    fd = os.open(destination, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
    try:
        with os.fdopen(fd, 'wb') as stream:
            stream.write(payload)
        result = subprocess.run(
            ['keytool', '-exportcert', '-keystore', str(destination),
             '-storepass', 'android', '-alias', 'androiddebugkey'],
            capture_output=True, check=True,
        )
        if hashlib.sha256(result.stdout).hexdigest() != expected:
            raise ValueError('Signing certificate differs from the preserved APK identity.')
    except Exception:
        destination.unlink(missing_ok=True)
        raise
    print('Existing signing identity restored and verified.')


if __name__ == '__main__':
    try:
        if len(sys.argv) != 2:
            raise ValueError('Expected the signing key destination.')
        restore(Path(sys.argv[1]))
    except Exception:
        # Do not echo secrets, subprocess output, or exception payloads into CI logs.
        print('Signing setup failed. No replacement key was generated. Check the signing secrets.', file=sys.stderr)
        sys.exit(1)
