# Prospecta — iOS / Android / Web publishing guide

## Cross-platform approach

This project is designed as one responsive web codebase packaged with Capacitor for iOS and Android.

- Web/PWA: deploy the project to HTTPS hosting.
- iOS: Capacitor wraps the same app in an Xcode project.
- Android: Capacitor wraps the same app in an Android Studio project.

The included `capacitor.config.json` uses the placeholder bundle/package ID `com.prospecta.app`. Change this **before** your first store submission if you do not own that identifier.

## Local setup

```bash
npm install
npm run dev
```

Then open `http://localhost:8080`.

### Create native projects

```bash
npm run cap:add:ios
npm run cap:add:android
npm run cap:sync
```

Open the native projects:

```bash
npm run cap:open:ios
npm run cap:open:android
```

**iOS builds require macOS + Xcode.** Android builds can be made with Android Studio on macOS, Windows or Linux.

## Payments

Prospecta sells digital credits/subscriptions, so do not assume a single Stripe checkout can be used everywhere inside the mobile apps.

Recommended architecture:

- Web/PWA: Stripe Checkout + Stripe webhooks.
- iOS app: Apple In-App Purchase / StoreKit for in-app digital credits and subscriptions, unless a region-specific entitlement/program legally and contractually permits another flow.
- Android app distributed through Google Play: Google Play Billing for in-app digital credits and subscriptions, unless an applicable alternative-billing/external-offers program permits otherwise.
- Backend: one server-side entitlement + credit ledger. Stripe, Apple and Google purchase events all reconcile into the same ledger.

The included server has a working Stripe Checkout scaffold. It will become live after you set environment variables and real Stripe Price IDs. Native store billing still needs the product IDs created in App Store Connect / Play Console and a native billing implementation or a service such as RevenueCat.

Never grant credits solely from a client-side success screen. Verify the payment/store event server-side before updating balance.

## App Store release checklist

1. Enroll in the Apple Developer Program. If publishing as a company, enroll the legal entity so the company name appears as seller.
2. Set up your App ID / bundle identifier and signing in Apple Developer.
3. Create the app in App Store Connect.
4. Add app name, subtitle, description, category, age rating, support URL, privacy-policy URL and screenshots.
5. Complete App Privacy disclosures based on the **actual** data flows in production.
6. Create subscription / consumable credit products in App Store Connect if they can be purchased inside the iOS app.
7. Implement and test StoreKit purchases, restores, receipt/server notifications and entitlement reconciliation.
8. Build an archive in Xcode and upload it to App Store Connect.
9. Test through TestFlight.
10. Provide App Review with a working test account and any login/integration instructions it needs.
11. Submit for review and address reviewer feedback.

## Google Play release checklist

1. Create a full-distribution developer account and complete identity/organization verification.
2. Create the app in Play Console and reserve the package name.
3. Add store listing, screenshots, support details, privacy-policy URL, data-safety declaration and content rating.
4. Create Play Billing subscription / in-app products for mobile credit purchases.
5. Implement purchase acknowledgement, backend verification and entitlement reconciliation.
6. Generate a signed Android App Bundle (`.aab`) from Android Studio.
7. Use internal/closed testing first.
8. Complete required testing steps applicable to your account type.
9. Promote the tested release to production and submit for review.

## Legal and trust launch checklist

The app includes draft policy pages, but they are **not launch-final legal documents**. Before publication:

- Replace the placeholder company/operator details.
- Obtain legal review for Terms, Privacy, DPA, refunds and outreach compliance.
- Publish the privacy policy and support page on stable HTTPS URLs.
- Document subprocessors and data-retention periods.
- Implement user data export/deletion requests.
- Implement workspace suppression lists and recipient opt-outs.
- Add abuse reporting and account suspension controls.
- Add per-mailbox rate limits and a bounce/complaint kill switch.
- Do not use sensitive traits for targeting.
- Review direct-marketing and privacy rules for each launch market.
- Review Gmail/Google API verification requirements before requesting production OAuth scopes.

## Production services still required

The present package is a front-end + backend scaffold, not a deployed production SaaS. You still need:

- production database (PostgreSQL recommended)
- authentication and session management
- Google OAuth / Gmail API
- billing webhook persistence
- Apple / Google purchase verification
- real lead discovery and licensed/public data sources
- email-verification provider
- job queue and rate limiting
- support/helpdesk delivery
- monitoring and audit logs
- secure secret management
- domain, HTTPS and transactional email
