/*
  The blog list (address /blog/, kept from the live site).

  All six posts from src/data/blog-posts.ts in the site repo, newest first.
  Titles and descriptions here are display versions, set without em dashes to
  match the brand. Each article page keeps its official title and
  description from the live site, which are on the search checklist.
*/

export type Post = {
  slug: string
  tag: string
  date: string
  readTime: string
  title: string
  description: string
}

export const BLOG_PAGE = {
  eyebrow: 'Field notes',
  title: 'Blog',
}

export const POSTS: Post[] = [
  {
    slug: 'ai-labs-just-validated-implementation-gap',
    tag: 'Insights',
    date: 'Mar 21, 2026',
    readTime: '8 min read',
    title: 'OpenAI and Anthropic just proved the AI gap is implementation, not models',
    description:
      'The companies building the most powerful AI models in the world are launching consulting arms. Here’s what that tells us about where the real value is, and who captures it.',
  },
  {
    slug: 'agentic-ai-app-development-growth',
    tag: 'Insights',
    date: 'Mar 5, 2026',
    readTime: '7 min read',
    title: 'How agentic AI will reshape app development and growth, and why I’m building it',
    description:
      'The app economy is entering its most disruptive phase since the App Store launched. Here is what agentic AI means for developers, monetization, and growth.',
  },
  {
    slug: 'real-cost-of-not-automating',
    tag: 'Small business',
    date: 'Feb 20, 2026',
    readTime: '8 min read',
    title: 'What manual work costs your small business (the real numbers)',
    description:
      'Small businesses lose 10 to 20 hours a week on admin tasks that AI can handle. We break down the exact dollar cost, and what to automate first.',
  },
  {
    slug: 'ai-agents-vs-zapier-make',
    tag: 'Insights',
    date: 'Feb 20, 2026',
    readTime: '9 min read',
    title: 'AI agents vs Zapier and Make: what automation tools can’t do (2026)',
    description:
      'Zapier and Make hit a ceiling when tasks need judgment, not just triggers. See where AI agents pick up, with real examples and a side-by-side comparison.',
  },
  {
    slug: 'replaced-12-saas-tools',
    tag: 'Case study',
    date: 'Feb 20, 2026',
    readTime: '8 min read',
    title: 'We replaced 12 SaaS tools with AI agents. Here’s what happened',
    description:
      'We canceled $2,400 a month in software and got better results. The full list of tools we dropped, what replaced them, and the lessons we learned.',
  },
  {
    slug: 'what-is-ai-native-company',
    tag: 'Insights',
    date: 'Feb 20, 2026',
    readTime: '7 min read',
    title: 'What is an AI-native company? (And how 3 people run like 300)',
    description:
      'AI-native companies aren’t just using AI tools. They’re built on AI from day one. Here’s what that actually looks like, and why it’s the future of small business.',
  },
]
