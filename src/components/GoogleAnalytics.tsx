import Script from 'next/script';
import { GA_MEASUREMENT_IDS } from '@/config/site';

export default function GoogleAnalytics() {
  const primaryId = GA_MEASUREMENT_IDS[0];
  
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${GA_MEASUREMENT_IDS.map(id => `gtag('config', '${id}');`).join('\n          ')}
        `}
      </Script>
    </>
  );
}
