import { useEffect } from 'react'
import { MotionConfig, motion } from 'motion/react'
import Masthead from '../components/Masthead'
import { Arrow, BlurWords, Footer } from '../components/HomeSections'
import { CALENDLY_URL } from '../data/home'
import { HUMANITY, REASONS, VOICES, WHY_HEADER, WORKSHOPS, type Slot } from '../data/whyus'
import { SHOW_DRAFTS, SHOW_EVENTS } from '../data/site'
import { startScroll } from '../lib/scroll'

/*
  "Why us", at /why-us/. One story, top to bottom:

    1. Opener: the line, and one featured client video as the subject.
    2. Four reasons: headline pinned left, numbered cards right (the same
       split as "Who this is for" on the homepage).
    3. In their words: client videos, each linking to that client's result.
    4. A slim band of ridges.
    5. Free workshops: pick your city, see the next workshop, past photos.
    6. Beyond business: the belief that AI should scale humanity, and the
       dance events. Near the bottom on purpose: the warmest moment.
    7. Two ways forward: book a call, or come to a free event.

  Missing material renders as dashed "To add" notes so nothing unfinished
  can ship by accident.
*/

const ease = [0.22, 1, 0.36, 1] as const
const RISE = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
}
const wrap = 'mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12'
const display = 'font-display display-cut tracking-[-0.015em] text-pine'

function Eyebrow({ children }: { children: string }) {
  return <div className="micro mb-5 text-slate/70">{children}</div>
}

function Copy({ slot, className = '' }: { slot: Slot; className?: string }) {
  if (slot.placeholder && !SHOW_DRAFTS) return null
  if (slot.placeholder)
    return (
      <p className={`border border-dashed border-slate/40 px-4 py-3 text-[14px] leading-relaxed text-slate/70 italic ${className}`}>
        <span className="micro not-italic text-gold-deep">To add · </span>
        {slot.text}
      </p>
    )
  return <p className={`text-[16px] leading-relaxed text-slate sm:text-[17px] ${className}`}>{slot.text}</p>
}

/* A video slot: a still frame with a play button. The real clip opens large
   with captions on click; nothing plays on its own. */
