import { useEffect } from 'react'
import { MotionConfig, motion } from 'motion/react'
import Masthead from '../components/Masthead'
import { Arrow, BlurWords, Footer, RISE, ease, wrap } from '../components/HomeSections'
import { CALENDLY_URL } from '../data/home'
import { POSTS } from '../data/blog'
import { startScroll } from '../lib/scroll'

/*
  One article, at /blog/{slug}/ (the live site's addresses, kept).

  The article text is the published post from src/data/blog-posts.ts,
  unchanged. Only the frame around it is new: the What we do style opener,
  the article in the sage page's type, a Book a call box, then three more
  posts and the footer.
*/

const display = 'font-display display-cut tracking-[-0.015em] text-pine'

type Article = {
  slug: string
  title: string
  description: string
  tag: string
  date: string
  readTime: string
  author: string
  contentHtml: string | null
}

export default function BlogPostPage({ post }: { post: Article }) {
  useEffect(() => startScroll(), [])
  // the display title (no em dashes) when there is one; the page title tag keeps the original
  const shown = POSTS.find((p) => p.slug === post.slug)
  const more = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-mist">
        <Masthead tone="light" current="/blog/" />

        <header className={`${wrap} pt-40 pb-12 sm:pt-52`}>
          <motion.a
            {...RISE}
            transition={{ duration: 0.8, ease }}
            href="/blog/"
            className="micro mb-8 inline-block text-slate/70 transition-colors hover:text-pine"
          >
            ← All posts
          </motion.a>
          <motion.div {...RISE} transition={{ duration: 0.8, ease }} className="micro mb-5 text-slate/70">
            {post.tag} · {post.date} · {post.readTime}
          </motion.div>
          <h1 className={`${display} max-w-5xl text-[40px] leading-[1.06] sm:text-[60px] lg:text-[68px]`}>
            <BlurWords text={shown?.title ?? post.title} />
          </h1>
          <motion.p {...RISE} transition={{ duration: 0.8, delay: 0.3, ease }} className="mt-6 max-w-2xl text-[18px] leading-relaxed text-slate">
            {shown?.description ?? post.description}
          </motion.p>
        </header>

        <div aria-hidden className="relative">
          <img src="/assets/paramo/sky.webp" alt="" className="h-[18vh] min-h-[140px] w-full object-cover object-[center_68%]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-mist)_0%,transparent_22%,transparent_78%,var(--color-mist)_100%)]" />
        </div>

        <main>
          <section className={`${wrap} pt-14 pb-16 sm:pt-20`}>
            <div className="max-w-3xl">
              {post.contentHtml ? (
                <div className="case-body" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
              ) : (
                <div className="case-body">
                  <p>
                    <em>The full article is on its way.</em> In the meantime, book a call and we will walk you through it.
                  </p>
                </div>
              )}
            </div>
          </section>

          <section className={`${wrap} pb-20`}>
            <motion.div
              {...RISE}
              transition={{ duration: 0.8, ease }}
              className="flex flex-col items-start gap-6 border border-pine/25 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10"
            >
              <h2 className={`${display} text-[30px] leading-tight sm:text-[38px]`}>Rather talk it through?</h2>
              <a
                href={CALENDLY_URL}
                className="inline-flex h-[52px] shrink-0 items-center rounded-full bg-gold px-7 text-[15px] font-semibold text-pine transition-colors hover:bg-gold-soft"
              >
                Book a call
              </a>
            </motion.div>

            <div className="mt-16">
              <div className="micro mb-6 text-slate/70">Keep reading</div>
              <div className="grid gap-8 border-t border-line pt-8 md:grid-cols-3">
                {more.map((p) => (
                  <a key={p.slug} href={`/blog/${p.slug}/`} className="group block">
                    <div className="micro text-slate/60">{p.tag}</div>
                    <h3 className={`${display} mt-3 text-[24px] leading-snug transition-colors group-hover:text-gold-deep`}>{p.title}</h3>
                    <span className="mt-4 inline-flex items-center gap-2 text-[14px] font-medium text-pine">
                      Read <Arrow className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </MotionConfig>
  )
}
