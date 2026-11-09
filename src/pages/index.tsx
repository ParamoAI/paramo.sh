import { faqSchema } from '@/components/StructuredData';
import { SITE_DESCRIPTION, SITE_NAME } from '@/config/site';
import SeoHead from '@/site/components/SeoHead';
import Home from '@/site/Home';

// Title changed on purpose by Dennis on 2026-11-08 (see SEARCH_CHECKLIST.md);
// the description is unchanged.
const pageTitle = `${SITE_NAME} | Preferred AI Transformation Partner for SMBs`;

export default function HomePage() {
  return (
    <>
      <SeoHead title={pageTitle} description={SITE_DESCRIPTION} path="/">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </SeoHead>
      <Home />
    </>
  );
}
