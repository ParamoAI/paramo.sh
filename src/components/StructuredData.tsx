import Head from 'next/head';

import { CALENDLY_URL, OG_IMAGE, SITE_URL } from '@/config/site';
import { FAQ } from '@/site/data/home';
import { OFFERINGS } from '@/site/data/services';

/*
  Search data Google and AI assistants read but visitors do not see.
  It must describe the same business the pages do, so it is built from the
  site's own data: the five offerings on What we do, the founders, and the
  homepage FAQ. Update the pages and this follows.
*/

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Páramo',
  alternateName: 'Páramo AI',
  url: SITE_URL,
  logo: OG_IMAGE,
  description:
    'Páramo is an AI transformation partner for growing companies, based in the Twin Cities. We put AI to work inside your business and teach your team to run it.',
  areaServed: 'Minneapolis and St. Paul, Minnesota, United States',
  founder: [
    {
      '@type': 'Person',
      name: 'Dennis Morales',
      jobTitle: 'Co-founder and CEO',
      sameAs: ['https://www.linkedin.com/in/dennismorales21/'],
    },
    {
      '@type': 'Person',
      name: 'Adrian Morales',
      jobTitle: 'Co-founder and COO',
      sameAs: ['https://www.linkedin.com/in/adrian-morales2002/'],
    },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    url: CALENDLY_URL,
  },
  makesOffer: OFFERINGS.map((o) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: o.name,
      description: o.body,
      url: `${SITE_URL}/what-we-do/`,
    },
  })),
};

/* The homepage FAQ, exactly as it appears on the page. Only the homepage
   carries it, because only the homepage shows those questions. */
export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

export default function StructuredData() {
  return (
    <Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
    </Head>
  );
}
