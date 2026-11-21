import { notFound } from "next/navigation";
import { sampleSupervisors } from "@/data/supervisors";
import { SupervisorProfile } from "@/components/SupervisorProfile";

export const dynamicParams = false;

export function generateStaticParams() {
  return sampleSupervisors.map((supervisor) => ({ slug: supervisor.slug }));
}

export default async function SupervisorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supervisor = sampleSupervisors.find((item) => item.slug === slug);
  if (!supervisor) notFound();
  return <SupervisorProfile supervisor={supervisor} />;
}
