# ROVIA (로비아)

Mobile-first, map-centered travel and everyday-life sharing app. **V0.1 prototype**, built with React Native + Expo SDK 57.

## Current features
- Minimal home with a map entry point and left-swipe gesture
- Google Maps on Android through `react-native-maps` in Expo Go
- Tap the map to place temporary pins; tap a marker callout to remove a pin
- Pins are **session-only** and disappear when the app restarts

## Test on Android (Codespaces + Expo Go)
1. Open this repository in GitHub Codespaces.
2. Open the terminal in the repository root.
3. Run `npm install`.
4. Run `npx expo install --check` and `npm run check` to verify dependencies and TypeScript.
5. Run `npx expo start --tunnel` (install tunnel helper if prompted).
6. Open the tunnel's QR/link in SDK 57 compatible Expo Go on Android.

If `expo install --check` reports version mismatches, run `npx expo install --fix` and retest. Cloud tunneling may require network access and an active Codespace.

## Next milestones
- V0.2: local persistence, notes/photos on pins
- V0.3: accounts, opt-in sharing and backend
- V1.0: community feed, place discovery and moderation

No login, database, or API keys are included in V0.1. App store builds will need native map provider configuration. Branding/trademark clearance is a separate pre-release task.
