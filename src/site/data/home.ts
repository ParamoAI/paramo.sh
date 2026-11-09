/*
  Every word below the hero lives here, so copy changes never touch layout.
  Pattern borrowed from the Scrolltide Verge template's agencyData.ts.

  Brand rules for anything added here: no em dashes, no exclamation marks,
  no hype words. Calm, plain, second person. Short sentences.

  Numbers come from the case studies on paramo.sh (src/data/case-studies.ts
  in the site repo). Do not add a figure that is not backed by one.
*/

// one booking link for the whole site, set in src/config/site.ts
export { CALENDLY_URL } from '../../config/site'

export const PROBLEM = {
  eyebrow: 'The problem',
  headline: 'You started a business,',
  headlineEm: 'not a desk job.',
  lede: 'The work you are good at gets squeezed by the work that just has to get done.',
  pains: [
    {
      title: 'The phone rings while you are on a job.',
      body: 'By the time you call back, the lead has booked someone else.',
    },
    {
      title: 'Your evenings belong to admin.',
      body: 'Quotes, invoices, scheduling and follow-ups pile up after the real work is done.',
    },
    {
      title: 'It all lives in your head.',
      body: 'What your best people know is not written down, so every new hire starts from zero.',
    },
  ],
}

export const SERVICES = {
  eyebrow: 'What we do',
  headline: 'One job, done two ways.',
  lede: 'We put AI to work inside your business, then make sure your team can run it without us.',
  items: [
    {
      id: 'build',
      number: '01',
      title: 'Build the systems',
      summary:
        'We find the work that eats your week and build AI systems that take it off your plate. Calls answered, quotes drafted, books reconciled, follow-ups sent.',
      tags: ['Time audit', 'Custom AI agents', 'Automations'],
      deliverables: [
        'A map of where your hours go',
        'Agents built around how you already work',
        'Connected to the tools you use today',
        'Yours to keep, no lock-in',
      ],
    },
    {
      id: 'train',
      number: '02',
      title: 'Train your team',
      summary:
        'Your people learn to use AI in the work they already do, so the gains stay after we leave. Hands-on, in plain language, on your own jobs.',
      tags: ['Workshops', 'Playbooks', 'Ongoing support'],
      deliverables: [
        'Hands-on sessions with your team',
        'Written playbooks and procedures',
        'A point person on your side',
        'Check-ins as the systems grow',
      ],
    },
  ],
  linkLabel: 'See what we do',
  linkHref: '/what-we-do/',
}

/* Official partners only. Replace the text wordmarks with each program's
   official partner badge files once they are in hand. */
/* Official partners only. Replace the text wordmarks with each program's
   official partner badge files once they are in hand. Perplexity removed
   pending Dennis's confirmation. */
export const PARTNERS = {
  label: 'Official partner of',
  names: ['OpenAI', 'DevRev', 'Jotform'],
  // Official logos, white versions for the dark ridge photo. OpenAI and DevRev
  // as published on their own sites; Jotform's "transparent, white text" file
  // from jotform.com/resources. Heights balance each logo's built-in padding.
  logos: [
    { name: 'OpenAI', src: '/assets/partners/openai.svg', h: 'h-[24px] sm:h-[34px]' },
    { name: 'DevRev', src: '/assets/partners/devrev.svg', h: 'h-[20px] sm:h-[28px]' },
    { name: 'Jotform', src: '/assets/partners/jotform.svg', h: 'h-[64px] sm:h-[92px] -my-4 sm:-my-6' },
  ],
}

export const PROCESS = {
  eyebrow: 'How it works',
  headline: 'Three steps, in this order.',
  lede: 'No six-month strategy deck. You see working systems in weeks.',
  steps: [
    {
      step: '01',
      title: 'Audit',
      body: 'We spend time inside your week and find the work that should not need you.',
      outcome: 'A ranked list of what to fix first',
      href: '/what-we-do/ai-strategy/',
    },
    {
      step: '02',
      title: 'Optimize',
      body: 'We build the systems and connect them to the tools you already use.',
      outcome: 'Working systems, tested on real jobs',
      href: '/what-we-do/managed-agents/',
    },
    {
      step: '03',
      title: 'Automate',
      body: 'We run it alongside your team until it runs on its own.',
      outcome: 'A team that owns it',
      href: '/what-we-do/team-ai-workshops/',
    },
  ],
}

