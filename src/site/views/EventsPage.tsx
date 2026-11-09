import { useEffect } from 'react'
import { MotionConfig, motion } from 'motion/react'
import Masthead from '../components/Masthead'
import { BlurWords, Footer } from '../components/HomeSections'
import { CALENDLY_URL } from '../data/home'
import { CITY_EVENTS, EVENTS_HEADER, EVENT_PHOTOS, LUNCH_AND_LEARNS, PAST_EVENTS, type Slot } from '../data/events'
import { startScroll } from '../lib/scroll'

/*
  Events, at /events/.

    1. Opener like What we do, over a slim band of ridges.
    2. AI for Business: one card per city, each with its next event.
    3. Lunch and learns: what they are, the next one, and an invitation
       to host one.
    4. Photos from past events.
    5. Past events, newest first. Then the footer.
*/

const ease = [0.22, 1, 0.36, 1] as const
const RISE = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' } }
const wrap = 'mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12'
const display = 'font-display display-cut tracking-[-0.015em] text-pine'

function Eyebrow({ children }: { children: string }) {
  return <div className="micro mb-5 text-slate/70">{children}</div>
}

function Copy({ slot, className = '' }: { slot: Slot; className?: string }) {
  if (slot.placeholder)
    return (
      <p className={`border border-dashed border-slate/40 px-4 py-3 text-[14px] leading-relaxed text-slate/70 italic ${className}`}>
        <span className="micro not-italic text-gold-deep">To add · </span>
        {slot.text}
      </p>
    )
  return <p className={`text-[16px] leading-relaxed text-slate ${className}`}>{slot.text}</p>
}

function Pending({ children }: { children: string }) {
  return (
    <span className="inline-flex h-[48px] items-center rounded-full border border-dashed border-slate/50 px-6 text-[14px] text-slate/70 italic">
      {children}
    </span>
  )
}

export default function EventsPage() {
  useEffect(() => startScroll(), [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-mist">
        <Masthead tone="light" current="/events/" />

        {/* 1. opener */}
        <header className={`${wrap} pt-40 pb-12 sm:pt-52`}>
          <motion.div {...RISE} transition={{ duration: 0.8, ease }}>
            <Eyebrow>{EVENTS_HEADER.eyebrow}</Eyebrow>
          </motion.div>
          <h1 className={`${display} max-w-5xl text-[46px] leading-[1.03] sm:text-[76px] lg:text-[92px]`}>
            <BlurWords text={EVENTS_HEADER.title} />
          </h1>
          <motion.p {...RISE} transition={{ duration: 0.8, delay: 0.3, ease }} className="mt-6 max-w-xl text-[17px] leading-relaxed text-slate">
            {EVENTS_HEADER.lede}
          </motion.p>
        </header>

        <div aria-hidden className="relative">
          <img src="/assets/paramo/sky.webp" alt="" className="h-[22vh] min-h-[170px] w-full object-cover object-[center_68%]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-mist)_0%,transparent_22%,transparent_78%,var(--color-mist)_100%)]" />
        </div>

        <main>
          {/* 2. AI for Business, by city */}
          <section className={`${wrap} pt-14 pb-20 sm:pt-20`}>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <motion.div {...RISE} transition={{ duration: 0.8, ease }} className="lg:col-span-5">
                <Eyebrow>{CITY_EVENTS.eyebrow}</Eyebrow>
                <h2 className={`${display} text-[38px] leading-[1.06] sm:text-[52px]`}>{CITY_EVENTS.title}</h2>
                <p className="mt-5 max-w-md text-[16px] leading-relaxed text-slate sm:text-[17px]">{CITY_EVENTS.body}</p>
              </motion.div>
              <div className="grid gap-5 lg:col-span-7">
                {CITY_EVENTS.cities.map((c, i) => (
                  <motion.article
                    key={c.city}
                    {...RISE}
                    transition={{ duration: 0.8, delay: i * 0.1, ease }}
                    className="border border-pine/25 p-7 sm:p-9"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <h3 className={`${display} text-[34px] leading-none sm:text-[42px]`}>{c.city}</h3>
                      <span className="micro text-slate/60">{c.domain}</span>
                    </div>
                    <Copy slot={c.next} className="mt-5" />
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Pending>Save a seat · Eventbrite link to add</Pending>
                    </div>
                  </motion.article>
                ))}
                <p className="text-[14px] text-slate/70 italic">More cities to come.</p>
              </div>
            </div>
          </section>

          {/* 3. lunch and learns */}
          <section className={`${wrap} pb-20`}>
            <div className="grid gap-10 border-t border-line pt-16 lg:grid-cols-12 lg:gap-16 sm:pt-20">
              <motion.div {...RISE} transition={{ duration: 0.8, ease }} className="lg:col-span-5">
                <Eyebrow>{LUNCH_AND_LEARNS.eyebrow}</Eyebrow>
                <h2 className={`${display} text-[38px] leading-[1.06] sm:text-[52px]`}>{LUNCH_AND_LEARNS.title}</h2>
                <p className="mt-5 max-w-md text-[16px] leading-relaxed text-slate sm:text-[17px]">{LUNCH_AND_LEARNS.body}</p>
              </motion.div>
              <motion.div {...RISE} transition={{ duration: 0.8, delay: 0.1, ease }} className="space-y-5 lg:col-span-7">
                <div className="border border-pine/25 p-7 sm:p-9">
                  <Copy slot={LUNCH_AND_LEARNS.next} />
                  <div className="mt-6">
                    <Pending>Save a seat · sign-up link to add</Pending>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-5 border border-pine/25 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
                  <h3 className={`${display} text-[26px] leading-tight sm:text-[30px]`}>{LUNCH_AND_LEARNS.host.title}</h3>
                  <a
                    href={CALENDLY_URL}
                    className="inline-flex h-[50px] shrink-0 items-center rounded-full bg-gold px-7 text-[15px] font-semibold text-pine transition-colors hover:bg-gold-soft"
                  >
                    {LUNCH_AND_LEARNS.host.cta}
                  </a>
                </div>
              </motion.div>
            </div>
          </section>

          {/* 4. photos */}
          <section className={`${wrap} pb-20`}>
            <motion.div {...RISE} transition={{ duration: 0.8, ease }}>
              <Eyebrow>From past events</Eyebrow>
              <div className="grid auto-rows-[160px] grid-cols-2 gap-3 md:auto-rows-[200px] md:grid-cols-4">
                {EVENT_PHOTOS.map((ph, i) => (
                  <div key={ph.src} className={`overflow-hidden ${i === 0 ? 'col-span-2 row-span-2' : ''}`}>
                    <img
                      src={ph.src}
                      alt={ph.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                      style={{ objectPosition: ph.position }}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* 5. past events */}
          <section className={`${wrap} pb-24`}>
            <motion.div {...RISE} transition={{ duration: 0.8, ease }} className="mb-8">
              <Eyebrow>{PAST_EVENTS.eyebrow}</Eyebrow>
              <h2 className={`${display} text-[34px] leading-[1.08] sm:text-[44px]`}>{PAST_EVENTS.title}</h2>
            </motion.div>
            <ol className="border-t border-line">
              {PAST_EVENTS.items.map((e) => (
                <li key={e.date + e.place} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[180px_200px_1fr] sm:gap-8">
                  <span className="text-[14px] text-slate/80">{e.date}</span>
                  <span className="micro self-center text-gold-deep">{e.kind}</span>
                  <span className="font-display text-[20px] text-pine">{e.place}</span>
                </li>
              ))}
            </ol>
          </section>
        </main>

        <Footer />
      </div>
    </MotionConfig>
  )
}
