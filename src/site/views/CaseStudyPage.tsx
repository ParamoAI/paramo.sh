import { useEffect } from 'react'
import { MotionConfig, motion } from 'motion/react'
import Masthead from '../components/Masthead'
import { Arrow, BlurWords, Footer, RISE, ease, wrap } from '../components/HomeSections'
import { CALENDLY_URL } from '../data/home'
import { RESULTS, type Result } from '../data/results'
import { SHOW_DRAFTS } from '../data/site'
import { startScroll } from '../lib/scroll'

/*
  One result, at /case-studies/{slug}/ (the live site's addresses, kept).

    1. Opener like What we do: industry and client, the headline, the
       description, and the key number.
    2. The full story. New stories are written in src/data/results.ts; the
       original seven reuse the write-ups already on paramo.sh.
    3. A video testimonial, when there is one.
    4. Book a call, then the next story.
*/

const display = 'font-display display-cut tracking-[-0.015em] text-pine'


function Story({ r, legacyHtml }: { r: Result; legacyHtml?: string | null }) {
  if (r.body)
    return (
      <div className="space-y-14">
        {r.body.map((sec) => (
          <motion.section key={sec.heading} {...RISE} transition={{ duration: 0.8, ease }}>
            <h2 className={`${display} text-[30px] leading-tight sm:text-[36px]`}>{sec.heading}</h2>
            {sec.steps && (
              <ol className="mt-6 space-y-3">
                {sec.steps.map((st, i) => (
                  <li key={st} className="grid grid-cols-[40px_1fr] gap-3 border-t border-line pt-3 text-[16px] leading-relaxed text-slate">
                    <span className="font-display text-[20px] text-gold-deep">{String(i + 1).padStart(2, '0')}</span>
                    {st}
                  </li>
                ))}
              </ol>
            )}
            {sec.paragraphs?.map((p) => (
              <p key={p} className="mt-5 text-[17px] leading-relaxed text-slate">
                {p}
              </p>
            ))}
            {sec.list && (
              <ul className="mt-5 space-y-3">
                {sec.list.map((x) => (
                  <li key={x} className="flex gap-3 text-[17px] leading-relaxed text-slate">
                    <span aria-hidden className="mt-[11px] h-1 w-1 shrink-0 rounded-full bg-gold-deep" />
                    {x}
                  </li>
                ))}
              </ul>
            )}
          </motion.section>
        ))}
        {r.quote && (
          <motion.blockquote {...RISE} transition={{ duration: 0.8, ease }} className="border-l-2 border-gold-deep pl-6">
            <p className="font-display text-[28px] leading-snug text-pine italic sm:text-[34px]">“{r.quote}”</p>
            <footer className="mt-3 text-[14px] text-slate/80">{r.client}</footer>
          </motion.blockquote>
        )}
      </div>
    )
  const html = legacyHtml
  return html ? <div className="case-body" dangerouslySetInnerHTML={{ __html: html }} /> : null
}

export default function CaseStudyPage({ slug, legacyHtml }: { slug: string; legacyHtml?: string | null }) {
  useEffect(() => startScroll(), [])
  const i = RESULTS.findIndex((x) => x.slug === slug)
  const r = RESULTS[i]
  if (!r) return null
  const next = RESULTS[(i + 1) % RESULTS.length]

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-mist">
        <Masthead tone="light" current="/case-studies/" />

        {/* 1. opener */}
        <header className={`${wrap} pt-40 pb-12 sm:pt-52`}>
          <motion.a
            {...RISE}
            transition={{ duration: 0.8, ease }}
            href="/case-studies/"
            className="micro mb-8 inline-block text-slate/70 transition-colors hover:text-pine"
          >
            ← All results
          </motion.a>
          <motion.div {...RISE} transition={{ duration: 0.8, ease }} className="micro mb-5 text-slate/70">
            {r.category} · {r.client} · {r.place}
          </motion.div>
          <h1 className={`${display} max-w-5xl text-[40px] leading-[1.06] sm:text-[60px] lg:text-[72px]`}>
            <BlurWords text={r.headline} />
          </h1>
          <motion.p {...RISE} transition={{ duration: 0.8, delay: 0.3, ease }} className="mt-6 max-w-2xl text-[18px] leading-relaxed text-slate">
            {r.description}
          </motion.p>
          <motion.div {...RISE} transition={{ duration: 0.8, delay: 0.45, ease }} className="mt-10 flex flex-wrap items-end gap-x-6 gap-y-2 border-t border-line pt-6">
            <span className="display-cut font-display text-[56px] leading-none tracking-[-0.02em] text-pine sm:text-[72px]">{r.stat}</span>
            <span className="max-w-xs pb-2 text-[15px] leading-snug text-pine/85">{r.statLabel}</span>
          </motion.div>
        </header>

        <div aria-hidden className="relative">
          <img src="/assets/paramo/sky.webp" alt="" className="h-[22vh] min-h-[170px] w-full object-cover object-[center_68%]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-mist)_0%,transparent_22%,transparent_78%,var(--color-mist)_100%)]" />
        </div>

        <main>
          {/* 2. the story */}
          <section className={`${wrap} pt-14 pb-16 sm:pt-20`}>
            <div className="max-w-3xl">
              <Story r={r} legacyHtml={legacyHtml} />
            </div>
          </section>

          {/* 3. video testimonial, when there is one */}
          {r.video && (SHOW_DRAFTS || !r.video.placeholder) && (
            <section className={`${wrap} pb-16`}>
              <div className="micro mb-5 text-slate/70">In their words</div>
              <div className="flex aspect-video max-w-4xl items-center justify-center border border-dashed border-slate/40 bg-mist-raised/40 p-6 text-center">
                <p className="text-[14px] text-slate/70 italic">
                  <span className="micro not-italic text-gold-deep">To add · </span>
                  {r.video.text}
                </p>
              </div>
            </section>
          )}

          {/* 4. book a call, then the next story */}
          <section className={`${wrap} pb-20`}>
            <motion.div
              {...RISE}
              transition={{ duration: 0.8, ease }}
              className="flex flex-col items-start gap-6 border border-pine/25 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10"
            >
              <h2 className={`${display} text-[30px] leading-tight sm:text-[38px]`}>Want results like these?</h2>
              <a
                href={CALENDLY_URL}
                className="inline-flex h-[52px] shrink-0 items-center rounded-full bg-gold px-7 text-[15px] font-semibold text-pine transition-colors hover:bg-gold-soft"
              >
                Book a call
              </a>
            </motion.div>

            <a href={`/case-studies/${next.slug}/`} className="group mt-12 block border-t border-line pt-8">
              <div className="micro text-slate/70">Next story · {next.client}</div>
              <div className="mt-3 flex items-start justify-between gap-6">
                <span className={`${display} max-w-3xl text-[26px] leading-snug transition-colors group-hover:text-gold-deep sm:text-[32px]`}>
                  {next.headline}
                </span>
                <Arrow className="mt-3 shrink-0 text-slate/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </a>
          </section>
        </main>

        <Footer />
      </div>
    </MotionConfig>
  )
}
