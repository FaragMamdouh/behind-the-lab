import Link from "next/link";
import { ArrowUpRight, BookOpen, Menu } from "lucide-react";

const nav = [
  ["Explore supervisors", "/explore"],
  ["Universities", "/universities"],
  ["About", "/about"],
  ["Guidelines", "/guidelines"],
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="nav-wrap">
        <Link href="/" className="brand" aria-label="Behind the Lab home">
          <span className="brand-mark"><BookOpen size={19} strokeWidth={2.2} /></span>
          <span>behind the <b>lab.</b></span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
        </nav>
        <div className="nav-actions">
          <Link href="/login" className="nav-login">Sign in</Link>
          <Link href="/write-review" className="button button-dark button-small">Share your experience <ArrowUpRight size={15} /></Link>
        </div>
        <details className="mobile-menu">
          <summary aria-label="Open navigation"><Menu size={22} /></summary>
          <div className="mobile-menu-panel">
            {nav.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
            <Link href="/login">Sign in</Link>
            <Link href="/write-review">Share your experience</Link>
          </div>
        </details>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <Link href="/" className="brand footer-brand"><span className="brand-mark"><BookOpen size={18} /></span><span>behind the <b>lab.</b></span></Link>
          <p className="footer-note">Better decisions start with more honest conversations about supervision.</p>
        </div>
        <div className="footer-links">
          <div><span className="footer-label">Explore</span><Link href="/explore">Supervisors</Link><Link href="/universities">Universities</Link><Link href="/write-review">Write a review</Link></div>
          <div><span className="footer-label">Learn</span><Link href="/about">Our mission</Link><Link href="/guidelines">Community guidelines</Link><Link href="/privacy">Privacy</Link></div>
          <div><span className="footer-label">Platform</span><Link href="/login">Sign in</Link><Link href="/admin">Admin</Link></div>
        </div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Behind the Lab · An independent community resource</span><span>Built around respect, fairness, and student experience.</span></div>
    </footer>
  );
}
