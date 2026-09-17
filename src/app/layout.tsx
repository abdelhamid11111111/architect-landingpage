import type { Metadata } from "next";
import Script from "next/script";
import { marcellus, cormorant, inter } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atelier Verrier — Architecture Studio, Paris",
  description:
    "Atelier Verrier designs bespoke architecture where material, light and silence compose a sensitive experience of place. Paris, since 2006.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${marcellus.variable} ${cormorant.variable} ${inter.variable}`}
    >
      <body>
        {children}
        <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}