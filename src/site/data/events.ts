/*
  The Events page (new address /events/).

  Two kinds of events:
    - AI for Business: Páramo's free city events, one site per city.
    - Lunch and learns: hands-on sessions at coworking spaces.

  Past events come from the event folders in Dropbox (Source Library,
  July and August 2026). Anything marked `placeholder: true` is waiting on
  Dennis and Adrian (dates, Eventbrite links) and renders as an obvious note.

  Brand rules: no em dashes, no exclamation marks, no hype words.
*/

import { WORKSHOPS } from './whyus'

export type Slot = { text: string; placeholder?: boolean }

export const EVENTS_HEADER = {
  eyebrow: 'Events',
  title: 'Learn AI in the room, with other leaders.',
  lede: 'Free AI for Business events in the Twin Cities, and hands-on lunch and learns at coworking spaces around town.',
}

export const CITY_EVENTS = {
  eyebrow: 'AI for Business',
  title: 'Free events in your city.',
  body: 'A free, in-person event for business leaders to see what AI can do for their company, with real examples and time for questions.',
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
}

export const LUNCH_AND_LEARNS = {
  eyebrow: 'Lunch and learns',
  title: 'A hands-on hour over lunch.',
  body: 'A hands-on session for a small group. Everyone leaves with one workflow written down and a clear idea of where AI fits their work. About eight so far, across five Twin Cities coworking spaces, with rooms of 5 to 30 people.',
  host: {
    title: 'Want one at your office or coworking space?',
    cta: 'Book a call',
  },
  next: { text: 'Next lunch and learn: date, venue and sign-up link.', placeholder: true } as Slot,
}

/* From the Dropbox event folders. Add the rest as they are filed. */
export const PAST_EVENTS = {
  eyebrow: 'Past events',
  title: 'Where we have been.',
  items: [
    { date: 'Aug 21, 2026', kind: 'Lunch and learn', place: 'Coco Coworking Space' },
    { date: 'Jul 29, 2026', kind: 'Lunch and learn', place: 'Industrious' },
    { date: 'Jul 23, 2026', kind: 'Lunch and learn', place: 'WeWork' },
    { date: 'Jul 8, 2026', kind: 'Lunch and learn', place: 'Industrious' },
  ],
}

export const EVENT_PHOTOS = WORKSHOPS.photos
