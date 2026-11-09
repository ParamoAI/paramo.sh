import { useEffect } from 'react'
import { MotionConfig, motion } from 'motion/react'
import Masthead from '../components/Masthead'
import { Arrow, BlurWords, Footer } from '../components/HomeSections'
import { CALENDLY_URL } from '../data/home'
import { BLOG_PAGE, POSTS } from '../data/blog'
import { startScroll } from '../lib/scroll'

/*
  The blog list, at /blog/ (the live site's address, kept for search).

  Direction A, an editorial index on the sage page:
    1. A short opener, not a hero: title, one line, a slim band of ridges.
    2. The newest post as a wide featured split.
    3. Every other post as a numbered row, like a magazine's contents.
    4. A compact invitation, then the footer.
  Calm and fast to scan, and it still works at thirty posts.
*/

const ease = [0.22, 1, 0.36, 1] as const
const RISE = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
}
const wrap = 'mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12'
const display = 'font-display display-cut tracking-[-0.015em] text-pine'
const NUMERALS = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x']

export default function BlogPage() {
  useEffect(() => startScroll(), [])
  const [featured, ...rest] = POSTS

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-mist">
        <Masthead tone="light" current="/blog/" />

        {/* 1. opener */}
        <header className={`${wrap} pt-40 pb-12 sm:pt-48`}>
          <motion.div {...RISE} transition={{ duration: 0.8, ease }} className="micro mb-5 text-slate/70">
            {BLOG_PAGE.eyebrow}
          </motion.div>
          <h1 className={`${display} text-[48px] leading-[1.02] sm:text-[76px] lg:text-[96px]`}>
            <BlurWords text={BLOG_PAGE.title} />
          </h1>
          
        </header>

        <div aria-hidden className="relative">
          <motion.img
            src="/assets/paramo/sky.webp"
            alt=""
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease }}
            className="h-[22vh] min-h-[170px] w-full object-cover object-[center_68%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-mist)_0%,transparent_22%,transparent_78%,var(--color-mist)_100%)]" />
        </div>

        <main>
          {/* 2. the newest post, featured */}
          <section className={`${wrap} pt-14 pb-16 sm:pt-20 sm:pb-20`}>
            <motion.a
              href={`/blog/${featured.slug}/`}
              {...RISE}
              transition={{ duration: 0.9, ease }}
              className="group grid gap-8 border-b border-line pb-14 lg:grid-cols-12 lg:gap-16"
            >
              <div className="lg:col-span-7">
                <div className="micro mb-5 text-gold-deep">Latest</div>
                <h2 className={`${display} text-[36px] leading-[1.06] transition-colors group-hover:text-gold-deep sm:text-[48px] lg:text-[56px]`}>
                  {featured.title}
                </h2>
              </div>
              <div className="flex flex-col justify-end lg:col-span-5">
                <p className="micro text-slate/70">
                  {featured.tag} · {featured.date} · {featured.readTime}
                </p>
                <p className="mt-4 text-[16px] leading-relaxed text-slate sm:text-[17px]">{featured.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-pine">
                  <span className="border-b border-pine/30 pb-0.5 group-hover:border-pine">Read the article</span>
                  <Arrow className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </motion.a>
          </section>

          {/* 3. everything else, as a numbered contents list */}
          <section className={`${wrap} pb-24 sm:pb-28`}>
            <motion.div {...RISE} transition={{ duration: 0.7, ease }} className="micro mb-6 text-slate/70">
              All notes
            </motion.div>
            <ol className="border-t border-line">
              {rest.map((p, i) => (
                <motion.li key={p.slug} {...RISE} transition={{ duration: 0.7, delay: Math.min(i, 4) * 0.06, ease }} className="border-b border-line">
                  <a
                    href={`/blog/${p.slug}/`}
                    className="group grid gap-3 py-8 sm:grid-cols-[56px_1fr_220px] sm:items-baseline sm:gap-8 sm:py-10"
                  >
                    <span className="font-display text-[22px] leading-none text-gold-deep">{NUMERALS[i]}</span>
                    <span>
                      <span className="block font-display text-[26px] leading-snug text-pine transition-colors group-hover:text-gold-deep sm:text-[32px]">
                        {p.title}
                      </span>
                      <span className="mt-2 block max-w-2xl text-[15px] leading-relaxed text-slate">{p.description}</span>
                    </span>
                    <span className="flex items-center justify-between gap-4 text-[13px] text-slate/75 sm:flex-col sm:items-end sm:justify-start">
                      <span className="micro">{p.tag}</span>
                      <span>
                        {p.date} · {p.readTime}
                      </span>
                    </span>
                  </a>
                </motion.li>
              ))}
            </ol>
          </section>

          {/* 4. a compact invitation */}
          <section className={`${wrap} pb-20`}>
            <motion.div
              {...RISE}
              transition={{ duration: 0.8, ease }}
              className="flex flex-col items-start gap-6 border border-pine/25 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10"
            >
              <div>
                <h2 className={`${display} text-[30px] leading-tight sm:text-[38px]`}>
                  Rather talk it through? <em className="italic text-gold-deep">Book a call.</em>
                </h2>
                <p className="mt-2 text-[15px] text-slate">We will look at how your week runs and tell you plainly where AI would help.</p>
              </div>
              <a
                href={CALENDLY_URL}
                className="inline-flex h-[52px] shrink-0 items-center rounded-full bg-gold px-7 text-[15px] font-semibold text-pine transition-colors hover:bg-gold-soft"
              >
                Book a call
              </a>
            </motion.div>
          </section>
        </main>

        <Footer />
      </div>
    </MotionConfig>
  )
}
