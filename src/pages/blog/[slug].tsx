import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import ArticleView from '@/site/views/BlogPostPage';
import { blogPosts, BlogPost } from '@/data/blog-posts';
import { SITE_URL, SITE_NAME, OG_IMAGE } from '@/config/site';

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
      <ArticleView post={{ ...post, contentHtml: post.contentHtml ?? null }} />
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
