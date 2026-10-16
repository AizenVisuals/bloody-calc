import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, readdirSync} from 'node:fs';
import {inflateSync} from 'node:zlib';

const root = new URL('../', import.meta.url);
const variants = ['crimson', 'amethyst', 'glacier', 'lime', 'mono', 'cyan', 'rose', 'graphite', 'lavender'];
function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}
function png(path, size) {
  const data = readFileSync(new URL(path, root));
  assert.deepEqual(data.subarray(0, 8), Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), path);
  assert.equal(data.readUInt32BE(16), size, path);
  assert.equal(data.readUInt32BE(20), size, path);
  let offset = 8, ended = false;
  const compressed = [];
  while (offset < data.length) {
    const length = data.readUInt32BE(offset);
    const end = offset + 8 + length;
    assert.ok(end + 4 <= data.length, `truncated chunk: ${path}`);
    const type = data.toString('ascii', offset + 4, offset + 8);
    assert.equal(crc32(data.subarray(offset + 4, end)), data.readUInt32BE(end), `CRC: ${path}`);
    if (type === 'IDAT') compressed.push(data.subarray(offset + 8, end));
    offset = end + 4;
    if (type === 'IEND') { ended = true; break; }
  }
  assert.ok(ended, `missing IEND: ${path}`);
  assert.equal(offset, data.length, path);
  assert.ok(inflateSync(Buffer.concat(compressed)).length > 0, path);
  return data;
}

test('nove ícones web e Android têm PNG íntegro e a mesma arte em 512 px', () => {
  for (const key of variants) {
    png(`web/assets/icons/halo-${key}-192.png`, 192);
    const web = png(`web/assets/icons/halo-${key}-512.png`, 512);
    const android = png(`android/app/src/main/res/drawable-nodpi/halo_${key}.png`, 512);
    assert.deepEqual(web, android, key);
  }
  for (const name of readdirSync(new URL('web/assets/icons/', root))) {
    if (name.startsWith('halo-') && name.endsWith('-source.png')) png(`web/assets/icons/${name}`, 1254);
  }
});

test('todos os recursos do cache offline existem e estão preenchidos', () => {
  const source = readFileSync(new URL('web/sw.js', root), 'utf8');
  const files = JSON.parse(source.match(/const FILES=(\[[\s\S]*?\]);/)[1]);
  for (const path of files) {
    const file = path === './' ? 'index.html' : path.replace(/^\.\//, '');
    assert.ok(readFileSync(new URL(`web/${file}`, root)).length > 0, file);
  }
});
