"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Building2, ExternalLink, GraduationCap, MapPin, ShieldCheck } from "lucide-react";
import { averageRating, categoryAverage, ratingCategories, type Supervisor, type DemoReview } from "@/data/supervisors";
import { RatingSummary } from "@/components/Rating";
import { ReviewCard } from "@/components/ReviewCard";

export function SupervisorProfile({ supervisor }: { supervisor: Supervisor }) {
  const [degree, setDegree] = useState("All experiences");
  const [sort, setSort] = useState("newest");
  const rating = averageRating(supervisor.reviews);
  const filtered = useMemo(() => {
    const result = supervisor.reviews.filter((review)=>degree==="All experiences"||review.degree===degree);
    if(sort==="oldest") result.sort((a,b)=>a.date.localeCompare(b.date));
    if(sort==="highest") result.sort((a,b)=>b.overall-a.overall);
    if(sort==="lowest") result.sort((a,b)=>a.overall-b.overall);
    if(sort==="newest") result.sort((a,b)=>b.date.localeCompare(a.date));
    return result;
  },[supervisor.reviews,degree,sort]);
  const distribution = [5,4,3,2,1].map((score)=>({score,count:supervisor.reviews.filter((r)=>Math.round(r.overall)===score).length}));
  return <>
    <section className="profile-header"><div className="container">
      <div className="breadcrumbs"><Link href="/">Home</Link> / <Link href="/explore">Explore supervisors</Link> / {supervisor.name}</div>
      <div className="profile-head-grid"><div className="profile-identity"><div className="profile-avatar">{supervisor.profileInitials}</div><div><span className="eyebrow">{supervisor.field}</span><h1>{supervisor.name}</h1><p>{supervisor.title}</p><div className="profile-meta"><span><Building2 size={14}/>{supervisor.university}</span><span><MapPin size={14}/>{supervisor.country}</span><span><GraduationCap size={14}/>{supervisor.department}</span></div></div></div>
        <div className="rating-panel"><RatingSummary value={rating} count={supervisor.reviews.length}/></div>
      </div>
    </div></section>
    <section className="section-sm"><div className="container profile-grid">
      <div>
        <div className="profile-tabs"><a href="#overview">Overview</a><a href="#experiences">Student experiences ({supervisor.reviews.length})</a><a href="#ratings">Ratings</a></div>
        <section id="overview" className="section-anchor" style={{marginBottom:38}}><div className="profile-section-title"><h2>About this supervisor</h2>{supervisor.isSample&&<span className="sample-pill">Sample profile</span>}</div><p className="muted" style={{fontSize:".9rem"}}>This is a fictional demonstration profile created to show how institutional information and student-submitted experiences will appear. It is not a real academic or institution.</p><div className="interest-tags" style={{marginTop:17}}>{supervisor.interests.map((tag)=><span className="tag" key={tag}>{tag}</span>)}</div><p style={{marginTop:18}}><a className="text-link" href={supervisor.institutionUrl} target="_blank" rel="noreferrer">Example institutional profile <ExternalLink size={13}/></a></p></section>
        <section id="ratings" className="section-anchor" style={{marginBottom:38}}><div className="profile-section-title"><h2>Ratings by category</h2></div>
          {supervisor.reviews.length ? <div className="category-list">{ratingCategories.map((category)=>{const value=categoryAverage(supervisor.reviews,category.key);return <div className="category-row" key={category.key}><span>{category.label}</span><div className="bar-track"><div className="bar-fill" style={{width:`${value?value/5*100:0}%`}}/></div><strong>{value?value.toFixed(1):"—"}</strong></div>})}</div>:<p className="muted small">Category ratings will appear when approved reviews are available.</p>}
          {supervisor.reviews.length>0&&<div style={{marginTop:22}}><div className="muted small" style={{marginBottom:9}}>Overall rating distribution</div>{distribution.map(({score,count})=><div className="category-row" key={score} style={{gridTemplateColumns:"25px 1fr 28px",marginBottom:6}}><span>{score} ★</span><div className="bar-track"><div className="bar-fill" style={{width:`${count/supervisor.reviews.length*100}%`}}/></div><strong>{count}</strong></div>)}</div>}
        </section>
        <section id="experiences" className="section-anchor"><div className="profile-section-title"><h2>Student experiences</h2><Link href="/write-review" className="text-link">Write a review <ArrowUpRight size={14}/></Link></div>
          <div className="results-line"><label>Degree <select className="sort-select" value={degree} onChange={(e)=>setDegree(e.target.value)}><option>All experiences</option><option>Master's</option><option>PhD</option></select></label><label>Sort <select className="sort-select" value={sort} onChange={(e)=>setSort(e.target.value)}><option value="newest">Newest</option><option value="oldest">Oldest</option><option value="highest">Highest rated</option><option value="lowest">Lowest rated</option></select></label></div>
          {filtered.length ? <div className="review-list">{filtered.map((review)=><ReviewCard key={review.id} review={review} supervisorId={supervisor.id}/>)}</div>:<div className="empty-state"><ShieldCheck size={25}/><h3>No published experiences yet</h3><p>There are no reviews matching this selection. You can help future students by sharing your experience.</p><Link className="button button-green button-small" href="/write-review">Write the first review</Link></div>}
        </section>
      </div>
      <aside className="profile-aside"><div className="sidebar-card"><h3>Research interests</h3><div className="interest-tags">{supervisor.interests.map((tag)=><span className="tag" key={tag}>{tag}</span>)}</div></div><div className="sidebar-card"><h3>At a glance</h3><p style={{marginBottom:8}}><b style={{color:"var(--ink)"}}>Institution</b><br/>{supervisor.university}</p><p style={{marginBottom:8}}><b style={{color:"var(--ink)"}}>Department</b><br/>{supervisor.department}</p><p style={{marginBottom:0}}><b style={{color:"var(--ink)"}}>Country</b><br/>{supervisor.country}</p></div><div className="sidebar-card"><h3>Information source</h3><p className="source-note">{supervisor.sourceLabel}. In a live profile, public institutional details and student-submitted opinions will be labelled separately.</p></div><div className="sidebar-card"><h3>Remember</h3><p>Reviews describe individual experiences, not independently verified facts. Consider the context, number, and dates of reviews before making a decision.</p><Link className="text-link" href="/guidelines">How reviews work <ArrowUpRight size={13}/></Link></div></aside>
    </div></section>
  </>;
}
