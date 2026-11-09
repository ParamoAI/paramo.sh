import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import Masthead from '../components/Masthead'
import { BlurWords, Footer } from '../components/HomeSections'
import { CALENDLY_URL } from '../data/home'
import { AGENTS_PROCESS, CAIO_PROCESS, CONCIERGE_FIT, OFFERINGS, SERVICES_PAGE, STRATEGY_PROCESS, WORKSHOP_PROCESS } from '../data/services'
import { startScroll } from '../lib/scroll'

/*
  What we do, at /what-we-do/.

    1. Opener: the line and a one-sentence lede, over a slim band of ridges.
    2. The five core offerings as numbered rows: name and one-line promise
       on the left, what it is and what it includes on the right.
    3. "Not sure which one fits?" with Book a call, then the footer.

  No pricing on this page, by design. Descriptions are drafts to confirm.
*/

const ease = [0.22, 1, 0.36, 1] as const
const RISE = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
}
const wrap = 'mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12'
const display = 'font-display display-cut tracking-[-0.015em] text-pine'

/* A "+" toggle under an offering: closed by default, opens its detail. */
function Toggle({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="lg:col-span-12">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
        className="group inline-flex cursor-pointer items-center gap-3 text-left"
      >
        <span className="micro text-pine/80 transition-colors group-hover:text-pine">{title}</span>
        <span
          aria-hidden
          className={`flex h-8 w-8 items-center justify-center rounded-full border text-[15px] transition-all duration-300 ${
            open ? 'rotate-45 border-pine bg-pine text-mist' : 'border-pine/35 text-pine group-hover:border-pine'
          }`}
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease }}
            className="overflow-hidden"
          >
            <div className="pt-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* The five-step dropdown first built for the paid workshop, shared by every
   offering that explains how it runs. */
type Process = { title: string; steps: { n: string; title: string; body: string }[] }
function StepsToggle({ id, process }: { id: string; process: Process }) {
  return (
    <Toggle id={id} title={process.title}>
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {process.steps.map((st) => (
          <li key={st.n} className="border border-pine/20 bg-mist-raised/40 p-5">
            <div className="micro text-gold-deep">{st.n}</div>
            <h3 className={`${display} mt-2 text-[24px] leading-tight`}>{st.title}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-slate">{st.body}</p>
          </li>
        ))}
      </ol>
    </Toggle>
  )
}

function ConciergeFit() {
  return (
    <Toggle id="concierge-fit" title={CONCIERGE_FIT.title}>
      <div className="grid gap-8 border border-pine/20 bg-mist-raised/40 p-6 sm:p-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <p className="font-display text-[22px] leading-snug text-pine sm:text-[24px]">{CONCIERGE_FIT.intro}</p>
          <div className="mt-6 space-y-2 text-[14px] text-slate">
            {CONCIERGE_FIT.notFor.map((n) => (
              <p key={n.see}>
                {n.text} <span className="text-pine">See {n.see}.</span>
              </p>
            ))}
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="micro mb-4 text-slate/70">You will recognize yourself if</div>
          <ul className="space-y-3">
            {CONCIERGE_FIT.signs.map((x) => (
              <li key={x} className="flex gap-3 text-[15px] leading-relaxed text-slate">
                <span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-gold-deep" />
                {x}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Toggle>
  )
}

export default function WhatWeDoPage() {
  useEffect(() => startScroll(), [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-mist">
        <Masthead tone="light" current="/what-we-do/" />

        {/* 1. opener */}
        <header className={`${wrap} pt-40 pb-12 sm:pt-52`}>
          <motion.div {...RISE} transition={{ duration: 0.8, ease }} className="micro mb-5 text-slate/70">
            {SERVICES_PAGE.eyebrow}
          </motion.div>
          <h1 className={`${display} max-w-5xl text-[46px] leading-[1.03] sm:text-[76px] lg:text-[92px]`}>
            <BlurWords text={SERVICES_PAGE.title} />
          </h1>
          <motion.p {...RISE} transition={{ duration: 0.8, delay: 0.3, ease }} className="mt-6 max-w-xl text-[17px] leading-relaxed text-slate">
            {SERVICES_PAGE.lede}
          </motion.p>
        </header>

        <div aria-hidden className="relative">
          <img src="/assets/paramo/sky.webp" alt="" className="h-[22vh] min-h-[170px] w-full object-cover object-[center_68%]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-mist)_0%,transparent_22%,transparent_78%,var(--color-mist)_100%)]" />
        </div>

        <main>
          {/* 2. the offerings */}
          <section className={`${wrap} pt-14 pb-20 sm:pt-20 sm:pb-24`}>
            <ol className="border-t border-line">
              {OFFERINGS.map((o, i) => (
                <motion.li
                  key={o.name}
                  {...RISE}
                  transition={{ duration: 0.8, delay: Math.min(i, 3) * 0.05, ease }}
                  className="grid gap-6 border-b border-line py-12 sm:py-14 lg:grid-cols-12 lg:gap-16"
                >
                  <div className="lg:col-span-5">
                    <span className="font-display text-[24px] leading-none text-gold-deep">{o.numeral}</span>
                    <h2 className={`${display} mt-4 text-[38px] leading-[1.05] sm:text-[48px]`}>{o.name}</h2>
                    <p className="mt-3 font-display text-[20px] leading-snug text-pine/80 italic sm:text-[22px]">{o.short}</p>
                  </div>
                  <div className="lg:col-span-7 lg:pt-10">
                    <p className="text-[17px] leading-relaxed text-slate sm:text-[18px]">{o.body}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {o.includes.map((x) => (
                        <li key={x} className="rounded-full border border-pine/25 px-4 py-2 text-[13px] text-pine/85">
                          {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* the paid workshop's steps sit under Team AI Workshops, behind a toggle */}
                  {o.name === 'Team AI Workshops' && <StepsToggle id="workshop-process" process={WORKSHOP_PROCESS} />}
                  {o.name === 'AI Strategy' && <StepsToggle id="strategy-process" process={STRATEGY_PROCESS} />}
                  {o.name === 'Fractional Chief AI Officer' && <StepsToggle id="caio-process" process={CAIO_PROCESS} />}
                  {o.name === 'Managed Agents' && <StepsToggle id="agents-process" process={AGENTS_PROCESS} />}
                  {o.name === 'AI Concierge' && <ConciergeFit />}
                </motion.li>
              ))}
            </ol>
          </section>

          {/* 3. book a call */}
          <section className={`${wrap} pb-20`}>
            <motion.div
              {...RISE}
              transition={{ duration: 0.8, ease }}
              className="flex flex-col items-start gap-6 border border-pine/25 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10"
            >
              <div>
                <h2 className={`${display} text-[32px] leading-tight sm:text-[42px]`}>{SERVICES_PAGE.closing.title}</h2>
                <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-slate">{SERVICES_PAGE.closing.body}</p>
              </div>
              <a
                href={CALENDLY_URL}
                className="inline-flex h-[54px] shrink-0 items-center rounded-full bg-gold px-8 text-[15px] font-semibold text-pine transition-colors hover:bg-gold-soft"
              >
                {SERVICES_PAGE.closing.cta}
              </a>
            </motion.div>
          </section>
        </main>

        <Footer />
      </div>
    </MotionConfig>
  )
}
