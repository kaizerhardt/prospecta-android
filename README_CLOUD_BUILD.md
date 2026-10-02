# Prospecta — Cloud APK Build

This project is configured to build an installable Android APK in GitHub Actions.

## Fastest route

1. Create a new empty GitHub repository, for example `prospecta-android`.
2. Upload **the contents of this folder** to the repository root. Do not upload the outer ZIP as one file.
3. Commit to `main`.
4. Open the repository's **Actions** tab.
5. Select **Build Prospecta Android APK**.
6. Open the latest run. If it did not run automatically, choose **Run workflow**.
7. Wait for the green checkmark.
8. At the bottom of the workflow run page, download the artifact named **Prospecta-Android-APK**.
9. Unzip that small artifact. Inside is `Prospecta-debug.apk`.
10. Transfer `Prospecta-debug.apk` to your Android phone and tap it to install.

Android may ask you to allow installs from your browser/files app. Allow it for that app, then install Prospecta.

## What the workflow does

The workflow uses:

- Ubuntu GitHub-hosted runner
- Java 17
- Android SDK 35
- Android Build Tools 35.0.0
- Gradle 8.9
- Android Gradle Plugin 8.7.3

It runs `assembleDebug`, which creates a debug-signed APK that can be sideloaded directly on Android. No signing secrets are required for this test build.

## Where the APK is produced

GitHub Actions creates:

`app/build/outputs/apk/debug/app-debug.apk`

The workflow then renames it to:

`Prospecta-debug.apk`

and exposes it as a downloadable GitHub Actions artifact.

## Important

This APK contains the current Prospecta prototype UI and local app logic. Features requiring live backend services — real Gmail OAuth/sending, live lead discovery, Stripe/App Store/Play billing, persistent cloud accounts, and production email verification — still require production credentials and backend deployment.

For Google Play production distribution, use a release-signed AAB rather than this debug APK.
