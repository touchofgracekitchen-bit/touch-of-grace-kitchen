# Touch of Grace Kitchen — Setup Guide

This guide gets your app live on the internet in about 45 minutes.
No coding experience needed — every step is point and click.

---

## What you need (all free, no credit card)

- A computer (Mac or Windows)
- A **GitHub** account — github.com
- A **Supabase** account — supabase.com
- A **Vercel** account — vercel.com

---

## Step 1: Set up your database (Supabase)

Your database is the shared whiteboard — this is what makes the POS tablet,
kitchen tablet, and Shamalie's laptop all see the same data.

1. Go to **supabase.com** and click "Start your project" → sign up free
2. Click **"New project"**
   - Organization: your name or "Touch of Grace"
   - Project name: `touch-of-grace`
   - Database password: choose something strong — write it down somewhere safe
   - Region: **US East (N. Virginia)** — closest to Sparwood, BC
   - Click **"Create new project"** and wait about 2 minutes
3. Once it loads, click **"SQL Editor"** in the left sidebar
4. Click **"New query"**, then copy and paste ALL of this SQL and click **"Run"**:

```sql
-- Create the main data table
CREATE TABLE IF NOT EXISTS tog_data (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Allow the app to read and write data
ALTER TABLE tog_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "App full access" ON tog_data
  FOR ALL TO anon
  USING (true)
  WITH CHECK (true);
```

   You should see "Success. No rows returned." — that means it worked.

5. Enable real-time (so kitchen display updates instantly):
   - Click **"Database"** in the left sidebar → **"Replication"**
   - Under "Supabase Realtime", find **"tog_data"** and toggle it ON

6. Get your credentials:
   - Click **"Project Settings"** (gear icon, bottom of left sidebar) → **"API"**
   - You need two things — copy them somewhere:
     - **Project URL** — looks like `https://abcdefgh.supabase.co`
     - **anon public** key — a very long string starting with `eyJ...`

---

## Step 2: Upload the app to GitHub

GitHub stores your code so Vercel can find it.

1. Go to **github.com** and sign in
2. Click the **"+"** button (top right) → **"New repository"**
   - Repository name: `touch-of-grace-kitchen`
   - Leave everything else as default
   - Click **"Create repository"**
3. On the next screen, click **"uploading an existing file"**
4. Unzip the file you downloaded and drag ALL the files and folders into the upload area
   - Make sure you see: `src/`, `index.html`, `package.json`, `vite.config.js`, etc.
5. Scroll down and click **"Commit changes"**

---

## Step 3: Deploy to Vercel

Vercel gives you a real URL and handles everything automatically.

1. Go to **vercel.com** → click **"Sign up"** → choose **"Continue with GitHub"**
2. Once signed in, click **"Add New..."** → **"Project"**
3. Find **"touch-of-grace-kitchen"** in the list and click **"Import"**
4. **Before clicking Deploy**, look for **"Environment Variables"** and add these two:

   | Name | Value |
   |------|-------|
   | `VITE_SUPABASE_URL` | your Project URL from Step 1 |
   | `VITE_SUPABASE_ANON_KEY` | your anon public key from Step 1 |

   Click "Add" after each one.

5. Click **"Deploy"** and wait about 1 minute
6. Vercel gives you a URL like `touch-of-grace-kitchen.vercel.app` — **that's your app!**

---

## Step 4: Open on your devices

**POS & management (cashier tablet / Donna-Marie's phone / Shamalie's laptop):**
- Open the Vercel URL in any browser
- Bookmark it to the home screen for easy access

**Kitchen tablet (always-on display):**
- Open the URL, tap the **Kitchen** tab
- On iPad: tap the Share button → "Add to Home Screen"
- On Android: tap the menu → "Add to Home screen"
- It will open like a dedicated app with no browser bar

**Shamalie in Jamaica:**
- Just share the Vercel URL — she can open it in any browser
- The Reports, Accounts, and Catering tabs are PIN-gated so only she and Donna-Marie see sensitive data

---

## How the PIN system works

When you open the app:
- **POS and Kitchen tabs** are always open — no PIN needed
- All other tabs show a lock icon
- Tap a locked tab → enter your staff PIN → it unlocks for that session
- Refresh the page and it locks again (good for shared devices)

Default PINs (change these in the Staff tab once you're live):
- Donna-Marie McDonald: **1111**
- Trey Fraser: **2222**
- Jayden McDonald: **3333**
- Steven-lee McDonald: **4444**
- Cashier: **5555**

---

## Making updates in the future

If you ever need to update the app (new features, fixes):
1. Replace the files in your GitHub repository with the new version
2. Vercel automatically redeploys — usually takes under 2 minutes
3. Everyone's devices update the next time they refresh

---

## Getting help

If something doesn't work:
1. Check that both environment variables are set correctly in Vercel
   (Project Settings → Environment Variables)
2. Make sure the SQL ran successfully in Supabase (Step 1, point 4)
3. Check that real-time is enabled for tog_data (Step 1, point 5)

---

*Built for Touch of Grace Kitchen Ltd. — Sparwood, BC — Est. 2026*
 

