import { Head, Html, Main, NextScript } from 'next/document';
import { GA_MEASUREMENT_IDS } from '@/config/site';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google Analytics */}
        {GA_MEASUREMENT_IDS.map((id) => (
          <script
            key={`ga-src-${id}`}
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
          />
        ))}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              ${GA_MEASUREMENT_IDS.map((id) => `gtag('config', '${id}');`).join('\n              ')}
            `,
          }}
        />

        {/* Favicons */}
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/assets/favicon-48.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/assets/favicon-192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png" />
        
        {/* Fonts: Fraunces for headlines, Inter for body text */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Inter:wght@400..700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
