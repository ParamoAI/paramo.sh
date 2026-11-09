import Lenis from 'lenis'

/*
  One rAF loop for the page, after the Scrolltide Tarn template: Lenis
  advances first, then every scroll-driven piece reads the scroll position and
  writes its own styles. Nothing goes through React state while scrolling, so
  the page never re-renders mid-scroll.
*/

type Tick = (time: number) => void

const subscribers = new Set<Tick>()
let started = false

export const clamp = (v: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v))

export function startScroll(): () => void {
  if (started) return () => {}
  started = true
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const lenis = reduced ? null : new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 0.9 })

  let raf = 0
  const loop = (time: number) => {
    lenis?.raf(time)
    subscribers.forEach((fn) => fn(time))
    raf = requestAnimationFrame(loop)
  }
  raf = requestAnimationFrame(loop)

  return () => {
    cancelAnimationFrame(raf)
    lenis?.destroy()
    started = false
  }
}

export function onFrame(fn: Tick): () => void {
  subscribers.add(fn)
  return () => {
    subscribers.delete(fn)
  }
}
