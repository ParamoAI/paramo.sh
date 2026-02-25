import Head from 'next/head';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { blogPosts } from '@/data/blog-posts';
import { SITE_URL, SITE_NAME, OG_IMAGE } from '@/config/site';

const pageTitle = `Blog — ${SITE_NAME}`;
const pageDescription = 'Insights on AI automation, AI agents, and building smarter businesses. From the team at Páramo AI.';

export default function BlogIndex() {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={`${SITE_URL}/blog/`} />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/blog`} />
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
      <Nav activeLink="blog" />

      <section className="page-hero">
        <div className="container">
          <div className="page-tag animate-up">Blog</div>
          <h1 className="page-title animate-up delay-1">Insights</h1>
          <p className="page-subtitle animate-up delay-2">
            On AI automation, business workflows, and building smarter systems. From the team at Páramo AI.
          </p>
        </div>
      </section>

      <section className="blog-grid">
        <div className="container">
          <div className="blog-cards">
            {blogPosts.map((post) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`} 
                className="blog-card reveal"
              >
                <div className="blog-card-tag">{post.tag}</div>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <div className="blog-card-meta">
                  <span>📅 {post.date}</span>
                  <span>⏱ {post.readTime}</span>
                </div>
                <div className="blog-card-link">Read article →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
