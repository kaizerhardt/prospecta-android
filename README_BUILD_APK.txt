PROSPECTA — ANDROID STUDIO BUILD
================================

This folder is an Android Studio project. You do NOT open the ZIP on your phone.
You build it once on a Windows/Mac computer, then copy the generated APK to Android.

FASTEST PATH
------------
1. Install Android Studio: https://developer.android.com/studio
2. Unzip Prospecta_Android_Studio.zip on your computer.
3. Open Android Studio.
4. Choose "Open" and select the unzipped Prospecta_Android_Studio folder.
5. Let Android Studio finish Gradle sync. If asked to install Android SDK 35 / build tools, click Install/Accept.
6. Menu: Build > Build App Bundle(s) / APK(s) > Build APK(s).
7. Wait for "APK(s) generated successfully".
8. Click "locate" in the notification, or find:
   app/build/outputs/apk/debug/app-debug.apk
9. Rename it to Prospecta.apk if you want.
10. Send Prospecta.apk to your Android phone.
11. Tap it on the phone and allow "Install unknown apps" if Android asks.
12. Install > Open.

NO CODE EDITING IS REQUIRED.

NOTES
-----
- This is the current Prospecta prototype wrapped as an Android app.
- Live Stripe, Gmail OAuth, real lead discovery and production accounts still require backend credentials/services.
- The debug APK is for your own testing. Google Play later requires a signed release AAB.
