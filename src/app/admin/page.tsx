import Link from "next/link";
import { LockKeyhole, ShieldCheck, Database } from "lucide-react";

export default function AdminPage() {
  return <section className="section"><div className="container narrow">
    <div className="breadcrumbs"><Link href="/">Home</Link> / Admin dashboard</div>
    <span className="eyebrow">Platform operations</span>
    <h1 style={{fontSize:"2.7rem",margin:"10px 0"}}>Moderation workflow</h1>
    <div className="notice"><LockKeyhole size={19}/><div><b>Submissions are not published automatically.</b><br/>The public form stores experiences as pending. Only approved supervisor profiles and published reviews are visible to visitors.</div></div>
    <div className="form-card"><h2><Database size={18} style={{display:"inline",marginRight:8}}/>Initial moderator workflow</h2>
      <ol className="content-prose">
        <li>Open your Supabase project and select <b>Table Editor → supervisors</b>.</li>
        <li>Review rows with <code>status = pending</code>. Check the supervisor and institution against official institutional sources. Change the status to <code>approved</code> or <code>rejected</code>.</li>
        <li>Open <b>supervisor_reviews</b> and review each pending experience under the community guidelines.</li>
        <li>Change an acceptable review's status to <code>published</code>. Change a review that violates the guidelines to <code>rejected</code>.</li>
        <li>Only after the profile is approved and the review is published will the public directory or profile query return those records.</li>
      </ol>
      <p className="muted small">Use the Supabase Dashboard with your administrator account. Do not expose a service-role/secret key in this website or to reviewers.</p>
    </div>
    <div className="notice"><ShieldCheck size={19}/><div><b>Not yet included:</b><br/>A dedicated moderator login/dashboard, decision audit trail, appeals, review-report queue, supervisor right-of-reply, and automated duplicate/rate-limit controls. Use controlled access to Supabase Studio for this initial stage.</div></div>
    <div className="empty-state"><h3>Responsible moderation matters</h3><p>Apply the same rules to positive and negative experiences. A supervisor disagreeing with an opinion is not, by itself, grounds for rejection.</p><Link className="button button-dark button-small" href="/guidelines">Read community guidelines</Link></div>
  </div></section>;
}
