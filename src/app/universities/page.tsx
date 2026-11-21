import Link from "next/link";
import { UniversityDirectory } from "@/components/UniversityDirectory";
export default function UniversitiesPage(){return <><section className="page-hero"><div className="container"><div className="breadcrumbs"><Link href="/">Home</Link> / Universities</div><span className="eyebrow">Browse institutions</span><h1>Explore by university.</h1><p>Find supervisors in the institutions and research environments you are considering.</p></div></section><section className="section-sm"><div className="container"><UniversityDirectory/></div></section></>}
