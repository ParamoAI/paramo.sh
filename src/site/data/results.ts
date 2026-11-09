/*
  The Results page (address /case-studies/, kept from the live site).

  The first entries come from Dennis's "Páramo Client Results" doc
  (November 6, 2026) and have no detail page yet, so they carry no slug.
  The rest are the case studies already on paramo.sh, same slugs and order
  as src/data/case-studies.ts in the site repo. Every figure is lifted from
  its source; do not add one that is not backed there.
  Copy follows the brand rules: no em dashes, no exclamation marks.
*/

export const RESULTS_HEADER = {
  eyebrow: 'Results',
  title: 'The work, and what changed.',
  lede: 'Stories from businesses like yours, most of them here in the Twin Cities. The numbers are theirs.',
}

export type Section = { heading: string; paragraphs?: string[]; list?: string[]; steps?: string[] }

export type Result = {
  slug: string // address: /case-studies/{slug}/
  category: string
  client: string
  place: string
  headline: string
  description: string
  stat: string
  statLabel: string
  // new stories carry their write-up here; the original seven use the
  // HTML already published on paramo.sh (src/content/case-studies)
  body?: Section[]
  quote?: string
  video?: { text: string; placeholder?: boolean }
}

export const RESULTS: Result[] = [
  {
    slug: 'saferide-health',
    category: 'Healthcare',
    client: 'SafeRide Health',
    place: 'Medical transportation',
    headline: 'SafeRide Health’s team learned where Claude fits their work, in one workshop.',
    description:
      'A paid hands-on workshop for the account management team, plus an AI use policy and a plan for connecting their tools. Clarity on where AI could help rose from 2.3 to 4.2 out of 5.',
    stat: '2.3 to 4.2',
    statLabel: 'average team clarity on where AI could help, before and after the workshop, out of 5',
    body: [
      {
        heading: 'Who they are',
        paragraphs: ['A non-emergency medical transportation company.'],
      },
      {
        heading: 'What we did',
        list: [
          'Guided them onto Claude Enterprise, the business version of Claude, so the whole team works in one company account.',
          'Ran a paid 90-minute hands-on Claude workshop for the account management team: prompt structure, projects and scheduled tasks.',
          'Built demo data for the session, so no patient or client information was touched.',
          'Bundled four hours of follow-up help, one on one or as a group.',
          'Drafted their AI use policy.',
          'Built a connector rollout plan, one tool at a time, starting with meeting notes and Microsoft 365, with a point of view on data retention for a healthcare company.',
        ],
      },
      {
        heading: 'Results',
        paragraphs: [
          'We surveyed the team before and after, with 11 responses each and 10 matched attendees. Average clarity on where AI could help rose from 2.3 to 4.2 out of 5. Confidence using AI effectively rose from 2.5 to 3.7.',
          '10 of 11 attendees said the practical examples were what they valued most. Midway through, one attendee asked to set the demo data aside and run a real client email from that day. Claude came back with clarifying questions before drafting the reply.',
        ],
      },
      {
        heading: 'What happened next',
        paragraphs: [
          'The team proposed a company-wide set of their own definitions inside Claude, and their AI work now runs as an internal work group with weekly share-outs.',
        ],
      },
    ],
  },
  {
    slug: 'storage-advisors',
    category: 'Real estate',
    client: 'Storage Advisors',
    place: 'Commercial real estate',
    headline: 'Storage Advisors answers every new inquiry with the confidentiality agreement already attached.',
    description:
      'Lead replies, agreements and HubSpot updates now run on the tools they already had. Two weeks after launch, the broker was approving replies from his phone.',
    stat: '2 weeks',
    statLabel: 'from launch until the broker was approving lead replies from his phone',
    body: [
      {
        heading: 'Who they are',
        paragraphs: ['A commercial real estate advisory firm that brokers self-storage properties.'],
      },
      {
        heading: 'The problem',
        paragraphs: [
          'Every new listing inquiry needed a confidentiality agreement sent by hand before any property details could go out. When the one person who handled it was busy, leads waited. They already used HubSpot, PandaDoc and Gmail, but the pieces were only half connected.',
        ],
      },
      {
        heading: 'What we built',
        steps: [
          'A new inquiry lands in the inbox.',
          'Claude matches it to the right property’s confidentiality agreement, active listings only.',
          'It creates or updates the contact in HubSpot.',
          'It generates the agreement in PandaDoc.',
          'It drafts the reply in Gmail with the agreement link included, and a person reviews and sends it.',
        ],
        paragraphs: [
          'It runs every four hours during business hours, on their existing tools. Nothing sends on its own. Every reply is approved by a person, by design.',
        ],
      },
      {
        heading: 'Results',
        list: [
          'Inquiries are answered with the agreement already attached, without anyone building it by hand.',
          'About two weeks after launch, the broker reviews each draft on his phone and sends it.',
          'Weekly one-hour working sessions kept the project moving faster than meeting every two or three weeks.',
        ],
      },
    ],
    video: { text: 'Video testimonials from both Storage Advisors partners.', placeholder: true },
  },
  {
    slug: 'junk-removal-quickbooks',
    category: 'Home services',
    client: 'Junk removal company',
    place: 'Twin Cities',
    headline: 'A junk removal company found customers that had never made it into QuickBooks.',
    description:
      'Website leads now go into the books on their own, and an inbox audit grew the verified customer list from 50 to at least 60.',
    stat: '50 to 60+',
    statLabel: 'verified customers in QuickBooks after the inbox audit',
    body: [
      {
        heading: 'Where they started',
        paragraphs: [
          'The owner already had a scheduled task that replied to website leads and booked the job on the calendar. But customers only reached QuickBooks if someone typed them in.',
        ],
      },
      {
        heading: 'What we did',
        list: [
          'Every valid new lead is now also created as a QuickBooks customer, with name, email, phone and address. It checks for the exact name first so nobody is entered twice, and each run reports what it created, what already existed and what needs a look.',
          'We audited the inbox for past customers. The first pass found 50. The owner remembered about 72, so we went further: the AI read 79 lead emails, removed repeats, blank forms and tests, and found at least 10 real customers the first pass missed. All of them went into QuickBooks the same day. The 72 turned out to be a count from before repeats were removed.',
          'For his outreach to property managers, contractors and restoration companies, the AI researched real Twin Cities companies, listed each decision maker’s public email, and drafted messages for him to review before anything is sent.',
        ],
      },
      {
        heading: 'Results',
        paragraphs: [
          'New customers now land in the books on their own. His verified customer list grew from 50 to at least 60, and he has a list of referral partners ready to contact.',
        ],
      },
    ],
  },
  {
    slug: 'coaching-meeting-notes',
    category: 'Professional services',
    client: 'Business coaching firm',
    place: 'Owner-operator',
    headline: 'A business coach’s client notes now file themselves every evening.',
    description:
      'A daily task reads the day’s recordings, writes each summary and saves it in the right client folder. No more copying and pasting at the end of the day.',
    stat: '6pm',
    statLabel: 'every evening, each client meeting is summarized and filed on its own',
    body: [
      {
        heading: 'Before',
        paragraphs: [
          'The owner recorded his calls, copied each transcript into Claude, asked for a summary and saved it in the client’s folder by hand. Before he had a recorder, he took notes by hand and retyped them.',
        ],
      },
      {
        heading: 'What we built',
        paragraphs: [
          'A skill plus a scheduled task that runs every day at 6pm. It reads that day’s recordings, matches the attendees to his clients, writes the summary as a Word document and saves it in the right client folder. A few choices we made with him:',
        ],
        list: [
          'Meetings that are not with clients are skipped and listed in a short report, so nothing personal lands in a client folder and nothing real goes missing.',
          'Files are named by date, then company, so two meetings on the same day never collide.',
          'We found an old scheduled task from a course still writing weekly briefs to his desktop, 15 of them that he had never opened, and shut it off.',
        ],
      },
      {
        heading: 'Results',
        paragraphs: ['His client folders now fill themselves every evening, with no manual step.'],
      },
    ],
  },
  {
    slug: 'photographer-website',
    category: 'Professional services',
    client: 'Photographer and filmmaker',
    place: 'Owner-operator',
    headline: 'A photographer got the website he wanted, and learned to run it himself.',
    description:
      'A five-page portfolio site written from his own posts and videos, handed over with a plain-English way to update it.',
    stat: '5 pages',
    statLabel: 'portfolio website, written with AI and handed over for him to run',
    body: [
      {
        heading: 'What we did',
        list: [
          'Wrote the site copy from research our agent did on his own social posts and video transcripts. He approved a page-by-page summary before anything went on the site.',
          'Handed the site over in his own account and walked him through updating it with an AI coding tool in plain English, one idea per request. His first request asked it to open the site on his own computer, and the tool set everything up for him.',
        ],
      },
    ],
    quote: 'This is everything I ever wanted in my website.',
  },
  {
    slug: 'bookkeeping-automation',
    category: 'Finance',
    client: 'Small business owner',
    place: 'Minneapolis, MN',
    headline: 'A Minneapolis owner got eight hours a month back from bookkeeping.',
    description:
      'Running several businesses, this owner ended the bookkeeping chaos and found thousands in tax deductions their software was missing.',
    stat: '8 hrs',
    statLabel: 'back every month for an owner running several businesses',
  },
  {
    slug: 'employee-training-sops',
    category: 'Home services',
    client: 'Home services company',
    place: 'Austin, TX',
    headline: 'A home services company turned what lived in people’s heads into a training manual.',
    description: 'Handbooks, procedures and training guides for 30 employees, written in days instead of months.',
    stat: '30',
    statLabel: 'employees trained from one manual, written in days',
  },
  {
    slug: 'skilletz-cafe',
    category: 'Restaurants',
    client: 'Skillet’z Cafe',
    place: 'Fremont, CA',
    headline: 'Skillet’z Cafe runs five AI automations with the same small team.',
    description:
      'A family-run breakfast diner now handles its marketing, delivery disputes, school partnerships and reporting with AI, without hiring.',
    stat: '5',
    statLabel: 'automations running a family diner, with no new hires',
  },
  {
    slug: 'dr-osborn-neurosurgeon',
    category: 'Healthcare',
    client: 'Dr. Brett Osborn',
    place: 'West Palm Beach, FL',
    headline: 'Dr. Brett Osborn’s content now runs on an assistant that writes like him.',
    description:
      'A neurosurgeon’s content, trend monitoring and brand across three platforms, on a locally installed assistant that keeps patient privacy intact.',
    stat: '3',
    statLabel: 'social platforms run by one assistant that writes in his voice',
  },
  {
    slug: 'real-estate-portfolio',
    category: 'Real estate',
    client: 'Bay Area investor',
    place: 'San Francisco Bay Area',
    headline: 'A Bay Area investor brought every property into one command center.',
    description:
      'Properties across several markets, in one system for finding deals, planning taxes and teaching the family the business.',
    stat: '1',
    statLabel: 'command center for every property, across several markets',
  },
  {
    slug: 'ai-built-website',
    category: 'Our own work',
    client: 'Páramo',
    place: 'paramo.sh',
    headline: 'We built our own brand and website with AI, and saved over $40,000.',
    description: 'Brand guidelines, copy, design and this website, built with our own AI agent. No agency, no templates bought in.',
    stat: '$40k+',
    statLabel: 'saved by building our own brand and website with AI',
  },
  {
    slug: 'seo-automation',
    category: 'Our own work',
    client: 'Páramo',
    place: 'paramo.sh and getclawhelp.com',
    headline: 'Our own agent runs our search work, and saves $2,500 a month.',
    description:
      'Keyword research, content calendars, city pages and competitor tracking for our two sites, run by our agent instead of an agency.',
    stat: '$2.5k',
    statLabel: 'saved every month by running our search work with our own agent',
  },
]


