"use client";

import config from "@config/config.json";
import theme from "@config/theme.json";
import TwSizeIndicator from "@layouts/components/TwSizeIndicator";
import Footer from "@layouts/partials/Footer";
import Header from "@layouts/partials/Header";
import { LanguageProvider } from "../contexts/LanguageContext";
import { CountdownProvider, useCountdown } from "../contexts/CountdownContext";
import { usePathname } from "next/navigation";
import "../styles/style.scss";

function LayoutContent({ children }) {
  const pathname = usePathname();
  const isCountdownPage = pathname === "/countdown";
  const { isExpired, isLoading } = useCountdown();
  
  // Show header/footer if:
  // - Not on countdown page AND
  // - (Not on home page OR countdown is expired)
  // - And not loading (to prevent flash)
  const showHeaderFooter = !isLoading && !isCountdownPage && (pathname !== "/" || isExpired);
  
  return (
    <>
      <TwSizeIndicator />
      {showHeaderFooter && <Header />}
      {children}
      {showHeaderFooter && <Footer />}
    </>
  );
}

export default function RootLayout({ children }) {
  // import google font css
  const pf = theme.fonts.font_family.primary;
  const sf = theme.fonts.font_family.secondary;

  return (
    <html suppressHydrationWarning={true} lang="vi">
      <head>
        {/* responsive meta */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        {/* favicon */}
        <link rel="icon" type="image/png" href={config.site.favicon} />
        <link rel="shortcut icon" type="image/png" href={config.site.favicon} />
        <link rel="apple-touch-icon" href={config.site.favicon} />
        {/* theme meta */}
        <meta name="theme-name" content="andromeda-light-nextjs" />

        {/* google font css */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href={`https://fonts.googleapis.com/css2?family=${pf}${
            sf ? "&family=" + sf : ""
          }&family=Source+Serif+Pro:wght@400;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap`}
          rel="stylesheet"
        />

        {/* SEO meta */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="keywords" content="Emia, Experience Management, Customer Experience, CX Training, Vietnam, XM Practitioner, CX Foundation, Qualtrics, Experience Management Institute" />
        <meta name="geo.region" content="VN" />
        <meta name="geo.placename" content="Vietnam" />
        <meta name="language" content="Vietnamese" />
        
        {/* theme meta */}
        <meta name="theme-name" content="andromeda-light-nextjs" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#fff"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#000"
        />
      </head>
      <body suppressHydrationWarning={true}>
        <LanguageProvider>
          <CountdownProvider>
            <LayoutContent>{children}</LayoutContent>
          </CountdownProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
