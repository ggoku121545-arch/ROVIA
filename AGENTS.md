# ROVIA development rules

- React Native + Expo SDK 57 (physical Android Expo Go compatibility).
- Keep the home and map experiences simple and mobile-first.
- Preserve existing working functionality and minimize unrelated changes.
- V0.1 has no account system, server, or database.
- Map pins are in-memory only until persistence is implemented in V0.2.
- Do not add API secrets to Git. Test with `npm install`, `npx expo doctor`, and `npm run check` when an environment is available.
