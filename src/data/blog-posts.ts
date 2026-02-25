export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  tag: string;
  date: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'real-cost-of-not-automating',
    title: 'The Real Cost of NOT Automating: A Small Business Breakdown',
    description: '10–20 hours a week on admin. Missed leads. Invoice errors. Here\'s what manual work is actually costing your business — in real dollars.',
    tag: 'Small Business',
    date: 'Feb 20, 2026',
    readTime: '8 min read',
  },
  {
    slug: 'ai-agents-vs-zapier-make',
    title: 'AI Agents vs. Zapier/Make: Why Automations Aren\'t Enough Anymore',
    description: 'You\'ve built Zaps and workflows. But there\'s a wall automations can\'t cross. Here\'s where AI agents pick up — and why the difference matters.',
    tag: 'Insights',
    date: 'Feb 20, 2026',
    readTime: '9 min read',
  },
  {
    slug: 'replaced-12-saas-tools',
    title: 'How We Replaced 12 SaaS Tools with AI Agents',
    description: 'We canceled $2,400/month in software subscriptions and got better results. Here\'s exactly what we replaced, and what we learned.',
    tag: 'Case Study',
    date: 'Feb 20, 2026',
    readTime: '8 min read',
  },
  {
    slug: 'what-is-ai-native-company',
    title: 'What Is an AI-Native Company? (And Why You Should Care)',
    description: 'There\'s a massive difference between a company that uses AI and one built on AI from day one. Here\'s why it matters.',
    tag: 'Insights',
    date: 'Feb 20, 2026',
    readTime: '7 min read',
  },
];
