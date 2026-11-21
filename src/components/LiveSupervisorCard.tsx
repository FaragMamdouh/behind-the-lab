"use client";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { LiveSupervisor } from "@/lib/public-backend";

export function LiveSupervisorCard({ supervisor }: { supervisor: LiveSupervisor }) {
  return (
    <Link href={`/live-supervisor/?id=${encodeURIComponent(supervisor.id)}`} className="supervisor-card">
      <div className="supervisor-card-top">
        <div className="avatar">{supervisor.profile_initials || "?"}</div>
        <span className="sample-pill" style={{background:"#eaf3ed",color:"#246b50"}}>Community profile</span>
      </div>
      <div className="supervisor-card-info">
        <span className="eyebrow">{supervisor.research_field}</span>
        <h3>{supervisor.name}</h3>
        <p className="role-line">{supervisor.academic_title}</p>
        <p className="institution-line">{supervisor.institution}</p>
        <p className="location-line"><MapPin size={13}/> {supervisor.country}{supervisor.department ? ` · ${supervisor.department}` : ""}</p>
      </div>
      <div className="supervisor-card-bottom">
        <span className="no-reviews">Approved community profile</span>
        <span className="card-arrow"><ArrowUpRight size={17}/></span>
      </div>
    </Link>
  );
}
