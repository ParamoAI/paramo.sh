import Head from 'next/head';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { caseStudies } from '@/data/case-studies';
import { SITE_URL, SITE_NAME, OG_IMAGE, CALENDLY_URL } from '@/config/site';

const pageTitle = `Case Studies — ${SITE_NAME}`;
const pageDescription = 'See how businesses transform with custom AI automation. Real clients, real results.';

export default function CaseStudiesIndex() {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={`${SITE_URL}/case-studies/`} />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/case-studies`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Head>

      <ScrollReveal />
      <Nav activeLink="case-studies" />

      <section className="page-hero">
        <div className="container">
          <div className="page-tag animate-up">Case Studies</div>
          <h1 className="page-title animate-up delay-1">
            Real results from<br />real clients
          </h1>
          <p className="page-subtitle animate-up delay-2">
            See how businesses are using custom AI automation to do more with less — and why they never look back.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="cases-grid">
            {caseStudies.map((study, index) => (
              <Link 
                key={study.slug} 
                href={`/case-studies/${study.slug}`} 
                className={`case-card animate-up delay-${Math.min(index + 1, 4)}`}
              >
                <div className="case-industry">
                  {study.industryEmoji} {study.industry}
                </div>
                <div className="case-stat">{study.stat}</div>
                <div className="case-title">{study.title}</div>
                <div className="case-meta">
                  <div className="case-avatar">{study.avatar}</div>
                  <div>
                    <div className="case-meta-name">{study.name}</div>
                    <div className="case-meta-role">{study.role}</div>
                  </div>
                  <div className="case-arrow">→</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '2rem 0 6rem', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ 
            fontFamily: 'var(--font-display)', 
            fontWeight: 700, 
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', 
            color: 'var(--peak-snow)', 
            marginBottom: '1rem' 
          }}>
            Ready to see what AI can do for your business?
          </h2>
          <p style={{ 
            color: 'var(--morning-mist)', 
            marginBottom: '2rem', 
            maxWidth: '480px', 
            marginLeft: 'auto', 
            marginRight: 'auto' 
          }}>
            Book a free discovery call. We'll map your workflows and show you what's possible.
          </p>
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
