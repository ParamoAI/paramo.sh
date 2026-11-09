import Head from 'next/head';
import { useEffect } from 'react';

import { SITE_URL } from '@/config/site';

/*
  A forwarding page for an old address that no longer exists. GitHub Pages
  cannot send real redirects, so this does the next best thing: an instant
  meta refresh (which Google treats as a permanent redirect), a canonical
  pointing at the new page, a script fallback, and a plain link.
*/
export default function Redirect({ to }: { to: string }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);
  return (
    <>
      <Head>
        <title>Páramo</title>
        <meta httpEquiv="refresh" content={`0; url=${to}`} />
        <link rel="canonical" href={`${SITE_URL}${to}`} />
      </Head>
      <p style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
        This page has moved. <a href={to}>Continue to the new page</a>.
      </p>
    </>
  );
}
