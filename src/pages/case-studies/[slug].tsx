import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { caseStudies, CaseStudy } from '@/data/case-studies';
import { SITE_URL, SITE_NAME, OG_IMAGE, CALENDLY_URL } from '@/config/site';

interface Props {
  study: CaseStudy;
}

export default function CaseStudyPage({ study }: Props) {
  const pageTitle = `${study.name}: ${study.stat.split('.')[0]} — ${SITE_NAME}`;
  
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={study.title} />
        <link rel="canonical" href={`${SITE_URL}/case-studies/${study.slug}/`} />
        
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${SITE_URL}/case-studies/${study.slug}`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={study.title} />
        <meta property="og:image" content={OG_IMAGE} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={study.title} />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Head>

      <Nav activeLink="case-studies" />

      <section className="article-hero">
        <div className="container narrow">
          <Link href="/case-studies" className="article-back">
            ← Back to Case Studies
          </Link>
          <div className="article-meta">
            <span className="article-tag">{study.industryEmoji} {study.industry}</span>
          </div>
          <h1 className="article-title">{study.stat}</h1>
          <p className="article-subtitle">{study.title}</p>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem',
            marginTop: '2rem' 
          }}>
            <div className="case-avatar" style={{ background: 'var(--highland-moss)' }}>
              {study.avatar}
            </div>
            <div>
              <div style={{ fontWeight: 500, color: 'var(--cloud-layer)' }}>{study.name}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--misty-sage)' }}>{study.role}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="article-content">
        <div className="container narrow">
          <p>
            <em>Full case study content coming soon. This page is a placeholder for the NextJS migration.</em>
          </p>
          <p>
            Want to see similar results for your business? Book a discovery call to explore what's possible.
          </p>
          <p style={{ marginTop: '2rem' }}>
            <a 
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Book Your Discovery Call →
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = caseStudies.map((study) => ({
    params: { slug: study.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const study = caseStudies.find((s) => s.slug === params?.slug);

  if (!study) {
    return { notFound: true };
  }

  return { props: { study } };
};
