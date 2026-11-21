# Behind the Lab — GitHub Pages Demo

This repository is a **static demonstration** of the Behind the Lab graduate-supervisor review platform. It is adapted for GitHub Pages using Next.js static export.

> **Important:** All supervisor profiles and reviews are fictional sample data. This Pages site does not accept real reviews, create user accounts, send reports, or provide moderation. The review form stores a private preview in the current browser only. Do not submit real or identifying information.

## What works on GitHub Pages

- Responsive homepage and navigation
- Supervisor search, filtering, and sorting
- Pre-generated sample supervisor profile pages
- Sample rating summaries and review sorting
- University directory
- Review-form interaction stored only in the visitor's browser
- About, community guidelines, and privacy-information pages

## What requires a server and is not active here

- Supabase authentication and email sign-in callbacks
- Persisting reviews so other visitors can see them
- Server-side review/report APIs
- Moderator authentication, approval/rejection, and report handling
- Supervisor claim and right-of-reply workflows

GitHub Pages serves static HTML, CSS, and JavaScript. It does not run Next.js API routes or a Node.js server. For a real review service, deploy the full-stack version to a server-capable platform and connect a secured Supabase project. Do not put a Supabase service-role key or other secret in GitHub Pages or frontend code.

## Publish on GitHub Pages

### 1. Create a GitHub repository

1. Sign in to GitHub and select **New repository**.
2. Name it `behind-the-lab` (or choose another name).
3. For a public demo, set visibility to **Public**.
4. Create the repository. Do not initialize it with a README, `.gitignore`, or licence if you plan to push this folder as-is.

### 2. Upload this project

Download/extract the project ZIP, open Terminal in the extracted `behind-the-lab-github-pages` folder, and run (replace `YOUR_GITHUB_USERNAME`):

```bash
git init
git add .
git commit -m "Add Behind the Lab demo website"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/behind-the-lab.git
git push -u origin main
```

If Git asks you to authenticate, use the sign-in window or GitHub's supported authentication method. Do not put a password or personal access token directly in the remote URL.

### 3. Enable GitHub Pages

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. The included workflow at `.github/workflows/deploy.yml` will build and deploy the site whenever you push to `main`.
5. Open the **Actions** tab and wait for **Deploy Behind the Lab to GitHub Pages** to complete successfully.

For a repository named `behind-the-lab`, the project site URL will be:

`https://YOUR_GITHUB_USERNAME.github.io/behind-the-lab/`

If you name the repository `YOUR_GITHUB_USERNAME.github.io`, GitHub uses the root URL `https://YOUR_GITHUB_USERNAME.github.io/`. The workflow automatically accounts for both URL layouts.

## Run locally

Requirements: Node.js 20.9+ (Node 22 recommended) and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. To test the static export locally:

```bash
npm run build
```

The static output is written to `out/`.

## Update the website

After changing files, commit and push them to the `main` branch:

```bash
git add .
git commit -m "Update website"
git push
```

GitHub Actions will rebuild and publish the site automatically.

## Full-stack version

The original full-stack Next.js project is a separate version and is not deployable to GitHub Pages as-is. It contains server API routes and authentication callbacks. Use a server-capable deployment (for example, Vercel) with Supabase for a live service. Before inviting students, complete the privacy, GDPR, moderation, defamation, security, and accessibility reviews described in the full-stack project's documentation.
