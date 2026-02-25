import { GoogleAnalytics } from '@hacktoolkit/nextjs-htk';

import StructuredData from '@/components/StructuredData';
import { GA_MEASUREMENT_IDS } from '@/config/site';

import '@/styles/globals.css';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
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
