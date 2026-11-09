import { GetStaticPaths, GetStaticProps } from 'next';

import { SITE_URL } from '@/config/site';
import SeoHead from '@/site/components/SeoHead';
import { SERVICE_PAGES, type ServicePage } from '@/site/data/servicePages';
import ServicePageView from '@/site/views/ServicePageView';

// One page per service, at /what-we-do/{slug}/ (new addresses).
export default function Service({ page }: { page: ServicePage }) {
  const url = `${SITE_URL}/what-we-do/${page.slug}/`;
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.title.replace(/\.$/, ''),
    description: page.seoDescription,
    url,
    areaServed: 'Minneapolis and St. Paul, Minnesota, United States',
    provider: { '@type': 'Organization', name: 'Páramo', url: SITE_URL },
  };
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  return (
    <>
      <SeoHead title={page.seoTitle} description={page.seoDescription} path={`/what-we-do/${page.slug}/`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      </SeoHead>
      <ServicePageView page={page} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: SERVICE_PAGES.map((p) => ({ params: { slug: p.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = SERVICE_PAGES.find((p) => p.slug === params?.slug);
  return page ? { props: { page } } : { notFound: true };
};
