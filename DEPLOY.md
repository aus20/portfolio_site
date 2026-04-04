# Deploying to Vercel with GoDaddy (`alperenus.site`)

## 1. Push the repository

Initialize or use your existing Git remote (GitHub, GitLab, or Bitbucket). Push the `main` (or `master`) branch.

## 2. Create a Vercel project

1. Sign in at [vercel.com](https://vercel.com) and choose **Add New → Project**.
2. Import the Git repository that contains this Next.js app.
3. Framework preset should detect **Next.js**. Use the default build command (`next build`) and output.
4. Deploy. Vercel will assign a `*.vercel.app` URL.

## 3. Add your custom domain

1. In the Vercel project: **Settings → Domains → Add** `alperenus.site` (and optionally `www.alperenus.site`).
2. Vercel shows the **DNS records** you need (often an **A** record for the apex `@` and a **CNAME** for `www`).

## 4. Configure DNS in GoDaddy

1. Log in to GoDaddy and open **Domain Control Center** (or **My Products → DNS**) for `alperenus.site`.
2. Edit **DNS records** (not “Website” forwarding unless you intend to forward elsewhere).
3. Add or update records to match **exactly** what Vercel displays. Typical patterns:
   - **A** record: **Name** `@`, **Value** Vercel’s IP (e.g. `76.76.21.21` — always copy the current value from Vercel).
   - **CNAME**: **Name** `www`, **Value** `cname.vercel-dns.com` (or the hostname Vercel gives you).

Remove conflicting old **A**/**CNAME** rows that pointed to parking or old hosting.

## 5. Wait for SSL and verify

DNS can take a few minutes to 48 hours. Vercel issues HTTPS automatically once DNS resolves. Open `https://alperenus.site` and confirm the site loads.

## 6. Optional: redirect `www` to apex (or vice versa)

In Vercel **Domains**, set the preferred primary domain; Vercel can redirect the other hostname to it.

---

**Reminder:** GoDaddy keeps **domain registration**; **Vercel hosts** the app. You only point DNS from GoDaddy to Vercel.
