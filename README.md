# Prospecta — AI Prospecting Desk

Prospecta is a cross-platform SaaS/app prototype for business prospecting: discover companies, qualify them, research a real commercial angle, generate industry-aware outreach, protect/unlock contact data with credits, send from a connected inbox, and monitor replies/bounces.

## Included in this build

- Strong Prospecta brand system + custom 3D illustration set
- Responsive desktop/mobile UI
- Dark and light mode
- PWA installability + service worker
- Natural-language prospect search
- Research/qualification pipeline
- Protected contact details and credit unlock model
- AI industry template studio + custom templates
- Campaign review/send experience
- Inbox + AI reply assistant prototype
- Sales Brain onboarding
- Signature management screen
- Billing plans + credit packs
- Stripe Checkout backend scaffold
- Unified billing architecture for web/iOS/Android
- Support centre + ticket API scaffold
- Legal & safety centre
- Draft Terms, Privacy, Acceptable Use, Outreach, Refund and DPA pages
- Capacitor configuration for iOS + Android packaging
- App icon assets at 192, 512 and 1024 px

## Start locally

```bash
cd prospecta_app
npm install
cp .env.example .env
npm run dev
```

Then open `http://localhost:8080`.

Without Node dependencies, the static front-end can still be previewed with:

```bash
python3 -m http.server 8080
```

## Stripe web payments

Create products/prices in Stripe and fill the corresponding environment variables in `.env`. The backend route `POST /api/checkout` creates Checkout Sessions.

The current scaffold does **not** persist paid credits because a real account/database layer has not yet been selected. In production, grant entitlements only after verified Stripe webhooks.

## iOS + Android

See `PUBLISHING.md`.

The codebase is Capacitor-ready. iOS compilation requires macOS/Xcode. Android compilation requires Android Studio. Native digital-credit purchases should use Apple/Google store billing as required by their platform rules and then reconcile into the same backend credit ledger.

## Important legal note

The documents under `/legal` are product-policy drafts, not legal advice or launch-ready legal documents. They intentionally include conservative outreach safeguards and must be reviewed for the actual operating company and markets before release.

## Placeholder values to replace before launch

- `support@prospecta.app` (only use it after you control the domain)
- `com.prospecta.app` package/bundle ID
- Stripe keys and Price IDs
- operator/company legal name and address
- privacy contact / DPO contact if applicable
- support URL and public privacy-policy URL
- actual subprocessors
- actual retention periods
