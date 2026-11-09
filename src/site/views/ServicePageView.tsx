import { useEffect } from 'react'
import { MotionConfig, motion } from 'motion/react'
import Masthead from '../components/Masthead'
import { Arrow, BlurWords, Footer, RISE, ease, wrap } from '../components/HomeSections'
import { CALENDLY_URL } from '../data/home'
import type { ServicePage } from '../data/servicePages'
import { startScroll } from '../lib/scroll'

/*
  One service, at /what-we-do/{slug}/. Same opener and type as What we do:
  who it is for, what you get, how it works, real examples, questions, then
  Book a call.
*/

const display = 'font-display display-cut tracking-[-0.015em] text-pine'

function Eyebrow({ children }: { children: string }) {
  return <div className="micro mb-5 text-slate/70">{children}</div>
}

export default function ServicePageView({ page }: { page: ServicePage }) {
  useEffect(() => startScroll(), [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-mist">
        <Masthead tone="light" current="/what-we-do/" />

        <header className={`${wrap} pt-40 pb-12 sm:pt-52`}>
          <motion.a {...RISE} transition={{ duration: 0.8, ease }} href="/what-we-do/" className="micro mb-8 inline-block text-slate/70 transition-colors hover:text-pine">
            ← All services
          </motion.a>
          <motion.div {...RISE} transition={{ duration: 0.8, ease }}>
            <Eyebrow>{page.eyebrow}</Eyebrow>
          </motion.div>
          <h1 className={`${display} max-w-5xl text-[44px] leading-[1.04] sm:text-[68px] lg:text-[84px]`}>
            <BlurWords text={page.title} />
          </h1>
          <motion.p {...RISE} transition={{ duration: 0.8, delay: 0.3, ease }} className="mt-6 max-w-2xl text-[18px] leading-relaxed text-slate">
            {page.lede}
          </motion.p>
          <motion.div {...RISE} transition={{ duration: 0.8, delay: 0.45, ease }} className="mt-8">
            <a href={CALENDLY_URL} className="inline-flex h-[52px] items-center rounded-full bg-gold px-7 text-[15px] font-semibold text-pine transition-colors hover:bg-gold-soft">
              Book a call
            </a>
          </motion.div>
        </header>

        <div aria-hidden className="relative">
          <img src="/assets/paramo/sky.webp" alt="" className="h-[18vh] min-h-[140px] w-full object-cover object-[center_68%]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-mist)_0%,transparent_22%,transparent_78%,var(--color-mist)_100%)]" />
        </div>

        <main>
          {/* who it is for */}
          <section className={`${wrap} pt-14 pb-16 sm:pt-20`}>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <motion.div {...RISE} transition={{ duration: 0.8, ease }} className="lg:col-span-5">
                <Eyebrow>{page.forWho.title}</Eyebrow>
                <p className="font-display text-[26px] leading-snug text-pine sm:text-[30px]">{page.forWho.intro}</p>
              </motion.div>
              <ul className="space-y-4 lg:col-span-7 lg:pt-10">
                {page.forWho.signs.map((x) => (
                  <li key={x} className="flex gap-3 text-[17px] leading-relaxed text-slate">
                    <span aria-hidden className="mt-[11px] h-1 w-1 shrink-0 rounded-full bg-gold-deep" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* what you get */}
          <section className={`${wrap} pb-16`}>
            <div className="border-t border-line pt-14">
              <Eyebrow>{page.deliverables.title}</Eyebrow>
              <div className="grid gap-5 sm:grid-cols-2">
                {page.deliverables.items.map((d, i) => (
                  <motion.article key={d.name} {...RISE} transition={{ duration: 0.7, delay: Math.min(i, 3) * 0.06, ease }} className="border border-pine/25 p-7 sm:p-8">
                    <h2 className={`${display} text-[26px] leading-tight sm:text-[30px]`}>{d.name}</h2>
                    <p className="mt-3 text-[15px] leading-relaxed text-slate">{d.body}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          {/* how it works */}
          <section className={`${wrap} pb-16`}>
            <div className="border-t border-line pt-14">
              <Eyebrow>{page.process.title}</Eyebrow>
              <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {page.process.steps.map((st) => (
                  <li key={st.n} className="border border-pine/20 bg-mist-raised/40 p-5">
                    <div className="micro text-gold-deep">{st.n}</div>
                    <h3 className={`${display} mt-2 text-[24px] leading-tight`}>{st.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-slate">{st.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* examples */}
          <section className={`${wrap} pb-16`}>
            <div className="border-t border-line pt-14">
              <Eyebrow>{page.examples.title}</Eyebrow>
              <p className="max-w-2xl text-[17px] leading-relaxed text-slate">{page.examples.intro}</p>
              <div className="mt-8 border-t border-line">
                {page.examples.items.map((ex) => {
                  const Row = ex.href ? 'a' : 'div'
                  return (
                    <Row key={ex.who} href={ex.href} className="group grid gap-2 border-b border-line py-6 lg:grid-cols-[280px_1fr_32px] lg:gap-8">
                      <h3 className={`font-display text-[22px] leading-snug text-pine ${ex.href ? 'transition-colors group-hover:text-gold-deep' : ''}`}>{ex.who}</h3>
                      <p className="text-[16px] leading-relaxed text-slate">{ex.body}</p>
                      {ex.href ? <Arrow className="hidden text-slate/60 lg:block" /> : <span />}
                    </Row>
                  )
                })}
              </div>
            </div>
          </section>

          {/* questions */}
          <section className={`${wrap} pb-16`}>
            <div className="border-t border-line pt-14">
              <Eyebrow>Questions</Eyebrow>
              <dl className="grid gap-8 lg:grid-cols-2">
                {page.faq.map((f) => (
                  <div key={f.q}>
                    <dt className={`${display} text-[24px] leading-snug`}>{f.q}</dt>
                    <dd className="mt-3 text-[16px] leading-relaxed text-slate">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* next + book a call */}
          <section className={`${wrap} pb-20`}>
            <div className="flex flex-col items-start gap-6 border border-pine/25 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
              <div>
                <h2 className={`${display} text-[30px] leading-tight sm:text-[38px]`}>Not sure where to start?</h2>
                <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-slate">Book a call. We will look at where your time goes and tell you plainly where to start.</p>
              </div>
              <a href={CALENDLY_URL} className="inline-flex h-[52px] shrink-0 items-center rounded-full bg-gold px-7 text-[15px] font-semibold text-pine transition-colors hover:bg-gold-soft">
                Book a call
              </a>
            </div>
            <div className="mt-12 border-t border-line pt-8">
              <div className="micro text-slate/70">{page.next.title}</div>
              <p className="mt-2 text-[15px] text-slate">{page.next.body}</p>
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                {page.next.links.map((l) => (
                  <a key={l.label} href={l.href} className="group inline-flex items-center gap-2 text-[16px] font-medium text-pine">
                    <span className="border-b border-pine/30 pb-0.5 group-hover:border-pine">{l.label}</span>
                    <Arrow />
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
