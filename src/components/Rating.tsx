import { Star } from "lucide-react";

export function Stars({ value, size = 16 }: { value: number; size?: number }) {
  return <span className="stars" aria-label={`${value.toFixed(1)} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, i) => <Star key={i} size={size} fill={i < Math.round(value) ? "currentColor" : "none"} strokeWidth={1.8} />)}
  </span>;
}

export function RatingSummary({ value, count }: { value: number; count: number }) {
  if (!count) return <div className="rating-empty"><span className="rating-empty-icon"><Star size={19} /></span><span><b>No reviews yet</b><small>Be the first to share an experience</small></span></div>;
  return <div className="rating-summary"><strong>{value.toFixed(1)}</strong><div><Stars value={value} /><small>Based on {count} {count === 1 ? "review" : "reviews"}</small></div></div>;
}
