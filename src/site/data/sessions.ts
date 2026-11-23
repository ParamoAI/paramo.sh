/*
  The AI working session landing page, at /sessions/.

  ── Things to fill in later ──────────────────────────────────────
  Change these three settings and rebuild. Everything else on the page
  reads from them, so nothing else needs editing.

  PRICE         e.g. '$495'. Left empty, no price shows anywhere.
  SESSION_DATE  e.g. 'Thursday, January 15, 1 to 4pm'. Left empty, hidden.
  LOCATION      e.g. 'Coco Coworking, Minneapolis'. Left empty, hidden.
  SEATS_LEFT    seats still open, shown as "N of 10 seats left". Change the
                number here when a ticket sells.
  SEATS_URL     optional. The address of a small file that holds the live
                count, e.g. {"left": 7}. When set, the page reads it on load
                and shows that number in place of SEATS_LEFT.
  RESERVE_URL   the payment link. Left empty, "Reserve my seat" scrolls to
                the Reserve section and the email address is shown. Once set,
                the button goes straight to the payment link and the Reserve
                section shows a pay button in place of the email.

  The copy below is Dennis's, word for word (2026-11-22). Do not rewrite it.
*/

export const PRICE = '$500'
export const SESSION_DATE = ''
export const LOCATION = ''
export const RESERVE_URL = ''

export const SEATS_TOTAL = 10
export const SEATS_LEFT = 10
export const SEATS_URL = ''
export const SOLD_OUT = 'This session is sold out. Email us to hear about the next one.'

export const RESERVE_EMAIL = 'dennis@paramo.sh'

export const SEO = {
  title: 'AI Working Session for Business Owners in Minneapolis | Páramo',
  description:
    'Bring one task that eats your week. In three hours, in person, leave with AI doing it, or your money back.',
  path: '/sessions/',
}

export const HERO = {
  label: 'AI working session · Minneapolis',
  headline: 'Bring one task that eats your week.',
  headlineEm: 'Leave with AI doing it.',
  lede: 'One task off your plate in three hours, or your money back.',
  primary: 'Reserve my seat',
  secondary: 'See how it works',
  facts: [
    { value: '3', label: 'hours, in person' },
    { value: '10', label: 'owners per session' },
    { value: '1', label: 'task, running when you leave' },
  ],
}

/* Draft by Claude (2026-11-22), for Dennis to confirm. */
export const PROBLEM = {
  label: 'The problem',
  heading: 'You have tried AI. It has not taken a task off your plate.',
  body: 'You have a ChatGPT account. You have asked it a few questions. The quotes, the follow-ups and the invoices still land on you every week. The tool is not the problem. Nobody sat next to you and built it around one real task.',
}

export const FOR_WHO = {
  label: 'Who it is for',
  heading: 'Business owners who want AI working inside their business.',
  body: 'You have one repetitive task you are ready to hand off, and you know which tools it runs on. That is all you need to start.',
  notFor: 'This is not for you if you are still deciding whether AI is worth trying. Our free lunch and learns are the better first step.',
  tags: ['Writing quotes', 'Follow-up emails', 'Chasing invoices', 'Scheduling', 'Meeting notes', 'Weekly reports', 'Hiring replies'],
}

export const HOW = {
  label: 'How the three hours work',
  heading: 'Three steps, one afternoon.',
  steps: [
    { n: '01', title: 'Show us the task', body: 'You arrive with your ChatGPT account ready and a starter kit we built from your intake form.' },
    { n: '02', title: 'Build it with us', body: 'You work on your own task, on your own laptop, with hands-on help from our team.' },
    { n: '03', title: 'Run it for real', body: 'You test it on your own examples and leave with it working.' },
  ],
}

export const GET = {
  label: 'What you get',
  heading: 'Everything is set up before you sit down.',
  items: [
    { title: 'The session', body: 'Three hours in a room of ten owners, with our team helping you build.' },
    { title: 'Your starter kit', body: 'A ChatGPT project set up for your task, with the instructions written and your examples loaded.' },
    { title: 'The library', body: 'Our prompts and skills for follow-ups, quotes, scheduling, meeting notes and hiring, each with a worked example.' },
    { title: 'Your ChatGPT account', body: 'Set up by us, with the first month included, so you show up ready to work.' },
  ],
}

export const GUARANTEE = {
  label: 'The guarantee',
  heading: 'If it is not running, you do not pay.',
  body: 'Complete your intake form and stay for the full session. If your task is not running on AI when you leave, we finish it with you one-on-one within 14 days, or we refund your ticket.',
}

export const TEAM = {
  label: 'Who runs it',
  heading: 'A local team that teaches this every month.',
  body: [
    'Páramo is an AI transformation partner based in Minneapolis. We have been running free AI lunch and learns for Twin Cities businesses, helping people learn how to use AI and stay up to date.',
    'The working session is the next step: smaller room, your own task, and a result you take home.',
  ],
}

/* Proof. The numbers are the published SafeRide Health survey results
   (see /case-studies/saferide-health/). Wording drafted by Claude
   (2026-11-22), for Dennis to confirm. */
export const PROOF = {
  label: 'Proof',
  heading: 'What happened the last time we ran a paid workshop.',
  body: 'SafeRide Health brought us in to train their account management team. We surveyed the team before and after.',
  stats: [
    { value: '2.3 to 4.2', label: 'clarity on where AI could help, out of 5' },
    { value: '2.5 to 3.7', label: 'confidence using AI effectively, out of 5' },
    { value: '10 of 11', label: 'said the practical examples were what they valued most' },
  ],
  link: { label: 'Read the SafeRide Health result', href: 'https://paramo.sh/case-studies/saferide-health/' },
  partner: 'Páramo is an OpenAI Select Partner.',
  photos: [
    { src: '/assets/paramo/sessions/room.webp', alt: 'Dennis and Adrian leading a lunch and learn for a full room', position: 'center 38%' },
    { src: '/assets/paramo/sessions/table.webp', alt: 'Adrian talking with business owners at a coworking space', position: '92% center' },
  ],
}

export const QUESTIONS = {
  label: 'Common questions',
  heading: 'Before you reserve.',
  items: [
    { q: 'Do I need to be technical?', a: 'No. If you can write an email, you can do this. We handle the setup and sit with you while you build.' },
    { q: 'What do I bring?', a: 'A laptop, your logins for the tools your task uses, and two or three real examples of the task.' },
    { q: 'Is my data safe?', a: 'You remove client names before you share examples, we walk you through the privacy settings on your account, and we never film your screen.' },
    { q: 'Three hours is too long. Is there another way?', a: 'Yes. You can book a one-on-one session with us. Email dennis@paramo.sh if you are interested.' },
    { q: 'I have tried ChatGPT and it did not stick. Why would this be different?', a: 'You did not have a team from an OpenAI Select Partner sitting next to you, building it around your own task.' },
    { q: 'What happens after I reserve?', a: 'You get a short intake form about your task and your tools. We use it to build your starter kit and set up your account before the session.' },
  ],
}

export const RESERVE = {
  label: 'Reserve a seat',
  heading: 'Ten seats per session.',
  body: 'Email us the task you want off your plate and we will send dates and next steps.',
}
