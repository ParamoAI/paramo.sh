import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CALENDLY_URL, OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/config/site';

const pageTitle = `${SITE_NAME} | AI systems for business owners`;

const offerAssessment = [
  'A 45-minute live workflow audit',
  'A custom report tailored to your business',
  'Three to seven tools matched to your workflows',
  'An impact and effort priority matrix',
  'A four-day quick-start implementation plan',
  'A 30-minute walkthrough of your report',
];

const offerConcierge = [
  'Two 45-minute working sessions each month',
  'Direct access between sessions, answered the same business day',
  'A shared workspace documenting every system we build',
  'We build on your screen, and you keep everything',
  "Workflows audited and optimized before they're automated",
  'A deliberately small roster, so your engagement gets full attention',
];

const problemItems = [
  {
    numeral: 'i',
    title: 'Too much lives in your head.',
    description:
      "Your logic, your follow-up cadence, your onboarding all depend on you being present. That isn't a business you own; it's a job you can't leave.",
  },
  {
    numeral: 'ii',
    title: 'Manual work is consuming your week.',
    description:
      "Data entry, client follow-up, reporting, scheduling, inbox triage. Work that happens daily, takes real hours, and rarely requires you to be the one doing it.",
  },
  {
    numeral: 'iii',
    title: "Your tools don't talk to each other.",
    description:
      'CRM, inbox, calendar, project management, payments. Each works alone. Together they leave gaps where work falls through and time is lost to handoffs.',
  },
  {
    numeral: 'iv',
    title: "You've researched, but you haven't shipped.",
    description:
      "You know AI can help. You've read the articles. But there's distance between knowing it's possible and having a working system in your business. That distance is where we work.",
  },
];

const processItems = [
  {
    number: '01',
    label: 'Audit',
    title: 'Find the real bottleneck.',
    description:
      `We take your workflows apart and map every place time, quality, or revenue is leaking. Not "be more efficient," but the specific 90-minute task you repeat every Tuesday that shouldn't require you.`,
  },
  {
    number: '02',
    label: 'Optimize',
    title: 'Fix the process first.',
    description:
      'Before any automation, we lean out the workflow. A twelve-step process usually has four steps that matter. Automating the rest only produces waste faster, so we cut first.',
  },
  {
    number: '03',
    label: 'Automate',
    title: 'Build the clean version.',
    description:
      'Only now do we build. The system sits on a process that already works, which makes it simpler to build, easier to maintain, and far more likely to keep producing good output.',
  },
];

const comparisonRows = [
  ['Workflow audit', 'yes', 'yes'],
  ['Custom report', 'yes', 'yes'],
  ['Hands-on implementation', 'no', 'yes'],
  ['Built with you, on your screen', 'no', 'yes'],
  ['Process optimized before automating', 'no', 'yes'],
  ['Support between sessions', 'no', 'yes'],
  ['You own everything built', 'no', 'yes'],
];

const faqItems = [
  {
    question: 'Do I need to be technical?',
    answer:
      "No. We design around tools you can operate without a technical background. If you use email and video calls, you can work with us. The Concierge is built so you learn alongside us, and by the time we're done you understand the systems we built and can run them without us.",
  },
  {
    question: "What's the difference between the Assessment and the Concierge?",
    answer:
      'The Assessment is a one-time diagnostic: a custom report showing where AI creates leverage in your business, with named tools, realistic time savings, and a plan to start. The Concierge is the ongoing engagement where we implement those systems with you, across two working sessions a month, until they run reliably.',
  },
  {
    question: `What does "done-with-you" actually mean?`,
    answer:
      "On each session you share your screen and we build together, live. You do the work; we guide the architecture, cut the waste in your process, and write the automations alongside you. You leave every call with something already running, and an understanding of how it works. If you'd prefer something built entirely for you, that's project work, scoped separately.",
  },
  {
    question: 'What kinds of businesses do you work with?',
    answer:
      "Service businesses, consultants, agencies, e-commerce operators, and lean teams of one to twenty. The common thread is repetitive, high-cost workflows we can remove. Industry matters less than the presence of work that's eating hours it shouldn't.",
  },
  {
    question: 'Is what we discuss confidential?',
    answer:
      "Yes. Everything we review stays between us, and we're glad to work under an NDA. Client names and details are only ever shared with your permission.",
  },
  {
    question: 'Can I begin with the Concierge without an Assessment first?',
    answer:
      "Yes. If you already know where your bottlenecks are and you're ready to build, we begin the Concierge directly with a focused audit on the first session. The Assessment is the right starting point when you want clarity before committing to a monthly engagement.",
  },
];

function LogoMark() {
  return (
    <svg viewBox="0 0 44 38" aria-hidden="true" focusable="false">
      <path d="M4 33.5 22 4.5 40 33.5Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="m16 33.5 6-10.5 6 10.5Z" fill="currentColor" />
    </svg>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="paramo-check-item">
      <span className="paramo-check-icon" aria-hidden="true">
        <span>✓</span>
      </span>
      <span>{children}</span>
    </li>
  );
}

