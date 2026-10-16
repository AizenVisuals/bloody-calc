plugins { id("com.android.application") }
android {
    namespace = "dev.bloody.calc"
    compileSdk = 36
    defaultConfig {
        applicationId = "dev.bloody.calc"
        minSdk = 26
        targetSdk = 36
        versionCode = System.getenv("BUILD_NUMBER")?.toIntOrNull() ?: 1
        versionName = System.getenv("VERSION_NAME") ?: ("2.0." + (System.getenv("BUILD_NUMBER") ?: "0"))
    }
    sourceSets["main"].assets.srcDirs("../../web")
    compileOptions { sourceCompatibility = JavaVersion.VERSION_17; targetCompatibility = JavaVersion.VERSION_17 }
    signingConfigs {
        create("playUpload") {
            val uploadPath = System.getenv("HALO_UPLOAD_KEYSTORE_PATH")
            if (uploadPath != null) {
                storeFile = file(uploadPath)
                storePassword = System.getenv("HALO_UPLOAD_STORE_PASSWORD")
                keyAlias = "halo-upload"
                keyPassword = System.getenv("HALO_UPLOAD_KEY_PASSWORD")
            }
        }
        getByName("debug") {
            storeFile = file(System.getenv("HALO_EXISTING_KEYSTORE_PATH") ?: "${System.getProperty("user.home")}/.android/debug.keystore")
            storePassword = "android"
            keyAlias = "androiddebugkey"
            keyPassword = "android"
        }
    }
    buildTypes {
        getByName("release") {
            isMinifyEnabled = false
            isDebuggable = false
            signingConfig = signingConfigs.getByName("playUpload")
        }
    }
}
dependencies { implementation("androidx.webkit:webkit:1.12.1") }

// Refuse to produce an unsigned or accidentally debug-signed Play candidate.
gradle.taskGraph.whenReady {
    if (allTasks.any { it.name == "bundleRelease" || it.name == "assembleRelease" }) {
        check(!System.getenv("HALO_UPLOAD_KEYSTORE_PATH").isNullOrBlank() &&
              !System.getenv("HALO_UPLOAD_STORE_PASSWORD").isNullOrBlank() &&
              !System.getenv("HALO_UPLOAD_KEY_PASSWORD").isNullOrBlank()) {
            "Production upload signing is required. Configure the protected upload key first."
        }
    }
}
