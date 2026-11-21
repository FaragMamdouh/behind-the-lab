export type LiveSupervisor = {
  id: string;
  slug: string;
  name: string;
  academic_title: string;
  institution: string;
  country: string;
  department: string;
  research_field: string;
  interests: string[];
  profile_initials: string;
};

export type LiveReview = {
  id: string;
  supervisor_id: string;
  degree_level: "Master's" | "PhD";
  overall_rating: number;
  title: string;
  body: string;
  recommendation: "yes" | "no" | "unsure";
  category_ratings: Record<string, number | null>;
  created_at: string;
};

export function backendConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

function apiHeaders(): HeadersInit {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return {
    apikey: key ?? "",
    Authorization: `Bearer ${key ?? ""}`,
    Accept: "application/json",
  };
}

async function getRows<T>(table: string, query: string): Promise<T[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return [];
  const response = await fetch(
    `${url}/rest/v1/${table}?${query}`,
    { headers: apiHeaders(), cache: "no-store" }
  );
  if (!response.ok) {
    console.error(`Public ${table} request failed:`, response.status);
    return [];
  }
  return await response.json() as T[];
}

export function getApprovedSupervisors(): Promise<LiveSupervisor[]> {
  return getRows<LiveSupervisor>(
    "supervisors",
    "select=id,slug,name,academic_title,institution,country,department,research_field,interests,profile_initials&status=eq.approved&order=name.asc"
  );
}

export function getPublishedReviews(supervisorId: string): Promise<LiveReview[]> {
  const query = new URLSearchParams({
    select: "id,supervisor_id,degree_level,overall_rating,title,body,recommendation,category_ratings,created_at",
    supervisor_id: `eq.${supervisorId}`,
    status: "eq.published",
    order: "created_at.desc",
  });
  return getRows<LiveReview>("supervisor_reviews", query.toString());
}

export function getFunctionUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return url ? `${url}/functions/v1/submit-review` : "";
}
