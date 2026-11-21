import Link from "next/link";
import { Building2, Globe } from "lucide-react";
import { sampleSupervisors } from "@/data/supervisors";

export function UniversityDirectory() {
  const groups = Array.from(new Map<string, { name: string; country: string; count: number }>(
    sampleSupervisors.map((supervisor) => [supervisor.university, {
      name: supervisor.university, country: supervisor.country,
      count: sampleSupervisors.filter((item) => item.university === supervisor.university).length,
    }] as const),
  ).values()).sort((a, b) => a.name.localeCompare(b.name));
  return <><div className="university-grid">{groups.map((group) => <Link className="university-card" href={`/explore?q=${encodeURIComponent(group.name)}`} key={group.name}>
    <span className="university-icon"><Building2 size={20} /></span><div><h3>{group.name}</h3><p><Globe size={12} style={{ display: "inline", marginRight: 3 }} />{group.country} · {group.count} sample supervisor profile{group.count === 1 ? "" : "s"}</p></div>
  </Link>)}</div><p className="muted small" style={{ marginTop: 18 }}>Fictional demonstration institutions only. No real university records are included.</p></>;
}
