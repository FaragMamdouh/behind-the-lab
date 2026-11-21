import { createClient } from "npm:@supabase/supabase-js@2";

const allowedOrigins = new Set([
  "https://faragmamdouh.github.io",
  "http://localhost:3000",
]);

const corsHeaders = (origin: string) => ({
  "Access-Control-Allow-Origin": origin,
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
});

const jsonResponse = (body: Record<string, unknown>, status: number, origin: string) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
  });

const allowedRoles = new Set(["Primary supervisor", "Co-supervisor", "Thesis advisor", "Other mentoring role"]);
const allowedDegrees = new Set(["Master's", "PhD"]);
const allowedRecommendations = new Set(["yes", "no", "unsure"]);
const allowedRatingKeys = new Set([
  "mentorship_guidance", "respect_treatment", "communication_availability",
  "feedback_quality", "work_life_balance", "research_independence",
  "career_development", "fairness_recognition", "expectations_organization",
]);

function cleanText(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}
function initials(name: string): string {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join("") || "?";
}
function makeSlug(name: string): string {
  const base = name.normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48) || "supervisor";
  return `${base}-${crypto.randomUUID().slice(0, 8)}`;
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin") ?? "";
  if (!allowedOrigins.has(origin)) return new Response("Origin not allowed", { status: 403 });
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders(origin) });
  if (req.method !== "POST") return jsonResponse({ error: "Method not allowed." }, 405, origin);

  try {
    const turnstileSecret = Deno.env.get("TURNSTILE_SECRET_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("REVIEW_SERVICE_ROLE_KEY");
    if (!turnstileSecret || !supabaseUrl || !serviceRoleKey) {
      console.error("Required server secrets are not configured.");
      return jsonResponse({ error: "Submissions are not configured yet. Please try again later." }, 503, origin);
    }

    const payload = await req.json();
    if (cleanText(payload.website, 200)) {
      return jsonResponse({ ok: true, message: "Submission received for review." }, 200, origin);
    }

    const token = cleanText(payload.turnstileToken, 2048);
    if (!token) return jsonResponse({ error: "Please complete the anti-spam check." }, 400, origin);

    const verificationResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: turnstileSecret, response: token }),
    });
    const verification = await verificationResponse.json();
    if (!verification.success || verification.hostname !== "faragmamdouh.github.io" || verification.action !== "submit_review") {
      return jsonResponse({ error: "The anti-spam check expired or could not be verified. Please try again." }, 400, origin);
    }

    const supervisorName = cleanText(payload.supervisorName, 180);
    const supervisorTitle = cleanText(payload.supervisorTitle, 120) || "Academic supervisor";
    const institution = cleanText(payload.institution, 180);
    const country = cleanText(payload.country, 100);
    const department = cleanText(payload.department, 180);
    const researchField = cleanText(payload.researchField, 120) || "Not specified";
    const degreeLevel = cleanText(payload.degreeLevel, 20);
    const relationship = cleanText(payload.relationship, 40);
    const title = cleanText(payload.title, 120);
    const body = cleanText(payload.body, 5000);
    const recommendation = cleanText(payload.recommendation, 10);
    const overallRating = Number(payload.overallRating);

    if (supervisorName.length < 2 || institution.length < 2 || country.length < 2 ||
        !allowedDegrees.has(degreeLevel) || !allowedRoles.has(relationship) ||
        title.length < 5 || body.length < 60 ||
        !allowedRecommendations.has(recommendation) ||
        !Number.isInteger(overallRating) || overallRating < 1 || overallRating > 5 ||
        payload.firstHandExperience !== true || payload.policyAccepted !== true) {
      return jsonResponse({ error: "Please check the required fields and confirm that this is your first-hand experience." }, 400, origin);
    }

    const rawRatings = payload.categoryRatings && typeof payload.categoryRatings === "object"
      ? payload.categoryRatings as Record<string, unknown> : {};
    const categoryRatings: Record<string, number | null> = {};
    for (const [key, value] of Object.entries(rawRatings)) {
      if (!allowedRatingKeys.has(key)) return jsonResponse({ error: "An unsupported rating category was submitted." }, 400, origin);
      if (value !== null && (!Number.isInteger(value) || Number(value) < 1 || Number(value) > 5)) {
        return jsonResponse({ error: "Category ratings must be from 1 to 5 or N/A." }, 400, origin);
      }
      categoryRatings[key] = value as number | null;
    }

    const admin = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const existing = await admin.from("supervisors").select("id,status")
      .ilike("name", supervisorName).ilike("institution", institution)
      .in("status", ["approved", "pending"]).limit(1).maybeSingle();

    if (existing.error) {
      console.error("Supervisor lookup failed:", existing.error.message);
      return jsonResponse({ error: "We could not save the submission. Please try again later." }, 500, origin);
    }

    let supervisorId = existing.data?.id as string | undefined;
    if (!supervisorId) {
      const created = await admin.from("supervisors").insert({
        slug: makeSlug(supervisorName), name: supervisorName, academic_title: supervisorTitle,
        institution, country, department, research_field: researchField,
        profile_initials: initials(supervisorName), status: "pending",
      }).select("id").single();
      if (created.error || !created.data) {
        console.error("Supervisor suggestion insert failed:", created.error?.message);
        return jsonResponse({ error: "We could not save the supervisor details. Please try again later." }, 500, origin);
      }
      supervisorId = created.data.id;
    }

    const inserted = await admin.from("supervisor_reviews").insert({
      supervisor_id: supervisorId, degree_level: degreeLevel, relationship, institution, department,
      supervision_period: "", category_ratings: categoryRatings,
      overall_rating: overallRating, title, body, recommendation, status: "pending",
    }).select("id").single();

    if (inserted.error || !inserted.data) {
      console.error("Review insert failed:", inserted.error?.message);
      return jsonResponse({ error: "We could not save the review. Please try again later." }, 500, origin);
    }

    return jsonResponse({
      ok: true,
      supervisorStatus: existing.data?.status ?? "pending",
      message: "Your experience has been received and is awaiting moderation.",
    }, 201, origin);
  } catch (error) {
    console.error("Unexpected submission error:", error);
    return jsonResponse({ error: "Something went wrong. Please try again later." }, 500, origin);
  }
});
