"use client";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import Script from "next/script";
import { CheckCircle2, Info, LockKeyhole, ShieldCheck } from "lucide-react";
import { ratingCategories, type CategoryKey } from "@/data/supervisors";
import { getFunctionUrl } from "@/lib/public-backend";

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: {
        sitekey: string; action: string; callback: (token: string) => void;
        "expired-callback": () => void; "error-callback": () => void; theme?: "light" | "dark" | "auto";
      }) => string;
      reset: (widgetId: string) => void;
    };
  }
}

const emptyRatings = Object.fromEntries(ratingCategories.map((c)=>[c.key,undefined])) as Record<CategoryKey,number|null|undefined>;
const backendReady = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
);

export default function WriteReviewPage(){
  const [supervisorName,setSupervisorName]=useState("");
  const [supervisorTitle,setSupervisorTitle]=useState("Academic supervisor");
  const [degree,setDegree]=useState("PhD");
  const [role,setRole]=useState("Primary supervisor");
  const [institution,setInstitution]=useState("");
  const [country,setCountry]=useState("");
  const [department,setDepartment]=useState("");
  const [researchField,setResearchField]=useState("");
  const [title,setTitle]=useState("");
  const [body,setBody]=useState("");
  const [recommend,setRecommend]=useState("yes");
  const [ratings,setRatings]=useState<Record<CategoryKey,number|null|undefined>>(emptyRatings);
  const [overall,setOverall]=useState<number|null>(null);
  const [turnstileToken,setTurnstileToken]=useState("");
  const [widgetId,setWidgetId]=useState<string|null>(null);
  const [website,setWebsite]=useState("");
  const [firstHand,setFirstHand]=useState(false);
  const [policyAccepted,setPolicyAccepted]=useState(false);
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState("");
  const [success,setSuccess]=useState(false);
  const [submissionMessage,setSubmissionMessage]=useState("");

  useEffect(()=>{
    const params=new URLSearchParams(window.location.search);
    setSupervisorName(params.get("supervisor")??"");
    setInstitution(params.get("institution")??"");
    setCountry(params.get("country")??"");
  },[]);

  const progress=useMemo(()=>[supervisorName,degree,role,institution,country,title,body,overall].filter(Boolean).length,[supervisorName,degree,role,institution,country,title,body,overall]);

  useEffect(()=>{
    if(!backendReady || !window.turnstile || !document.getElementById("btl-turnstile") || widgetId) return;
    const siteKey=process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if(!siteKey) return;
    const id=window.turnstile.render(document.getElementById("btl-turnstile")!,{
      sitekey:siteKey,action:"submit_review",theme:"light",
      callback:(token)=>setTurnstileToken(token),
      "expired-callback":()=>setTurnstileToken(""),
      "error-callback":()=>setTurnstileToken(""),
    });
    setWidgetId(id);
  },[widgetId]);

  useEffect(()=>()=>{
    if(widgetId && window.turnstile) window.turnstile.reset(widgetId);
  },[widgetId]);

  function setRating(key:CategoryKey,value:number|null|undefined){setRatings((old)=>({...old,[key]:value}));}

  async function submit(e:FormEvent){
    e.preventDefault();setError("");
    if(!backendReady){setError("The live submission service has not been configured yet. Please check back later.");return;}
    if(!supervisorName.trim()||!institution.trim()||!country.trim()||!title.trim()||body.trim().length<60||!overall||!firstHand||!policyAccepted||!turnstileToken){
      setError("Please complete the required fields, the anti-spam check, and both confirmations.");return;
    }
    setBusy(true);
    try{
      const payload={
        supervisorName:supervisorName.trim(),supervisorTitle,institution:institution.trim(),
        country:country.trim(),department:department.trim(),researchField:researchField.trim(),
        degreeLevel:degree,relationship:role,
        title:title.trim(),body:body.trim(),recommendation:recommend,overallRating:overall,
        categoryRatings:Object.fromEntries(Object.entries(ratings).filter(([,value])=>value!==undefined)),
        turnstileToken,website,firstHandExperience:firstHand,policyAccepted,
      };
      const key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      const response=await fetch(getFunctionUrl(),{
        method:"POST",
        headers:{"Content-Type":"application/json","apikey":key??"","Authorization":`Bearer ${key??""}`},
        body:JSON.stringify(payload),
      });
      const result=await response.json();
      if(!response.ok) throw new Error(result.error??"The submission could not be received.");
      setSubmissionMessage(result.message??"Your experience has been received and is awaiting moderation.");
      setSuccess(true);
    }catch(err){
      setError(err instanceof Error?err.message:"Something went wrong. Please try again.");
    }finally{setBusy(false);}
  }

  if(success)return <section className="section"><div className="container form-shell"><div className="success-panel"><div className="success-icon"><CheckCircle2 size={28}/></div><span className="eyebrow">Thank you for contributing</span><h2>Your experience has been received.</h2><p>{submissionMessage}</p><p className="small muted">Your review is not public yet. It will only appear after a moderator approves it. No reviewer name, email address, or student ID was requested by this form.</p><div style={{display:"flex",justifyContent:"center",gap:10,flexWrap:"wrap",marginTop:20}}><Link href="/explore" className="button button-dark">Explore supervisors</Link><button className="button button-outline" onClick={()=>window.location.reload()}>Submit another review</button></div></div></div></section>;

  return <section className="section"><div className="container form-shell">
    <div className="form-intro"><div className="breadcrumbs"><Link href="/">Home</Link> / Share your experience</div><span className="eyebrow">Help the next student</span><h1>Share your experience.</h1><p>Your perspective can help another student understand what supervision is like beyond the project description. Positive, mixed, and negative experiences are all welcome when shared constructively.</p><p className="small">You do not need to create an account or provide your name, email address, or student ID.</p></div>
    {!backendReady&&<div className="notice"><Info size={19}/><div><b>Live submissions are not configured yet.</b><br/>The website needs a Supabase project and a Cloudflare Turnstile site key before it can securely accept reviews. Do not enter real experiences until the service is enabled.</div></div>}
    <div className="notice"><LockKeyhole size={19}/><div><b>Public anonymity, not absolute technical anonymity.</b><br/>Your name and email are not requested or attached to the review. The hosting and anti-spam providers may still process technical request information. Reviews are held privately for moderation before any public display. <Link href="/privacy" className="text-link">Read the privacy information</Link>.</div></div>
    <form onSubmit={submit}>
      <div className="form-card"><h2>01. Who are you reviewing?</h2><p>Enter the supervisor's details carefully. If a profile does not exist, your submission will propose one for moderation.</p><div className="form-grid">
        <div className="form-field full"><label htmlFor="supervisorName">Supervisor's full name *</label><input id="supervisorName" value={supervisorName} onChange={(e)=>setSupervisorName(e.target.value)} placeholder="Full name as shown on the institution website" required maxLength={180}/></div>
        <div className="form-field"><label htmlFor="supervisorTitle">Academic title</label><input id="supervisorTitle" value={supervisorTitle} onChange={(e)=>setSupervisorTitle(e.target.value)} placeholder="Professor, Dr, PI…" maxLength={120}/></div>
        <div className="form-field"><label htmlFor="degree">Degree level *</label><select id="degree" value={degree} onChange={(e)=>setDegree(e.target.value)}><option>Master's</option><option>PhD</option></select></div>
        <div className="form-field"><label htmlFor="institution">University / institution *</label><input id="institution" value={institution} onChange={(e)=>setInstitution(e.target.value)} placeholder="Institution name" required maxLength={180}/></div>
        <div className="form-field"><label htmlFor="country">Country *</label><input id="country" value={country} onChange={(e)=>setCountry(e.target.value)} placeholder="Country" required maxLength={100}/></div>
        <div className="form-field"><label htmlFor="department">Department (optional)</label><input id="department" value={department} onChange={(e)=>setDepartment(e.target.value)} placeholder="Department or research centre" maxLength={180}/></div>
        <div className="form-field"><label htmlFor="researchField">Research field (optional)</label><input id="researchField" value={researchField} onChange={(e)=>setResearchField(e.target.value)} placeholder="e.g. Immunology" maxLength={120}/></div>
        <div className="form-field full"><label htmlFor="role">Your supervision relationship *</label><select id="role" value={role} onChange={(e)=>setRole(e.target.value)}><option>Primary supervisor</option><option>Co-supervisor</option><option>Thesis advisor</option><option>Other mentoring role</option></select></div>
      </div></div>
      <div className="form-card"><h2>02. Rate the experience</h2><p>Select one to five stars for each category, or choose not applicable. Leave categories blank when you cannot evaluate them.</p><div className="rating-input-list">
        {ratingCategories.filter((category)=>category.key!=="overall_experience").map((category)=><div className="rating-input-row" key={category.key}><div><b>{category.label}</b><small>{category.help}</small></div><div className="rating-buttons" aria-label={`Rate ${category.label}`}>{[1,2,3,4,5].map((n)=><button type="button" key={n} className={(ratings[category.key]??0)>=n?"selected":""} aria-label={`${n} stars`} aria-pressed={(ratings[category.key]??0)>=n} onClick={()=>setRating(category.key,n)}><span>★</span></button>)}<button type="button" className={`na-button ${ratings[category.key]===null?"na-selected":""}`} onClick={()=>setRating(category.key,null)}>N/A</button></div></div>)}
        <div className="rating-input-row"><div><b>Overall rating *</b><small>Your overall supervision experience</small></div><div className="rating-buttons">{[1,2,3,4,5].map((n)=><button type="button" key={n} className={overall!==null&&overall>=n?"selected":""} aria-label={`${n} stars overall`} aria-pressed={overall!==null&&overall>=n} onClick={()=>setOverall(n)}><span>★</span></button>)}</div></div>
      </div></div>
      <div className="form-card"><h2>03. Describe your experience</h2><p>Be specific, fair, and respectful. Focus on your own experience and avoid identifying yourself or other students.</p><div className="form-grid">
        <div className="form-field full"><label htmlFor="title">Review title *</label><input id="title" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Summarise your experience in a few words" required maxLength={120}/></div>
        <div className="form-field full"><label htmlFor="body">Your experience *</label><textarea id="body" value={body} onChange={(e)=>setBody(e.target.value)} placeholder="What was supervision like day to day? Consider guidance, communication, feedback, independence, expectations, and work–life balance…" required minLength={60} maxLength={5000}/><small>{body.length}/5000 characters · Minimum 60 characters</small></div>
        <div className="form-field"><label htmlFor="recommend">Would you recommend this supervisor?</label><select id="recommend" value={recommend} onChange={(e)=>setRecommend(e.target.value)}><option value="yes">Yes</option><option value="no">No</option><option value="unsure">Not sure</option></select></div>
        <div className="form-field full"><label htmlFor="website" style={{position:"absolute",left:"-10000px"}}>Leave this field empty</label><input id="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={website} onChange={(e)=>setWebsite(e.target.value)} style={{position:"absolute",left:"-10000px",opacity:0,height:1,width:1}} /></div>
      </div></div>
      <div className="form-card"><h2>04. Confirm before submitting</h2><div className="form-field" style={{marginBottom:14}}><label style={{display:"flex",gap:10,alignItems:"flex-start",fontWeight:500}}><input type="checkbox" checked={firstHand} onChange={(e)=>setFirstHand(e.target.checked)} style={{width:17,marginTop:3}}/> I confirm this review is based on my own first-hand supervision experience.</label></div><div className="form-field"><label style={{display:"flex",gap:10,alignItems:"flex-start",fontWeight:500}}><input type="checkbox" checked={policyAccepted} onChange={(e)=>setPolicyAccepted(e.target.checked)} style={{width:17,marginTop:3}}/> I have read and agree to the <Link href="/guidelines" className="text-link">community guidelines</Link>, and I have not included identifying or confidential information.</label></div><div style={{marginTop:20}}><b className="small">Anti-spam verification *</b><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={()=>{if(!window.turnstile||!document.getElementById("btl-turnstile")||widgetId)return;const key=process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;if(!key)return;const id=window.turnstile.render(document.getElementById("btl-turnstile")!,{sitekey:key,action:"submit_review",theme:"light",callback:(token)=>setTurnstileToken(token),"expired-callback":()=>setTurnstileToken(""),"error-callback":()=>setTurnstileToken("")});setWidgetId(id);}}/><div id="btl-turnstile" style={{marginTop:10}}/>{!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY&&<small className="muted">Turnstile site key required for live submissions.</small>}</div></div>
      {error&&<p className="form-error" role="alert">{error}</p>}
      <div className="form-submit-row"><span className="muted small">{progress}/8 key fields completed · Reviews are private until approved.</span><button className="button button-dark" type="submit" disabled={busy||!backendReady}>{busy?"Submitting…":"Submit for moderation"}<ShieldCheck size={16}/></button></div>
    </form>
  </div></section>;
}
