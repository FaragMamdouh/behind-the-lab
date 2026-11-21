import Link from "next/link";
import { ArrowLeft, LockKeyhole, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  return <section className="section"><div className="container"><div className="login-card">
    <Link href="/" className="breadcrumbs"><ArrowLeft size={13} style={{display:"inline",verticalAlign:"middle"}}/> Back to home</Link>
    <div className="feature-icon" style={{marginTop:22}}><ShieldCheck size={21}/></div>
    <h1>Sign-in is not enabled yet.</h1>
    <p>This GitHub Pages version is a static demonstration. It does not create accounts, send sign-in links, or transmit review submissions to a server.</p>
    <div className="notice"><LockKeyhole size={19}/><div><b>Your privacy matters.</b><br/>Do not submit real or identifying personal information through this demonstration.</div></div>
    <p className="muted small" style={{marginTop:20}}>Live authentication requires the full-stack deployment and a configured Supabase project.</p>
    <Link href="/explore" className="button button-dark">Explore sample profiles</Link>
  </div></div></section>;
}