export const PROOF = {
  eyebrow: 'Results',
  headline: 'The work, and what changed.',
  stats: [
    {
      value: 2,
      suffix: ' wks',
      label: 'from launch until the broker was approving lead replies from his phone.',
      who: 'Storage Advisors, commercial real estate',
      href: '/case-studies/storage-advisors/',
    },
    {
      value: 30,
      suffix: '',
      label: 'employees with a written operating manual, built in days instead of months.',
      who: 'Home services company, Austin',
      href: '/case-studies/employee-training-sops/',
    },
    {
      value: 5,
      suffix: '',
      label: 'automations running a family diner’s marketing, with no new hires.',
      who: 'Skillet’z Cafe, Fremont',
      href: '/case-studies/skilletz-cafe/',
    },
  ],
  linkLabel: 'See all results',
  linkHref: '/case-studies/',
}

export const AUDIENCE = {
  eyebrow: 'Who it is for',
  headline: 'Growing companies whose teams are ready for AI.',
  headlineEm: 'And leaders who want it done right.',
  lede: 'If AI is happening in pockets of your company but not across it, this is for you.',
  trades: [
    'Home services',
    'Construction',
    'Healthcare',
    'Medical transportation',
    'Real estate',
    'Professional services',
    'Accounting',
    'Manufacturing',
    'Distribution',
    'Restaurants',
    'Retail',
    'Ecommerce',
  ],
}

/* Three most recent posts on paramo.sh. Titles are set without em dashes to
   match the brand; the articles themselves are unchanged. */
export const BLOG = {
  eyebrow: 'From the blog',
  headline: 'Notes from the field.',
  posts: [
    {
      slug: 'ai-labs-just-validated-implementation-gap',
      tag: 'Insights',
      date: 'Mar 21, 2026',
      readTime: '8 min read',
      title: 'OpenAI and Anthropic just proved the AI gap is implementation, not models',
    },
    {
      slug: 'agentic-ai-app-development-growth',
      tag: 'Insights',
      date: 'Mar 5, 2026',
      readTime: '7 min read',
      title: 'How agentic AI will reshape app development and growth',
    },
    {
      slug: 'real-cost-of-not-automating',
      tag: 'Small business',
      date: 'Feb 20, 2026',
      readTime: '8 min read',
      title: 'What manual work costs your small business: the real numbers',
    },
  ],
  linkLabel: 'Read the blog',
  linkHref: '/blog/',
}

export const CLOSING = {
  headline: 'Get your',
  headlineEm: 'week back.',
  lede: 'Book a free call. We will look at how your week actually runs and tell you plainly where AI would help, and where it would not.',
  cta: 'Book a call',
}

export const FOOTER = {
  nav: [
    { label: 'What we do', href: '/what-we-do/' },
    { label: 'Results', href: '/case-studies/' },
    { label: 'Who we are', href: '/who-we-are/' },
    { label: 'Why us', href: '/why-us/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Events', href: '/events/' },
  ],
  social: [
    { label: 'Discord', href: 'https://discord.com/invite/xXE9TqGju' },
    { label: 'X', href: 'https://x.com/tipbtdennis' },
  ],
  // every page links to the service pages so Google finds them
  services: [
    { label: 'AI consulting for small business', href: '/what-we-do/ai-strategy/' },
    { label: 'AI training for employees', href: '/what-we-do/team-ai-workshops/' },
    { label: 'Fractional chief AI officer', href: '/what-we-do/fractional-chief-ai-officer/' },
    { label: 'AI agents for small business', href: '/what-we-do/managed-agents/' },
  ],
  legal: '© 2026 Páramo. All rights reserved.',
}

/* The giant faint word behind each homepage scene, the way PÁRAMO sits
   behind the hummingbird. The process scene uses its three step titles. */
export const SCENE_WORDS = {
  problem: 'THE WEEK',
  services: 'TWO WAYS',
  proof: 'RESULTS',
  audience: 'FIVE TO FIFTY',
  blog: 'FIELD NOTES',
  closing: 'PÁRAMO',
}

/* "Who this is for", word for word from the live paramo.sh homepage
   (src/pages/index.tsx, problemItems and the section beside them). */
export const WHO = {
  eyebrow: 'Who this is for',
  headline: 'Your company runs on manual effort that should run on systems.',
  paragraphs: [
    'Your teams are good at what they do. It’s the manual work around it that slows them down: the follow-up, the data entry, the reporting, the process only a few people know. As you grow, that work grows with you.',
    'You’ve looked at AI, and some of your people already use it on their own. But scattered tools aren’t a plan, and most of what’s out there is a demo, not a system built around how your company actually works.',
  ],
  items: [
    {
      numeral: 'i',
      title: 'Too much lives in a few people’s heads.',
      body: 'How work gets done depends on the people who have always done it. When they are out or move on, the work slows down with them.',
    },
    {
      numeral: 'ii',
      title: 'Manual work is consuming your teams’ week.',
      body: 'Data entry, client follow-up, reporting, scheduling, inbox triage. Work that happens daily in every department, takes real hours, and rarely needs a person’s judgment.',
    },
    {
      numeral: 'iii',
      title: 'Your systems don’t talk to each other.',
      body: 'Customer records, inbox, accounting, project tools, payments. Each works alone. Together they leave gaps where work falls through and time is lost to handoffs.',
    },
    {
      numeral: 'iv',
      title: 'You’ve run pilots, but nothing has scaled.',
      body: 'Your teams have tried AI tools, and a few people use them well. But there’s distance between a promising pilot and a system the whole company runs on. That distance is where we work.',
    },
  ],
}

