# 🌐 Publishing StudyReel (get a shareable link)

Your site is already built. The folder to publish is:

```
/Users/annaraheja/studyreel-web/dist
```

Pick ONE of the options below. **Option A is the easiest — no account, 30 seconds.**

---

## Option A — Netlify Drop (fastest, free)

1. Go to **https://app.netlify.com/drop** in your browser.
2. Open Finder to `/Users/annaraheja/studyreel-web/` and find the **`dist`** folder.
3. **Drag the `dist` folder** onto the Netlify Drop page.
4. Wait a few seconds — you get a **live public link** like `https://random-name-123.netlify.app`.
5. Share that link with anyone. It works on phones and computers.

> Make a free Netlify account to keep the link permanent and give it a nicer name (Site settings → Change site name).

---

## Option B — Vercel (free, nicer URLs, needs a free account)

1. Go to **https://vercel.com** and sign up (free — you can use email or GitHub).
2. Click **Add New… → Project → Deploy a folder** (or use "Import").
3. Upload the **`dist`** folder, or connect it to GitHub if you put the code there.
4. You'll get a link like `https://studyreel.vercel.app`.

---

## When you change the content (add videos)

After editing `src/data/content.ts` (or adding videos), rebuild first:

```bash
cd ~/studyreel-web
npm run build
```

Then re-drag the new `dist` folder to Netlify (or it auto-updates if connected to GitHub).

---

## Notes
- **Videos:** the sample clips are web links. To use your own videos, either (a) put `.mp4` files in `public/videos/` and reference them as `videos/myfile.mp4`, or (b) host them somewhere (YouTube-embed, Cloudinary, S3) and paste the link. Big video files can make the upload large — hosting them separately is better for many videos.
- **Progress** (completed lessons, bookmarks) is saved in each visitor's own browser.
