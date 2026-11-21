import Link from "next/link";

export default function PrivacyPage(){
  return <><section className="page-hero"><div className="container"><div className="breadcrumbs"><Link href="/">Home</Link> / Privacy</div><span className="eyebrow">Privacy by design</span><h1>Your identity is not<br/>the content.</h1><p>We designed the submission form not to request reviewer names, email addresses, or student IDs. This does not amount to absolute technical anonymity.</p></div></section><section className="section"><div className="container content-prose">
    <div className="content-callout"><b>Early public-submission version.</b><br/>The website is configured to accept reviews through a server-side submission function when the Supabase and Cloudflare settings have been completed by the operator. Reviews and new supervisor suggestions remain private and pending until a moderator approves them.</div>
    <h2>Information submitted in a review</h2>
    <p>The form collects the supervisor's name and institutional details, degree level, supervision relationship, approximate supervision period, category ratings, overall rating, review title, review text, and recommendation. It does not ask the reviewer for a name, email address, student ID, exact project title, or account registration.</p>
    <h2>Technical information and anti-spam protection</h2>
    <p>Cloudflare Turnstile is used to reduce automated spam and its token is checked server-side. The anti-spam provider, hosting provider, browser, network infrastructure, and database provider may process technical request information, including information in their security logs. The application's review tables are not designed to store the reviewer's IP address or direct identifiers. Do not interpret this as a guarantee that the submission cannot be linked to technical records.</p>
    <h2>Moderation and publication</h2>
    <p>Submissions are stored with a pending status. A supervisor suggestion is not searchable and a review is not publicly displayed until a moderator has approved the supervisor profile and published the review. Only the approved profile fields and published review fields are available through the public database policies. Moderation is initially performed by the platform operator in Supabase Studio.</p>
    <h2>Hosting and service providers</h2>
    <p>The static website is hosted by GitHub Pages. Supabase provides the database and submission function. Cloudflare provides the anti-spam challenge. These providers may process data under their own terms and privacy documentation. The operator must identify the data controller and provide the complete list of processors and applicable transfer safeguards before a public launch.</p>
    <h2>Retention and user rights</h2>
    <p>The operator must define retention periods for pending, approved, rejected, and reported content, as well as security logs and backups. To request access, correction, or deletion, use the contact method published by the platform operator. That contact method must be added before the service is broadly advertised.</p>
    <h2>Public anonymity is not absolute technical anonymity</h2>
    <p>A production service can keep account and security information separate from published reviews, but hosting infrastructure, anti-spam providers, security logs, backups, and lawful requests may still involve data that could identify or link to a visitor. The operator must explain these limits accurately and must not promise absolute anonymity.</p>
    <h2>Before inviting a broad public audience</h2>
    <p>The operator must complete the data controller details, lawful bases, retention schedule, processor agreements, international-transfer assessment, contact and rights-request procedure, security review, and appropriate GDPR and defamation/privacy legal review for the jurisdictions where the service will operate. This page is a technical privacy summary, not a complete legal privacy notice or legal advice.</p>
    <p><Link className="text-link" href="/guidelines">Read the community guidelines →</Link></p>
  </div></section></>
}
