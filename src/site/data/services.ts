/*
  The What We Do page (address /what-we-do/).

  Páramo's five core offerings, named by Dennis. Descriptions and the
  "includes" lists are drafts for Dennis and Adrian to confirm. No pricing
  on this page, by design.

  Brand rules: no em dashes, no exclamation marks, no hype words.
*/

export const SERVICES_PAGE = {
  eyebrow: 'What we do',
  title: 'Five ways we put AI to work in your business.',
  lede: 'Start with one, or combine them. Every engagement is built around how your business already runs.',
  closing: {
    title: 'Not sure which one fits?',
    body: 'Book a call. We will look at where your time goes and tell you plainly where to start.',
    cta: 'Book a call',
  },
}

export type Offering = {
  numeral: string
  name: string
  short: string
  body: string
  includes: string[]
}

export const OFFERINGS: Offering[] = [
  {
    numeral: 'i',
    name: 'AI Concierge',
    // per Dennis: side by side, hands-on, Claude set up for your own work
    short: 'We build it with you, side by side.',
    body: 'We sit with you, set up Claude for the way you work, and walk you through building the workflows your job needs, step by step, until you are building your own agentic workflows.',
    includes: ['Claude set up for you', 'Workflows built together', 'Agentic workflows for your role'],
  },
  {
    numeral: 'ii',
    name: 'Team AI Workshops',
    short: 'Your whole team, using AI in their real work.',
    body: 'Hands-on sessions in plain language, built around the tasks your people actually do.',
    includes: ['Tailored to your tools'],
  },
  {
    numeral: 'iii',
    name: 'AI Strategy',
    short: 'A clear plan for what to automate first.',
    body: 'We map where your hours and money go, then hand you a ranked plan: what to automate now, what can wait, and what to leave alone.',
    includes: ['Time and workflow audit', 'Ranked opportunities with estimated savings', 'A roadmap you can act on'],
  },
  {
    numeral: 'iv',
    name: 'Fractional Chief AI Officer',
    short: 'Senior AI leadership, without a full-time hire.',
    body: 'We own your AI roadmap alongside your leadership team: choosing tools and vendors, setting the rules, and leading the rollout, part-time.',
    includes: ['AI roadmap and priorities', 'Tool and vendor decisions', 'AI use policy and training', 'Monthly leadership meeting'],
  },
  {
    numeral: 'v',
    name: 'Managed Agents',
    short: 'AI agents that work for you, run by us.',
    body: 'Agents built around your business that answer, follow up, report and keep work moving. We monitor them, improve them and maintain them so you do not have to.',
    includes: ['Built on your tools', 'Monitored and maintained', 'Yours to keep'],
  },
]

/* How a paid team workshop runs, taken from how Páramo ran it for SafeRide
   Health (assessment July 16, findings July 27, working session August 11,
   done-with-you hours after). No pricing, by design. */
export const WORKSHOP_PROCESS = {
  title: 'How a paid workshop works',
  steps: [
    {
      n: '01',
      title: 'Assess',
      body: 'We sit with your team, learn where the hours go, and see where everyone stands with AI today.',
    },
    {
      n: '02',
      title: 'Plan',
      body: 'You get the findings, person by person: where your team’s hours go, what that time is worth, and what to build first.',
    },
    {
      n: '03',
      title: 'Learn',
      body: 'A working session on site: 90 minutes, a half day or a full day. Your team gets fluent in Claude: projects, skills, artifacts and your own tools connected, practiced on simple builds.',
    },
    {
      n: '04',
      title: 'Build together',
      body: 'Done-with-you hours, as a group or one on one, building the systems your team asked for so they actually get used.',
    },
    {
      n: '05',
      title: 'Keep going',
      body: 'Everyone leaves with a prompt guide, a simple framework for writing good prompts, and first-week homework.',
    },
  ],
}

/* Who the AI Concierge is for: the owner-operator or CEO who wants
   personal, side-by-side help getting AI into their own work. Draft for
   Dennis to confirm. */
export const CONCIERGE_FIT = {
  title: 'Who is the AI Concierge for?',
  intro:
    'Owners and CEOs who want AI working in their own day, and would rather build it with someone beside them than figure it out alone.',
  signs: [
    'You run the business, and your own calendar is the bottleneck.',
    'You have tried ChatGPT or Claude, but it never became part of how you work.',
    'You do not have hours to learn it yourself, and you learn faster by doing.',
    'You want it working on your own tasks first: email, meeting prep, reports and follow-ups.',
    'Your information is sensitive, so you want it set up properly in your own accounts.',
  ],
  notFor: [
    { text: 'Want your whole team trained at once?', see: 'Team AI Workshops' },
    { text: 'Want us to build and run it for you?', see: 'Managed Agents' },
  ],
}

/* Dennis's copy, exactly as written. The optional timing and price lines
   still had placeholders in square brackets, so they are left out. */
export const STRATEGY_PROCESS = {
  title: 'How an AI strategy engagement works',
  steps: [
    { n: '01', title: 'Kickoff', body: 'One hour with you on your goals, where the business feels stuck, and what you have already tried.' },
    { n: '02', title: 'Interview', body: 'Short one-on-ones with the people doing the work, so we see how each job moves from start to finish.' },
    { n: '03', title: 'Map', body: 'We add up the hours each workflow takes every week and what that time costs you.' },
    { n: '04', title: 'Rank', body: 'Each opportunity gets an estimate of hours saved, cost to build and difficulty, sorted into automate now, wait, or leave alone.' },
    { n: '05', title: 'Decide', body: 'We walk your leadership team through the plan and choose the first project together.' },
  ],
}

export const CAIO_PROCESS = {
  title: 'How a fractional chief AI officer works',
  steps: [
    { n: '01', title: 'Plan', body: 'We start from your AI Strategy. If we have not done one yet, that is the first month.' },
    { n: '02', title: 'Meet', body: 'A standing monthly meeting with your leadership team to review progress and set the next priorities.' },
    { n: '03', title: 'Choose', body: 'We vet software before you buy it, sit in on sales demos and tell you what to skip.' },
    { n: '04', title: 'Roll out', body: 'We write your AI use policy, keep it current, and train the people who will use each new tool, new hires included.' },
    { n: '05', title: 'Review', body: 'Every quarter we look at what saved time, what did not, and set the plan for the next quarter.' },
  ],
}

/* Draft steps for Dennis to confirm, written in the same plain style as the
   strategy and fractional chief AI officer steps. */
export const AGENTS_PROCESS = {
  title: 'How managed agents work',
  steps: [
    { n: '01', title: 'Pick', body: 'We choose one job worth handing off first, like answering after-hours calls or chasing overdue invoices.' },
    { n: '02', title: 'Build', body: 'We build the agent on the tools you already use and connect it to the information it needs.' },
    { n: '03', title: 'Test', body: 'It works alongside your team first. Nothing goes out until someone on your side has checked it.' },
    { n: '04', title: 'Launch', body: 'Once it gets the job right, it runs on its own, and you see a simple record of what it did.' },
    { n: '05', title: 'Improve', body: 'We watch it, fix what breaks, keep it current as your business changes, and add the next agent when you are ready.' },
  ],
}
