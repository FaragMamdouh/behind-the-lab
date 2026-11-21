"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Building2, GraduationCap, MapPin, ShieldCheck } from "lucide-react";
import { getPublishedReviews, getApprovedSupervisors, type LiveReview, type LiveSupervisor } from "@/lib/public-backend";
import { Stars } from "@/components/Rating";

export default function LiveSupervisorPage() {
  const [id, setId] = useState("");
  const [supervisor, setSupervisor] = useState<LiveSupervisor | null>(null);
  const [reviews, setReviews] = useState<LiveReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setId(params.get("id") ?? "");
  }, []);

  useEffect(() => {
    if (!id) return;
    let active = true;
    (async () => {
      const [profiles] = await Promise.all([getApprovedSupervisors()]);
      const selected = profiles.find((item) => item.id === id) ?? null;
      const entries = selected ? await getPublishedReviews(selected.id) : [];
      if (active) {
        setSupervisor(selected);
        setReviews(entries);
        setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [id]);

  if (loading) return <section className="section"><div className="container"><p className="muted">Loading supervisor profile…</p></div></section>;
  if (!supervisor) return <section className="section"><div className="container"><h1 style={{fontSize:"2rem"}}>Profile not found</h1><p className="muted">This profile may still be awaiting moderation or may no longer be available.</p><Link className="button button-dark" href="/explore">Explore supervisors</Link></div></section>;

  const avg = reviews.length ? reviews.reduce((sum, r) => sum + r.overall_rating, 0) / reviews.length : 0;
  return <>
    <section className="profile-header"><div className="container">
      <div className="breadcrumbs"><Link href="/">Home</Link> / <Link href="/explore">Explore</Link> / {supervisor.name}</div>
      <div className="profile-head-grid">
        <div className="profile-identity"><div className="profile-avatar">{supervisor.profile_initials}</div><div>
          <span className="eyebrow">{supervisor.research_field}</span><h1>{supervisor.name}</h1><p>{supervisor.academic_title}</p>
          <div className="profile-meta"><span><Building2 size={14}/>{supervisor.institution}</span><span><MapPin size={14}/>{supervisor.country}</span>{supervisor.department&&<span><GraduationCap size={14}/>{supervisor.department}</span>}</div>
        </div></div>
        <div className="rating-panel"><div className="rating-summary"><strong>{reviews.length ? avg.toFixed(1) : "—"}</strong><div><Stars value={avg} size={15}/><small>{reviews.length} published {reviews.length===1?"experience":"experiences"}</small></div></div></div>
      </div>
    </div></section>
    <section className="section-sm"><div className="container">
      <div className="notice"><ShieldCheck size={18}/><div>This is a community-submitted profile. Institutional details are provided by submitters and are reviewed before publication.</div></div>
      <div className="profile-section-title"><h2>Student experiences</h2><Link className="text-link" href={`/write-review/?supervisor=${encodeURIComponent(supervisor.name)}&institution=${encodeURIComponent(supervisor.institution)}&country=${encodeURIComponent(supervisor.country)}`}>Share your experience <ArrowUpRight size={14}/></Link></div>
      {reviews.length ? <div className="review-list">{reviews.map((review)=><article className="review-card" key={review.id}>
        <div className="review-card-heading"><div className="reviewer-avatar"><ShieldCheck size={17}/></div><div className="reviewer-meta"><b>Anonymous {review.degree_level} Student</b><small>{review.degree_level} · {new Date(review.created_at).toLocaleDateString("en-GB",{month:"long",year:"numeric"})}</small></div><div className="review-score"><strong>{review.overall_rating.toFixed(1)}</strong><Stars value={review.overall_rating} size={13}/></div></div>
        <div className="review-card-content"><h3>{review.title}</h3><p className="review-body expanded">{review.body}</p></div>
        <div className="review-card-footer"><span className={`recommend recommend-${review.recommendation}`}>{review.recommendation==="yes"?"Would recommend":review.recommendation==="no"?"Would not recommend":"Unsure"}</span></div>
      </article>)}</div> : <div className="empty-state"><ShieldCheck size={25}/><h3>No published experiences yet</h3><p>Be the first to share a considered, first-hand experience.</p><Link className="button button-green button-small" href={`/write-review/?supervisor=${encodeURIComponent(supervisor.name)}&institution=${encodeURIComponent(supervisor.institution)}&country=${encodeURIComponent(supervisor.country)}`}>Write the first review</Link></div>}
    </div></section>
  </>;
}
