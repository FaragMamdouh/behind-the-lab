import Link from "next/link";

export default function PrivacyPage(){
  return <><section className="page-hero"><div className="container"><div className="breadcrumbs"><Link href="/">Home</Link> / Privacy</div><span className="eyebrow">Privacy by design</span><h1>Your identity is not<br/>the content.</h1><p>This page explains how this static demonstration works and what would need to be defined before a live review service launches.</p></div></section><section className="section"><div className="container content-prose">
    <div className="content-callout"><b>This is a static demonstration, not a live review service.</b><br/>There is no account registration, sign-in service, review-submission API, reporting backend, or moderation team connected to this GitHub Pages site. All profiles and reviews shown are fictional samples.</div>
    <h2>What happens when you try the review form?</h2>
    <p>The form stores a local preview in your current browser's local storage. The review text is not sent to this website's operator, is not visible to other visitors, and is not reviewed by moderators. The preview remains in that browser until its local storage is cleared. Please do not enter real experiences or identifying personal information.</p>
    <h2>Hosting and technical information</h2>
    <p>GitHub Pages serves the static site. The hosting provider may process standard request and security information as described in its own policies. This project does not configure a separate account database or review analytics service for the Pages demonstration.</p>
    <h2>What a future live platform would need to explain</h2>
    <ul>
      <li>The identity and contact details of the data controller and the lawful basis for each processing purpose.</li>
      <li>What authentication, review, report, moderation, and security data are collected, and who can access each category.</li>
      <li>How long account records, reviews, reports, rejected submissions, audit logs, and backups are retained.</li>
      <li>Which hosting and authentication providers process data, including any international data transfers.</li>
      <li>How users can exercise applicable access, correction, deletion, restriction, and objection rights.</li>
    </ul>
    <h2>Public anonymity is not absolute technical anonymity</h2>
    <p>A production service may keep account and security information separate from published reviews, but hosting infrastructure, authentication providers, security logs, backups, and lawful requests may still involve data that can identify or link to an account. The operator must accurately explain these limits and must not promise absolute anonymity.</p>
    <h2>Before accepting real reviews</h2>
    <p>The operator must complete the privacy notice, data-retention policy, controller and processor details, security review, and appropriate GDPR and defamation/privacy legal review for the jurisdictions where the service will operate. This demonstration is not legal advice and must not be treated as a complete production privacy policy.</p>
    <p><Link className="text-link" href="/guidelines">Read the community guidelines →</Link></p>
  </div></section></>;
}