/* "Feel the difference": an illustrative week, held on screen while the
   tasks get handled one by one. Clearly labelled as an illustration; swap in
   a real client's week when there is one to show. */
export const FEEL = {
  eyebrow: 'Feel the difference',
  title: 'A week with AI that shows up for work.',
  note: 'An illustrative week for one team. Your numbers come out of your audit.',
  done: 'This is what a week looks like when the busywork runs itself.',
  tasks: [
    { before: '23 new inquiries waiting on a reply', after: 'Drafted with the right documents attached, ready to approve', hours: 3 },
    { before: 'A weekly report pulled by hand from four systems', after: 'Built on its own and in leadership’s inbox Monday', hours: 3 },
    { before: 'Meeting notes nobody had time to write up', after: 'Summarized and filed, next steps assigned', hours: 2 },
    { before: 'Invoices 30 days overdue', after: 'Reminders sent, payments coming in', hours: 1.5 },
    { before: 'A new hire asking how the process works', after: 'Procedures written and ready to share', hours: 2.5 },
  ],
}

/* Draft answers for Dennis and Adrian to confirm. */
export const FAQ = {
  eyebrow: 'Questions leaders ask',
  title: 'FAQ',
  items: [
    {
      q: 'Will AI make mistakes with my customers?',
      a: 'It can, which is why nothing goes out without your approval at first. You see what it does, correct it, and only let it run on its own once you trust it.',
    },
    {
      q: 'Is my data safe?',
      // Checked November 2026 against each company's own pages. The promise
      // covers business plans and developer platforms, not personal plans.
      a: 'Each platform has its own AI policy. OpenAI and Anthropic both state that, by default, they do not train their models on data from their business plans or their developer platforms. That covers ChatGPT Business and Enterprise, and Claude Team and Enterprise. Personal plans follow different rules, so we set your team up on business accounts. Your data also stays in your own accounts and the tools you already use.',
      sources: [
        { label: 'OpenAI: Enterprise privacy', href: 'https://openai.com/enterprise-privacy/' },
        {
          label: 'Anthropic: Is my data used for model training?',
          href: 'https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-model-training',
        },
      ],
    },
    {
      q: 'My team isn’t technical. Will they actually use it?',
      a: 'Yes. Training is part of the work. Your people learn it in plain language, on their own jobs.',
    },
    {
      q: 'Which AI should we use? We already pay for Microsoft 365 or Google.',
      a: 'Usually Claude or ChatGPT, on a business plan. If you already pay for Microsoft 365 or Google Workspace, some AI may already be included, and for part of your team that may be enough. We start with what you already pay for, and only suggest new seats for the people who will use them. And if you do not have any AI yet, we can help with that too.',
    },
    {
      q: 'Will it work with the software we already use?',
      a: 'Often, yes. We have connected AI to Gmail, Microsoft 365, HubSpot, QuickBooks, PandaDoc and Slack for clients, so nobody has to learn a new platform. Some industry software is harder to reach, so we check before we promise anything and tell you plainly what is possible.',
    },
    {
      q: 'Will AI replace people on my team?',
      // Census figure is from its 2024 survey of businesses using AI.
      a: 'That is your decision, not the software’s. In a 2024 Census Bureau survey, about 95 in 100 businesses using AI reported no change in how many people they employ. Most use it to take repetitive work off the people they already have, so those people have more time for customers and the work that needs them.',
      sources: [
        {
          label: 'US Census Bureau: AI use in business',
          href: 'https://www.census.gov/newsroom/press-releases/2024/business-trends-outlook-survey-artificial-intelligence-supplement.html',
        },
      ],
    },
  ],
}

export const MEET = {
  eyebrow: 'Meet us first',
  title: 'Not ready for a call? Come to a free workshop.',
  body: 'Free, in person, and built for business leaders. See what AI can do for your company before you spend anything.',
  cta: 'Find a free workshop near you',
  href: '/events/',
}

export const FOOTER_INVITE = {
  title: 'Have more questions?',
  cta: 'Book a call',
}
