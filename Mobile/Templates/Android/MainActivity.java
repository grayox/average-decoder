// app/java/com.template.gotouch.androidtemplate/MainActivity.java

package com.template.gotouch.androidtemplate;

import android.app.Activity;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
//import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

/*
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        
        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });
        
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}
*/

public class MainActivity extends Activity {

    private WebView mWebView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mWebView = (WebView) findViewById(R.id.activity_main_webview);

        WebSettings webSettings = mWebView.getSettings();

        // Enable Javascript.
        webSettings.setJavaScriptEnabled(true);

        // Enable HTML Imports to be loaded from file://.
        //webSettings.setAllowFileAccessFromFileURLs(true);

        // Load main page into webview.
        //mWebView.loadUrl("file:///android_asset/www/index.html");
        mWebView.loadUrl("http://example.com");
        // Change below URL to web app
        //mWebView.loadUrl("https://blazing-torch-612.firebaseapp.com");

        // Prevent buttons from opening new browser per https://youtu.be/VB83wWDy3is?t=3m56s
        mWebView.setWebViewClient(new WebViewClient());

        // Ensure local links/redirects in WebView, not the browser.
        //mWebView.setWebViewClient(new MyAppWebViewClient());
    }
}