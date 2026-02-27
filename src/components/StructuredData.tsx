import Head from 'next/head';
import { SITE_URL, SITE_DESCRIPTION, CALENDLY_URL, OG_IMAGE } from '@/config/site';

const faqData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is OpenClaw?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "OpenClaw is an open-source AI assistant that runs on your own server. It connects to WhatsApp, Telegram, Slack, Discord, and other platforms to automate tasks 24/7 — all on hardware you control."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need technical skills to get started?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Páramo handles the entire setup — installation, configuration, and training. You tell us what to automate, we build and deploy it."
      }
    },
    {
      "@type": "Question",
      "name": "What's included in the $500 OpenClaw setup?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Full installation on a 24/7 virtual server, 10 pre-installed skills, messenger integration, and a walkthrough so you know how everything works. No coding required."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to go live?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most clients are live within a week. The discovery call takes 30 minutes, and build time depends on the complexity of your automations."
      }
    },
    {
      "@type": "Question",
      "name": "Is my data safe?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Everything runs on a server you control. Your data never touches our systems. You own the infrastructure and the AI instance entirely."
      }
    },
    {
      "@type": "Question",
      "name": "Can I add more automations later?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. The OpenClaw tier is your foundation. You can upgrade to Summit for unlimited automations, a dedicated automation lead, and custom AI agent development."
      }
    }
  ]
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Páramo AI",
  "url": SITE_URL,
  "logo": OG_IMAGE,
  "description": "OpenClaw Implementation Studio. " + SITE_DESCRIPTION,
  "sameAs": [],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "url": CALENDLY_URL
  },
  "offers": [
    {
      "@type": "Offer",
      "name": "OpenClaw Setup",
      "price": "500",
      "priceCurrency": "USD",
      "description": "Your own AI assistant, fully set up and ready to go. Runs 24/7, controllable from any messenger."
    },
    {
      "@type": "Offer",
      "name": "Summit",
      "description": "Full-stack AI infrastructure — unlimited automations, dedicated automation lead, custom AI agents."
    }
  ]
};

export default function StructuredData() {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
    </Head>
  );
}
