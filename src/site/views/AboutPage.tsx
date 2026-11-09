import { useEffect, type ReactNode } from 'react'
import { MotionConfig, motion } from 'motion/react'
import Masthead from '../components/Masthead'
import { BlurWords, Footer } from '../components/HomeSections'
import { CALENDLY_URL } from '../data/home'
import { FOUNDERS, NAME, type Slot } from '../data/about'
import { SHOW_DRAFTS } from '../data/site'
import { startScroll } from '../lib/scroll'

/*
  The about page, at /who-we-are/.

  Built from the same parts as the homepage, on the sage page:
    1. (Opener removed at Dennis's request: the page opens on the founders.)
    2. The founders: Dennis and Adrian side by side, photo, role, background.
    3. Our roots and the name: Colombia and the páramo as one story, pinned
       on the left while the process, told through the páramo (catch, shape,
       release), scrolls on the right.
    4. A compact invitation, then the footer.

  Founder copy is not written yet; those slots render as dashed notes.
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

/* Copy still to be written shows as an obvious note, never as finished text. */
function Copy({ slot, className = '' }: { slot: Slot; className?: string }) {
  if (slot.placeholder && !SHOW_DRAFTS) return null
  if (slot.placeholder)
    return (
      <p className={`border border-dashed border-slate/40 px-4 py-3 text-[14px] leading-relaxed text-slate/70 italic ${className}`}>
        <span className="micro not-italic text-gold-deep">To write · </span>
        {slot.text}
      </p>
    )
  return <p className={`text-[16px] leading-relaxed text-slate sm:text-[17px] ${className}`}>{slot.text}</p>
}

function Ridges({ src, height = 'h-[22vh] min-h-[170px]', position = 'object-[center_68%]' }: { src: string; height?: string; position?: string }) {
  return (
    <div aria-hidden className="relative">
      <motion.img
        src={src}
        alt=""
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease }}
        className={`${height} w-full object-cover ${position}`}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-mist)_0%,transparent_22%,transparent_78%,var(--color-mist)_100%)]" />
    </div>
  )
}

function Section({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`${wrap} ${className}`}>{children}</section>
}

export default function AboutPage() {
  useEffect(() => startScroll(), [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-mist">
        <Masthead tone="light" current="/who-we-are/" />


        <main>
          {/* 2. the founders */}
          <Section className="pt-40 pb-20 sm:pt-52 sm:pb-24">
            <motion.div {...RISE} transition={{ duration: 0.8, ease }} className="mb-10">
              <Eyebrow>{FOUNDERS.eyebrow}</Eyebrow>
              <h1 className={`${display} text-[46px] leading-[1.03] sm:text-[76px]`}>{FOUNDERS.title}</h1>
            </motion.div>
            <div className="grid gap-8 md:grid-cols-2">
              {FOUNDERS.people.map((p, i) => (
                <motion.article key={p.name} {...RISE} transition={{ duration: 0.8, delay: i * 0.12, ease }} className="border border-pine/25">
                  {/* photo slot: a real portrait goes here, never stock */}
                  {'photo' in p && p.photo ? (
                    <img
                      src={p.photo.src}
                      alt={`${p.name}, co-founder of Páramo`}
                      className="aspect-[4/3] w-full border-b border-pine/25 object-cover"
                      style={{ objectPosition: p.photo.position }}
                    />
                  ) : (
                    <div className="flex aspect-[4/3] items-center justify-center border-b border-pine/25 bg-mist-raised/60">
                      <div className="text-center">
                        <div className={`${display} text-[72px] leading-none text-pine/30`}>{p.name[0]}</div>
                        <div className="micro mt-3 text-slate/60">Photo of {p.name} to come</div>
                      </div>
                    </div>
                  )}
                  <div className="p-7 sm:p-9">
                    <h3 className={`${display} text-[36px] leading-none sm:text-[42px]`}>{p.name}</h3>
                    {'linkedin' in p && p.linkedin && (
                      <a
                        href={p.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-medium text-pine/85 transition-colors hover:text-gold-deep"
                      >
                        <span className="border-b border-pine/30 pb-0.5">LinkedIn</span> <span aria-hidden>↗</span>
                      </a>
                    )}
                    <Copy slot={p.role} className="mt-4" />
                    <Copy slot={p.background} className="mt-4" />
                  </div>
                </motion.article>
              ))}
            </div>
          </Section>

          <Ridges src="/assets/paramo/rays.webp" height="h-[30vh] min-h-[220px]" position="object-[center_72%]" />

          {/* 3. our roots and the name, pinned, with the process scrolling past */}
          <Section className="pt-16 pb-20 sm:pt-20 sm:pb-24">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6">
                <div className="lg:sticky lg:top-[16vh]">
                  <Eyebrow>{NAME.eyebrow}</Eyebrow>
                  <h2 className={`${display} text-[40px] leading-[1.06] sm:text-[52px]`}>
                    <BlurWords text={NAME.title} />
                  </h2>
                  <div className="mt-6 max-w-lg space-y-5">
                    {NAME.body.map((b, i) => (
                      <motion.div key={i} {...RISE} transition={{ duration: 0.8, delay: 0.15 + i * 0.1, ease }}>
                        <Copy slot={b} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-5 lg:col-span-6">
                {NAME.steps.map((s) => (
                  <motion.article
                    key={s.numeral}
                    {...RISE}
                    transition={{ duration: 0.8, ease }}
                    className="grid min-h-[240px] grid-cols-[44px_1fr] gap-4 border border-pine/25 p-7 sm:p-9"
                  >
                    <span className="font-display text-[26px] leading-none text-gold-deep">{s.numeral}</span>
                    <div>
                      <div className="flex items-baseline gap-4">
                        <h3 className={`${display} text-[36px] leading-none sm:text-[44px]`}>{s.word}</h3>
                        <span className="micro text-slate/60">{s.step}</span>
                      </div>
                      <p className="mt-4 text-[15px] leading-relaxed text-slate">{s.body}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </Section>

          {/* 4. invitation */}
          <Section className="pb-20">
            <motion.div
              {...RISE}
              transition={{ duration: 0.8, ease }}
              className="flex flex-col items-start gap-6 border border-pine/25 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10"
            >
              <h2 className={`${display} text-[30px] leading-tight sm:text-[38px]`}>
                Let’s see what we can take off your plate. <em className="italic text-gold-deep">Book a call.</em>
              </h2>
              <a
                href={CALENDLY_URL}
                className="inline-flex h-[52px] shrink-0 items-center rounded-full bg-gold px-7 text-[15px] font-semibold text-pine transition-colors hover:bg-gold-soft"
              >
                Book a call
              </a>
            </motion.div>
          </Section>
        </main>

        <Footer />
      </div>
    </MotionConfig>
  )
}
