plugins { id("com.android.application") }
android {
    namespace = "dev.bloody.calc"
    compileSdk = 35
    defaultConfig {
        applicationId = "dev.bloody.calc"
        minSdk = 26
        targetSdk = 35
        versionCode = System.getenv("BUILD_NUMBER")?.toIntOrNull() ?: 1
        versionName = "2.0." + (System.getenv("BUILD_NUMBER") ?: "0")
    }
    sourceSets["main"].assets.srcDirs("../../web")
    compileOptions { sourceCompatibility = JavaVersion.VERSION_17; targetCompatibility = JavaVersion.VERSION_17 }
    signingConfigs {
        getByName("debug") {
            storeFile = file("${System.getProperty("user.home")}/.android/debug.keystore")
            storePassword = "android"
            keyAlias = "androiddebugkey"
            keyPassword = "android"
        }
    }
    buildTypes { getByName("release") { isMinifyEnabled = false } }
}
dependencies { implementation("androidx.webkit:webkit:1.12.1") }
