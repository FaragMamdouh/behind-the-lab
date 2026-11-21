"use client";
import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { sampleSupervisors } from "@/data/supervisors";
import { SupervisorCard } from "@/components/SupervisorCard";

export function Directory() {
  const [query, setQuery] = useState("");
  const [university, setUniversity] = useState("All universities");
  const [country, setCountry] = useState("All countries");
  const [field, setField] = useState("All research fields");
  const [sort, setSort] = useState("relevant");
  const records = sampleSupervisors;
  useEffect(() => { const params = new URLSearchParams(window.location.search); setQuery(params.get("q") || ""); }, []);
  const universities = Array.from(new Set(records.map((s) => s.university))).sort();
  const countries = Array.from(new Set(records.map((s) => s.country))).sort();
  const fields = Array.from(new Set(records.map((s) => s.field))).sort();
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    const result = records.filter((s) => {
      const searchable = [s.name,s.university,s.country,s.department,s.field,...s.interests].join(" ").toLowerCase();
      return (!q || searchable.includes(q)) && (university === "All universities" || s.university === university) && (country === "All countries" || s.country === country) && (field === "All research fields" || s.field === field);
    });
    if (sort === "name") result.sort((a,b)=>a.name.localeCompare(b.name));
    if (sort === "rating") result.sort((a,b)=>(b.ratingAverage ?? (b.reviews.length ? b.reviews.reduce((x,r)=>x+r.overall,0)/b.reviews.length : 0))-(a.ratingAverage ?? (a.reviews.length ? a.reviews.reduce((x,r)=>x+r.overall,0)/a.reviews.length : 0)));
    if (sort === "reviews") result.sort((a,b)=>(b.ratingCount ?? b.reviews.length)-(a.ratingCount ?? a.reviews.length));
    return result;
  }, [records,query,university,country,field,sort]);
  return <>
    <div className="directory-toolbar">
      <div className="input-wrap"><Search size={17}/><input className="field-control" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search by name, university, or field" aria-label="Search supervisors" /></div>
      <select className="field-control" aria-label="Filter by university" value={university} onChange={(e)=>setUniversity(e.target.value)}><option>All universities</option>{universities.map((x)=><option key={x}>{x}</option>)}</select>
      <select className="field-control" aria-label="Filter by country" value={country} onChange={(e)=>setCountry(e.target.value)}><option>All countries</option>{countries.map((x)=><option key={x}>{x}</option>)}</select>
      <select className="field-control" aria-label="Filter by research field" value={field} onChange={(e)=>setField(e.target.value)}><option>All research fields</option>{fields.map((x)=><option key={x}>{x}</option>)}</select>
    </div>
    <div className="results-line"><span><SlidersHorizontal size={13} style={{display:"inline",marginRight:5}}/>{filtered.length} sample supervisor {filtered.length===1?"profile":"profiles"}</span><label>Sort by <select className="sort-select" value={sort} onChange={(e)=>setSort(e.target.value)}><option value="relevant">Relevance</option><option value="rating">Highest rating</option><option value="reviews">Most reviews</option><option value="name">Name A–Z</option></select></label></div>
    {filtered.length ? <div className="supervisor-grid">{filtered.map((s)=><SupervisorCard key={s.id} supervisor={s}/>)}</div> : <div className="empty-state"><Search size={25}/><h3>No supervisors match those filters</h3><p>Try a different search term or clear one of the filters.</p><button className="button button-outline button-small" onClick={()=>{setQuery("");setUniversity("All universities");setCountry("All countries");setField("All research fields");}}>Clear filters</button></div>}
    <p className="muted small" style={{marginTop:18}}>All profiles and reviews in this static demonstration are fictional sample data. They do not represent real academics, universities, or student experiences.</p>
  </>;
}
