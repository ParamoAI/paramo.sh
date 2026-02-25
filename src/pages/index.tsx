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
        <meta property="og:description" content={`OpenClaw Implementation Studio. ${SITE_DESCRIPTION}`} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={`OpenClaw Implementation Studio. ${SITE_DESCRIPTION}`} />
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
            <div className="hero-tag animate-up">OpenClaw Implementation Studio</div>
            <h1 className="animate-up delay-1">
              We show you what's possible<br /><em>then we build it</em>
            </h1>
            <p className="hero-sub animate-up delay-2">
              Custom OpenClaw implementation for business owners. We operate at elevation so your business flows effortlessly downstream.
            </p>
            <div className="hero-actions animate-up delay-3">
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Book Your Discovery Call →
              </a>
              <a href="#services" className="btn-secondary">See What We Build</a>
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

      {/* SERVICES */}
      <section id="services">
        <div className="container">
          <div className="section-tag reveal">What We Build</div>
          <h2 className="section-title reveal">Automation that compounds</h2>
          <p className="section-subtitle reveal">
            Every system we build saves time today and creates leverage tomorrow. Here's what flows downstream from the páramo.
          </p>

          <div className="services-grid">
            <div className="service-card reveal">
              <div className="service-icon">⚡</div>
              <h3>AI Command Centers</h3>
              <p>A single dashboard managing multiple AI instances. Monitor, control, and optimize all your automations from one place.</p>
            </div>
            <div className="service-card reveal">
              <div className="service-icon">🔄</div>
              <h3>Workflow Automation</h3>
              <p>End-to-end systems that handle content creation, lead nurturing, customer onboarding, and operations — without you touching a thing.</p>
            </div>
            <div className="service-card reveal">
              <div className="service-icon">🧠</div>
              <h3>Custom AI Agents</h3>
              <p>Purpose-built agents trained on your business data. They think like you, respond like you, and work around the clock.</p>
            </div>
            <div className="service-card reveal">
              <div className="service-icon">📊</div>
              <h3>Data Pipelines</h3>
              <p>Automated collection, processing, and reporting. Turn raw data from scattered sources into actionable dashboards.</p>
            </div>
            <div className="service-card reveal">
              <div className="service-icon">✉️</div>
              <h3>Smart Outreach Systems</h3>
              <p>Personalized, AI-driven email and DM sequences that sound like you wrote them — because we trained the AI on your voice.</p>
            </div>
            <div className="service-card reveal">
              <div className="service-icon">🔗</div>
              <h3>Integration Architecture</h3>
              <p>We connect your entire stack — CRM, email, payments, scheduling, content — into one cohesive, automated ecosystem.</p>
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
              Three steps to elevation
            </h2>
            <p className="section-subtitle reveal" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              We don't sell vaporware. We map your workflow, build the system, and hand you the keys.
            </p>
          </div>

          <div className="process-steps">
            <div className="step reveal">
              <div className="step-number">1</div>
              <h3>Discovery Call</h3>
              <p>We map your current workflows and identify the highest-leverage automation opportunities in your business.</p>
            </div>
            <div className="step reveal">
              <div className="step-number">2</div>
              <h3>We Build It</h3>
              <p>Our team designs, builds, and tests your custom automation. You see demos at every stage — proof, not promises.</p>
            </div>
            <div className="step reveal">
              <div className="step-number">3</div>
              <h3>You Grow</h3>
              <p>We deploy, train your team, and provide ongoing support. The system runs. You get your time back.</p>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section id="results">
        <div className="container">
          <div className="section-tag reveal">Results</div>
          <h2 className="section-title reveal">What flows downstream</h2>
          <p className="section-subtitle reveal">
            Real outcomes from real entrepreneurs. Every claim has a build behind it.
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
              Service tiers designed for growth
            </h2>
            <p className="section-subtitle reveal" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              Every engagement starts with a discovery call. No surprises, no hidden fees.
            </p>
          </div>

          <div className="pricing-grid">
            <div className="price-card reveal">
              <div className="price-tier">OpenClaw</div>
              <div className="price-amount">$500 <span>setup</span></div>
              <p className="price-desc">Your own AI assistant, fully set up and ready to go. No technical skills needed.</p>
              <ul className="price-features">
                <li>We set it up for you</li>
                <li>No coding required</li>
                <li>Runs 24/7 on a virtual server</li>
                <li>Control it from any messenger</li>
                <li>10 skills pre-installed</li>
              </ul>
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="price-btn price-btn-primary">
                Get Started
              </a>
            </div>
            <div className="price-card reveal">
              <div className="price-tier">Summit</div>
              <div className="price-amount">Custom</div>
              <p className="price-desc">Full-stack AI infrastructure for businesses ready to go all-in on automation.</p>
              <ul className="price-features">
                <li>Unlimited automations</li>
                <li>Dedicated automation lead</li>
                <li>Custom AI agent development</li>
                <li>Integration architecture</li>
                <li>White-glove onboarding</li>
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
            Let's build something<br />for your workflow
          </h2>
          <p className="section-subtitle reveal">
            Book a free discovery call. We'll map your business, show you what's possible, and build the plan — no pressure, no jargon.
          </p>
          <div className="reveal">
            <a 
              href={CALENDLY_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary" 
              style={{ fontSize: '1.05rem', padding: '1rem 2.5rem' }}
            >
              Book Your Discovery Call →
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
