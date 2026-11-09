import type { Ref } from 'react'
import { CALENDLY_URL } from '../data/home'
import { SHOW_EVENTS } from '../data/site'

/* Menu from the agreed site wireframe. Results keeps the existing
   /case-studies/ address so search rankings carry over. */
const ALL_NAV = [
  { label: 'What we do', href: '/what-we-do/' },
  { label: 'Results', href: '/case-studies/' },
  { label: 'Who we are', href: '/who-we-are/' },
  { label: 'Why us', href: '/why-us/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Events', href: '/events/' },
]
export const NAV = ALL_NAV.filter((l) => SHOW_EVENTS || l.href !== '/events/')

/* The masthead shared by every page: wordmark, centred menu, outlined
   Book a call. It sits at the viewport in real px, not on the hero artboard,
   and fades with the page header on scroll (the caller drives the ref). */
export default function Masthead({
  ref,
  current,
  tone = 'dark',
}: {
  ref?: Ref<HTMLDivElement>
  current?: string
  /* 'dark' sits over the hero's photography; 'light' sits on the sage page */
  tone?: 'dark' | 'light'
}) {
  const light = tone === 'light'
  return (
    <div
      ref={ref}
      className={light ? 'masthead-light' : undefined}
      style={{
        position: 'absolute',
        inset: '0 0 auto 0',
        height: 132,
        display: 'flex',
        alignItems: 'flex-start',
        paddingTop: 34,
        paddingLeft: 'clamp(20px, 2.5vw, 48px)',
        paddingRight: 'clamp(20px, 2.5vw, 48px)',
        gap: 24,
        background: light
          ? undefined
          : 'linear-gradient(180deg, rgba(24,35,30,0.88) 0%, rgba(24,35,30,0.5) 46%, rgba(24,35,30,0) 100%)',
        maskImage: light ? undefined : 'linear-gradient(180deg, #000 0%, #000 44%, transparent 100%)',
        WebkitMaskImage: light ? undefined : 'linear-gradient(180deg, #000 0%, #000 44%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 4,
      }}
    >
      <a href="/" className="flex items-center shrink-0" style={{ pointerEvents: 'auto' }}>
        <span
          className="display-cut"
          style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 400, letterSpacing: '-0.01em', color: light ? '#18231e' : '#f1ede3' }}
        >
          Páramo
        </span>
      </a>
      <nav className="masthead-nav" aria-label="Main">
        {NAV.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            aria-current={current === href ? 'page' : undefined}
            className="micro masthead-link"
            style={current === href ? { color: light ? '#18231e' : '#f1ede3' } : undefined}
          >
            {label}
          </a>
        ))}
      </nav>
      {/* Outlined, not gold: the page's one gold button lives in its content. */}
      <a href={CALENDLY_URL} className="micro masthead-cta">
        Book a call
      </a>
    </div>
  )
}
