import { useState, type MouseEvent } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import Masthead from '../components/Masthead'
import { Arrow, BlurWords, Eyebrow, Footer, wrap } from '../components/HomeSections'
import {
  FOR_WHO,
  GET,
  GUARANTEE,
  HERO,
  HOW,
  LOCATION,
  PRICE,
  QUESTIONS,
  RESERVE,
  RESERVE_EMAIL,
  RESERVE_URL,
  SESSION_DATE,
  TEAM,
} from '../data/sessions'

/*
  The paid AI working session, at /sessions/. A standalone landing page:
  not in the menu, and every word comes from data/sessions.ts so the page
  can later move to its own subdomain without a rewrite.

    1. Hero          5. Guarantee (bordered box)
    2. Who it is for 6. Who runs it
    3. How it works  7. Common questions
    4. What you get  8. Reserve
*/

const ease = [0.22, 1, 0.36, 1] as const
const RISE = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
}
const display = 'font-display display-cut tracking-[-0.015em] text-pine'
const h2 = `${display} text-[36px] leading-[1.06] sm:text-[52px]`
const body = 'text-[16px] leading-relaxed text-slate sm:text-[17px]'
const goldButton =
  'inline-flex h-[54px] items-center rounded-full bg-gold px-8 text-[15px] font-semibold text-pine shadow-[0_14px_30px_-14px_rgba(169,129,63,0.6)] transition-colors hover:bg-gold-soft'

/* Smooth scroll to a section on this page, honouring reduced motion. */
function jumpTo(id: string) {
  return (e: MouseEvent<HTMLAnchorElement>) => {
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
    history.replaceState(null, '', `#${id}`)
  }
}

/* Date, place and price, shown only once they are filled in. */
const details = [SESSION_DATE, LOCATION, PRICE].filter(Boolean)

function Hero() {
  const reserveProps = RESERVE_URL ? { href: RESERVE_URL } : { href: '#reserve', onClick: jumpTo('reserve') }
  return (
    <header className={`${wrap} pt-40 pb-20 sm:pt-52 sm:pb-28`}>
      <Eyebrow>{HERO.label}</Eyebrow>
      <h1 className={`${display} max-w-5xl text-balance text-[44px] leading-[1.03] sm:text-[72px] lg:text-[88px]`}>
        <BlurWords text={HERO.headline} />{' '}
        <em className="italic text-gold-deep">
          <BlurWords text={HERO.headlineEm} delay={0.25} />
        </em>
      </h1>
      <motion.p {...RISE} transition={{ duration: 0.8, delay: 0.3, ease }} className="mt-7 max-w-xl text-[18px] leading-relaxed text-pine/85 sm:text-[20px]">
        {HERO.lede}
      </motion.p>
      <motion.div {...RISE} transition={{ duration: 0.8, delay: 0.45, ease }} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
        <a {...reserveProps} className={goldButton}>
          {HERO.primary}
        </a>
        <a href="#how" onClick={jumpTo('how')} className="group inline-flex items-center gap-2 text-[15px] font-medium text-pine">
          <span className="border-b border-pine/30 pb-0.5 transition-colors group-hover:border-pine">{HERO.secondary}</span>
          <Arrow className="rotate-135 transition-transform group-hover:translate-y-0.5" />
        </a>
      </motion.div>
      {details.length > 0 && <p className="micro mt-8 text-slate/80">{details.join(' · ')}</p>}

      <motion.dl {...RISE} transition={{ duration: 0.8, delay: 0.55, ease }} className="mt-16 grid grid-cols-3 border-t border-line">
        {HERO.facts.map((f, i) => (
          <div key={f.label} className={`pt-6 pr-3 sm:pt-8 sm:pr-8 ${i > 0 ? 'border-l border-line pl-3 sm:pl-8' : ''}`}>
            <dt className="font-display text-[44px] leading-none text-pine sm:text-[64px]">{f.value}</dt>
            <dd className="mt-3 text-[13px] leading-snug text-slate sm:text-[15px]">{f.label}</dd>
          </div>
        ))}
      </motion.dl>
    </header>
  )
}

