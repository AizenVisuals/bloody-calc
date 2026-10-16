package dev.bloody.calc;

import android.app.Activity;
import android.content.Intent;
import android.content.ComponentName;
import android.content.pm.PackageManager;
import android.os.Build;
import java.util.ArrayList;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.net.Uri;
import android.os.Bundle;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.webkit.*;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.Toast;
import androidx.webkit.WebViewAssetLoader;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

/** Offline UI. No INTERNET permission. Bridge is exposed only to bundled appassets. */
public final class MainActivity extends Activity {
    private WebView web;
    private ValueCallback<Uri[]> fileCallback;
    private String pendingJson;
    private static final int PICK_FILE = 10, SAVE_FILE = 11;
    @Override public void onCreate(Bundle saved) {
        super.onCreate(saved);
        FrameLayout root = new FrameLayout(this);
        root.setBackgroundColor(0xff08080a);
        root.setOnApplyWindowInsetsListener((v, insets) -> {
            v.setPadding(insets.getSystemWindowInsetLeft(), insets.getSystemWindowInsetTop(), insets.getSystemWindowInsetRight(), insets.getSystemWindowInsetBottom());
            return insets;
        });
        web = new WebView(this);
        root.addView(web, new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        setContentView(root);
        WebSettings settings = web.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(true);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        web.setBackgroundColor(0xff08080a);
        WebViewAssetLoader loader = new WebViewAssetLoader.Builder().addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler(this)).build();
        web.setWebViewClient(new WebViewClient() {
            @Override public WebResourceResponse shouldInterceptRequest(WebView v, WebResourceRequest request) { return loader.shouldInterceptRequest(request.getUrl()); }
            @Override public boolean shouldOverrideUrlLoading(WebView v, WebResourceRequest request) {
                return !request.getUrl().toString().startsWith("https://appassets.androidplatform.net/assets/");
            }
        });
        web.setWebChromeClient(new WebChromeClient() {
            @Override public boolean onJsConfirm(WebView v, String url, String message, JsResult result) {
                new android.app.AlertDialog.Builder(MainActivity.this).setMessage(message).setPositiveButton("Confirmar", (d,w) -> result.confirm()).setNegativeButton("Cancelar", (d,w) -> result.cancel()).setOnCancelListener(d -> result.cancel()).show();return true;
            }
            @Override public boolean onShowFileChooser(WebView v, ValueCallback<Uri[]> callback, FileChooserParams params) {
                if (fileCallback != null) fileCallback.onReceiveValue(null);
                fileCallback = callback;
                Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT).addCategory(Intent.CATEGORY_OPENABLE).setType("*/*");
                String[] types = params.getAcceptTypes();
                if (types.length > 0 && types[0].contains("image")) intent.setType("image/*");
                try { startActivityForResult(intent, PICK_FILE); } catch (Exception e) { callback.onReceiveValue(null); fileCallback = null; return false; }
                return true;
            }
        });
        web.addJavascriptInterface(new Bridge(), "Android");
        web.loadUrl("https://appassets.androidplatform.net/assets/index.html");
    }
    public final class Bridge {
        private final String[] keys = {"crimson", "mono", "seal", "monogram", "eclipse"};
        private final String[] aliases = {"IconCrimson", "IconMono", "IconSeal", "IconMonogram", "IconEclipse"};
        @JavascriptInterface public String getLauncherIcon() {
            PackageManager pm = getPackageManager();
            for (int i = 0; i < keys.length; i++) {
                int state = pm.getComponentEnabledSetting(new ComponentName(getPackageName(), getPackageName() + "." + aliases[i]));
                if (state == PackageManager.COMPONENT_ENABLED_STATE_ENABLED || (i == 0 && state == PackageManager.COMPONENT_ENABLED_STATE_DEFAULT)) return keys[i];
            }
            return "crimson";
        }
        @JavascriptInterface public boolean setLauncherIcon(String key) {
            int selected = -1;
            for (int i = 0; i < keys.length; i++) if (keys[i].equals(key)) selected = i;
            if (selected < 0) return false;
            PackageManager pm = getPackageManager();
            try {
                if (Build.VERSION.SDK_INT >= 33) {
                    ArrayList<PackageManager.ComponentEnabledSetting> changes = new ArrayList<>();
                    for (int i = 0; i < keys.length; i++) changes.add(new PackageManager.ComponentEnabledSetting(new ComponentName(getPackageName(), getPackageName() + "." + aliases[i]), i == selected ? PackageManager.COMPONENT_ENABLED_STATE_ENABLED : PackageManager.COMPONENT_ENABLED_STATE_DISABLED, PackageManager.DONT_KILL_APP));
                    pm.setComponentEnabledSettings(changes);
                } else {
                    // Enable the replacement first so there is always a launcher entry.
                    pm.setComponentEnabledSetting(new ComponentName(getPackageName(), getPackageName() + "." + aliases[selected]), PackageManager.COMPONENT_ENABLED_STATE_ENABLED, PackageManager.DONT_KILL_APP);
                    for (int i = 0; i < keys.length; i++) if (i != selected) pm.setComponentEnabledSetting(new ComponentName(getPackageName(), getPackageName() + "." + aliases[i]), PackageManager.COMPONENT_ENABLED_STATE_DISABLED, PackageManager.DONT_KILL_APP);
                }
                return true;
            } catch (Exception e) { return false; }
        }

        @JavascriptInterface public void copyText(String text) { runOnUiThread(() -> ((ClipboardManager)getSystemService(CLIPBOARD_SERVICE)).setPrimaryClip(ClipData.newPlainText("Halo Calc", text))); }
        @JavascriptInterface public void shareText(String text) { runOnUiThread(() -> { Intent intent = new Intent(Intent.ACTION_SEND).setType("text/plain").putExtra(Intent.EXTRA_TEXT, text); startActivity(Intent.createChooser(intent, "Compartilhar")); }); }
        @JavascriptInterface public void vibrate() { Vibrator v = (Vibrator)getSystemService(VIBRATOR_SERVICE); if (v != null && v.hasVibrator()) v.vibrate(VibrationEffect.createOneShot(9, VibrationEffect.DEFAULT_AMPLITUDE)); }
        @JavascriptInterface public void saveJson(String filename, String json) { if(json.length()>5000000)return; runOnUiThread(() -> { pendingJson = json; Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT).addCategory(Intent.CATEGORY_OPENABLE).setType("application/json").putExtra(Intent.EXTRA_TITLE, filename.replaceAll("[^a-zA-Z0-9._-]", "_")); startActivityForResult(intent, SAVE_FILE); }); }
    }
    @Override protected void onActivityResult(int request, int result, Intent data) {
        super.onActivityResult(request,result,data);
        if(request==PICK_FILE && fileCallback!=null){ fileCallback.onReceiveValue(result==RESULT_OK && data!=null && data.getData()!=null?new Uri[]{data.getData()}:null);fileCallback=null; }
        if(request==SAVE_FILE){if(result==RESULT_OK && data!=null && data.getData()!=null && pendingJson!=null){try(OutputStream out=getContentResolver().openOutputStream(data.getData())){if(out!=null)out.write(pendingJson.getBytes(StandardCharsets.UTF_8));Toast.makeText(this,"Backup salvo.",Toast.LENGTH_SHORT).show();}catch(Exception e){Toast.makeText(this,"Não foi possível salvar.",Toast.LENGTH_LONG).show();}}pendingJson=null;}
    }
    @Override public void onBackPressed() { web.evaluateJavascript("window.bloodyBack ? window.bloodyBack() : false", value -> { if(!"true".equals(value)) super.onBackPressed(); }); }
    @Override protected void onDestroy() { if(web!=null){web.removeJavascriptInterface("Android");web.destroy();}super.onDestroy(); }
}
