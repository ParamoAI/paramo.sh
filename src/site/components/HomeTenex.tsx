import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, animate, motion, useInView } from 'motion/react'
import {
  AUDIENCE,
  FAQ,
  FEEL,
  PARTNERS,
  PROCESS,
  PROOF,
  WHO,
} from '../data/home'
import { clamp, onFrame } from '../lib/scroll'
import { Arrow, BlurWords, Footer } from './HomeSections'

/*
  The homepage below the hero. The hummingbird hero is the promise; each
  section below moves the visitor along: that's my problem, here's what
  better feels like, here's how, here's proof, here's why it's safe, here's
  my next step. Section rhythm after tenex.co: dedicated sections, each
  built for its job, on one plain background.

    1. Partners: a band of ridges with the partner line, right after the
       hero, so trust lands in the first scroll.
    2. Who this is for: headline pinned left, four cards right.
    3. Feel the difference: a held screen where an illustrative week's
       tasks get handled one by one while the hours back count up.
    4. Our approach: the same split as 2, mirrored.
    5. Proof: three numbers and the gold ribbon.
    7. Questions leaders ask: a short FAQ.
    8. Meet us first: the free workshop invitation.
    Then the footer, which carries "Have more questions? Book a call."
*/

const ease = [0.22, 1, 0.36, 1] as const
const RISE = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
}
const wrap = 'mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12'
const display = 'font-display display-cut tracking-[-0.015em] text-pine'

function Eyebrow({ children }: { children: string }) {
  return <div className="micro mb-5 text-slate/70">{children}</div>
}

/* ── 2. Who this is for: pinned headline left, four cards right ─
   Copy word for word from the live homepage. Laid out as on the live
   site; the approach section below is mirrored so the two splits do not
   read as a repeat. */
