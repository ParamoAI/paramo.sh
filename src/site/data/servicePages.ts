/*
  Service pages: one page per offering, each aimed at the search people use
  for it (see seo-audit/SEO audit 2026-11-08.md). Address:
  /what-we-do/{slug}/. The What we do page stays the overview and links here.

  Brand rules: no em dashes, no exclamation marks, no hype words. Every
  example is from Páramo's own client work ("Páramo Client Results" doc);
  projections are labelled as projections.
*/

import { AGENTS_PROCESS, CAIO_PROCESS, STRATEGY_PROCESS, WORKSHOP_PROCESS } from './services'

export type ServicePage = {
  slug: string
  seoTitle: string
  seoDescription: string
  eyebrow: string
  title: string
  lede: string
  forWho: { title: string; intro: string; signs: string[] }
  deliverables: { title: string; items: { name: string; body: string }[] }
  process: { title: string; steps: { n: string; title: string; body: string }[] }
  examples: { title: string; intro: string; items: { who: string; body: string; href?: string }[] }
  faq: { q: string; a: string }[]
  next: { title: string; body: string; links: { label: string; href: string }[] }
}

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: 'ai-strategy',
    // aims at "ai consulting for small business" (590, difficulty 3) and
    // "ai strategy consulting" (720)
    seoTitle: 'AI Consulting for Small Business: AI Strategy | Páramo',
    seoDescription:
      'AI consulting for small and growing businesses in the Twin Cities. We map where your hours go and hand you a ranked plan: what to automate now and what can wait.',
    eyebrow: 'What we do · AI Strategy',
    title: 'AI consulting for small businesses, starting with a clear plan.',
    lede: 'We map where your hours and money go, then hand you a ranked plan: what to automate now, what can wait, and what to leave alone.',
    forWho: {
      title: 'Who it is for',
      intro: 'Leadership teams who know AI matters but do not want to spend on tools before they know where they fit.',
      signs: [
        'Your team uses AI here and there, but there is no plan behind it.',
        'You have tried a pilot or two, and nothing has spread across the company.',
        'You are being pitched AI software every week and cannot tell what is worth buying.',
        'You want a clear first project, with the hours it should save, before you commit budget.',
      ],
    },
    deliverables: {
      title: 'What you get',
      items: [
        {
          name: 'A time and workflow audit',
          body: 'How the work actually moves through your company, team by team, and where the hours go each week.',
        },
        {
          name: 'Ranked opportunities',
          body: 'Each one with an estimate of hours saved, cost to build and difficulty, sorted into automate now, wait, or leave alone.',
        },
        {
          name: 'A roadmap you can act on',
          body: 'The order to do things in, what each step needs, and who on your team owns it.',
        },
        {
          name: 'A first project, chosen together',
          body: 'We walk your leadership team through the plan and agree where to start.',
        },
      ],
    },
    process: { title: 'How it works', steps: STRATEGY_PROCESS.steps },
    examples: {
      title: 'What it looks like in practice',
      intro: 'A strategy engagement usually turns up a handful of quick wins and one or two bigger projects. A few recent examples:',
      items: [
        {
          who: 'Accounting firm',
          body: 'Six ranked findings, including no system to flag clients who had gone quiet, and a four-day quick-wins plan the owner can run alone. Projected: about 9 hours a week back.',
        },
        {
          who: 'Wellness brand founder',
          body: 'Four quick-win workflows, and a task that now prepares her for every meeting booked through her scheduling link. Projected: about 5.5 hours a week back.',
        },
        {
          who: 'Storage Advisors, commercial real estate',
          body: 'The assessment found every new inquiry waited on a confidentiality agreement sent by hand. We then automated it on their own Gmail, HubSpot and PandaDoc.',
          href: '/case-studies/storage-advisors/',
        },
      ],
    },
    faq: [
      {
        q: 'Do we need to be using AI already?',
        a: 'No. Many companies start here before they have bought anything, so the plan decides which tools are worth paying for.',
      },
      {
        q: 'Who from our team needs to be involved?',
        a: 'One hour with you at the start, short one-on-ones with the people doing the work, and your leadership team for the final walkthrough.',
      },
      {
        q: 'What happens after the plan?',
        a: 'Some teams run the quick wins themselves. Others have us build the first project, train the team, or stay on as a fractional chief AI officer to lead the rollout.',
      },
      {
        q: 'Is this only for large companies?',
        a: 'No. We work with growing businesses, from owner-led teams to companies with several departments. The plan is sized to how your business actually runs.',
      },
    ],
    next: {
      title: 'After the strategy',
      body: 'The plan usually leads to one of these.',
      links: [
        { label: 'Team AI Workshops', href: '/what-we-do/team-ai-workshops/' },
        { label: 'Fractional Chief AI Officer', href: '/what-we-do/fractional-chief-ai-officer/' },
        { label: 'Managed Agents', href: '/what-we-do/managed-agents/' },
      ],
    },
  },

  {
    slug: 'team-ai-workshops',
    // aims at "ai training for employees" (320, difficulty 2) and
    // "ai training for small business"
    seoTitle: 'AI Training for Employees at Small Businesses | Páramo',
    seoDescription:
      'Hands-on AI training for employees at small businesses, built around the work your team actually does. On-site workshops in the Twin Cities, from 90 minutes to a full day.',
    eyebrow: 'What we do · Team AI Workshops',
    title: 'AI training for your whole team, on their real work.',
    lede: 'Hands-on sessions in plain language, built around the tasks your people actually do, so AI becomes part of the job instead of another login.',
    forWho: {
      title: 'Who it is for',
      intro: 'Teams where a few people use AI well and most have not started, or started and stopped.',
      signs: [
        'Leadership wants the team using AI, but the team is not sure where it fits their job.',
        'People have tried ChatGPT or Claude on their own, with mixed results.',
        'You are rolling out a business AI plan and want people to actually use it.',
        'You want everyone working from the same habits and the same rules.',
      ],
    },
    deliverables: {
      title: 'What you get',
      items: [
        { name: 'An assessment first', body: 'We learn where your team’s hours go and where everyone stands with AI today, so the session fits your people.' },
        { name: 'A working session on site', body: '90 minutes, a half day or a full day, practiced on your own tools and simple builds, not generic demos.' },
        { name: 'Done-with-you hours', body: 'Time after the session, as a group or one on one, building the workflows your team asked for.' },
        { name: 'Material to keep', body: 'A prompt guide, a simple framework for writing good prompts, and first-week homework.' },
      ],
    },
    process: { title: 'How a workshop works', steps: WORKSHOP_PROCESS.steps },
    examples: {
      title: 'What it looks like in practice',
      intro: 'Workshops are measured: we survey the team before and after.',
      items: [
        {
          who: 'SafeRide Health, medical transportation',
          body: 'A paid hands-on Claude workshop for the account management team. Clarity on where AI could help rose from 2.3 to 4.2 out of 5, and confidence using it from 2.5 to 3.7.',
          href: '/case-studies/saferide-health/',
        },
        {
          who: 'Free lunch and learns',
          body: 'About eight so far across five Twin Cities coworking spaces, with rooms of 5 to 30 people. The SafeRide Health workshop came out of one of them.',
        },
      ],
    },
    faq: [
      { q: 'Does our team need to be technical?', a: 'No. Everything is in plain language and practiced on the work people already do.' },
      { q: 'Which AI tools do you teach?', a: 'Mostly Claude and ChatGPT on business plans, connected to the tools your team already uses. If you already pay for Microsoft 365 or Google Workspace, we start there.' },
      { q: 'Is it in person or remote?', a: 'The working session is on site. Follow-up hours can be in person or remote.' },
      { q: 'What happens after the workshop?', a: 'The done-with-you hours turn what people learned into workflows they use every week. Some teams then add an AI Strategy or a fractional chief AI officer.' },
    ],
    next: {
      title: 'Often paired with',
      body: 'Teams that want more than one session usually add one of these.',
      links: [
        { label: 'AI Strategy', href: '/what-we-do/ai-strategy/' },
        { label: 'Fractional Chief AI Officer', href: '/what-we-do/fractional-chief-ai-officer/' },
        { label: 'AI Concierge', href: '/what-we-do/' },
      ],
    },
  },
  {
    slug: 'fractional-chief-ai-officer',
    // aims at "fractional chief ai officer" (70 searches a month, growing)
    seoTitle: 'Fractional Chief AI Officer for Growing Businesses | Páramo',
    seoDescription:
      'A fractional chief AI officer for growing businesses: senior AI leadership without a full-time hire. Roadmap, vendor decisions, AI policy and rollout.',
    eyebrow: 'What we do · Fractional Chief AI Officer',
    title: 'A fractional chief AI officer, without the full-time hire.',
    lede: 'We own your AI roadmap alongside your leadership team: choosing tools and vendors, setting the rules, and leading the rollout, part time.',
    forWho: {
      title: 'Who it is for',
      intro: 'Companies that need someone senior to own AI, but not a full-time executive salary.',
      signs: [
        'AI is on the leadership agenda every month, and nobody owns it.',
        'Vendors keep pitching AI features and you need someone to say which are worth it.',
        'You need an AI use policy your team will actually follow.',
        'You want progress reviewed on a schedule, not when someone remembers.',
      ],
    },
    deliverables: {
      title: 'What you get',
      items: [
        { name: 'An AI roadmap and priorities', body: 'Built from an AI Strategy, kept current as the business changes.' },
        { name: 'Tool and vendor decisions', body: 'We vet software before you buy it, sit in on sales demos and tell you what to skip.' },
        { name: 'An AI use policy and training', body: 'Written for your company, kept current, and taught to the people who use each tool, new hires included.' },
        { name: 'A monthly leadership meeting', body: 'Progress, next priorities, and a quarterly review of what saved time and what did not.' },
      ],
    },
    process: { title: 'How it works', steps: CAIO_PROCESS.steps },
    examples: {
      title: 'What it looks like in practice',
      intro: 'Much of the role is the groundwork that lets AI spread safely across a company.',
      items: [
        {
          who: 'SafeRide Health, medical transportation',
          body: 'Alongside their team workshop, we drafted their AI use policy and a connector-by-connector rollout plan, starting with meeting notes and Microsoft 365, with a point of view on data retention for a healthcare company.',
          href: '/case-studies/saferide-health/',
        },
      ],
    },
    faq: [
      { q: 'How is this different from AI Strategy?', a: 'AI Strategy is a plan. A fractional chief AI officer stays on to lead it: monthly with your leadership team, every quarter for a review.' },
      { q: 'Do we need an AI Strategy first?', a: 'It is the starting point. If we have not done one yet, that is the first month.' },
      { q: 'Will you replace our IT team or vendors?', a: 'No. We work with them, help choose the right tools, and make sure what gets bought actually gets used.' },
      { q: 'How much of our time does it take?', a: 'A standing monthly leadership meeting, plus time with the people rolling out each new tool.' },
    ],
    next: {
      title: 'Often paired with',
      body: 'The role usually draws on these.',
      links: [
        { label: 'AI Strategy', href: '/what-we-do/ai-strategy/' },
        { label: 'Team AI Workshops', href: '/what-we-do/team-ai-workshops/' },
        { label: 'Managed Agents', href: '/what-we-do/managed-agents/' },
      ],
    },
  },
  {
    slug: 'managed-agents',
    // aims at "ai agents for small business" (260, difficulty 3) and
    // "ai automation for small business" (210, difficulty 3)
    seoTitle: 'AI Agents and Automation for Small Business | Páramo',
    seoDescription:
      'AI agents and automation for small businesses, built on the tools you already use, then monitored and maintained by us. Lead replies, follow-ups, records and reports.',
    eyebrow: 'What we do · Managed Agents',
    title: 'AI agents for your small business, run by us.',
    lede: 'Agents built around your business that answer, follow up, report and keep work moving. We monitor them, improve them and maintain them so you do not have to.',
    forWho: {
      title: 'Who it is for',
      intro: 'Businesses with repeat work that follows the same steps every time, and no one free to build or babysit an AI system.',
      signs: [
        'New inquiries wait because one person handles them by hand.',
        'Information gets typed from one system into another.',
        'Follow-ups and reports happen when someone remembers.',
        'You want it running on your own tools, with a person approving what goes to customers.',
      ],
    },
    deliverables: {
      title: 'What you get',
      items: [
        { name: 'Agents built on your tools', body: 'Connected to the email, customer records, accounting and documents you already use.' },
        { name: 'A person in the loop', body: 'Anything a customer sees is drafted for someone on your team to approve, until you choose otherwise.' },
        { name: 'A simple record', body: 'Each run reports what it did, so you can see the work without opening the system.' },
        { name: 'Monitoring and upkeep', body: 'We watch it, fix what breaks, and keep it current as your business changes. It stays yours.' },
      ],
    },
    process: { title: 'How it works', steps: AGENTS_PROCESS.steps },
    examples: {
      title: 'What it looks like in practice',
      intro: 'A few agents we have built and run:',
      items: [
        {
          who: 'Storage Advisors, commercial real estate',
          body: 'Every new inquiry is matched to the right confidentiality agreement, logged in HubSpot and drafted as a Gmail reply for a person to send. Two weeks after launch the broker was approving replies from his phone.',
          href: '/case-studies/storage-advisors/',
        },
        {
          who: 'Junk removal company',
          body: 'Website leads now land in QuickBooks on their own, checked for duplicates, with a report on every run.',
          href: '/case-studies/junk-removal-quickbooks/',
        },
        {
          who: 'Business coaching firm',
          body: 'Every evening at 6pm, the day’s client meetings are summarized and filed in the right client folder.',
          href: '/case-studies/coaching-meeting-notes/',
        },
      ],
    },
    faq: [
      { q: 'Will the agent talk to our customers on its own?', a: 'Not at first. It drafts, a person approves. Automatic sending is a later choice, made after weeks of drafts that work.' },
      { q: 'Where does it run?', a: 'On the tools and accounts you already have. Nothing is hidden in a platform you cannot see.' },
      { q: 'What if something breaks?', a: 'Monitoring is part of the service. We fix it, and each run’s report shows you what happened.' },
      { q: 'Do we own it?', a: 'Yes. It is built in your accounts and documented.' },
    ],
    next: {
      title: 'Often paired with',
      body: 'Agents work best with a plan behind them.',
      links: [
        { label: 'AI Strategy', href: '/what-we-do/ai-strategy/' },
        { label: 'Fractional Chief AI Officer', href: '/what-we-do/fractional-chief-ai-officer/' },
        { label: 'Team AI Workshops', href: '/what-we-do/team-ai-workshops/' },
      ],
    },
  },
]
