import { useEffect } from 'react';

import { GoogleAnalytics } from '@hacktoolkit/nextjs-htk';

import StructuredData from '@/components/StructuredData';
import { GA_MEASUREMENT_IDS } from '@/config/site';

import '@/styles/site.css';

import type { AppProps } from 'next/app';

/*
  Every "Book a call" click is sent to Google Analytics as a `book_call_click`
  event, with the page it happened on and the button's words, so the
  dashboard can show which pages lead to calls. Mark it as a key event in
  Google Analytics (Admin, Events) to count it as a conversion.
*/
function useBookCallTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.('a[href*="calendly.com"]');
      if (!a) return;
      const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
      gtag?.('event', 'book_call_click', {
        page_path: window.location.pathname,
        link_text: (a.textContent || '').trim().slice(0, 60),
        transport_type: 'beacon',
      });
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);
}

export default function App({ Component, pageProps }: AppProps) {
  useBookCallTracking();
  return (
    <>
      {GA_MEASUREMENT_IDS.map((id) => (
        <GoogleAnalytics key={id} measurementId={id} />
      ))}
      <StructuredData />
      <Component {...pageProps} />
    </>
  );
}
