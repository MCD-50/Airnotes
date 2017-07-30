
# Airnote (Make note faster and better with airnote for android)

# Getting Started
```bash
    $ git clone https://github.com/MCD-50/Airnote-Phone && cd Airnote-Phone
    $ npm install
    $ react-native run-android
    $ npm start
```

## Setting of vector icons
You can see [this repo](https://github.com/oblador/react-native-vector-icons) for much more information.



## If case of any error while building your app follow below instructions.

### React Native Link (recommended)
> Make sure you have atleast v0.31.0 react-native version.

```bash
    $ react-native link
```
### settings.gradle
Your settings.gadle file must look like this

```
rootProject.name = 'Airnote'
include ':react-native-vector-icons'
project(':react-native-vector-icons').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-vector-icons/android')
include ':react-native-webview-bridge-updated'
project(':react-native-webview-bridge-updated').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-webview-bridge-updated/android')
include ':app'
```


### build.gradle
Your settings.gadle file must look like this

```
allprojects {
    repositories {
        mavenLocal()
        jcenter()
        maven {
            // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
            url "$rootDir/../node_modules/react-native/android"
        }
    }
    configurations.all {
       resolutionStrategy {
         eachDependency { DependencyResolveDetails details ->
           if (details.requested.group == 'com.facebook.react' && details.requested.name == 'react-native') {
             details.useVersion "0.40.0" // Your real React Native version here
           }
         }
       }
     }
}
```


### app/build.gradle
Add these to your app/build.gradle file

```
dependencies {
    compile project(':react-native-vector-icons')
    compile project(':react-native-webview-bridge-updated')
    compile fileTree(dir: "libs", include: ["*.jar"])
    compile "com.android.support:appcompat-v7:23.0.1"
    compile "com.facebook.react:react-native:+"  // From node_modules
}


project.afterEvaluate {
    apply from: '../../node_modules/react-native-zss-rich-text-editor/htmlCopy.gradle';
    copyEditorHtmlToAppAssets(file('../../node_modules/react-native-zss-rich-text-editor'))
}
```

### AndroidManifest.xml
Make changes in AndroidManifest.xml

```
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>


<activity
    android:name=".MainActivity"
    android:label="@string/app_name"
    android:screenOrientation="portrait"
    android:launchMode="singleTask"
    android:configChanges="keyboard|keyboardHidden|orientation|screenSize">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>
```


### MainApplication.java

```
import com.oblador.vectoricons.VectorIconsPackage;
import com.github.alinz.reactnativewebviewbridge.WebViewBridgePackage;

public class MainApplication extends Application implements ReactApplication {
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public List<ReactPackage> getPackages() {
      long size = 50L * 1024L * 1024L; // 50 MB
      com.facebook.react.modules.storage.ReactDatabaseSupplier.getInstance(getApplicationContext()).setMaximumSize(size);
      
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new VectorIconsPackage(),
          new WebViewBridgePackage()
      );
    }
  };
}
```