/*
  The about page (new address /who-we-are/).

  Anything marked `placeholder: true` is a slot for Dennis and Adrian to
  write; it renders as a visibly unfinished note so it cannot ship by
  accident.

  Brand rules: no em dashes, no exclamation marks, no hype words.
*/

export type Slot = { text: string; placeholder?: boolean }
export type Photo = { src: string; position?: string }

export const ABOUT_HEADER = {
  eyebrow: 'Who we are',
  title: 'AI that shows up for work.',
}

export const FOUNDERS = {
  eyebrow: 'The founders',
  title: 'Dennis and Adrian.',
  people: [
    {
      name: 'Dennis',
      linkedin: 'https://www.linkedin.com/in/dennismorales21/',
      // Las Vegas selfie, un-mirrored so the signs read correctly
      photo: { src: '/assets/paramo/founders/dennis-selfie.jpg', position: 'center 72%' },
      role: { text: 'Co-founder and CEO.' } as Slot,
      // drafted from Dennis's own calls (2026-10-27) and his answers; confirmed details only
      background: {
        text: 'Dennis is co-founder and CEO of Páramo, which he started with his brother Adrian in late 2025. After years in tech sales, selling financial software and then AI, he saw how often companies bought AI and never put it to work. Today he runs sales, sets client strategy, and builds workflows side by side with clients. Outside work, you’ll find him dancing salsa or at a table tennis table.',
      } as Slot,
    },
    {
      name: 'Adrian',
      linkedin: 'https://www.linkedin.com/in/adrian-morales2002/',
      photo: { src: '/assets/paramo/founders/adrian.webp', position: 'center 30%' },
      role: { text: 'Co-founder and COO.' } as Slot,
      background: {
        text: 'Two or three sentences on Adrian: background, what came before Páramo, and what Adrian brings to a client’s company.',
        placeholder: true,
      } as Slot,
    },
  ],
}

/* Our roots and the name, as one story. Approved by Dennis (draft A, with
   his edits). */
export const NAME = {
  eyebrow: 'Our roots',
  title: 'Rooted in Colombia. Named for its high ground.',
  body: [
    {
      text: 'Páramo was founded by Dennis and Adrian, two Colombians raised in households that taught them the same things: work hard, take care of family, and make a lot from a little.',
    },
    {
      text: 'When it came time to name the company, they wanted something that stood for the peak, the highest point of what technology can do. They found it in the páramo, the misty highland above the Andean cloud forest, and one of Colombia’s most remarkable places.',
    },
    {
      text: 'The more they learned about how a páramo works, the more it shaped how Páramo works. Its signature plant, the frailejón, pulls water out of the passing fog and releases it slowly into the streams below. Much of Bogotá’s (the capital of Colombia) water starts there.',
    },
    {
      text: 'Páramo catches the work already slipping through the week, shapes it into something reliable, and lets it run steadily on its own.',
    },
  ] as Slot[],
  steps: [
    {
      numeral: 'i',
      word: 'Catch',
      step: 'Audit',
      body: 'Like the frailejón catching fog, we start with what is already there: the hours, the handoffs and the tasks slipping through your week.',
    },
    {
      numeral: 'ii',
      word: 'Shape',
      step: 'Optimize',
      body: 'We turn that into systems built around how your business already runs, connected to the tools you use today.',
    },
    {
      numeral: 'iii',
      word: 'Release',
      step: 'Automate',
      body: 'Then it runs on its own, steadily, the way a páramo feeds the rivers below. Your team owns it.',
    },
  ],
}
