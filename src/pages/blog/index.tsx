import { SITE_NAME } from '@/config/site';
import SeoHead from '@/site/components/SeoHead';
import BlogPage from '@/site/views/BlogPage';

// Title and description kept exactly as listed in SEARCH_CHECKLIST.md.
const pageTitle = `Blog — ${SITE_NAME}`;
const pageDescription = 'Insights on AI automation, AI agents, and building smarter businesses. From the team at Páramo AI.';

export default function BlogIndex() {
  return (
    <>
      <SeoHead title={pageTitle} description={pageDescription} path="/blog/" />
      <BlogPage />
    </>
  );
}
