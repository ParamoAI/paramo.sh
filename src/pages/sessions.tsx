import SeoHead from '@/site/components/SeoHead';
import SessionsPage from '@/site/views/SessionsPage';
import { SEO } from '@/site/data/sessions';

// Landing page for the paid AI working session. Not in the menu yet.
export default function Sessions() {
  return (
    <>
      <SeoHead title={SEO.title} description={SEO.description} path={SEO.path} />
      <SessionsPage />
    </>
  );
}
