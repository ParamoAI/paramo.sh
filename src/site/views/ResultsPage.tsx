import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import Masthead from '../components/Masthead'
import { Arrow, BlurWords, Closing, Eyebrow, Footer, RISE, ease, wrap } from '../components/HomeSections'
import { MORE_WORK, RESULTS, RESULTS_HEADER, RESULT_FILTERS } from '../data/results'
import { startScroll } from '../lib/scroll'

/*
  Results, at /case-studies/ (the live site's address, kept for search).

  Opens like What we do: eyebrow, the line, a one-sentence lede, over a slim
  band of ridges. Then one row per result: industry, a headline with
  context, a short description, and a link to the full story at
  /case-studies/{slug}/. Then smaller client work in a table.
*/

const display = 'font-display display-cut tracking-[-0.015em] text-pine'

export default function ResultsPage() {
  useEffect(() => startScroll(), [])
  const [filter, setFilter] = useState('All')
  const shown = RESULTS.filter((r) => filter === 'All' || r.category === filter)

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-mist">
      <Masthead tone="light" current="/case-studies/" />

      <header className={`${wrap} pt-40 pb-12 sm:pt-52`}>
        <motion.div {...RISE} transition={{ duration: 0.8, ease }} className="micro mb-5 text-slate/70">
          {RESULTS_HEADER.eyebrow}
        </motion.div>
        <h1 className={`${display} max-w-5xl text-[46px] leading-[1.03] sm:text-[76px] lg:text-[92px]`}>
          <BlurWords text={RESULTS_HEADER.title} />
        </h1>
        <motion.p {...RISE} transition={{ duration: 0.8, delay: 0.3, ease }} className="mt-6 max-w-xl text-[17px] leading-relaxed text-slate">
          {RESULTS_HEADER.lede}
        </motion.p>
      </header>

      <div aria-hidden className="relative">
        <img src="/assets/paramo/sky.webp" alt="" className="h-[22vh] min-h-[170px] w-full object-cover object-[center_68%]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-mist)_0%,transparent_22%,transparent_78%,var(--color-mist)_100%)]" />
      </div>

      <main className="relative bg-mist">
        <section className={`${wrap} relative pt-14 pb-20 sm:pt-20`}>
          <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Choose your category">
            {RESULT_FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={`cursor-pointer rounded-full border px-4 py-2 text-[13px] transition-colors ${
                  filter === f ? 'border-pine bg-pine text-mist' : 'border-line text-pine/80 hover:border-slate/60'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="border-t border-line">
            <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((r, i) => (
              <motion.a
                layout
                key={r.slug}
                href={`/case-studies/${r.slug}/`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12, transition: { duration: 0.25 } }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: Math.min(i, 3) * 0.05, ease }}
                className="group block border-b border-line py-10 sm:py-12"
              >
                <div className="micro text-slate/70">
                  {r.category} · {r.client}
                </div>
                <h2 className={`${display} mt-4 max-w-4xl text-[30px] leading-[1.12] transition-colors group-hover:text-gold-deep sm:text-[40px]`}>
                  {r.headline}
                </h2>
                <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-slate sm:text-[17px]">{r.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-[15px] font-medium text-pine">
                  Read the story <Arrow className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </motion.a>
            ))}
            </AnimatePresence>
          </div>
        </section>

        <section className={`${wrap} pb-24`}>
          <motion.div {...RISE} transition={{ duration: 0.8, ease }} className="mb-8">
            <Eyebrow>{MORE_WORK.eyebrow}</Eyebrow>
            <h2 className={`${display} max-w-3xl text-[34px] leading-[1.08] sm:text-[44px]`}>{MORE_WORK.title}</h2>
            <p className="mt-3 text-[14px] text-slate/80">{MORE_WORK.note}</p>
          </motion.div>
          <div className="border-t border-line">
            {MORE_WORK.rows.map((row, i) => (
              <motion.div
                key={row.client}
                {...RISE}
                transition={{ duration: 0.7, delay: Math.min(i, 3) * 0.05, ease }}
                className="grid gap-2 border-b border-line py-6 lg:grid-cols-[240px_1fr_260px] lg:gap-8"
              >
                <h3 className="font-display text-[20px] leading-snug text-pine">{row.client}</h3>
                <p className="text-[15px] leading-relaxed text-slate">{row.built}</p>
                <p className="text-[14px] leading-relaxed text-pine/80">{row.result}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-slate">{MORE_WORK.community}</p>
        </section>

        <Closing />
      </main>
      <div className="bg-mist pt-4">
        <Footer />
      </div>
      </div>
    </MotionConfig>
  )
}
