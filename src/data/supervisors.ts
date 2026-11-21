export type DegreeLevel = "Master's" | "PhD";
export type CategoryKey =
  | "mentorship_guidance"
  | "respect_treatment"
  | "communication_availability"
  | "feedback_quality"
  | "work_life_balance"
  | "research_independence"
  | "career_development"
  | "fairness_recognition"
  | "expectations_organization"
  | "overall_experience";

export const ratingCategories: { key: CategoryKey; label: string; help: string }[] = [
  { key: "mentorship_guidance", label: "Mentorship & guidance", help: "Academic and professional guidance" },
  { key: "respect_treatment", label: "Respect & treatment", help: "Dignity, respect, and psychological safety" },
  { key: "communication_availability", label: "Communication & availability", help: "Accessibility and responsiveness" },
  { key: "feedback_quality", label: "Feedback quality", help: "Constructive and timely feedback" },
  { key: "work_life_balance", label: "Work–life balance", help: "Respect for personal time and boundaries" },
  { key: "research_independence", label: "Research independence", help: "Support for independent scientific thinking" },
  { key: "career_development", label: "Career development", help: "Support for future career goals" },
  { key: "fairness_recognition", label: "Fairness & recognition", help: "Fair credit, authorship, and responsibilities" },
  { key: "expectations_organization", label: "Expectations & organization", help: "Clear milestones and responsibilities" },
  { key: "overall_experience", label: "Overall supervision experience", help: "Your overall experience as a student" },
];

export type DemoReview = {
  id: string;
  degree: DegreeLevel;
  title: string;
  body: string;
  date: string;
  overall: number;
  recommend: "yes" | "no" | "unsure";
  ratings: Partial<Record<CategoryKey, number | null>>;
};

export type Supervisor = {
  id: string;
  slug: string;
  name: string;
  title: string;
  university: string;
  country: string;
  department: string;
  field: string;
  interests: string[];
  institutionUrl: string;
  profileInitials: string;
  reviews: DemoReview[];
  sourceLabel: string;
  isSample: boolean;
  ratingAverage?: number;
  ratingCount?: number;
};

// Fictional examples only. They are not real academics, institutions, or student experiences.
export const sampleSupervisors: Supervisor[] = [
  {
    id: "sample-001", slug: "dr-alex-morgan", name: "Dr. Alex Morgan (Sample)", title: "Associate Professor",
    university: "Northbridge University (Sample)", country: "United Kingdom", department: "Molecular Biology",
    field: "Molecular & Cell Biology", interests: ["Cell signalling", "Single-cell biology", "Immunology"],
    institutionUrl: "https://example.edu", profileInitials: "AM", sourceLabel: "Fictional demonstration profile",
    isSample: true,
    reviews: [
      { id: "sample-r1", degree: "PhD", title: "A supportive environment to grow as a researcher", body: "This fictional example illustrates a positive review. The supervisor sets clear expectations, makes time for regular conversations, and encourages students to develop their own research questions. Feedback is direct and constructive.", date: "2026-09-12", overall: 5, recommend: "yes", ratings: { mentorship_guidance: 5, respect_treatment: 5, communication_availability: 4, feedback_quality: 5, work_life_balance: 4, research_independence: 5, career_development: 4, fairness_recognition: 5, expectations_organization: 5, overall_experience: 5 } },
      { id: "sample-r2", degree: "Master's", title: "Good mentorship, but meetings can be difficult to arrange", body: "A fictional mixed experience: day-to-day support was thoughtful, although getting time in a busy calendar sometimes required persistence. The written feedback was useful and detailed.", date: "2026-07-03", overall: 4, recommend: "yes", ratings: { mentorship_guidance: 4, respect_treatment: 5, communication_availability: 3, feedback_quality: 5, work_life_balance: 4, research_independence: 4, career_development: 4, fairness_recognition: 4, expectations_organization: 4, overall_experience: 4 } },
    ],
  },
  {
    id: "sample-002", slug: "prof-jamie-chen", name: "Prof. Jamie Chen (Sample)", title: "Professor",
    university: "Riverside Institute of Science (Sample)", country: "France", department: "Computational Medicine",
    field: "Computational Biology", interests: ["Spatial transcriptomics", "Machine learning", "Cancer biology"],
    institutionUrl: "https://example.org", profileInitials: "JC", sourceLabel: "Fictional demonstration profile",
    isSample: true,
    reviews: [
      { id: "sample-r3", degree: "PhD", title: "A lot of independence; structure varies by project", body: "This fictional example represents a mixed experience. Students may have substantial freedom to shape their work, but should clarify expectations and meeting frequency early in the project.", date: "2026-08-19", overall: 3, recommend: "unsure", ratings: { mentorship_guidance: 3, respect_treatment: 4, communication_availability: 3, feedback_quality: 3, work_life_balance: 4, research_independence: 5, career_development: 3, fairness_recognition: 4, expectations_organization: 2, overall_experience: 3 } },
    ],
  },
  {
    id: "sample-003", slug: "dr-samira-patel", name: "Dr. Samira Patel (Sample)", title: "Principal Investigator",
    university: "Westhaven Research Centre (Sample)", country: "Sweden", department: "Translational Immunology",
    field: "Immunology", interests: ["B-cell development", "Tissue immunology", "Multi-omics"],
    institutionUrl: "https://example.com", profileInitials: "SP", sourceLabel: "Fictional demonstration profile",
    isSample: true,
    reviews: [],
  },
];

export function averageRating(reviews: DemoReview[]): number {
  if (reviews.length) return reviews.reduce((sum, review) => sum + review.overall, 0) / reviews.length;
  return 0;
}

export function categoryAverage(reviews: DemoReview[], key: CategoryKey): number | null {
  const values = reviews.map((review) => review.ratings[key]).filter((value): value is number => typeof value === "number");
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null;
}