export const RESULT_FILTERS = ['All', 'Healthcare', 'Real estate', 'Home services', 'Professional services', 'Restaurants', 'Finance', 'Our own work']

/* Smaller engagements from the same doc. Projections are estimates from an
   assessment, not measured results, and are labeled that way. */
export const MORE_WORK = {
  eyebrow: 'More client work',
  title: 'Most of it replaced a task the owner did every day.',
  note: 'These clients are named by industry until they agree to be named.',
  rows: [
    { client: 'Medical clinic owner', built: 'A content agent in their Slack that finds what is trending, proposes the week’s posts and writes the scripts.', result: 'Owner’s reaction: “This is amazing.”' },
    { client: 'Accounting firm', built: 'An AI assessment with six ranked findings and a four-day quick-wins plan the owner can run alone.', result: 'Projected: about 9 hours a week back.' },
    { client: 'Wellness brand founder', built: 'An assessment that found four quick wins, plus a task that prepares her for every meeting booked through her scheduling link.', result: 'Projected: about 5.5 hours a week back.' },
    { client: 'Tax and accounting firm', built: 'A managed onboarding agent, in progress: one intake form, and the agent chases missing information, with team approval before anything goes live.', result: 'Today onboarding takes 4 to 5 hours per client.' },
  ],
  community: 'We also run hands-on AI lunch and learns, about eight so far across five Twin Cities coworking spaces. The SafeRide Health work came out of one of them.',
}
