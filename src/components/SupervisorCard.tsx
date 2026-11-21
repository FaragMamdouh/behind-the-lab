import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { averageRating, type Supervisor } from "@/data/supervisors";
import { Stars } from "@/components/Rating";

export function SupervisorCard({ supervisor }: { supervisor: Supervisor }) {
  const rating = supervisor.ratingAverage ?? averageRating(supervisor.reviews);
  const count = supervisor.ratingCount ?? supervisor.reviews.length;
  return (
    <Link href={`/supervisors/${supervisor.slug}`} className="supervisor-card">
      <div className="supervisor-card-top"><div className="avatar">{supervisor.profileInitials}</div>{supervisor.isSample&&<span className="sample-pill">Sample profile</span>}</div>
      <div className="supervisor-card-info">
        <span className="eyebrow">{supervisor.field}</span>
        <h3>{supervisor.name}</h3><p className="role-line">{supervisor.title}</p>
        <p className="institution-line">{supervisor.university}</p>
        <p className="location-line"><MapPin size={13} /> {supervisor.country} · {supervisor.department}</p>
      </div>
      <div className="supervisor-card-bottom">
        {count ? <><div className="compact-rating"><b>{rating.toFixed(1)}</b><Stars value={rating} size={13} /><small>({count})</small></div></> : <span className="no-reviews">No reviews yet</span>}
        <span className="card-arrow"><ArrowUpRight size={17} /></span>
      </div>
    </Link>
  );
}
