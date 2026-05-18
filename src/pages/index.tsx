import Head from 'next/head';
import Script from 'next/script';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { 
  SITE_URL, 
  SITE_NAME, 
  SITE_TAGLINE, 
  SITE_DESCRIPTION, 
  OG_IMAGE,
  CALENDLY_URL 
} from '@/config/site';

const pageTitle = `${SITE_NAME} — ${SITE_TAGLINE}`;

export default function Home() {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}/`} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={`Custom AI systems for business owners. ${SITE_DESCRIPTION}`} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={`Custom AI systems for business owners. ${SITE_DESCRIPTION}`} />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Head>

      <ScrollReveal />
      <Nav />

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="gold-glow"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-tag animate-up">Custom AI Systems for Business Owners</div>
            <h1 className="animate-up delay-1">
              Save time, scale operations,<br /><em>and stop doing repetitive work</em>
            </h1>
            <p className="hero-sub animate-up delay-2">
              We design and implement AI-powered workflows, agents, and command centers that take work off your plate, streamline operations, and create leverage across your business.
            </p>
            <div className="hero-actions animate-up delay-3">
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Book a Discovery Call →
              </a>
              <a href="#results" className="btn-secondary">See Client Results</a>
            </div>
          </div>
        </div>
        <div className="scroll-cue">
          <span>Scroll</span>
          <div className="arrow"></div>
        </div>
      </section>

      {/* PROOF BAR */}
      <div className="proof-bar">
        <div className="container">
          <div className="proof-item reveal">
            <div className="proof-number">120+</div>
            <div className="proof-label">Automations Deployed</div>
          </div>
          <div className="proof-divider"></div>
          <div className="proof-item reveal">
            <div className="proof-number">40hrs</div>
            <div className="proof-label">Saved Per Client / Month</div>
          </div>
          <div className="proof-divider"></div>
          <div className="proof-item reveal">
            <div className="proof-number">5</div>
            <div className="proof-label">AI Instances, One Dashboard</div>
          </div>
          <div className="proof-divider"></div>
          <div className="proof-item reveal">
            <div className="proof-number">98%</div>
            <div className="proof-label">Client Retention</div>
          </div>
        </div>
      </div>

      {/* PROBLEMS */}
      <section>
        <div className="container">
          <div className="section-tag reveal">Who It's For</div>
          <h2 className="section-title reveal">If your business is running on too much manual work, we should talk</h2>
          <p className="section-subtitle reveal">
            We work with business owners, operators, and lean teams who need better systems, cleaner follow-up, and more leverage without adding unnecessary headcount.
          </p>

          <div className="services-grid">
            <div className="service-card reveal">
              <div className="service-icon">🧩</div>
              <h3>Disconnected Tools</h3>
              <p>Your CRM, inbox, calendar, reporting, and content systems live in separate tabs, which means work falls through the cracks.</p>
            </div>
            <div className="service-card reveal">
              <div className="service-icon">⏳</div>
              <h3>Too Much Repetitive Work</h3>
              <p>Manual follow-up, data entry, reporting, onboarding, and admin tasks keep stealing time that should go toward growth.</p>
            </div>
            <div className="service-card reveal">
              <div className="service-icon">🧠</div>
              <h3>Too Much Lives in Your Head</h3>
              <p>When your business logic, processes, and judgment are trapped inside a founder or operator, scale gets harder than it should be.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services">
        <div className="container">
          <div className="section-tag reveal">What We Build</div>
          <h2 className="section-title reveal">AI systems that remove bottlenecks and create leverage</h2>
          <p className="section-subtitle reveal">
            We build practical systems that take repetitive work off your team, keep operations moving, and make your business easier to run.
          </p>

          <div className="services-grid">
            <div className="service-card reveal">
              <div className="service-icon">⚡</div>
              <h3>AI Command Centers</h3>
              <p>One place to monitor and manage the workflows, automations, and AI systems that keep your business moving.</p>
            </div>
            <div className="service-card reveal">
              <div className="service-icon">🔄</div>
              <h3>Workflow Automation</h3>
              <p>Remove repetitive work across sales, operations, onboarding, delivery, and follow-up so execution keeps happening without manual babysitting.</p>
            </div>
            <div className="service-card reveal">
              <div className="service-icon">🧠</div>
              <h3>Custom AI Agents</h3>
              <p>Internal AI assistants trained on your workflows and business context so they can support decisions, content, and execution the way your team actually works.</p>
            </div>
            <div className="service-card reveal">
              <div className="service-icon">📊</div>
              <h3>Reporting and Data Pipelines</h3>
              <p>Turn scattered business data into useful reporting, visibility, and decision support without wasting hours stitching numbers together by hand.</p>
            </div>
            <div className="service-card reveal">
              <div className="service-icon">✉️</div>
              <h3>Lead Nurture and Outreach Systems</h3>
              <p>Build consistent follow-up across email, DMs, scheduling, and CRM workflows so prospects do not disappear just because your team got busy.</p>
            </div>
            <div className="service-card reveal">
              <div className="service-icon">🔗</div>
              <h3>Integration Architecture</h3>
              <p>Connect your CRM, calendar, inbox, payments, reporting, and content stack so the business behaves like one system instead of six separate tools.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="process-section">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <div className="section-tag reveal" style={{ justifyContent: 'center' }}>How It Works</div>
            <h2 className="section-title reveal" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              A practical path from bottleneck to system
            </h2>
            <p className="section-subtitle reveal" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              We audit the workflow, design the system, and implement it with you so the result actually gets used.
            </p>
          </div>

          <div className="process-steps">
            <div className="step reveal">
              <div className="step-number">1</div>
              <h3>We Audit Your Workflow</h3>
              <p>We identify repetitive work, hidden bottlenecks, broken handoffs, and the places where better systems would create the most leverage.</p>
            </div>
            <div className="step reveal">
              <div className="step-number">2</div>
              <h3>We Design Your AI System</h3>
              <p>We map the workflows, automations, agent behavior, and integrations needed to solve the problem cleanly.</p>
            </div>
            <div className="step reveal">
              <div className="step-number">3</div>
              <h3>We Implement and Refine</h3>
              <p>We build, test, and refine the system with your team so it runs reliably and actually gets adopted.</p>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section id="results">
        <div className="container">
          <div className="section-tag reveal">Results</div>
          <h2 className="section-title reveal">Proof that this works in the real world</h2>
          <p className="section-subtitle reveal">
            These are not generic AI demos. They are business systems that saved time, consolidated work, and created real operational leverage.
          </p>

          <div className="results-grid">
            <div className="result-card reveal">
              <div className="result-quote">
                "They built a Command Center that manages 5 AI instances from one dashboard. I didn't know this was possible."
              </div>
              <div className="result-stat">5x</div>
              <div className="result-stat-label">AI capacity from a single interface</div>
              <div className="result-author">
                <div className="result-avatar">JR</div>
                <div>
                  <div className="result-name">Jordan R.</div>
                  <div className="result-role">E-commerce Founder</div>
                </div>
              </div>
            </div>
            <div className="result-card reveal">
              <div className="result-quote">
                "She got her mornings back. The automation handles everything from lead capture to booking — no manual follow-up."
              </div>
              <div className="result-stat">40hrs</div>
              <div className="result-stat-label">Saved per month on operations</div>
              <div className="result-author">
                <div className="result-avatar">MP</div>
                <div>
                  <div className="result-name">Maria P.</div>
                  <div className="result-role">Online Course Creator</div>
                </div>
              </div>
            </div>
            <div className="result-card reveal">
              <div className="result-quote">
                "We went from 3 tools and daily manual work to one integrated system that runs while we sleep."
              </div>
              <div className="result-stat">3→1</div>
              <div className="result-stat-label">Consolidated into a single system</div>
              <div className="result-author">
                <div className="result-avatar">TK</div>
                <div>
                  <div className="result-name">Tyler K.</div>
                  <div className="result-role">Agency Owner</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <div className="section-tag reveal" style={{ justifyContent: 'center' }}>Pricing</div>
            <h2 className="section-title reveal" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              Start with the right level of support
            </h2>
            <p className="section-subtitle reveal" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              Whether you need a single AI assistant or a broader operating system for your business, we start with a discovery call and scope the right fit.
            </p>
          </div>

          <div className="pricing-grid">
            <div className="price-card reveal">
              <div className="price-tier">OpenClaw Setup</div>
              <div className="price-amount">$500 <span>setup</span></div>
              <p className="price-desc">A done-for-you AI assistant setup for business owners who want immediate leverage without touching the technical side.</p>
              <ul className="price-features">
                <li>We handle the implementation for you</li>
                <li>No coding or technical setup required</li>
                <li>Runs 24/7 on a virtual server</li>
                <li>Control it from your preferred messenger</li>
                <li>Ready to start doing useful work fast</li>
              </ul>
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="price-btn price-btn-primary">
                Get Started
              </a>
            </div>
            <div className="price-card reveal">
              <div className="price-tier">Summit</div>
              <div className="price-amount">Custom</div>
              <p className="price-desc">Custom AI systems for businesses that want to remove bottlenecks, integrate operations, and build durable leverage.</p>
              <ul className="price-features">
                <li>Priority workflow and systems design</li>
                <li>Custom automations and AI agent development</li>
                <li>Integration architecture across your stack</li>
                <li>Hands-on implementation support</li>
                <li>White-glove onboarding and refinement</li>
              </ul>
              <a href="#cta" className="price-btn price-btn-secondary">Let's Talk</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="cta-section">
        <div className="cta-bg"></div>
        <div className="container">
          <div className="section-tag reveal" style={{ justifyContent: 'center' }}>Ready?</div>
          <h2 className="section-title reveal">
            Let’s find the work<br />your business should stop doing manually
          </h2>
          <p className="section-subtitle reveal">
            Book a free discovery call. We’ll map the bottlenecks, identify the highest-leverage opportunities, and show you what the right system could look like.
          </p>
          <div className="reveal">
            <a 
              href={CALENDLY_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary" 
              style={{ fontSize: '1.05rem', padding: '1rem 2.5rem' }}
            >
              Book a Discovery Call →
            </a>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section id="newsletter" className="newsletter-section">
        <h2>Stay above the <span>clouds</span></h2>
        <p>AI insights, case studies, and Páramo updates — straight to your inbox.</p>
        <Script 
          async 
          data-uid="4d6bdfd214" 
          src="https://paramo-2.kit.com/4d6bdfd214/index.js"
        />
      </section>

      <Footer />
    </>
  );
}
