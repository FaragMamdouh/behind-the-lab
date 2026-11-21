import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Compass, HeartHandshake, LockKeyhole, Search, ShieldCheck, Star, UsersRound } from "lucide-react";
import { FeaturedSupervisors } from "@/components/FeaturedSupervisors";

export default function HomePage() {
  return <>
    <section className="hero"><div className="container hero-grid">
      <div className="hero-copy"><span className="eyebrow">A clearer view of academic supervision</span>
        <h1>There’s more to a supervisor than a <em>CV.</em></h1>
        <p>Choosing a research supervisor is a big decision. Hear from students who have experienced the day-to-day reality — beyond publications, titles, and lab websites.</p>
        <div className="hero-actions"><Link href="/explore" className="button button-dark">Explore supervisors <ArrowUpRight size={16} /></Link><Link href="/about" className="button button-outline">Why this matters</Link></div>
        <form action={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/explore/`} className="search-panel"><Search size={18} color="#829087" /><input type="search" name="q" placeholder="Search a supervisor, university, or field…" aria-label="Search a supervisor, university, or field" /><button className="button button-green" type="submit">Search</button></form>
        <div className="hero-trust"><ShieldCheck size={16} /> Publicly anonymous reviews · Moderated for fairness · Student-centred</div>
      </div>
      <div className="hero-visual" aria-label="Illustration representing a connected research community">
        <div className="visual-orbit"><div className="visual-core"><BookOpen /></div><div className="float-card float-one"><small>Supervision is human</small><strong>Beyond the CV</strong><div className="float-rating"><Star size={13} fill="currentColor"/><small>Experiences matter</small></div></div><div className="float-card float-two"><strong>One decision.</strong><small>Years of your life.</small></div></div>
        <span className="hero-side-note">A community resource, not a ranking contest.</span>
      </div>
    </div></section>
    <section className="stats-strip"><div className="container stats-grid">
      <div className="stat-item"><span className="stat-icon"><UsersRound size={18}/></span><div><strong>Student perspectives</strong><small>Experiences, not academic prestige</small></div></div>
      <div className="stat-item"><span className="stat-icon"><LockKeyhole size={18}/></span><div><strong>Publicly anonymous</strong><small>Identity is not shown with reviews</small></div></div>
      <div className="stat-item"><span className="stat-icon"><HeartHandshake size={18}/></span><div><strong>Constructive by design</strong><small>Respect, fairness, and moderation</small></div></div>
    </div></section>
    <section className="section"><div className="container">
      <div className="section-heading-row"><div className="section-heading" style={{marginBottom:0}}><span className="eyebrow">Explore the community</span><h2>Find the right environment to do your best work.</h2><p>Look beyond the research topic. Learn how students describe mentorship, communication, independence, and everyday support.</p></div><Link href="/explore" className="text-link">Explore all supervisors <ArrowRight size={16}/></Link></div>
      <FeaturedSupervisors/>
    </div></section>
    <section className="section soft-section"><div className="container"><div className="section-heading"><span className="eyebrow">What matters in supervision</span><h2>Science is the project. People shape the experience.</h2><p>A strong supervision relationship is about more than expertise. It is built through everyday behaviours that help students learn, contribute, and thrive.</p></div>
      <div className="feature-grid">
        <div className="feature-card"><div className="feature-icon"><HeartHandshake size={20}/></div><h3>Mentorship that helps you grow</h3><p>Meaningful guidance, useful feedback, and support as you become an independent researcher.</p></div>
        <div className="feature-card"><div className="feature-icon"><UsersRound size={20}/></div><h3>Respect in the everyday</h3><p>A healthy environment where boundaries, contributions, and different perspectives are respected.</p></div>
        <div className="feature-card"><div className="feature-icon"><Compass size={20}/></div><h3>Space to find your direction</h3><p>Clear expectations and room to build your own scientific judgement and career goals.</p></div>
      </div>
    </div></section>
    <section className="section"><div className="container split-section">
      <div><span className="eyebrow">A better-informed decision</span><h2>Make room for the questions that rarely appear on a lab website.</h2><div className="step-list">
        <div className="step"><span className="step-number">1</span><div><h3>Explore real experiences</h3><p>Compare student perspectives across supervision categories and degree levels.</p></div></div>
        <div className="step"><span className="step-number">2</span><div><h3>Look for patterns, not verdicts</h3><p>Every experience is individual. Consider context, recency, and the number of reviews.</p></div></div>
        <div className="step"><span className="step-number">3</span><div><h3>Ask better questions</h3><p>Use what you learn to have more informed conversations before you commit.</p></div></div>
      </div></div>
      <div className="quote-card"><div className="quote-mark">“</div><blockquote>Before choosing your supervisor, hear from the students who have been there.</blockquote><small>Behind the Lab · Our guiding principle</small></div>
    </div></section>
    <section className="section-sm"><div className="container"><div className="cta-band"><div><span className="eyebrow">Help the next student</span><h2>Your experience can make a difference.</h2><p>Share what worked, what did not, and what you wish you had known.</p></div><Link href="/write-review" className="button button-dark">Write an anonymous review <ArrowUpRight size={16}/></Link></div></div></section>
  </>;
}
