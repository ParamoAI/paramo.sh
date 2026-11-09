import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import HomeTenex from './components/HomeTenex'
import Masthead from './components/Masthead'
import { clamp, onFrame, startScroll } from './lib/scroll'

/*
  Colibri — an original interface built over the hero footage.

  The backdrop machinery (video -> still crossfade, plate export) is inherited
  from the reconstruction. Everything above it is ours: layout, type, palette,
  copy, logo, navigation and the spec panel.

  Design notes
  ------------
  Structure is carried by hairlines and negative space rather than by boxes and
  drop shadows, which is what separates this from the stacked-glass-card look.
  There is exactly one filled surface on the page (the spec panel) and one solid
  button; everything else is type on the ground.

  The palette and type are the Páramo brand system: pine field, cream serif
  headlines, one gold accent. See index.css.

  Type is Fraunces over Inter - a high-contrast display serif against a clean
  grotesque, with the closing clause of the headline in gold italic.
*/

const BRAND = 'PÁRAMO'

const STAGE_W = 1920
const STAGE_H = 1080

/*
  Timing. Measured against the encoded clip: hummingbird-flight.mp4 runs
  6.00s. Content enters at the midpoint of the flight. The handoff has to wait
  for the clip to end, because only its final frame matches the still hero --
  crossfade even slightly early and you see a ghost.
*/
const REVEAL_AT = 3.00
// On phones the headline does not wait for mid-flight: it rises early, so a
// slow connection never shows an empty screen.
const PHONE_REVEAL_AT = 0.9

/*
  Phones. The desktop scene is a 16:9 frame scaled to cover the window; on a
  tall phone screen that zooms in so far the bird is cut off. On phones the
  frame is zoomed out instead, so the whole flight stays in view, and framed
  on the bird: (BIRD_X, BIRD_Y) is the middle of the bird on the 1920x1080
  frame, and PHONE_SPAN is how much of the frame's width fills the screen.
*/
const BIRD_X = 900
const BIRD_Y = 500
const PHONE_SPAN = 1240
const PHONE_BIRD_AT = 0.36 // the bird's middle sits 36% down the screen
const HANDOFF_AT = 6.05

// Snappier and tighter than the original's 2555ms drift - precision reads as
// expensive where slow drift reads as a screensaver.
const EASE = { type: 'spring', duration: 0.9, bounce: 0.06 } as const

const px = (n: number) => `${n}px`
const box = (x: number, y: number, w?: number, h?: number): React.CSSProperties => ({
  position: 'absolute',
  left: px(x),
  top: px(y),
  ...(w != null ? { width: px(w) } : null),
  ...(h != null ? { height: px(h) } : null),
})

type From = { x?: number; y?: number; fade?: boolean; delay?: number; duration?: number }

function Reveal({
  from,
  style,
  children,
  play,
  className,
}: {
  from: From
  style?: React.CSSProperties
  children?: React.ReactNode
  play: boolean
  className?: string
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ x: from.x ?? 0, y: from.y ?? 0, opacity: from.fade ? 0 : 1 }}
      animate={play ? { x: 0, y: 0, opacity: 1 } : undefined}
      transition={
        from.duration
          ? { duration: from.duration, delay: from.delay ?? 0, ease: [0.16, 1, 0.3, 1] }
          : { ...EASE, delay: from.delay ?? 0 }
      }
    >
      {children}
    </motion.div>
  )
}



