import { useEffect, useMemo, useRef, useState } from 'react'
import {
  AnimatePresence,
  MotionConfig,
  animate,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import {
  AUDIENCE,
  BLOG,
  CALENDLY_URL,
  CLOSING,
  FOOTER,
  PARTNERS,
  PROBLEM,
  PROCESS,
  PROOF,
  SERVICES,
  FOOTER_INVITE,
} from '../data/home'
import { SHOW_EVENTS } from '../data/site'
import { clamp, onFrame } from '../lib/scroll'

/*
  Everything below the hero, drawn from the hero's own world.

  The hero is a hummingbird over misty Andean ridges; the rest of the page
  keeps climbing through that landscape instead of switching to a flat
  template. Techniques from the Scrolltide Tarn template, re-cut for Páramo:

  - A mist seam overlaps the hero's foot, so there is no hard edge between
    the photograph and the first section.
  - Headlines sharpen in word by word out of a blur, like fog clearing.
  - Contour lines traced from a ridge profile draw themselves on scroll,
    echoing the mountains (and the brand's own "contour" colour).
  - The process steps are joined by a hummingbird's flight path that inks
    itself as you scroll past.
  - Results opens in fog that clears onto a second photograph of the same
    ridges, the numbers set on glass over it.
  - The page closes back in the dawn ridges, so it ends where it began.

  Gold stays a highlighter: eyebrow rule, one italic clause, one button.
*/

export const ease = [0.22, 1, 0.36, 1] as const
export const RISE = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
}

export const wrap = 'mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12'
export const h2 = 'font-display text-[34px] leading-[1.08] tracking-[-0.01em] text-pine sm:text-[46px] lg:text-[58px]'

/* ── Shared pieces ───────────────────────────────────────────── */

/* Words sharpen in out of a blur, one after another (Tarn's BlurWords). */
export function BlurWords({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block whitespace-pre"
          initial={{ opacity: 0, filter: 'blur(12px)', y: 10 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, delay: delay + i * 0.06, ease }}
        >
          {w}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </span>
  )
}

export function Eyebrow({ children, index }: { children: string; index?: string }) {
  return (
    <motion.div
      {...RISE}
      transition={{ duration: 0.7, ease }}
      className="micro mb-5 flex items-center gap-2.5 text-slate/80"
    >
      <span className="h-px w-[18px] bg-gold-deep" />
      <span>{children}</span>
      {index && <span className="text-slate/40">{index}</span>}
    </motion.div>
  )
}

export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className={className}>
      <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function TextLink({ href, children }: { href: string; children: string }) {
  return (
    <a href={href} className="group inline-flex items-center gap-2 text-[15px] font-medium text-pine">
      <span className="border-b border-pine/30 pb-0.5 transition-colors group-hover:border-pine">{children}</span>
      <Arrow className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  )
}

/* Contour lines from a ridge profile: a sum of slow sines, offset downward a
   step at a time like the layered ridges in the hero photograph. Each line
   draws itself in once it scrolls into view. */
export function Contours({ lines = 6, seed = 1, className = '' }: { lines?: number; seed?: number; className?: string }) {
  const paths = useMemo(() => {
    const W = 1200
    const ph = [seed * 1.7, seed * 2.9, seed * 0.6]
    const ridge = (x: number, k: number) =>
      60 +
      Math.sin(x / 190 + ph[0]) * (34 - k * 3) +
      Math.sin(x / 83 + ph[1]) * (14 - k) +
      Math.sin(x / 41 + ph[2]) * 5
    return Array.from({ length: lines }, (_, k) => {
      const pts: [number, number][] = []
      for (let x = -20; x <= W + 20; x += 20) pts.push([x, ridge(x, k) + k * 22])
      let d = `M${pts[0][0]},${pts[0][1]}`
      for (let i = 1; i < pts.length - 1; i++) {
        const mx = (pts[i][0] + pts[i + 1][0]) / 2
        const my = (pts[i][1] + pts[i + 1][1]) / 2
        d += ` Q${pts[i][0]},${pts[i][1]} ${mx},${my}`
      }
      return d
    })
  }, [lines, seed])
  return (
    <svg viewBox={`0 0 1200 ${60 + lines * 22 + 60}`} preserveAspectRatio="none" className={className} aria-hidden>
      {paths.map((d, k) => (
        <motion.path
          key={k}
          d={d}
          fill="none"
          stroke={k === 0 ? 'rgba(24,35,30,0.24)' : 'rgba(24,35,30,0.1)'}
          strokeWidth={k === 0 ? 1.2 : 1}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 2.2, delay: k * 0.14, ease }}
        />
      ))}
    </svg>
  )
}

