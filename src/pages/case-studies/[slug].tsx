import fs from 'fs';
import { GetStaticPaths, GetStaticProps } from 'next';
import path from 'path';

import { SITE_NAME } from '@/config/site';
import { caseStudies } from '@/data/case-studies';
import SeoHead from '@/site/components/SeoHead';
import { RESULTS } from '@/site/data/results';
import CaseStudyPage from '@/site/views/CaseStudyPage';

interface Props {
  slug: string;
  title: string;
  description: string;
  legacyHtml: string | null;
}

export default function CaseStudy({ slug, title, description, legacyHtml }: Props) {
  return (
    <>
      <SeoHead title={title} description={description} path={`/case-studies/${slug}/`} type="article" />
      <CaseStudyPage slug={slug} legacyHtml={legacyHtml} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: RESULTS.map((r) => ({ params: { slug: r.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = String(params?.slug);
  const result = RESULTS.find((r) => r.slug === slug);
  if (!result) return { notFound: true };

  // The seven stories already on paramo.sh keep their exact title and
  // description (SEARCH_CHECKLIST.md) and their published write-up.
  const legacy = caseStudies.find((c) => c.slug === slug);
  const file = path.join(process.cwd(), 'src/site/content/case-studies', `${slug}.html`);
  const legacyHtml = legacy && fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;

  return {
    props: {
      slug,
      title: legacy ? `${legacy.name}: ${legacy.stat.split('.')[0]} — ${SITE_NAME}` : `${result.seoTitle ?? result.client} | ${SITE_NAME}`,
      description: legacy ? legacy.title : result.seoDescription ?? result.description,
      legacyHtml,
    },
  };
};
