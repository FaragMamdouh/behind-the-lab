# Behind the Lab

Behind the Lab is a student-centred academic supervisor review platform. The public website is statically hosted on GitHub Pages; Supabase provides a managed database and server-side submission function.

## Public submission flow

1. A visitor submits a first-hand experience without entering their name, email address, or student ID.
2. Cloudflare Turnstile validates the visitor server-side.
3. The Supabase Edge Function validates the fields and stores a review with status `pending`.
4. If the supervisor is new, a supervisor suggestion is also stored with status `pending`.
5. A moderator reviews the pending rows in the Supabase Dashboard. The profile must be approved and the review published before it is visible to the public.
6. The directory and community profile pages show approved profiles and published reviews only.

The website does not promise absolute anonymity. Hosting, browser, anti-spam, and infrastructure providers may process technical request information. The application tables do not ask for or store a reviewer name, email, student ID, or IP address.

## Required one-time setup

### 1. Supabase

Create a Supabase project at https://supabase.com/dashboard. In the SQL Editor, run the migration:

`supabase/migrations/20261121000100_create_review_backend.sql`

Then deploy the Edge Function:

```bash
npm install
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase functions deploy submit-review --no-verify-jwt
```

In Supabase → Edge Functions → Secrets, add:

- `REVIEW_SERVICE_ROLE_KEY`: the project's service-role/secret key. This is server-only and must never be added to GitHub Variables or frontend code.
- `TURNSTILE_SECRET_KEY`: the Cloudflare Turnstile secret key.

Do not expose a service-role or secret key in a browser or GitHub Pages bundle.

### 2. Cloudflare Turnstile

Create a Turnstile widget at https://dash.cloudflare.com/?to=/:account/turnstile. Add these hostnames:

- `faragmamdouh.github.io`
- `localhost` (only if testing locally)

Use the visible site key in GitHub Variables, and the secret key in Supabase Edge Function Secrets.

The server validates tokens with Cloudflare Siteverify, including the configured hostname and action. A client-side widget by itself is not protection.

### 3. GitHub Actions variables

In GitHub → Settings → Secrets and variables → Actions → Variables, add:

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase legacy anon/public key
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: Cloudflare Turnstile site key

These are public browser configuration values. Do not add the Supabase service-role/secret key here.

Push to `main` to rebuild the static Pages site. The submission form remains disabled until all three public variables are available at build time.

## Moderation

For this initial launch, moderate submissions in the Supabase Dashboard:

- Review `supervisors` rows with `status = pending`; verify identity and institution using official institutional pages, then change status to `approved` or `rejected`.
- Review `supervisor_reviews` rows with `status = pending`; review under the community rules, then change status to `published` or `rejected`.

Only approved profiles and published reviews are exposed by RLS. Public users receive SELECT permission only; public INSERT/UPDATE/DELETE is not granted. The Edge Function uses its server-only key to create pending rows.

## Important launch limitations

- This is an early moderated-submission MVP, not a fully audited production service.
- Manual moderation is through Supabase Studio; a dedicated moderator dashboard, appeals, supervisor right-of-reply, and report workflow still need implementation.
- Turnstile offers bot filtering, not proof that a submission is true or that a person has only one review. Monitor abuse and add rate limiting and duplicate-review controls before scaling.
- Confirm the correct GDPR data controller, lawful bases, privacy notice, retention policy, processor agreements, data-subject rights process, international transfers, and legal review before inviting a broad public audience.
- All existing sample supervisors and sample reviews are fictional and remain labelled as such.