function WhoThisIsFor() {
  return (
    <section className={`${wrap} pt-6 pb-20 sm:pt-10 sm:pb-24`}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <div className="lg:sticky lg:top-[16vh]">
            <Eyebrow>{WHO.eyebrow}</Eyebrow>
            <h2 className={`${display} text-[40px] leading-[1.06] sm:text-[52px] lg:text-[60px]`}>
              <BlurWords text={WHO.headline} />
            </h2>
            {WHO.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                {...RISE}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.12, ease }}
                className="mt-6 max-w-lg text-[16px] leading-relaxed text-slate sm:text-[17px]"
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>
        <div className="space-y-5 lg:col-span-6">
          {WHO.items.map((item) => (
            <motion.article
              key={item.numeral}
              {...RISE}
              transition={{ duration: 0.8, ease }}
              className="grid grid-cols-[44px_1fr] gap-4 border border-pine/25 p-7 sm:p-9"
            >
              <span className="font-display text-[26px] leading-none text-gold-deep">{item.numeral}</span>
              <div>
                <h3 className="text-[17px] font-semibold text-pine">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate">{item.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── 4. Our approach: mirrored, cards left, headline pinned right ─ */
const ICONS = [
  // Audit: a lens over the lines of a week
  <svg key="a" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden className="h-14 w-14">
    <path d="M10 14h26M10 22h20M10 30h24M10 38h14" />
    <circle cx="40" cy="38" r="11" />
    <path d="M48 46l8 8" strokeLinecap="round" />
  </svg>,
  // Optimize: three sliders, set
  <svg key="o" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden className="h-14 w-14">
    <path d="M12 16h40M12 32h40M12 48h40" />
    <circle cx="24" cy="16" r="4.5" fill="var(--color-mist)" />
    <circle cx="42" cy="32" r="4.5" fill="var(--color-mist)" />
    <circle cx="30" cy="48" r="4.5" fill="var(--color-mist)" />
  </svg>,
  // Automate: a loop that keeps running
  <svg key="u" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden className="h-14 w-14">
    <path d="M48 26a17 17 0 0 0-31-5M16 38a17 17 0 0 0 31 5" />
    <path d="M17 12v9h9M47 52v-9h-9" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="3" />
  </svg>,
]

function Approach() {
  return (
    <section className={`${wrap} pt-12 pb-16 sm:pt-16 sm:pb-20`}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:order-2 lg:col-span-5">
          <div className="lg:sticky lg:top-[22vh]">
            <Eyebrow>Our approach</Eyebrow>
            <h2 className={`${display} text-[40px] leading-[1.06] sm:text-[52px] lg:text-[60px]`}>
              <BlurWords text="Páramo takes the work that buries your week" />{' '}
              <em className="italic text-gold-deep">
                <BlurWords text="and hands it to AI." delay={0.3} />
              </em>
            </h2>
            <p className="mt-6 max-w-sm text-[16px] leading-relaxed text-slate">{PROCESS.lede}</p>
          </div>
        </div>
        <div className="space-y-5 lg:order-1 lg:col-span-7">
          {PROCESS.steps.map((s, i) => (
            <motion.article
              key={s.step}
              {...RISE}
              transition={{ duration: 0.8, ease }}
              className="group grid min-h-[300px] grid-cols-[1fr_auto] gap-6 border border-pine/25 p-7 transition-colors hover:border-pine/60 sm:p-9"
            >
              <div className="flex flex-col justify-between">
                <div>
                  <div className="micro text-slate/60">{s.step}</div>
                  <h3 className={`${display} mt-4 text-[36px] leading-none sm:text-[44px]`}>{s.title}</h3>
                  <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-slate">{s.body}</p>
                </div>
                <a href="/what-we-do/" className="mt-8 inline-flex items-center gap-2 text-[13px] font-medium text-pine">
                  {s.outcome} <Arrow />
                </a>
              </div>
              <div className="text-pine/70 transition-colors group-hover:text-gold-deep">{ICONS[i]}</div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── 1. Partners on the ridges (image break): one photograph, one line ────────────────── */
function ImageBreak() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })
  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.img
        loading="lazy"
        src="/assets/paramo/rays.webp"
        alt=""
        initial={{ scale: 1.12 }}
        animate={inView ? { scale: 1 } : undefined}
        transition={{ duration: 2.4, ease }}
        className="h-[34vh] min-h-[260px] w-full object-cover object-[center_72%]"
      />
      {/* feather the photo into the page above and below */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-mist)_0%,transparent_14%,transparent_84%,var(--color-mist)_100%)]" />
      {/* Partners set straight on the ridges, after Tenex's logo strip over its
          statue: large cream type with a soft shadow, no band behind it. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : undefined}
        transition={{ duration: 1.4, delay: 0.6, ease }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2"
        style={{ textShadow: '0 2px 18px rgba(24,35,30,0.55), 0 1px 3px rgba(24,35,30,0.4)' }}
      >
        <div className={`${wrap} flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-16`}>
          <span className="micro text-cream/90" style={{ fontSize: 'clamp(15px, 1.35vw, 19px)' }}>
            {PARTNERS.label}
          </span>
          <span className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 sm:gap-16">
            {PARTNERS.logos.map((l) => (
              <img key={l.name} src={l.src} alt={l.name} className={`${l.h} w-auto`} style={{ filter: 'drop-shadow(0 2px 14px rgba(24,35,30,0.45))' }} />
            ))}
          </span>
        </div>
      </motion.div>
    </section>
  )
}

/* ── 5. Proof band: partners, numbers, ribbon ────────────────── */
function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.8, ease, onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, to])
  return (
    <span ref={ref} className="tnum">
      {n}
      {suffix}
    </span>
  )
}

function ProofBand() {
  return (
    <section className="pt-10 pb-20 sm:pt-12 sm:pb-24">
      <div className={wrap}>

        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {PROOF.stats.map((s, i) => (
            <motion.a key={s.who} href={s.href} {...RISE} transition={{ duration: 0.8, delay: i * 0.12, ease }} className="group block">
              <div className={`${display} text-[72px] leading-none sm:text-[88px]`}>
                <CountUp to={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-slate">{s.label}</p>
              <p className="mt-4 flex items-center gap-2 text-[13px] text-slate/70">
                {s.who} <Arrow className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </p>
            </motion.a>
          ))}
        </div>
        <div className="mt-12">
          <a href={PROOF.linkHref} className="group inline-flex items-center gap-2 text-[15px] font-medium text-pine">
            <span className="border-b border-pine/30 pb-0.5 group-hover:border-pine">{PROOF.linkLabel}</span>
            <Arrow />
          </a>
        </div>
      </div>

      {/* the gold ribbon, tilted, carrying who it is for */}
      <div className="mt-16 -rotate-2 overflow-hidden bg-gold py-3.5" aria-label={`For ${AUDIENCE.trades.join(', ')}`}>
        <div className="ribbon flex w-max gap-10 whitespace-nowrap font-display text-[19px] italic text-pine" aria-hidden>
          {[0, 1].map((k) => (
            <span key={k} className="flex gap-10">
              {['Built for growing companies', ...AUDIENCE.trades].map((t) => (
                <span key={t} className="flex items-center gap-10">
                  {t}
                  <span className="text-pine/50">·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── 3. Feel the difference: the week, handled task by task ─────
   Held on screen (a pinned stage, after Tarn) while the visitor scrolls;
   each step crosses one task off and the hours back count up. */
function FeelTheDifference() {
  const ref = useRef<HTMLElement>(null)
  const [done, setDone] = useState(0)
  const n = FEEL.tasks.length
  const total = FEEL.tasks.reduce((t, x) => t + x.hours, 0)

  useEffect(
    () =>
      onFrame(() => {
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const travel = r.height - window.innerHeight
        if (travel <= 0) return
        const p = clamp(-r.top / travel)
        // the first stretch shows the untouched week, then one task per step
        const next = Math.min(n, Math.floor(p * (n + 1.4)))
        setDone((d) => (d === next ? d : next))
      }),
    [n],
  )

  const hours = FEEL.tasks.slice(0, done).reduce((t, x) => t + x.hours, 0)
  const allDone = done >= n

  return (
    <section ref={ref} className="relative" style={{ height: `${(n + 2) * 70}vh` }}>
      <div className="sticky top-0 flex h-[100svh] items-center">
        <div className={`${wrap} grid w-full gap-10 lg:grid-cols-12 lg:gap-16`}>
          <div className="lg:col-span-5">
            <Eyebrow>{FEEL.eyebrow}</Eyebrow>
            <h2 className={`${display} text-[38px] leading-[1.06] sm:text-[52px]`}>{FEEL.title}</h2>
            <div className="mt-10">
              <div className="micro text-slate/70">Hours back this week</div>
              <div className={`${display} mt-2 text-[88px] leading-none tnum sm:text-[112px]`}>
                <Counter value={hours} />
                <span className="text-[40px] text-slate/60 sm:text-[48px]"> / {total}</span>
              </div>
            </div>
            <AnimatePresence>
              {allDone && (
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease }}
                  className="mt-8 max-w-sm font-display text-[22px] leading-snug text-pine italic"
                >
                  {FEEL.done}
                </motion.p>
              )}
            </AnimatePresence>
            <p className="mt-8 text-[13px] text-slate/60">{FEEL.note}</p>
          </div>

          <ul className="space-y-3 lg:col-span-7">
            {FEEL.tasks.map((t, i) => {
              const handled = i < done
              return (
                <li
                  key={t.before}
                  className={`grid grid-cols-[1fr_auto] items-center gap-4 border p-5 transition-all duration-700 sm:p-6 ${
                    handled ? 'border-pine/15 bg-mist-raised/50' : 'border-pine/35'
                  }`}
                >
                  <div>
                    <p
                      className={`text-[17px] transition-colors duration-700 sm:text-[19px] ${
                        handled ? 'text-slate/50 line-through decoration-gold-deep/60' : 'font-medium text-pine'
                      }`}
                    >
                      {t.before}
                    </p>
                    <AnimatePresence>
                      {handled && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.5, ease }}
                          className="mt-1.5 overflow-hidden text-[14px] text-slate"
                        >
                          {t.after}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <span
                    className={`micro whitespace-nowrap transition-colors duration-700 ${handled ? 'text-gold-deep' : 'text-slate/40'}`}
                  >
                    {handled ? `+${t.hours} hrs` : 'Waiting'}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* Counts smoothly to each new value, so the hours tick up as tasks clear. */
function Counter({ value }: { value: number }) {
  const [shown, setShown] = useState(value)
  const from = useRef(value)
  useEffect(() => {
    const c = animate(from.current, value, {
      duration: 0.9,
      ease,
      onUpdate: (v) => {
        from.current = v
        setShown(v)
      },
    })
    return () => c.stop()
  }, [value])
  return <>{Number.isInteger(value) ? Math.round(shown) : shown.toFixed(1)}</>
}

/* ── 7. Questions leaders ask ─────────────────────────────────── */
function Questions() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className={`${wrap} pb-20 sm:pb-24`}>
      <div className="grid gap-10 border-t border-line pt-16 sm:pt-20 lg:grid-cols-12 lg:gap-16">
        <motion.div {...RISE} transition={{ duration: 0.8, ease }} className="lg:col-span-4">
          <Eyebrow>{FAQ.eyebrow}</Eyebrow>
          <h2 className={`${display} text-[38px] leading-[1.06] sm:text-[52px]`}>{FAQ.title}</h2>
        </motion.div>
        <div className="border-t border-line lg:col-span-8">
          {FAQ.items.map((item, i) => {
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
                      {'placeholder' in item && item.placeholder ? (
                        <p className="mb-6 border border-dashed border-slate/40 px-4 py-3 text-[14px] text-slate/70 italic">
                          <span className="micro not-italic text-gold-deep">To add · </span>
                          {item.a}
                        </p>
                      ) : (
                        <div className="max-w-2xl pb-6">
                          <p className="text-[16px] leading-relaxed text-slate">{item.a}</p>
                          {'sources' in item && item.sources && (
                            <p className="mt-3 text-[13px] text-slate/70">
                              Sources:{' '}
                              {item.sources.map((src, k) => (
                                <span key={src.href}>
                                  {k > 0 && ' · '}
                                  <a
                                    href={src.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="border-b border-pine/25 text-pine/80 hover:border-pine hover:text-pine"
                                  >
                                    {src.label}
                                  </a>
                                </span>
                              ))}
                            </p>
                          )}
                        </div>
                      )}
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

export default function HomeTenex() {
  return (
    <MotionConfig reducedMotion="user">
      {/* the hero's foot dissolves into the page's sage */}
      <div aria-hidden className="pointer-events-none relative z-[5] -mt-[26vh] h-[26vh] bg-gradient-to-b from-transparent via-mist/70 to-mist" />
      <main className="relative bg-mist">
        <ImageBreak />
        <WhoThisIsFor />
        <FeelTheDifference />
        <Approach />
        <ProofBand />
        <Questions />
      </main>
      <div className="bg-mist pt-12">
        <Footer invite />
      </div>
    </MotionConfig>
  )
}
