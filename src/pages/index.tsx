import { faqSchema } from '@/components/StructuredData';
import { SITE_DESCRIPTION, SITE_NAME } from '@/config/site';
import SeoHead from '@/site/components/SeoHead';
import Home from '@/site/Home';

// Title and description kept exactly as listed in SEARCH_CHECKLIST.md.
const pageTitle = `${SITE_NAME} | AI systems for business owners`;

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
