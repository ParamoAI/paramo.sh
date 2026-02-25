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
          </div>
          <h1 className="article-title">{post.title}</h1>
          <p className="article-subtitle">{post.description}</p>
        </div>
      </section>

      <section className="article-content">
        <div className="container narrow">
          <p>
            <em>Full article content coming soon. This page is a placeholder for the NextJS migration.</em>
          </p>
          <p>
            In the meantime, book a discovery call to learn more about how we can help automate your business.
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
