import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { caseStudies, CaseStudy } from '@/data/case-studies';
import { SITE_URL, SITE_NAME, OG_IMAGE, CALENDLY_URL } from '@/config/site';

interface Props {
  study: CaseStudy;
  htmlContent: string | null;
}

export default function CaseStudyPage({ study, htmlContent }: Props) {
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
      <ScrollReveal />

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

      {htmlContent ? (
        <article className="case-content">
          <div className="container narrow" dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </article>
      ) : (
        <section className="article-content">
          <div className="container narrow">
            <p>
              <em>Full case study content coming soon.</em>
            </p>
            <p>
              Want to see similar results for your business? Book a discovery call to explore what&apos;s possible.
            </p>
          </div>
        </section>
      )}

      <section className="cta-section" style={{ padding: '4rem 2rem 6rem', borderTop: '1px solid rgba(168, 197, 184, 0.08)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Curious whether an agent could handle your toughest workflow?</h2>
          <p className="section-subtitle">Book a free discovery call. We&apos;ll look at your current operations and show you where an AI agent could take over.</p>
          <a 
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Book Your Discovery Call →
          </a>
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

  // Try to load HTML content from content files
  let htmlContent: string | null = null;
  const contentPath = path.join(process.cwd(), 'src', 'content', 'case-studies', `${study.slug}.html`);
  try {
    const raw = fs.readFileSync(contentPath, 'utf-8');
    // Strip outer <article> and <div class="container narrow"> wrappers
    // Strip outer <article> and <div class="container narrow"> wrappers
    htmlContent = raw
      .replace(/^<article[^>]*>[\s\S]*?<div[^>]*>/, '')
      .replace(/<\/div>\s*<\/article>\s*$/, '')
      .trim();
  } catch {
    // No content file — will show placeholder
  }

  return { props: { study, htmlContent } };
};