/* ── Mist seam: the hero dissolves into the page ─────────────── */
function Seam() {
  return (
    <div aria-hidden className="pointer-events-none relative z-[5] -mt-[26vh] h-[26vh]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mist/70 to-mist" />
      <div className="seam-fog pm-drift-slow" />
    </div>
  )
}

/* ── The problem ─────────────────────────────────────────────── */
function Problem() {
  return (
    <section className="relative">
      <Contours lines={7} seed={1} className="pointer-events-none absolute inset-x-0 top-6 h-[220px] w-full" />
      <div className={`${wrap} relative pt-40 pb-28 sm:pt-52 sm:pb-36`}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>{PROBLEM.eyebrow}</Eyebrow>
            <h2 className={h2}>
              <BlurWords text={PROBLEM.headline} />{' '}
              <em className="italic text-gold-deep">
                <BlurWords text={PROBLEM.headlineEm} delay={0.25} />
              </em>
            </h2>
            <motion.p {...RISE} transition={{ duration: 0.8, delay: 0.3, ease }} className="mt-6 max-w-sm text-[16px] leading-relaxed text-slate">
              {PROBLEM.lede}
            </motion.p>
          </div>
          <div className="lg:col-span-7">
            {PROBLEM.pains.map((p, i) => (
              <motion.div
                key={p.title}
                {...RISE}
                transition={{ duration: 0.7, delay: i * 0.1, ease }}
                className="grid gap-2 border-t border-line py-7 last:border-b sm:grid-cols-[56px_1fr] sm:gap-6"
              >
                <span className="micro pt-2 text-slate/40">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-[24px] leading-snug text-pine sm:text-[28px]">{p.title}</h3>
                  <p className="mt-2 max-w-md text-[15px] leading-relaxed text-slate/80">{p.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── What we do: two large rows, opened like a field guide ───── */
function Services() {
  const [open, setOpen] = useState<string>(SERVICES.items[0].id)
  return (
    <section className={`${wrap} pb-28 sm:pb-36`}>
      <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div className="max-w-xl">
          <Eyebrow>{SERVICES.eyebrow}</Eyebrow>
          <h2 className={h2}>
            <BlurWords text={SERVICES.headline} />
          </h2>
        </div>
        <motion.p {...RISE} transition={{ duration: 0.8, delay: 0.2, ease }} className="max-w-sm text-[15px] leading-relaxed text-slate lg:text-right">
          {SERVICES.lede}
        </motion.p>
      </div>

      <div className="border-t border-line">
        {SERVICES.items.map((s, i) => {
          const isOpen = open === s.id
          return (
            <motion.div key={s.id} {...RISE} transition={{ duration: 0.7, delay: i * 0.1, ease }} className="border-b border-line">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? '' : s.id)}
                className="group flex w-full cursor-pointer items-center justify-between gap-4 py-8 text-left sm:py-10"
              >
                <span className="flex items-baseline gap-5 sm:gap-10">
                  <span className="micro text-slate/40">{s.number}</span>
                  <span className="font-display text-[32px] leading-none text-pine transition-colors group-hover:text-gold-deep sm:text-[52px]">
                    {s.title}
                  </span>
                </span>
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-[18px] transition-all duration-300 ${
                    isOpen ? 'rotate-45 border-pine bg-pine text-mist' : 'border-line text-slate group-hover:border-slate/60'
                  }`}
                  aria-hidden
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
                    transition={{ duration: 0.45, ease }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-8 pb-10 sm:pl-[76px] lg:grid-cols-12 lg:gap-12">
                      <div className="space-y-5 lg:col-span-7">
                        <p className="text-[17px] leading-relaxed text-slate">{s.summary}</p>
                        <div className="flex flex-wrap gap-2">
                          {s.tags.map((t) => (
                            <span key={t} className="rounded-full border border-line px-3.5 py-1.5 text-[12px] text-pine/85">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ul className="space-y-2.5 lg:col-span-5">
                        {s.deliverables.map((d) => (
                          <li key={d} className="flex items-center gap-3 text-[14px] text-slate/85">
                            <span className="h-1 w-1 rounded-full bg-slate/50" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
      <div className="pt-8">
        <TextLink href={SERVICES.linkHref}>{SERVICES.linkLabel}</TextLink>
      </div>
    </section>
  )
}

/* ── Partners ────────────────────────────────────────────────── */
function Partners() {
  return (
    <section className={`${wrap} pb-28 sm:pb-36`}>
      <motion.div
        {...RISE}
        transition={{ duration: 0.8, ease }}
        className="flex flex-col items-center gap-6 py-6 sm:flex-row sm:justify-center sm:gap-14"
      >
        <span className="micro text-slate/60">{PARTNERS.label}</span>
        <div className="flex items-center gap-10 sm:gap-14">
          {PARTNERS.names.map((n) => (
            <span key={n} className="text-[22px] font-medium tracking-[-0.01em] text-pine/85 sm:text-[26px]">
              {n}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

/* ── How it works: a flight path inks itself across the steps ── */
function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] })
  const draw = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), { stiffness: 90, damping: 24 })
  // a gold point rides the head of the line, read off the path itself
  const pathRef = useRef<SVGPathElement>(null)
  const headRef = useRef<HTMLSpanElement>(null)
  useMotionValueEvent(draw, 'change', (v) => {
    const path = pathRef.current
    const head = headRef.current
    if (!path || !head) return
    const pt = path.getPointAtLength(path.getTotalLength() * clamp(v))
    head.style.left = `${(pt.x / 1000) * 100}%`
    head.style.top = `${(pt.y / 80) * 100}%`
    head.style.opacity = String(clamp(v * 4))
  })

  return (
    <section className={`${wrap} pb-28 sm:pb-36`}>
      <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Eyebrow index="/ 01 to 03">{PROCESS.eyebrow}</Eyebrow>
          <h2 className={`${h2} max-w-xl`}>
            <BlurWords text={PROCESS.headline} />
          </h2>
        </div>
        <motion.p {...RISE} transition={{ duration: 0.8, delay: 0.2, ease }} className="max-w-sm text-[15px] leading-relaxed text-slate">
          {PROCESS.lede}
        </motion.p>
      </div>

      <div ref={ref} className="relative">
        {/* flight path, desktop only: a looping curve across the three stops */}
        <div className="pointer-events-none absolute inset-x-0 -top-10 hidden h-24 md:block" aria-hidden>
          <svg viewBox="0 0 1000 80" preserveAspectRatio="none" className="h-full w-full">
            <path
              d="M0,60 C120,10 220,10 333,40 C440,70 520,0 666,34 C800,64 880,8 1000,30"
              fill="none"
              stroke="rgba(24,35,30,0.18)"
              strokeWidth="1"
              strokeDasharray="2 6"
              vectorEffect="non-scaling-stroke"
            />
            <motion.path
              ref={pathRef}
              d="M0,60 C120,10 220,10 333,40 C440,70 520,0 666,34 C800,64 880,8 1000,30"
              fill="none"
              stroke="#a9813f"
              strokeWidth="1.4"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: draw }}
            />
          </svg>
          <span
            ref={headRef}
            className="absolute -ml-1.5 -mt-1.5 h-3 w-3 rounded-full bg-gold-deep opacity-0 shadow-[0_0_14px_rgba(198,160,90,0.8)]"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {PROCESS.steps.map((s, i) => (
            <motion.div
              key={s.step}
              {...RISE}
              transition={{ duration: 0.7, delay: i * 0.12, ease }}
              className="group flex min-h-[320px] flex-col justify-between rounded-[24px] border border-line bg-mist-raised/70 p-7 backdrop-blur-sm transition-colors hover:border-slate/40"
            >
              <div className="flex items-center justify-between border-b border-line pb-4">
                <span className="font-display text-[30px] text-pine">{s.step}</span>
                <span className="h-2 w-2 rounded-full bg-line transition-colors group-hover:bg-gold-deep" />
              </div>
              <div className="py-6">
                <h3 className="font-display text-[30px] text-pine">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate/85">{s.body}</p>
              </div>
              <div className="flex items-center gap-2 border-t border-line pt-4 text-[13px] text-slate/70">
                <span className="h-1 w-1 rounded-full bg-slate/50" />
                {s.outcome}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Results: fog clears onto the ridges, numbers on glass ───── */
function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.6, ease, onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, to])
  return (
    <span ref={ref} className="tnum">
      {n}
      {suffix}
    </span>
  )
}

function Proof() {
  const section = useRef<HTMLElement>(null)
  const bg = useRef<HTMLDivElement>(null)
  const veil = useRef<HTMLDivElement>(null)

  // Tarn's Compare section: the veil thins and the plate settles as the
  // section comes up the screen
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (veil.current) veil.current.style.opacity = '0'
      return
    }
    return onFrame(() => {
      const el = section.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      if (r.bottom < 0 || r.top > vh) return
      const p = clamp((vh - r.top) / (vh * 0.9))
      if (veil.current) veil.current.style.opacity = String(1 - p)
      if (bg.current)
        bg.current.style.transform = `translate3d(0, ${(1 - p) * 60 - clamp(-r.top / vh) * 60}px, 0) scale(${1.14 - p * 0.08})`
    })
  }, [])

  return (
    <section ref={section} className="relative overflow-hidden py-32 sm:py-44">
      <div ref={bg} className="absolute inset-0 will-change-transform">
        <img src="/assets/paramo/rays.webp" alt="" className="h-full w-full object-cover" />
      </div>
      {/* keep the copy legible and feather the plate into the pine above and below */}
      <div className="absolute inset-0 bg-gradient-to-b from-mist via-mist/10 to-mist" />
      <div ref={veil} className="pointer-events-none absolute inset-0 bg-mist" />

      <div className={`${wrap} relative`}>
        <div className="mb-14 sm:mb-20">
          <Eyebrow>{PROOF.eyebrow}</Eyebrow>
          <h2 className={`${h2} max-w-2xl`}>
            <BlurWords text={PROOF.headline} />
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {PROOF.stats.map((s, i) => (
            <motion.a
              key={s.who}
              href={s.href}
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, delay: 0.15 + i * 0.15, ease }}
              className="group flex flex-col justify-between gap-10 rounded-[24px] border border-white/25 bg-mist-raised/60 p-7 backdrop-blur-md transition-colors hover:border-white/60 sm:p-9"
            >
              <div>
                <div className="font-display text-[64px] leading-none tracking-[-0.02em] text-pine sm:text-[80px]">
                  <CountUp to={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-5 text-[15px] leading-relaxed text-pine/80">{s.label}</p>
              </div>
              <div className="flex items-center justify-between text-[13px] text-slate/70">
                <span>{s.who}</span>
                <Arrow className="text-slate/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </motion.a>
          ))}
        </div>
        <div className="mt-10">
          <TextLink href={PROOF.linkHref}>{PROOF.linkLabel}</TextLink>
        </div>
      </div>
    </section>
  )
}

/* ── Who it's for ────────────────────────────────────────────── */
function Audience() {
  return (
    <section className="relative">
      <div className={`${wrap} relative pt-10 pb-28 sm:pt-12 sm:pb-36`}>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Eyebrow>{AUDIENCE.eyebrow}</Eyebrow>
            <h2 className={h2}>
              <BlurWords text={AUDIENCE.headline} />{' '}
              <em className="italic text-gold-deep">
                <BlurWords text={AUDIENCE.headlineEm} delay={0.3} />
              </em>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:pt-14">
            <motion.p {...RISE} transition={{ duration: 0.8, ease }} className="max-w-md text-[17px] leading-relaxed text-slate">
              {AUDIENCE.lede}
            </motion.p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {AUDIENCE.trades.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.04, ease }}
                  className="rounded-full border border-line px-4 py-2 text-[14px] text-pine/85"
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Contours lines={5} seed={3} className="pointer-events-none h-[160px] w-full" />
    </section>
  )
}

/* ── From the blog ───────────────────────────────────────────── */
function Blog() {
  return (
    <section className={`${wrap} pt-16 pb-28 sm:pb-36`}>
      <div className="mb-10 flex flex-col justify-between gap-6 sm:mb-14 md:flex-row md:items-end">
        <div>
          <Eyebrow>{BLOG.eyebrow}</Eyebrow>
          <h2 className={h2}>
            <BlurWords text={BLOG.headline} />
          </h2>
        </div>
        <TextLink href={BLOG.linkHref}>{BLOG.linkLabel}</TextLink>
      </div>
      <div className="grid md:grid-cols-3">
        {BLOG.posts.map((p, i) => (
          <motion.a
            key={p.slug}
            href={`/blog/${p.slug}/`}
            {...RISE}
            transition={{ duration: 0.7, delay: i * 0.1, ease }}
            className="group flex min-h-[240px] flex-col justify-between border-t border-line py-8 transition-colors md:border-l md:border-t-0 md:px-8 md:first:border-l-0 md:first:pl-0"
          >
            <span className="micro text-slate/60">{p.tag}</span>
            <h3 className="my-6 font-display text-[24px] leading-snug text-pine transition-colors group-hover:text-gold-deep">
              {p.title}
            </h3>
            <div className="flex items-center justify-between text-[13px] text-slate/60">
              <span>
                {p.date} · {p.readTime}
              </span>
              <Arrow className="text-slate/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}

/* ── Closing: back to the dawn ridges ─────────────────────── */
export function Closing() {
  const section = useRef<HTMLElement>(null)
  const plate = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    return onFrame(() => {
      const el = section.current
      if (!el || !plate.current) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      if (r.bottom < 0 || r.top > vh) return
      const p = clamp((vh - r.top) / (vh + r.height))
      plate.current.style.transform = `translate3d(0, ${(0.5 - p) * 90}px, 0) scale(1.08)`
    })
  }, [])

  return (
    <section ref={section} className="relative overflow-hidden">
      <div ref={plate} className="absolute inset-0 will-change-transform">
        <img src="/assets/paramo/sky.webp" alt="" className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-mist via-mist/5 to-mist" />
      <div className="seam-fog seam-fog-low pm-drift" aria-hidden />

      <div className={`${wrap} relative grid min-h-[92vh] items-center gap-6 py-32 lg:grid-cols-12`}>
        <div className="relative lg:col-span-7">
          {/* a soft haze so the copy holds over the darker ridges */}
          <div aria-hidden className="pointer-events-none absolute -inset-x-24 -inset-y-20 bg-[radial-gradient(closest-side,rgba(189,193,174,0.85),rgba(189,193,174,0.5)_50%,transparent)]" />
          <h2 className="relative font-display text-[48px] leading-[1.02] tracking-[-0.02em] text-pine sm:text-[72px] lg:text-[96px]">
            <BlurWords text={CLOSING.headline} />{' '}
            <em className="italic text-gold-deep">
              <BlurWords text={CLOSING.headlineEm} delay={0.2} />
            </em>
          </h2>
          <motion.p {...RISE} transition={{ duration: 0.8, delay: 0.3, ease }} className="relative mt-7 max-w-lg text-[17px] leading-relaxed text-pine/85">
            {CLOSING.lede}
          </motion.p>
          <motion.a
            {...RISE}
            transition={{ duration: 0.8, delay: 0.45, ease }}
            href={CALENDLY_URL}
            className="relative mt-10 inline-flex h-[54px] items-center rounded-full bg-gold px-8 text-[15px] font-semibold text-pine shadow-[0_14px_30px_-14px_rgba(169,129,63,0.6)] transition-colors hover:bg-gold-soft"
          >
            {CLOSING.cta}
          </motion.a>
        </div>
      </div>
    </section>
  )
}

/* `invite` adds the "Have more questions? Book a call." line above the links;
   the homepage uses it in place of a separate closing section. */
export function Footer({ invite = false }: { invite?: boolean }) {
  return (
    <footer className={`${wrap} pb-12`}>
      {invite && (
        <div className="flex flex-col items-start gap-6 border-t border-line pt-14 pb-14 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display display-cut text-[34px] leading-tight tracking-[-0.015em] text-pine sm:text-[48px]">
            {FOOTER_INVITE.title}
          </h2>
          <a
            href={CALENDLY_URL}
            className="inline-flex h-[54px] shrink-0 items-center rounded-full bg-gold px-8 text-[15px] font-semibold text-pine transition-colors hover:bg-gold-soft"
          >
            {FOOTER_INVITE.cta}
          </a>
        </div>
      )}
      <div className="flex flex-col gap-10 border-t border-line pt-12 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="font-display text-[28px] text-pine">Páramo</div>
          <p className="mt-2 max-w-xs text-[14px] leading-relaxed text-slate/70">
            AI for growing companies, built around how your teams work.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
          {FOOTER.nav.filter((l) => SHOW_EVENTS || l.href !== '/events/').map((l) => (
            <a key={l.label} href={l.href} className="text-[14px] text-slate/80 transition-colors hover:text-pine">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex gap-6">
          {FOOTER.social.map((l) => (
            <a key={l.label} href={l.href} className="text-[14px] text-slate/80 transition-colors hover:text-pine">
              {l.label}
            </a>
          ))}
        </div>
      </div>
      <nav aria-label="Services" className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-8">
        {FOOTER.services.map((l) => (
          <a key={l.href} href={l.href} className="text-[13px] text-slate/70 transition-colors hover:text-pine">
            {l.label}
          </a>
        ))}
      </nav>
      <p className="mt-10 text-[12px] text-slate/45">{FOOTER.legal}</p>
    </footer>
  )
}

export default function HomeSections() {
  return (
    <MotionConfig reducedMotion="user">
      <Seam />
      <main className="relative bg-mist">
        <Problem />
        <Services />
        <Partners />
        <Process />
        <Proof />
        <Audience />
        <Blog />
        <Closing />
      </main>
      <div className="bg-mist pt-4">
        <Footer />
      </div>
    </MotionConfig>
  )
}
