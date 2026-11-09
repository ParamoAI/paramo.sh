import { SITE_NAME } from '@/config/site';
import SeoHead from '@/site/components/SeoHead';
import ResultsPage from '@/site/views/ResultsPage';

// Title and description kept exactly as listed in SEARCH_CHECKLIST.md.
const pageTitle = `Case Studies — ${SITE_NAME}`;
const pageDescription = 'See how businesses transform with custom AI automation. Real clients, real results.';

export default function CaseStudiesIndex() {
  return (
    <>
      <SeoHead title={pageTitle} description={pageDescription} path="/case-studies/" />
      <ResultsPage />
    </>
  );
}
