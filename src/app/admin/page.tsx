import Link from "next/link";
import { LockKeyhole, ShieldCheck } from "lucide-react";

export default function AdminPage() {
  return <section className="section"><div className="container narrow">
    <div className="breadcrumbs"><Link href="/">Home</Link> / Admin dashboard</div>
    <span className="eyebrow">Platform operations</span>
    <h1 style={{fontSize:"2.7rem",margin:"10px 0"}}>Moderation dashboard</h1>
    <div className="notice"><LockKeyhole size={19}/><div><b>Backend required.</b><br/>This GitHub Pages version is a static demonstration. It cannot authenticate moderators, load a live moderation queue, or publish/reject reviews.</div></div>
    <div className="empty-state"><ShieldCheck size={25}/><h3>Moderation is not connected</h3><p>To operate a real review platform, deploy the full-stack application with a server-capable host and a secured Supabase project.</p><Link className="button button-dark button-small" href="/privacy">Review privacy requirements</Link></div>
  </div></section>;
}
