# Deploy Notes - 2026-05-28

## Summary
Security and deployment hardening updates were completed for Netlify production.

## Key Changes
- Added Cloudflare Turnstile client and server verification to the contact flow.
- Added a deploy-time env check for TURNSTILE_SECRET_KEY.
- Added specific UI messaging for Turnstile verification failures.
- Upgraded Next.js to 16.2.6 to address Netlify CVE deploy block.
- Set build to webpack mode for stable production builds with this codebase.
- Upgraded Resend to 6.12.4 in root and Netlify functions.
- Upgraded TinaCMS to 3.8.3 and @tinacms/cli to 2.4.1.
- Removed unused react-tinacms-editor dependency to reduce security exposure.
- Updated Tina generated client URL behavior to use env-based Tina Cloud endpoint instead of hardcoded localhost.
- Hardened postinstall to be non-interactive by default and avoid env dumps.
- Added repository policy notes to keep tw-elements pinned at 1.0.0.

## Security Status
- Previous high/critical vulnerability count was significantly reduced after removing legacy editor dependency and upgrading packages.
- Remaining findings are primarily in current Tina transitive dependencies and ecosystem packages.

## Netlify Environment
Turnstile variables were configured in Netlify project environment:
- NEXT_PUBLIC_TURNSTILE_SITE_KEY
- TURNSTILE_SECRET_KEY

## Build Verification
- Local build passes: npm run build
- Netlify-style build passes with env check: NETLIFY=true npm run build
