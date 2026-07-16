# 🔐 Firebase setup (one time, ~5 minutes)

This gives the app real accounts (sign up / log in) and cloud-saved progress.
You do these steps in your browser; then paste me the config and I wire it all up.

Sign in with **annaraheja2@gmail.com** for all of this.

## 1. Create the project
1. Go to **https://console.firebase.google.com**
2. Click **Create a project** (or "Add project").
3. Name it **StudyReel** → Continue.
4. **Turn OFF Google Analytics** (toggle off) → Create project. Wait a few seconds → Continue.

## 2. Turn on sign-in methods
1. Left menu → **Build → Authentication** → **Get started**.
2. On the **Sign-in method** tab:
   - Click **Email/Password** → toggle **Enable** → Save.
   - Click **Google** → toggle **Enable** → pick your email as the "support email" → Save.

## 3. Create the web app + copy the config
1. Click the **gear icon** (top left, next to "Project Overview") → **Project settings**.
2. Scroll to **Your apps** → click the **`</>`** (web) icon.
3. Nickname it **StudyReel Web** → **Register app** (skip "Firebase Hosting").
4. You'll see a code block with **`const firebaseConfig = { … }`**.
   **Copy that whole block** and send it to me.

That's it — once you paste me that `firebaseConfig` block, I'll:
- Plug it in
- Build the login / sign-up screens
- Make your 3 master emails owner accounts
- Deploy it live

## (Later) Step 4 — Firestore, for cloud-saved progress
We'll do this right after login works: **Build → Firestore Database → Create database**.
Not needed for the first version of accounts.