function VideoSlot({ label, tall = false }: { label: string; tall?: boolean }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden border border-dashed border-slate/40 bg-mist-raised/50 ${
        tall ? 'aspect-[16/8]' : 'aspect-video'
      }`}
    >
      <div className="text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-pine/40 text-pine/70">
          <svg width="18" height="20" viewBox="0 0 18 20" aria-hidden>
            <path d="M2 1.5v17l14-8.5z" fill="currentColor" />
          </svg>
        </span>
        <p className="micro mt-4 text-slate/70">
          <span className="text-gold-deep">To add · </span>
          {label}
        </p>
      </div>
    </div>
  )
}

function PhotoSlot({ label }: { label: string }) {
  return (
    <div className="flex h-full min-h-[160px] items-center justify-center border border-dashed border-slate/40 bg-mist-raised/40">
      <p className="micro text-slate/60">{label}</p>
    </div>
  )
}

function Ridges() {
  return (
    <div aria-hidden className="relative">
      <img src="/assets/paramo/rays.webp" alt="" className="h-[26vh] min-h-[200px] w-full object-cover object-[center_72%]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-mist)_0%,transparent_22%,transparent_78%,var(--color-mist)_100%)]" />
    </div>
  )
}

export default function WhyUsPage() {
  useEffect(() => startScroll(), [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-mist">
        <Masthead tone="light" current="/why-us/" />

        {/* 1. opener: the line, then the featured video as the subject */}
        <header className={`${wrap} pt-40 pb-12 sm:pt-52`}>
          <motion.div {...RISE} transition={{ duration: 0.8, ease }}>
            <Eyebrow>{WHY_HEADER.eyebrow}</Eyebrow>
          </motion.div>
          <h1 className={`${display} max-w-5xl text-[48px] leading-[1.02] sm:text-[80px] lg:text-[100px]`}>
            <BlurWords text={WHY_HEADER.title} />
          </h1>
          {/* featured client video goes here once there is one (WHY_HEADER.video) */}
        </header>

        <main>
          {/* 2. reasons */}
          <section className={`${wrap} pt-8 pb-20 sm:pb-24`}>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-[18vh]">
                  <Eyebrow>{REASONS.eyebrow}</Eyebrow>
                  <h2 className={`${display} text-[40px] leading-[1.06] sm:text-[56px]`}>
                    <BlurWords text={REASONS.title} />
                  </h2>
                  {SHOW_DRAFTS && <p className="micro mt-6 text-gold-deep">Draft reasons for Dennis and Adrian to confirm</p>}
                </div>
              </div>
              <div className="space-y-5 lg:col-span-7">
                {REASONS.items.map((r) => (
                  <motion.article
                    key={r.numeral}
                    {...RISE}
                    transition={{ duration: 0.8, ease }}
                    className="grid grid-cols-[44px_1fr] gap-4 border border-pine/25 p-7 sm:p-9"
                  >
                    <span className="font-display text-[26px] leading-none text-gold-deep">{r.numeral}</span>
                    <div>
                      <h3 className={`${display} text-[28px] leading-tight sm:text-[34px]`}>{r.title}</h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-slate">{r.body}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          {/* 3. in their words */}
          {VOICES.show && (
          <section className={`${wrap} pb-20 sm:pb-24`}>
            <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <motion.div {...RISE} transition={{ duration: 0.8, ease }}>
                <Eyebrow>{VOICES.eyebrow}</Eyebrow>
                <h2 className={`${display} text-[40px] leading-[1.06] sm:text-[56px]`}>{VOICES.title}</h2>
              </motion.div>
              <a href="/case-studies/" className="group inline-flex items-center gap-2 text-[15px] font-medium text-pine">
                <span className="border-b border-pine/30 pb-0.5 group-hover:border-pine">See the results behind them</span>
                <Arrow />
              </a>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {VOICES.videos.map((v, i) => (
                <motion.div key={i} {...RISE} transition={{ duration: 0.8, delay: i * 0.1, ease }}>
                  <VideoSlot label="Client video" />
                  <p className="mt-4 font-display text-[22px] leading-snug text-pine/50 italic">“{v.quote}”</p>
                  <p className="mt-2 text-[13px] text-slate/60">
                    {v.who} · {v.place}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>
          )}

          <Ridges />

          {/* 5. events: a short invitation, the full list lives at /events/ */}
          {SHOW_EVENTS && (
          <section id="events" className={`${wrap} pt-16 pb-20 sm:pt-20 sm:pb-24`}>
            <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <motion.div {...RISE} transition={{ duration: 0.8, ease }}>
                <Eyebrow>Events</Eyebrow>
                <h2 className={`${display} max-w-2xl text-[40px] leading-[1.06] sm:text-[56px]`}>
                  <BlurWords text="Meet us in person first." />
                </h2>
                <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-slate sm:text-[17px]">
                  Free AI for Business events in the Twin Cities, and hands-on lunch and learns at coworking spaces around town.
                </p>
              </motion.div>
              <a
                href="/events/"
                className="inline-flex h-[52px] shrink-0 items-center gap-2 rounded-full border border-pine/40 px-6 text-[15px] font-medium text-pine transition-colors hover:border-pine hover:bg-pine hover:text-mist"
              >
                See all events <Arrow />
              </a>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {WORKSHOPS.photos.slice(0, 3).map((ph) => (
                <div key={ph.src} className="aspect-[4/3] overflow-hidden">
                  <img src={ph.src} alt={ph.alt} loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: ph.position }} />
                </div>
              ))}
            </div>
          </section>
          )}

          {/* 6. beyond business: humanity and the dance events */}
          <section className={`${wrap} pb-20 sm:pb-24`}>
            <div className="border-t border-line pt-16 sm:pt-20">
              <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                <div className={SHOW_DRAFTS ? 'lg:col-span-6' : 'lg:col-span-8'}>
                  <motion.div {...RISE} transition={{ duration: 0.8, ease }}>
                    <Eyebrow>{HUMANITY.eyebrow}</Eyebrow>
                  </motion.div>
                  <h2 className={`${display} text-[38px] leading-[1.08] sm:text-[52px]`}>
                    <BlurWords text={HUMANITY.title} />
                  </h2>
                  {SHOW_DRAFTS && <p className="micro mt-5 text-gold-deep">Draft line for Dennis and Adrian to confirm</p>}
                  <div className="mt-8 space-y-5">
                    {HUMANITY.body.map((b, i) => (
                      <motion.div key={i} {...RISE} transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease }}>
                        <Copy slot={b} />
                      </motion.div>
                    ))}
                    <Copy slot={HUMANITY.next} />
                  </div>
                </div>
                {/* dance event photos, once there are some */}
                {SHOW_DRAFTS && (
                <motion.div {...RISE} transition={{ duration: 0.9, delay: 0.15, ease }} className="grid auto-rows-[180px] grid-cols-2 gap-3 lg:col-span-6">
                  <div className="row-span-2">
                    <PhotoSlot label="Dance event photo to add" />
                  </div>
                  {Array.from({ length: HUMANITY.photos - 1 }, (_, i) => (
                    <PhotoSlot key={i} label="Dance event photo to add" />
                  ))}
                </motion.div>
                )}
              </div>
            </div>
          </section>

          {/* 7. two ways forward */}
          <section className={`${wrap} pb-20`}>
            <motion.div
              {...RISE}
              transition={{ duration: 0.8, ease }}
              className="flex flex-col items-start gap-6 border border-pine/25 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between"
            >
              <h2 className={`${display} text-[30px] leading-tight sm:text-[38px]`}>
                Ready when you are. <em className="italic text-gold-deep">Or come say hello first.</em>
              </h2>
              <div className="flex flex-wrap gap-3">
                <a
                  href={CALENDLY_URL}
                  className="inline-flex h-[52px] items-center rounded-full bg-gold px-7 text-[15px] font-semibold text-pine transition-colors hover:bg-gold-soft"
                >
                  Book a call
                </a>
                {SHOW_EVENTS && (
                <a
                  href="/events/"
                  className="inline-flex h-[52px] items-center gap-2 rounded-full border border-pine/40 px-6 text-[15px] font-medium text-pine transition-colors hover:border-pine"
                >
                  Find a free event near you <Arrow />
                </a>
                )}
              </div>
            </motion.div>
          </section>
        </main>

        <Footer />
      </div>
    </MotionConfig>
  )
}