export default function App() {
  const [scale, setScale] = useState(1)   // contain: the UI artboard
  const [phone, setPhone] = useState<{ s: number; x: number; y: number; h: number } | null>(null)
  const [cover, setCover] = useState(1)   // cover: the photographic scene
  const [play, setPlay] = useState(false)
  const [run] = useState(0) // bump to replay the intro; a refresh does the same
  const [word, setWord] = useState(false)

  const plateParam =
    typeof window !== 'undefined' ? new URLSearchParams(location.search).get('plate') : null
  const plate = plateParam !== null
  const plateEmpty = plateParam === 'empty'

  const copyRef = useRef<HTMLDivElement>(null)
  const birdRef = useRef<HTMLDivElement>(null)
  const wordRef = useRef<HTMLDivElement>(null)
  const veilRef = useRef<HTMLDivElement>(null)
  const mastRef = useRef<HTMLDivElement>(null)
  const scaleRef = useRef({ scale: 1, cover: 1 })
  // the phone headline is not on the scaled artboard, so its scroll offsets are 1:1
  scaleRef.current = { scale: phone ? 1 : scale, cover }

  /* Leaving the hero, after the Scrolltide Tarn template: the copy sinks and
     blurs back into the fog, the hummingbird lifts up and away faster than
     the ridges behind it, and a veil of mist thickens until the hero has become
     the cloud the next section stands on. Offsets are divided by each
     layer's own scale so they move in real screen pixels. */
  useEffect(() => {
    if (plate) return
    const stop = startScroll()
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return stop
    const off = onFrame(() => {
      const y = window.scrollY
      const vh = window.innerHeight
      if (y > vh * 1.6) return
      const p = clamp(y / vh)
      const { scale: s, cover: c } = scaleRef.current
      if (copyRef.current) {
        copyRef.current.style.transform = `translate3d(0, ${(y * 0.32) / s}px, 0)`
        copyRef.current.style.opacity = String(clamp(1 - p * 1.3))
        copyRef.current.style.filter = `blur(${p * 10}px)`
      }
      if (birdRef.current) {
        birdRef.current.style.transform = `translate3d(${(y * 0.12) / c}px, ${(-y * 0.42) / c}px, 0) scale(${1 + p * 0.1})`
        birdRef.current.style.opacity = String(clamp(1 - p * 0.95))
      }
      if (wordRef.current) {
        wordRef.current.style.transform = `translate3d(0, ${(y * 0.16) / c}px, 0)`
        wordRef.current.style.opacity = String(clamp(1 - p * 1.2))
      }
      if (veilRef.current) veilRef.current.style.opacity = String(clamp(p * 1.15))
      if (mastRef.current) mastRef.current.style.opacity = String(clamp(1 - p * 2.2))
    })
    return () => {
      off()
      stop()
    }
  }, [plate])

  useLayoutEffect(() => {
    const fit = () => {
      // Width-locked: the interface is exactly as wide as the window at
      // any size. Fitting it with Math.min pillarboxed it on anything
      // that was not 16:9. The backdrop keeps its own cover scale below.
      const w = window.innerWidth
      const h = window.innerHeight
      setScale(w / STAGE_W)
      if (w < 768 && h > w) {
        const s = w / PHONE_SPAN
        setPhone({ s, x: w / 2 - BIRD_X * s, y: h * PHONE_BIRD_AT - BIRD_Y * s, h })
        setCover(s)
      } else {
        setPhone(null)
        setCover(Math.max(w / STAGE_W, h / STAGE_H))
      }
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  useEffect(() => {
    setPlay(false)
    setWord(false)
    if (plate) {
      setWord(!plateEmpty)
      return
    }
    const a = setTimeout(() => setPlay(true), (window.innerWidth < 768 ? PHONE_REVEAL_AT : REVEAL_AT) * 1000)
    const b = setTimeout(() => setWord(true), HANDOFF_AT * 1000)
    return () => {
      clearTimeout(a)
      clearTimeout(b)
    }
  }, [run, plate, plateEmpty])

  /* The sequence plays once when the page loads and then holds. It used to
     restart on a timer, which makes a landing page feel like a screensaver.
     A refresh is the replay. */

  return (
    <>
    <div
      className="relative w-full overflow-hidden bg-[#18231e]"
      style={{ height: `max(calc(100vw * ${STAGE_H} / ${STAGE_W}), 100vh)` }}
    >
      {/* full-bleed layers live at the viewport, not inside the artboard —
          scaling a fixed 1920x1080 artboard to fit leaves bars on any window
          that is not 16:9 */}
      <div className="stage-bg" style={{ position: 'absolute', inset: 0 }} />
      {phone && (
        <img
          src="/assets/hummingbird-ground.webp"
          alt=""
          aria-hidden
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
        />
      )}

      {/* ---- the scene ---------------------------------------------------
          Ground, clip and hero share ONE coordinate system, scaled to COVER.
          They used to be split: the clip was full-bleed at the viewport while
          the hero sat inside the contain-scaled artboard. Those agree only on
          a 16:9 window -- at 1543x1063 cover is 0.98 and contain is 0.80, so
          the bird jumped 22% smaller at the handoff and the photographic
          ground was replaced by a flat gradient. Same layer, same scale, so
          the swap is invisible at any aspect ratio. The UI stays on the
          artboard below, which is what the layout was measured against. */}
      <div
        style={
          phone
            ? {
                position: 'absolute',
                left: 0,
                top: 0,
                width: px(STAGE_W),
                height: px(STAGE_H),
                transform: `translate(${phone.x}px, ${phone.y}px) scale(${phone.s})`,
                transformOrigin: 'top left',
                zIndex: 1,
                // the frame's edges dissolve into the full-screen ground behind it
                maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 62%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 62%, transparent 100%)',
              }
            : {
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: px(STAGE_W),
                height: px(STAGE_H),
                transform: `translate(-50%, -50%) scale(${cover})`,
                zIndex: 1,
              }
        }
      >
      {/* The footage's own soft-focus ground plate. It stays after the clip
          hands off to the still: the hero is just the hummingbird. The
          mountains come later, further down the page. */}
      <img
        src="/assets/hummingbird-ground.webp"
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <motion.video
        key={`bgvid-${run}`}
        autoPlay
        muted
        playsInline
        preload="auto"
        initial={{ opacity: 1 }}
        animate={{ opacity: word ? 0 : 1 }}
        transition={{ duration: 0.4, ease: 'easeIn' }}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      >
        {/* phones get a version about a seventh of the size */}
        <source src="/assets/hummingbird-flight-phone.webm" type="video/webm" media="(max-width: 767px)" />
        <source src="/assets/hummingbird-flight-phone.mp4" type="video/mp4" media="(max-width: 767px)" />
        <source src="/assets/hummingbird-flight.webm" type="video/webm" />
        <source src="/assets/hummingbird-flight.mp4" type="video/mp4" />
      </motion.video>
      <div className="pm-floor" />

        {/* ---- backdrop ------------------------------------------------- */}

        <motion.div
          className="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: word ? 1 : 0 }}
          transition={{ duration: 0.4, ease: 'easeIn' }}
          style={{ position: 'absolute', inset: 0 }}
        >
          {/* the giant PÁRAMO is wider than a phone frame, so phones skip it */}
          <div ref={wordRef} style={{ position: 'absolute', inset: 0, willChange: 'transform, opacity', display: phone ? 'none' : undefined }}>
          <div style={{ position: 'absolute', inset: 0 }}>
          <div
            className="wordmark"
            style={{
              ...box(16, 259, 1888, 255),
              fontFamily: 'var(--font-wordmark)',
              fontSize: px(365),
              lineHeight: px(365),
              letterSpacing: px(-14.59),
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            {BRAND}
          </div>
          </div>
          </div>
          <div ref={birdRef} style={{ position: 'absolute', inset: 0, willChange: 'transform, opacity' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src="/assets/haze.webp"
            alt=""
            style={{ ...box(212, -74, 1283, 1589), objectFit: 'fill', filter: 'blur(86px)' }}
          />
          <img
            src="/assets/hummingbird.webp"
            alt=""
            style={{ ...box(205, -75, 1290, 1596), objectFit: 'cover' }}
          />
          </div>
          </div>
        </motion.div>
      </div>

      {/* The fog the hero sinks into on scroll; opacity is driven above. */}
      <div
        ref={veilRef}
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          opacity: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(120% 70% at 50% 100%, rgba(189,193,174,1) 0%, rgba(189,193,174,0.88) 45%, rgba(189,193,174,0.4) 100%)',
        }}
      />


      {/* masthead: at the viewport edge, present from the first frame */}
      <Masthead ref={mastRef} />

      {phone && (
        <div
          ref={copyRef}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: Math.round(phone.h * 0.6),
            zIndex: 3,
            padding: '0 20px',
            textAlign: 'center',
            willChange: 'transform, opacity, filter',
          }}
        >
          <Reveal play={play} from={{ y: 40, fade: true, delay: 0, duration: 1.6 }}>
            <h1
              style={{
                margin: 0,
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: 'clamp(36px, 10.5vw, 48px)',
                lineHeight: 1.08,
                letterSpacing: '-0.015em',
                color: 'var(--hero-ink)',
                textShadow: '0 2px 24px rgba(24,35,30,0.55)',
              }}
            >
              Your AI transformation <em className="display-cut" style={{ fontStyle: 'italic' }}>partner.</em>
            </h1>
          </Reveal>
        </div>
      )}

      {!phone && (
      <div
        className={`relative${plate ? ' plate' : ''}`}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: px(STAGE_W),
          height: px(STAGE_H),
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          zIndex: 3,
        }}
        key={run}
      >
        <div ref={copyRef} style={{ position: 'absolute', inset: 0, willChange: 'transform, opacity, filter' }}>
        <div className="scrim" style={{ position: 'absolute', inset: '-20%', pointerEvents: 'none' }} />


        {/* the masthead now lives at the viewport layer, above */}

        {/* ---- headline --------------------------------------------------- */}


        {/* Centred over the hummingbird's tail feathers, rising slowly from below:
            a long ease-out so it surfaces like something coming up out of mist. */}
        <Reveal play={play} from={{ y: 120, fade: true, delay: 0.1, duration: 2.4 }} style={box(0, 676, 1920, 100)}>
          <h1
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: px(92),
              lineHeight: px(100),
              letterSpacing: '-0.015em',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              color: 'var(--hero-ink)',
              textShadow: '0 2px 30px rgba(24,35,30,0.45)',
            }}
          >
            Your AI transformation
          </h1>
        </Reveal>

        <Reveal play={play} from={{ y: 120, fade: true, delay: 0.7, duration: 2.4 }} style={box(0, 772, 1920, 100)}>
          <div
            className="display-cut"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: px(92),
              lineHeight: px(100),
              letterSpacing: '-0.015em',
              textAlign: 'center',
              color: 'var(--hero-ink)',
              textShadow: '0 2px 30px rgba(24,35,30,0.45)',
            }}
          >
            <em style={{ fontStyle: 'italic', color: 'var(--hero-ink)' }}>partner.</em>
          </div>
        </Reveal>

        </div>
      </div>
      )}

    </div>
    {!plate && <HomeTenex />}
    </>
  )
}
