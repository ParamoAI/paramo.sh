import Head from 'next/head';

import { OG_IMAGE, SITE_URL } from '@/config/site';

/*
  The search tags every page carries: title, description, canonical address,
  and the social preview tags. Pages that existed before the redesign pass
  their exact title and description from SEARCH_CHECKLIST.md, so nothing a
  search engine has indexed changes by accident.
*/
export default function SeoHead({
  title,
  description,
  path,
  type = 'website',
  children,
}: {
  title: string;
  description: string;
  /* the page's address, with a trailing slash, e.g. '/case-studies/' */
  path: string;
  type?: 'website' | 'article';
  children?: React.ReactNode;
}) {
  const url = `${SITE_URL}${path}`;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      {children}
    </Head>
  );
}
