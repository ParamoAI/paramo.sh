import Head from 'next/head';
import { SITE_URL, SITE_DESCRIPTION, CALENDLY_URL, OG_IMAGE } from '@/config/site';

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
    </Head>
  );
}
