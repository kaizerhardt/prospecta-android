# Prospecta Native Android (Jetpack Compose)

This is a native Android implementation of the approved mobile UI reference.

## What is implemented
- Splash / product intro
- Sign up / login
- Company setup
- What you do / USP / target customer
- Solution selection
- Free trial activation screen
- Mobile dashboard
- Discover prospects
- Prospect detail + contact lookup action
- Outreach campaign composer + AI personalize action
- Gmail-connected inbox
- Analytics + AI insights
- Upgrade plans
- Settings / integrations
- Functional bottom navigation

## Connector / API wiring
All connector endpoints are centralized in `MainActivity.kt` under `ConnectorConfig`.

Replace:
- `BACKEND_BASE_URL`
- `TERMS_URL`
- `PRIVACY_URL`
- `HELP_URL`

Expected backend routes:
- `/auth/google`
- `/auth/microsoft`
- `/integrations/gmail/connect`
- `/api/contacts/find-email?company=...`
- `/gmail/send?thread=...`
- `/billing/checkout?plan=starter|growth|pro`

Internal UI buttons already navigate to their corresponding app screens. External/integration buttons either open the configured connector or show a clear configuration message until a backend is provided.

## San Francisco font
Apple's SF Pro font is not bundled in this package. It requires Apple-licensed font assets. The app uses Android Sans Serif with SF-like sizing/weight metrics. If you supply licensed SF Pro font resources, the typography hook is already marked in `MainActivity.kt`.

## Build
Open the folder in Android Studio or build with Gradle after installing Android SDK 35.
