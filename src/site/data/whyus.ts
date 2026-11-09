/*
  The "Why us" page (new address /why-us/).

  The page tells one story: results, then why us, then come and meet us at
  a free event near you. Anything marked `placeholder: true` is waiting on
  Dennis and Adrian (videos, event dates, photos, Eventbrite links, the
  dance write-up) and renders as a visibly unfinished note.

  Reasons and the humanity line are drafts for the founders to confirm.
  Brand rules: no em dashes, no exclamation marks, no hype words.
*/

export type Slot = { text: string; placeholder?: boolean }

export const WHY_HEADER = {
  eyebrow: 'Why us',
  title: 'We don’t sell AI. We put it to work.',
  video: { text: 'Featured client video, 30 to 60 seconds, captioned.', placeholder: true } as Slot,
}

/* Draft: confirm each reason is true for every client before launch. */
export const REASONS = {
  eyebrow: 'Why Páramo',
  title: 'Four reasons growing companies choose us.',
  items: [
    {
      numeral: 'i',
      title: 'We start with how you already work.',
      body: 'We sit with the people doing the work, fix the process first, and build on the systems your teams already use, from Microsoft 365 to HubSpot.',
    },
    {
      numeral: 'ii',
      title: 'We get you past the pilot.',
      body: 'Leadership is often further ahead on AI than the teams doing the work. We train each team on its own tasks and roll out one tool at a time, so it spreads across departments instead of stalling in one.',
    },
    {
      numeral: 'iii',
      title: 'Rules before rollout.',
      body: 'An AI use policy, clear guidance on what data goes where, and a monthly review with your leadership team, so AI grows with oversight built in.',
    },
    {
      numeral: 'iv',
      title: 'You own what we build.',
      body: 'Everything is set up in your company’s accounts and documented, so your teams can run it and nothing depends on us.',
    },
  ],
}

export const VOICES = {
  // Hidden until the client videos are in. Flip to true to bring the
  // section back (tracked in Jira under "Finish the Páramo website").
  show: false,
  eyebrow: 'In their words',
  title: 'Clients, on camera.',
  // one card per client video; each links to that client's result
  videos: [
    { who: 'Client name and business', place: 'City', quote: 'A short line from the video.', resultHref: '/case-studies/' },
    { who: 'Client name and business', place: 'City', quote: 'A short line from the video.', resultHref: '/case-studies/' },
    { who: 'Client name and business', place: 'City', quote: 'A short line from the video.', resultHref: '/case-studies/' },
  ],
}

export const WORKSHOPS = {
  eyebrow: 'Free workshops',
  title: 'Come to our next free workshop.',
  lede: 'Pick your city, or the one nearest you. Every workshop is free, in person, and built for business leaders.',
  cities: [
    {
      city: 'Minneapolis',
      domain: 'AIforBusinessMinneapolis.com',
      next: { text: 'Next date, venue and topic, from Eventbrite.', placeholder: true } as Slot,
    },
    {
      city: 'St. Paul',
      domain: 'AIforBusinessStPaul.com',
      next: { text: 'Next date, venue and topic, from Eventbrite.', placeholder: true } as Slot,
    },
  ],
  // one large + four small fills the 4-column grid. The Coco photos come
  // from Dropbox (2026-08-21 lunch and learn); the rest Dennis sent directly.
  photos: [
    { src: '/assets/paramo/events/lunch-learn-presenting.jpg', alt: 'Adrian and Dennis leading a lunch and learn', position: 'center 45%' },
    { src: '/assets/paramo/events/coco-adrian-speaking.jpg', alt: 'Adrian speaking at a lunch and learn at Coco Coworking Space', position: 'center' },
    { src: '/assets/paramo/events/lunch-learn-room.jpg', alt: 'A full room at a Páramo lunch and learn', position: 'center 40%' },
    { src: '/assets/paramo/events/coco-adrian-table.jpg', alt: 'Adrian talking with business owners at Coco Coworking Space', position: 'center' },
    { src: '/assets/paramo/events/lunch-learn-demo.jpg', alt: 'Adrian and Dennis walking a group through a live demo', position: 'center' },
  ],
}

/* Draft line for the founders to confirm or rewrite. */
export const HUMANITY = {
  eyebrow: 'Beyond business',
  title: 'The more we automate, the more time we have for each other.',
  body: [
    {
      text: 'We believe AI should help scale humanity, not replace it. So we also host dance events, where people connect with each other through an expressive form of dance.',
    },
    { text: 'A few lines on the dance events: what they are called, how often they happen, and why they matter to you.', placeholder: true },
  ] as Slot[],
  next: { text: 'Next dance event: date, place and sign-up link.', placeholder: true } as Slot,
  photos: 3, // one tall + two small fills the 2-column grid
}
