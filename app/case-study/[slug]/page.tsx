import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/data/caseStudies";
import CaseStudyView from "@/components/case-study/CaseStudyView";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({ slug: caseStudy.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) return {};

  return {
    title: caseStudy.title,
    description: caseStudy.subtitle,
    openGraph: {
      title: `${caseStudy.title} — Yiting Huang`,
      description: caseStudy.subtitle,
      images: [{ url: caseStudy.heroImage, width: 1000, height: 734 }],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) notFound();

  return <CaseStudyView caseStudy={caseStudy} />;
}