export default function Home() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [sampleRequested, setSampleRequested] = useState(false);

  useEffect(() => {
    const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleClick = (event: Event) => {
      const link = event.currentTarget as HTMLAnchorElement;
      const targetId = link.getAttribute('href');

      if (!targetId || targetId === '#') {
        return;
      }

      const target = document.querySelector<HTMLElement>(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'start' });
      window.history.replaceState({}, '', targetId);
    };

    anchors.forEach((anchor) => anchor.addEventListener('click', handleClick));

    return () => {
      anchors.forEach((anchor) => anchor.removeEventListener('click', handleClick));
    };
  }, []);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400;1,6..72,500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="paramo-homepage">
        <nav className="paramo-nav">
          <div className="paramo-container">
            <Link href="/" className="paramo-brand" aria-label="Páramo home">
              <span className="paramo-brand-mark">
                <LogoMark />
              </span>
              <span className="paramo-brand-wordmark">Páramo</span>
            </Link>

            <div className="paramo-nav-links" aria-label="Primary">
              <a href="#offers">Services</a>
              <a href="#process">How we work</a>
              <a href="#faq">FAQ</a>
            </div>

            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="paramo-button paramo-button-primary paramo-nav-cta"
            >
              Book a discovery call
            </a>
          </div>
        </nav>

        <section className="paramo-hero">
          <div className="paramo-ridges" aria-hidden="true">
            <svg viewBox="0 0 1440 620" preserveAspectRatio="xMidYMax slice">
              <polyline points="0,330 120,302 230,316 330,264 450,292 610,238 720,262 860,216 1010,252 1150,206 1280,228 1440,182" />
              <polyline points="0,406 118,372 248,388 360,336 505,360 640,308 770,328 920,286 1070,320 1222,268 1340,286 1440,248" />
              <polyline points="0,486 142,458 276,470 410,418 548,446 692,392 846,424 984,382 1130,410 1278,364 1440,392" />
            </svg>
          </div>

          <div className="paramo-container paramo-hero-inner">
            <div className="paramo-eyebrow">For business owners running on too much manual work</div>
            <h1>
              We don&apos;t hand you a report.
              <br />
              <em>We build the system.</em>
            </h1>
            <p className="paramo-lead">
              Most AI consultants diagnose your bottlenecks and disappear. Páramo finds the work that
              shouldn&apos;t require you, then builds and implements the systems that remove it, alongside
              your team, until they run on their own.
            </p>
            <div className="paramo-hero-actions">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="paramo-button paramo-button-primary"
              >
                Book a discovery call
              </a>
              <a href="#start" className="paramo-quiet-link">
                See a sample report first
              </a>
            </div>

            <div className="paramo-stats" aria-label="Client results highlights">
              <div className="paramo-stat">
                <span className="paramo-stat-value">
                  40+ <span className="paramo-stat-slash">/</span>
                </span>
                <span className="paramo-stat-copy">hours reclaimed per client, each month</span>
              </div>
              <div className="paramo-stat-divider" aria-hidden="true" />
              <div className="paramo-stat">
                <span className="paramo-stat-value">
                  120+ <span className="paramo-stat-slash">/</span>
                </span>
                <span className="paramo-stat-copy">workflows automated across engagements</span>
              </div>
            </div>
          </div>
        </section>

        <section className="paramo-section">
          <div className="paramo-container paramo-two-column">
            <div>
              <div className="paramo-eyebrow">Who this is for</div>
              <h2>Your business runs on manual effort that should run on systems.</h2>
              <p>
                You&apos;re good at what you do. It&apos;s the manual work around it that holds you back: the
                follow-up, the data entry, the reporting, the process that lives only in your head. That
                is what keeps you from growing.
              </p>
              <p>
                You&apos;ve looked at AI. You may have tried a few tools. But research isn&apos;t implementation,
                and most of what&apos;s out there is a demo, not a system built around how your business
                actually works.
              </p>
            </div>

            <div className="paramo-problem-list">
              {problemItems.map((item) => (
                <article key={item.numeral} className="paramo-problem-item">
                  <div className="paramo-roman">{item.numeral}</div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <hr className="paramo-rule" />

        <section className="paramo-section" id="offers">
          <div className="paramo-container">
            <div className="paramo-section-heading">
              <div className="paramo-eyebrow">Two ways to work with us</div>
              <h2>Start with a diagnosis, or start building.</h2>
              <p className="paramo-intro">
                If you want clarity first, the Assessment maps exactly where AI creates leverage in your
                business. If you&apos;re ready to build, the Concierge is where we implement it together, one
                workflow at a time. Both begin with a conversation.
              </p>
            </div>

            <div className="paramo-offers">
              <article className="paramo-offer-card paramo-offer-card-featured">
                <div className="paramo-offer-flag">Most clients start here</div>
                <div className="paramo-offer-kicker">One-time engagement</div>
                <h3>The Assessment</h3>
                <div className="paramo-price">$1,499</div>
                <p className="paramo-offer-description">
                  A focused workflow audit where we pull the real bottlenecks out of your business, then
                  deliver a custom report showing precisely where AI creates leverage, with named tools,
                  conservative time-savings estimates, and a sequenced plan to start.
                </p>
                <ul className="paramo-check-list">
                  {offerAssessment.map((item) => (
                    <CheckItem key={item}>{item}</CheckItem>
                  ))}
                </ul>
                <div className="paramo-ideal-box">
                  <strong>Right for you if</strong> you want clarity before committing to implementation.
                  You know manual work is costing you, but not yet where to begin.
                </div>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="paramo-button paramo-button-primary paramo-button-block"
                >
                  Book a discovery call
                </a>
                <p className="paramo-note">
                  If we don&apos;t surface at least one opportunity to recover five or more hours a week,
                  the Assessment is on us.
                </p>
              </article>

              <article className="paramo-offer-card">
                <div className="paramo-offer-flag paramo-offer-flag-muted">When you&apos;re ready to build</div>
                <div className="paramo-offer-kicker">Ongoing engagement</div>
                <h3>The Concierge</h3>
                <div className="paramo-price">
                  From $999 <span>/ per month</span>
                </div>
                <p className="paramo-offer-description">
                  A done-with-you engagement where we implement AI systems alongside you. Two working
                  sessions each month, direct access between them, and a shared workspace where every
                  system we build is documented and yours to keep.
                </p>
                <ul className="paramo-check-list">
                  {offerConcierge.map((item) => (
                    <CheckItem key={item}>{item}</CheckItem>
                  ))}
                </ul>
                <div className="paramo-ideal-box">
                  <strong>Right for you if</strong> you&apos;ve completed an assessment, ours or your own,
                  and you&apos;re ready to implement with a partner rather than figure out another report
                  alone.
                </div>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="paramo-button paramo-button-secondary paramo-button-block"
                >
                  Book a discovery call
                </a>
                <p className="paramo-note">
                  Project work (full builds, integrations, custom agents) is scoped from within the
                  engagement, once we know exactly what&apos;s worth building.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="paramo-section paramo-band" id="process">
          <div className="paramo-container">
            <div className="paramo-section-heading">
              <div className="paramo-eyebrow">How we work</div>
              <h2>Audit. Optimize. Automate.</h2>
              <p className="paramo-intro">
                The sequence is the discipline. We never automate a broken process. We fix the workflow
                first, then hand the clean version to AI. Every engagement runs this order, every time.
              </p>
            </div>

            <div className="paramo-process-grid">
              {processItems.map((item) => (
                <article key={item.number} className="paramo-process-card">
                  <div className="paramo-process-number">{item.number}</div>
                  <div className="paramo-process-rule" aria-hidden="true" />
                  <div className="paramo-process-label">{item.label}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="paramo-section">
          <div className="paramo-container paramo-two-column paramo-two-column-wide">
            <div>
              <div className="paramo-eyebrow">Why Páramo</div>
              <h2>Others leave you with a report. We leave you with a running system.</h2>
              <p>
                The market is full of audits. You pay for a diagnosis, receive a list of tools, and spend
                the next month trying to implement something designed for a generic business rather than
                yours.
              </p>
              <p>
                The Concierge exists because the report was never the product. The working system is. We
                build it with you, in your real workflows, until it runs without us.
              </p>
            </div>

            <div className="paramo-table-wrap">
              <table className="paramo-table">
                <thead>
                  <tr>
                    <th scope="col" />
                    <th scope="col">Typical AI consulting</th>
                    <th scope="col" className="paramo-table-accent">
                      Páramo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map(([label, typical, paramo]) => (
                    <tr key={label}>
                      <th scope="row">{label}</th>
                      <td>{typical === 'yes' ? <span className="paramo-yes">✓</span> : <span className="paramo-no">-</span>}</td>
                      <td>{paramo === 'yes' ? <span className="paramo-yes">✓</span> : <span className="paramo-no">-</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="paramo-section paramo-band" id="faq">
          <div className="paramo-container paramo-faq-wrap">
            <div className="paramo-section-heading">
              <div className="paramo-eyebrow">Questions</div>
              <h2>What clients ask before we begin.</h2>
            </div>

            <div className="paramo-faq-list">
              {faqItems.map((item, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div key={item.question} className={`paramo-faq-item ${isOpen ? 'is-open' : ''}`}>
                    <button
                      type="button"
                      className="paramo-faq-trigger"
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${index}`}
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    >
                      <span>{item.question}</span>
                      <span className="paramo-faq-icon" aria-hidden="true">
                        <span />
                        <span />
                      </span>
                    </button>
                    <div id={`faq-panel-${index}`} className="paramo-faq-panel" hidden={!isOpen}>
                      <p>{item.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="paramo-section paramo-closing" id="start">
          <div className="paramo-container">
            <div className="paramo-closing-inner">
              <h2>Let&apos;s find the work your business should stop doing by hand.</h2>
              <p className="paramo-lead paramo-lead-centered">
                Book a discovery call. We&apos;ll map your highest-leverage opportunities and show you what
                the right system looks like. No obligation.
              </p>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="paramo-button paramo-button-primary"
              >
                Book a discovery call
              </a>

              <div className="paramo-closing-rule" aria-hidden="true" />

              <div className="paramo-sample-block">
                <div className="paramo-sample-label">Not ready to book?</div>
                <p className="paramo-note">
                  See exactly what you&apos;d get. We&apos;ll send a sample Assessment report and one
                  automation idea for a business like yours.
                </p>

                {sampleRequested ? (
                  <p className="paramo-confirmation">Thanks. Check your inbox shortly.</p>
                ) : (
                  <form
                    className="paramo-sample-form"
                    onSubmit={(event) => {
                      event.preventDefault();
                      setSampleRequested(true);
                      // Connect this submit event to an email provider before using it in production.
                      event.currentTarget.reset();
                    }}
                  >
                    <label className="paramo-visually-hidden" htmlFor="sample-email">
                      Email address
                    </label>
                    <input id="sample-email" type="email" placeholder="you@company.com" required />
                    <button type="submit" className="paramo-button paramo-button-primary">
                      Send me a sample
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        <footer className="paramo-footer">
          <div className="paramo-container">
            <div className="paramo-footer-grid">
              <div>
                <Link href="/" className="paramo-brand paramo-footer-brand" aria-label="Páramo home">
                  <span className="paramo-brand-mark">
                    <LogoMark />
                  </span>
                  <span className="paramo-brand-wordmark">Páramo</span>
                </Link>
                <p className="paramo-footer-copy">
                  AI systems for business owners. We find the work that shouldn&apos;t require you, then
                  build the systems that remove it.
                </p>
                <p className="paramo-footer-note">
                  Engagements are confidential. Work available under NDA.
                </p>
              </div>

              <div>
                <h3>Services</h3>
                <ul>
                  <li>
                    <a href="#offers">The Assessment</a>
                  </li>
                  <li>
                    <a href="#offers">The Concierge</a>
                  </li>
                  <li>
                    <a href="#process">How we work</a>
                  </li>
                </ul>
              </div>

              <div>
                <h3>Resources</h3>
                <ul>
                  <li>
                    <Link href="/case-studies">Case studies</Link>
                  </li>
                  <li>
                    <Link href="/blog">Blog</Link>
                  </li>
                  <li>
                    <Link href="/architect-prep">Architect Prep</Link>
                  </li>
                  <li>
                    <a href="https://discord.com/invite/xXE9TqGju" target="_blank" rel="noopener noreferrer">
                      Community
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3>Company</h3>
                <ul>
                  <li>
                    <a href="https://x.com/tipbtdennis" target="_blank" rel="noopener noreferrer">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                      Book a call
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="paramo-footer-bottom">
              <p>© 2026 Páramo. Above the clouds.</p>
              <p className="paramo-footer-signoff">We don&apos;t hand you a report. We build the system.</p>
            </div>
          </div>
        </footer>
      </main>

      <style jsx global>{`
        .paramo-homepage {
          --base-page: #0b1d1a;
          --base-darkest: rgb(8, 22, 19);
          --card: #0e2420;
          --card-raised: rgb(18, 48, 41);
          --fill-muted: rgba(27, 77, 62, 0.24);
          --border: rgba(168, 197, 184, 0.16);
          --border-soft: rgba(168, 197, 184, 0.09);
          --accent: #c8963e;
          --accent-dim: #9e7230;
          --text: #e8f0eb;
          --text-sub: #a8c5b8;
          --text-faint: rgba(168, 197, 184, 0.72);
          --ridge: rgba(142, 162, 191, 0.11);
          background: var(--base-page);
          color: var(--text);
          font-family: 'Hanken Grotesk', system-ui, sans-serif;
        }

        .paramo-homepage * {
          box-sizing: border-box;
        }

        .paramo-homepage a,
        .paramo-homepage button,
        .paramo-homepage input {
          font: inherit;
        }

        .paramo-homepage a {
          color: inherit;
          text-decoration: none;
        }

        .paramo-homepage img,
        .paramo-homepage svg {
          display: block;
          max-width: 100%;
        }

        .paramo-homepage button {
          background: none;
          border: 0;
          color: inherit;
        }

        .paramo-homepage :focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
        }

        .paramo-container {
          width: min(1120px, calc(100% - 4.5rem));
          margin: 0 auto;
        }

        .paramo-nav {
          position: sticky;
          top: 0;
          z-index: 20;
          background: rgba(11, 29, 26, 0.82);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-soft);
        }

        .paramo-nav .paramo-container {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 1.5rem;
          min-height: 78px;
        }

        .paramo-brand {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          min-width: 0;
        }

        .paramo-brand-mark {
          width: 1.85rem;
          color: var(--accent);
          flex: 0 0 auto;
        }

        .paramo-brand-wordmark {
          font-family: 'Newsreader', 'Times New Roman', serif;
          font-size: 1.55rem;
          font-weight: 500;
          letter-spacing: -0.02em;
        }

        .paramo-nav-links {
          display: flex;
          justify-content: center;
          gap: 2rem;
        }

        .paramo-nav-links a {
          color: var(--text-sub);
          font-size: 0.98rem;
        }

        .paramo-nav-links a:hover,
        .paramo-quiet-link:hover,
        .paramo-footer a:hover {
          color: var(--text);
        }

        .paramo-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0.85rem 1.4rem;
          border-radius: 6px;
          border: 1px solid transparent;
          transition: transform 160ms ease, background-color 160ms ease, border-color 160ms ease, color 160ms ease;
          cursor: pointer;
          text-align: center;
        }

        .paramo-button-primary {
          background: var(--accent);
          border-color: var(--accent);
          color: var(--base-darkest);
          font-weight: 700;
        }

        .paramo-button-primary:hover {
          background: #d2a14e;
          border-color: #d2a14e;
          transform: translateY(-1px);
        }

        .paramo-button-secondary {
          background: transparent;
          border-color: var(--border);
          color: var(--text);
          font-weight: 500;
        }

        .paramo-button-secondary:hover {
          border-color: rgba(168, 197, 184, 0.28);
          background: rgba(168, 197, 184, 0.04);
        }

        .paramo-button-block {
          width: 100%;
        }

        .paramo-section {
          padding: 104px 0;
        }

        .paramo-band {
          background: var(--base-darkest);
          border-top: 1px solid var(--border-soft);
          border-bottom: 1px solid var(--border-soft);
          position: relative;
        }

        .paramo-band::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(168, 197, 184, 0.02);
          pointer-events: none;
        }

        .paramo-eyebrow,
        .paramo-offer-flag,
        .paramo-process-label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .paramo-eyebrow,
        .paramo-offer-flag,
        .paramo-process-number,
        .paramo-table-accent,
        .paramo-confirmation {
          color: var(--accent);
        }

        .paramo-homepage h1,
        .paramo-homepage h2,
        .paramo-homepage h3,
        .paramo-price,
        .paramo-stat-value,
        .paramo-process-number {
          font-family: 'Newsreader', 'Times New Roman', serif;
          font-weight: 500;
          letter-spacing: -0.035em;
          text-wrap: balance;
        }

        .paramo-homepage h1 {
          margin: 1.1rem 0 1.35rem;
          font-size: clamp(2.85rem, 6.35vw, 5.2rem);
          line-height: 0.965;
          max-width: 9.6ch;
        }

        .paramo-homepage h1 em {
          color: var(--accent);
          font-style: italic;
          font-weight: 500;
        }

        .paramo-homepage h2 {
          font-size: clamp(2.25rem, 4.5vw, 3.5rem);
          line-height: 0.98;
          max-width: 10.8ch;
          margin-top: 0.95rem;
        }

        .paramo-homepage h3 {
          font-size: clamp(1.65rem, 3vw, 2.25rem);
          line-height: 1.08;
        }

        .paramo-homepage p,
        .paramo-homepage li,
        .paramo-homepage td,
        .paramo-homepage th,
        .paramo-homepage input,
        .paramo-homepage button {
          font-size: 16px;
          line-height: 1.72;
        }

        .paramo-lead {
          max-width: 39rem;
          color: rgba(232, 240, 235, 0.82);
          font-size: clamp(1.1rem, 1.95vw, 1.27rem);
          line-height: 1.76;
        }

        .paramo-lead-centered {
          margin-left: auto;
          margin-right: auto;
        }

        .paramo-intro,
        .paramo-offer-description {
          color: var(--text-sub);
          max-width: 38rem;
          font-size: 1.02rem;
        }

        .paramo-note,
        .paramo-offer-kicker,
        .paramo-footer-note {
          color: var(--text-faint);
          font-size: 0.95rem;
        }

        .paramo-hero {
          position: relative;
          overflow: clip;
          padding: 120px 0 104px;
        }

        .paramo-hero-inner {
          position: relative;
          z-index: 1;
        }

        .paramo-ridges {
          position: absolute;
          inset: 2.5rem 0 auto;
          height: calc(100% - 2.5rem);
          pointer-events: none;
          z-index: 0;
          opacity: 0.86;
        }

        .paramo-ridges svg {
          width: 100%;
          height: 100%;
        }

        .paramo-ridges polyline {
          fill: none;
          stroke: var(--ridge);
          stroke-width: 1;
        }

        .paramo-hero-actions {
          display: flex;
          align-items: center;
          gap: 1rem 1.5rem;
          margin-top: 2.15rem;
        }

        .paramo-quiet-link {
          color: var(--text-sub);
          font-size: 0.98rem;
        }

        .paramo-stats {
          display: flex;
          align-items: stretch;
          gap: 1.5rem;
          width: fit-content;
          margin-top: 3.5rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-soft);
        }

        .paramo-stat {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          min-width: min(240px, 42vw);
        }

        .paramo-stat-divider {
          width: 1px;
          background: var(--border-soft);
        }

        .paramo-stat-value {
          font-size: clamp(2.45rem, 5vw, 3rem);
          line-height: 1;
        }

        .paramo-stat-slash {
          color: var(--accent-dim);
          font-style: italic;
        }

        .paramo-stat-copy {
          color: var(--text-sub);
        }

        .paramo-two-column {
          display: grid;
          grid-template-columns: minmax(0, 1.04fr) minmax(0, 0.96fr);
          gap: 3rem;
          align-items: start;
        }

        .paramo-two-column > div > p + p {
          margin-top: 1.25rem;
        }

        .paramo-two-column > div:first-child > p,
        .paramo-two-column-wide > div:first-child > p {
          max-width: 35rem;
          color: rgba(232, 240, 235, 0.76);
        }

        .paramo-problem-list {
          border-top: 1px solid var(--border-soft);
        }

        .paramo-problem-item {
          display: grid;
          grid-template-columns: 2rem 1fr;
          gap: 1rem;
          padding: 1.35rem 0;
          border-bottom: 1px solid var(--border-soft);
        }

        .paramo-roman {
          color: var(--accent-dim);
          font-family: 'Newsreader', 'Times New Roman', serif;
          font-size: 1.45rem;
          line-height: 1.1;
        }

        .paramo-problem-item h3 {
          font-family: 'Hanken Grotesk', system-ui, sans-serif;
          font-size: 1.02rem;
          font-weight: 700;
          line-height: 1.5;
          letter-spacing: 0;
        }

        .paramo-problem-item p {
          color: rgba(232, 240, 235, 0.66);
          margin-top: 0.38rem;
          max-width: 33ch;
        }

        .paramo-rule,
        .paramo-closing-rule {
          border: 0;
          border-top: 1px solid var(--border-soft);
        }

        .paramo-rule {
          width: min(1120px, calc(100% - 4.5rem));
          margin: 0 auto;
          opacity: 0.78;
        }

        .paramo-section-heading {
          margin-bottom: 3.45rem;
        }

        .paramo-section-heading .paramo-intro {
          margin-top: 1rem;
        }

        .paramo-offers {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.5rem;
        }

        .paramo-offer-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 2.15rem 2rem 1.95rem;
          display: flex;
          flex-direction: column;
        }

        .paramo-offer-card-featured {
          background: var(--card-raised);
          border-color: var(--accent-dim);
          box-shadow: inset 0 0 0 1px rgba(200, 150, 62, 0.08);
        }

        .paramo-offer-flag-muted {
          color: var(--text-faint);
        }

        .paramo-offer-kicker {
          margin-top: 0.7rem;
          margin-bottom: 0.2rem;
        }

        .paramo-price {
          font-size: clamp(2.5rem, 4vw, 2.75rem);
          line-height: 1;
          margin: 1rem 0 1.35rem;
        }

        .paramo-price span {
          font-family: 'Hanken Grotesk', system-ui, sans-serif;
          font-size: 1rem;
          font-weight: 500;
          letter-spacing: 0;
          color: var(--text-sub);
        }

        .paramo-check-list {
          list-style: none;
          margin: 1.75rem 0 1.9rem;
          padding: 0;
          display: grid;
          gap: 0.95rem;
        }

        .paramo-check-item {
          display: grid;
          grid-template-columns: 1.5rem 1fr;
          gap: 0.9rem;
          align-items: start;
        }

        .paramo-check-icon {
          width: 1.5rem;
          height: 1.5rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--accent-dim);
          border-radius: 999px;
          color: var(--accent);
          font-size: 0.95rem;
          line-height: 1;
          margin-top: 0.1rem;
        }

        .paramo-ideal-box {
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 1.05rem 1rem 1.1rem;
          color: rgba(232, 240, 235, 0.72);
          margin-bottom: 1.4rem;
          background: rgba(168, 197, 184, 0.03);
        }

        .paramo-ideal-box strong {
          color: var(--text);
        }

        .paramo-offer-card .paramo-note {
          margin-top: auto;
          padding-top: 1.15rem;
          border-top: 1px solid var(--border-soft);
        }

        .paramo-process-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 2.35rem;
        }

        .paramo-process-card {
          padding-right: 0.5rem;
        }

        .paramo-process-number {
          font-size: clamp(2.5rem, 4vw, 2.75rem);
          line-height: 1;
        }

        .paramo-process-rule {
          width: 4rem;
          height: 1px;
          background: var(--accent-dim);
          margin: 0.95rem 0 1rem;
        }

        .paramo-process-card h3 {
          margin: 0.65rem 0 0.85rem;
        }

        .paramo-process-card p {
          color: var(--text-sub);
          max-width: 31ch;
        }

        .paramo-two-column-wide {
          grid-template-columns: minmax(0, 0.88fr) minmax(0, 1.12fr);
        }

        .paramo-table-wrap {
          overflow-x: auto;
        }

        .paramo-table {
          width: 100%;
          min-width: 520px;
          border-collapse: separate;
          border-spacing: 0;
          border: 1px solid var(--border);
          border-radius: 10px;
          overflow: hidden;
          background: var(--card);
          margin-top: 0.4rem;
        }

        .paramo-table thead th {
          background: var(--fill-muted);
          color: var(--text);
          font-weight: 600;
          font-size: 0.95rem;
        }

        .paramo-table th,
        .paramo-table td {
          padding: 1.05rem 1rem;
          border-bottom: 1px solid var(--border-soft);
        }

        .paramo-table tbody tr:last-child th,
        .paramo-table tbody tr:last-child td {
          border-bottom: 0;
        }

        .paramo-table th[scope='row'] {
          text-align: left;
          width: 46%;
          color: rgba(232, 240, 235, 0.78);
          font-weight: 500;
          line-height: 1.5;
        }

        .paramo-table td,
        .paramo-table thead th:not(:first-child) {
          text-align: center;
        }

        .paramo-table tbody td:last-child,
        .paramo-table thead th:last-child {
          background: rgba(200, 150, 62, 0.025);
        }

        .paramo-yes {
          color: var(--accent);
          font-weight: 700;
          font-size: 1.05rem;
        }

        .paramo-no {
          color: var(--text-faint);
        }

        .paramo-faq-wrap {
          max-width: 760px;
        }

        .paramo-faq-list {
          border-top: 1px solid var(--border-soft);
        }

        .paramo-faq-item {
          border-bottom: 1px solid var(--border-soft);
        }

        .paramo-faq-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1.35rem 0;
          cursor: pointer;
          text-align: left;
        }

        .paramo-faq-trigger span:first-child {
          font-size: 1.08rem;
          line-height: 1.45;
        }

        .paramo-faq-icon {
          position: relative;
          width: 1rem;
          height: 1rem;
          color: var(--accent);
          flex: 0 0 auto;
        }

        .paramo-faq-icon span {
          position: absolute;
          inset: 50% auto auto 50%;
          width: 100%;
          height: 1px;
          background: currentColor;
          transform: translate(-50%, -50%);
          transition: transform 160ms ease, opacity 160ms ease;
        }

        .paramo-faq-icon span:last-child {
          transform: translate(-50%, -50%) rotate(90deg);
        }

        .paramo-faq-item.is-open .paramo-faq-icon span:first-child {
          transform: translate(-50%, -50%) rotate(45deg);
        }

        .paramo-faq-item.is-open .paramo-faq-icon span:last-child {
          transform: translate(-50%, -50%) rotate(-45deg);
        }

        .paramo-faq-panel {
          padding: 0 0 1.35rem;
        }

        .paramo-faq-panel p {
          color: var(--text-sub);
        }

        .paramo-closing {
          text-align: center;
        }

        .paramo-closing-inner {
          max-width: 760px;
          margin: 0 auto;
        }

        .paramo-closing h2 {
          max-width: 13ch;
          margin-left: auto;
          margin-right: auto;
        }

        .paramo-closing-rule {
          margin: 2.6rem auto 0;
          width: 100%;
        }

        .paramo-sample-block {
          max-width: 480px;
          margin: 2.15rem auto 0;
        }

        .paramo-sample-label {
          color: var(--text);
          font-weight: 700;
          margin-bottom: 0.4rem;
        }

        .paramo-sample-form {
          display: flex;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .paramo-sample-form input {
          flex: 1 1 auto;
          min-height: 48px;
          padding: 0.85rem 1rem;
          border: 1px solid var(--border);
          border-radius: 6px;
          background: var(--fill-muted);
          color: var(--text);
        }

        .paramo-sample-form input::placeholder {
          color: var(--text-faint);
        }

        .paramo-sample-form input:focus {
          border-color: var(--accent);
        }

        .paramo-confirmation {
          margin-top: 1.2rem;
          font-weight: 700;
        }

        .paramo-footer {
          padding: 1.5rem 0 2rem;
        }

        .paramo-footer-grid {
          display: grid;
          grid-template-columns: 1.45fr repeat(3, minmax(0, 1fr));
          gap: 2rem;
          padding: 0 0 2.45rem;
        }

        .paramo-footer-brand {
          margin-bottom: 1rem;
        }

        .paramo-footer-copy {
          max-width: 22rem;
          color: var(--text-sub);
        }

        .paramo-footer-grid h3 {
          font-family: 'Hanken Grotesk', system-ui, sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0;
          margin-bottom: 0.9rem;
        }

        .paramo-footer-grid ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 0.55rem;
        }

        .paramo-footer-grid a {
          color: var(--text-sub);
        }

        .paramo-footer-note {
          margin-top: 0.8rem;
        }

        .paramo-footer-bottom {
          border-top: 1px solid var(--border-soft);
          padding-top: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          color: var(--text-faint);
        }

        .paramo-footer-signoff {
          font-family: 'Newsreader', 'Times New Roman', serif;
          font-style: italic;
          font-size: 1.2rem;
          color: var(--text);
        }

        .paramo-visually-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        @media (max-width: 920px) {
          .paramo-nav .paramo-container,
          .paramo-two-column,
          .paramo-two-column-wide,
          .paramo-offers,
          .paramo-process-grid,
          .paramo-footer-grid {
            grid-template-columns: 1fr;
          }

          .paramo-nav .paramo-container {
            display: flex;
            justify-content: space-between;
            min-height: 72px;
          }

          .paramo-nav-links {
            display: none;
          }

          .paramo-offer-card,
          .paramo-process-card {
            padding-right: 0;
          }

          .paramo-offer-card {
            padding: 2rem 1.75rem 1.85rem;
          }

          .paramo-footer {
            padding-bottom: 1.5rem;
          }

          .paramo-homepage h2,
          .paramo-closing h2 {
            max-width: 12ch;
          }

          .paramo-two-column > div:first-child > p,
          .paramo-two-column-wide > div:first-child > p,
          .paramo-intro,
          .paramo-offer-description,
          .paramo-process-card p {
            max-width: none;
          }
        }

        @media (max-width: 600px) {
          .paramo-container,
          .paramo-rule {
            width: min(1120px, calc(100% - 2.5rem));
          }

          .paramo-section {
            padding: 92px 0;
          }

          .paramo-hero {
            padding: 96px 0 92px;
          }

          .paramo-homepage h1 {
            margin: 1rem 0 1.2rem;
            line-height: 1;
            max-width: 9.1ch;
          }

          .paramo-homepage h2 {
            line-height: 1.01;
          }

          .paramo-lead {
            max-width: 31rem;
            font-size: 1.05rem;
            line-height: 1.74;
          }

          .paramo-nav-cta {
            padding-inline: 1rem;
            min-height: 44px;
            font-size: 0.92rem;
          }

          .paramo-hero-actions {
            gap: 0.85rem;
            margin-top: 2rem;
          }

          .paramo-hero-actions,
          .paramo-stats,
          .paramo-sample-form,
          .paramo-footer-bottom {
            flex-direction: column;
            align-items: stretch;
          }

          .paramo-button {
            width: 100%;
          }

          .paramo-quiet-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-height: 44px;
            padding: 0.7rem 1rem;
            border: 1px solid var(--border-soft);
            border-radius: 6px;
            background: rgba(168, 197, 184, 0.035);
          }

          .paramo-stats {
            width: 100%;
            gap: 1.15rem;
            margin-top: 2.6rem;
            padding-top: 1.35rem;
          }

          .paramo-stat {
            min-width: 0;
            gap: 0.45rem;
          }

          .paramo-stat-divider {
            width: 100%;
            height: 1px;
          }

          .paramo-problem-item {
            padding: 1.7rem 0;
          }

          .paramo-check-list {
            gap: 0.85rem;
            margin: 1.55rem 0 1.75rem;
          }

          .paramo-ideal-box {
            margin-bottom: 1.25rem;
          }

          .paramo-table th,
          .paramo-table td {
            padding: 0.9rem 0.82rem;
          }

          .paramo-section-heading {
            margin-bottom: 3rem;
          }

          .paramo-faq-trigger {
            padding: 1.55rem 0;
          }

          .paramo-faq-trigger span:first-child {
            font-size: 1rem;
            padding-right: 0.6rem;
          }

          .paramo-closing {
            padding-top: 96px;
          }

          .paramo-closing h2 {
            max-width: 10ch;
          }

          .paramo-closing-rule {
            margin-top: 2.6rem;
          }

          .paramo-sample-block {
            margin-top: 2.3rem;
          }

          .paramo-sample-label {
            margin-bottom: 0.55rem;
          }

          .paramo-sample-form {
            gap: 0.85rem;
            margin-top: 1.2rem;
          }

          .paramo-sample-form input {
            min-height: 50px;
          }

          .paramo-footer-bottom {
            text-align: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .paramo-homepage *,
          .paramo-homepage *::before,
          .paramo-homepage *::after {
            scroll-behavior: auto !important;
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}
