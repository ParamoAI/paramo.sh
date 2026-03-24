import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { blogPosts, BlogPost } from '@/data/blog-posts';
import { SITE_URL, SITE_NAME, OG_IMAGE, CALENDLY_URL } from '@/config/site';

interface Props {
  post: BlogPost;
}

export default function BlogPostPage({ post }: Props) {
  const pageTitle = `${post.title} — ${SITE_NAME}`;
  
  // Parse date for structured data (e.g. "Feb 20, 2026" → "2026-02-20")
  const dateObj = new Date(post.date);
  const isoDate = !isNaN(dateObj.getTime()) ? dateObj.toISOString().split('T')[0] : post.date;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "url": `${SITE_URL}/blog/${post.slug}/`,
    "datePublished": isoDate,
    "dateModified": isoDate,
    "author": {
      "@type": "Person",
      "name": post.author,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Páramo AI",
      "url": SITE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": OG_IMAGE,
      },
    },
    "image": OG_IMAGE,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}/`,
    },
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={`${SITE_URL}/blog/${post.slug}/`} />
        
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${SITE_URL}/blog/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={OG_IMAGE} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={OG_IMAGE} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
        />
      </Head>

      <Nav activeLink="blog" />

      <section className="article-hero">
        <div className="container narrow">
          <Link href="/blog" className="article-back">
            ← Back to Blog
          </Link>
          <div className="article-meta">
            <span className="article-tag">{post.tag}</span>
            <span>📅 {post.date}</span>
            <span>⏱ {post.readTime}</span>
            <span>✍️ {post.author}</span>
          </div>
          <h1 className="article-title">{post.title}</h1>
          <p className="article-subtitle">{post.description}</p>
        </div>
      </section>

      <section className="article-content">
        <div className="container narrow">
          {post.contentHtml ? (
            <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
          ) : (
            <>
              <p>
                <em>Full article content coming soon. This page is a placeholder for the NextJS migration.</em>
              </p>
              <p>
                In the meantime, book a discovery call to learn more about how we can help automate your business.
              </p>
            </>
          )}
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

      {/* Related Posts */}
      <section className="related-posts" style={{ padding: '4rem 2rem', borderTop: '1px solid rgba(168, 197, 184, 0.08)' }}>
        <div className="container narrow">
          <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--cloud-layer)' }}>Keep Reading</h2>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {blogPosts
              .filter(p => p.slug !== post.slug)
              .slice(0, 3)
              .map(p => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  style={{
                    display: 'block',
                    padding: '1.25rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(168, 197, 184, 0.12)',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <span className="article-tag" style={{ fontSize: '0.75rem', marginBottom: '0.5rem', display: 'inline-block' }}>{p.tag}</span>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--cloud-layer)', margin: '0.25rem 0' }}>{p.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--misty-sage)', margin: 0 }}>{p.description}</p>
                </Link>
              ))}
          </div>
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link href="/case-studies" className="btn-secondary" style={{ textDecoration: 'none' }}>
              View Our Case Studies →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = blogPosts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const post = blogPosts.find((p) => p.slug === params?.slug);

  if (!post) {
    return { notFound: true };
  }

  return { props: { post } };
};
