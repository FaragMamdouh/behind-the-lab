import { sampleSupervisors } from "@/data/supervisors";
import { SupervisorCard } from "@/components/SupervisorCard";
export function FeaturedSupervisors(){return <><div className="supervisor-grid">{sampleSupervisors.slice(0,3).map(s=><SupervisorCard key={s.id} supervisor={s}/>)}</div><p className="muted small" style={{marginTop:15}}>These are fictional sample profiles included to demonstrate the interface. They do not represent real academics or student reviews.</p></>}
