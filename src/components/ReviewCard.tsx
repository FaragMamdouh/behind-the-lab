"use client";
import { useState } from "react";
import { Flag, MessageCircle, ShieldCheck } from "lucide-react";
import type { DemoReview } from "@/data/supervisors";
import { Stars } from "@/components/Rating";

export function ReviewCard({ review, supervisorId, showSample }: { review: DemoReview; supervisorId: string; showSample?: boolean }) {
  const isSample = showSample ?? review.id.startsWith("sample-");
  const [reported, setReported] = useState(false);
  const [expanded, setExpanded] = useState(false);
  function report() {
    if (reported) return;
    const reason = window.prompt("Why are you reporting this review? Please do not include personal information.");
    if (!reason?.trim()) return;
    setReported(true);
    alert("Static demonstration: this report was not sent to a moderation team.");
  }
  return (
    <article className="review-card">
      <div className="review-card-heading">
        <div className="reviewer-avatar"><ShieldCheck size={17} /></div>
        <div className="reviewer-meta"><b>Anonymous {review.degree} Student</b><small>{review.degree} · {new Date(review.date).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</small></div>
        <div className="review-score"><strong>{review.overall.toFixed(1)}</strong><Stars value={review.overall} size={13} /></div>
      </div>
      <div className="review-card-content"><h3>{review.title}</h3><p className={expanded ? "review-body expanded" : "review-body"}>{review.body}</p>
        {review.body.length > 190 && <button className="text-button" onClick={() => setExpanded(!expanded)}>{expanded ? "Show less" : "Read full experience"}</button>}
      </div>
      <div className="review-card-footer"><span className={`recommend recommend-${review.recommend}`}>{review.recommend === "yes" ? "Would recommend" : review.recommend === "no" ? "Would not recommend" : "Unsure"}</span><button className="report-button" onClick={report} disabled={reported}><Flag size={13} /> {reported ? "Reported" : "Report review"}</button></div>
      {isSample && <div className="sample-disclaimer"><MessageCircle size={13} /> Fictional demonstration review — not a real student account</div>}
    </article>
  );
}
