import Link from "next/link";
export default function AuthCallbackPage() {
  return <section className="section"><div className="container narrow text-center"><span className="eyebrow">Static demonstration</span><h1 style={{fontSize:"2.4rem"}}>Authentication is unavailable here.</h1><p className="muted">GitHub Pages cannot run the server-side authentication callback used by the full-stack application.</p><Link className="button button-dark" href="/">Return home</Link></div></section>;
}