function ForWho() {
  return (
    <section className={`${wrap} pb-20 sm:pb-28`}>
      <div className="grid gap-10 border-t border-line pt-16 sm:pt-20 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Eyebrow>{FOR_WHO.label}</Eyebrow>
          <h2 className={h2}>
            <BlurWords text={FOR_WHO.heading} />
          </h2>
        </div>
        <motion.div {...RISE} transition={{ duration: 0.8, ease }} className="lg:col-span-6 lg:pt-12">
          <p className={body}>{FOR_WHO.body}</p>
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {FOR_WHO.tags.map((t) => (
              <li key={t} className="rounded-full border border-pine/25 px-4 py-2 text-[14px] text-pine">
                {t}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}

function How() {
  return (
    <section id="how" className={`${wrap} scroll-mt-24 pb-20 sm:pb-28`}>
      <div className="border-t border-line pt-16 sm:pt-20">
        <Eyebrow>{HOW.label}</Eyebrow>
        <h2 className={h2}>
          <BlurWords text={HOW.heading} />
        </h2>
        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {HOW.steps.map((s, i) => (
            <motion.li
              key={s.n}
              {...RISE}
              transition={{ duration: 0.8, delay: i * 0.1, ease }}
              className="border border-pine/25 p-7 sm:p-9"
            >
              <span className="font-display text-[26px] leading-none text-gold-deep">{s.n}</span>
              <h3 className={`${display} mt-6 text-[26px] leading-tight sm:text-[30px]`}>{s.title}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-slate">{s.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Get() {
  return (
    <section className={`${wrap} pb-20 sm:pb-28`}>
      <div className="grid gap-10 border-t border-line pt-16 sm:pt-20 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Eyebrow>{GET.label}</Eyebrow>
          <h2 className={h2}>
            <BlurWords text={GET.heading} />
          </h2>
        </div>
        <dl className="border-t border-line lg:col-span-7">
          {GET.items.map((item) => (
            <motion.div
              key={item.title}
              {...RISE}
              transition={{ duration: 0.8, ease }}
              className="grid gap-2 border-b border-line py-6 sm:grid-cols-[220px_1fr] sm:gap-8"
            >
              <dt className="font-display text-[22px] leading-snug text-pine">{item.title}</dt>
              <dd className="text-[16px] leading-relaxed text-slate">{item.body}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Guarantee() {
  return (
    <section className={`${wrap} pb-20 sm:pb-28`}>
      <motion.div {...RISE} transition={{ duration: 0.8, ease }} className="border border-pine/40 bg-mist-raised/50 p-8 sm:p-14">
        <Eyebrow>{GUARANTEE.label}</Eyebrow>
        <h2 className={`${h2} max-w-3xl`}>{GUARANTEE.heading}</h2>
        <p className={`${body} mt-6 max-w-2xl`}>{GUARANTEE.body}</p>
      </motion.div>
    </section>
  )
}

function Team() {
  return (
    <section className={`${wrap} pb-20 sm:pb-28`}>
      <div className="grid gap-10 border-t border-line pt-16 sm:pt-20 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Eyebrow>{TEAM.label}</Eyebrow>
          <h2 className={h2}>
            <BlurWords text={TEAM.heading} />
          </h2>
        </div>
        <motion.div {...RISE} transition={{ duration: 0.8, ease }} className="space-y-5 lg:col-span-6 lg:pt-12">
          {TEAM.body.map((p) => (
            <p key={p} className={body}>
              {p}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Questions() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className={`${wrap} pb-20 sm:pb-28`}>
      <div className="grid gap-10 border-t border-line pt-16 sm:pt-20 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Eyebrow>{QUESTIONS.label}</Eyebrow>
          <h2 className={h2}>{QUESTIONS.heading}</h2>
        </div>
        <div className="border-t border-line lg:col-span-8">
          {QUESTIONS.items.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q} className="border-b border-line">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-display text-[22px] leading-snug text-pine sm:text-[26px]">{item.q}</span>
                  <span
                    aria-hidden
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-[16px] transition-all duration-300 ${
                      isOpen ? 'rotate-45 border-pine bg-pine text-mist' : 'border-line text-slate'
                    }`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 text-[16px] leading-relaxed text-slate">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Reserve() {
  return (
    <section id="reserve" className={`${wrap} scroll-mt-24 pb-24 sm:pb-32`}>
      <div className="border-t border-line pt-16 sm:pt-20">
        <Eyebrow>{RESERVE.label}</Eyebrow>
        <h2 className={`${display} text-[44px] leading-[1.03] sm:text-[72px]`}>
          <BlurWords text={RESERVE.heading} />
        </h2>
        {details.length > 0 && <p className="micro mt-6 text-slate/80">{details.join(' · ')}</p>}
        {RESERVE_URL ? (
          <motion.div {...RISE} transition={{ duration: 0.8, ease }} className="mt-10">
            <a href={RESERVE_URL} className={goldButton}>
              {HERO.primary}
            </a>
          </motion.div>
        ) : (
          <motion.div {...RISE} transition={{ duration: 0.8, ease }}>
            <p className={`${body} mt-6 max-w-xl`}>{RESERVE.body}</p>
            <a
              href={`mailto:${RESERVE_EMAIL}`}
              className="mt-10 inline-block border-b border-pine/30 pb-1 font-display text-[30px] leading-tight break-all text-pine transition-colors hover:border-pine sm:text-[56px]"
            >
              {RESERVE_EMAIL}
            </a>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default function SessionsPage() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-mist">
        <Masthead tone="light" />
        <Hero />
        <main>
          <ForWho />
          <How />
          <Get />
          <Guarantee />
          <Team />
          <Questions />
          <Reserve />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
