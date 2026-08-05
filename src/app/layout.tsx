import type { Metadata } from "next";
import Script from "next/script";
import { marcellus, cormorant, inter } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atelier Verrier — Cabinet d'architecture, Paris",
  description:
    "Atelier Verrier conçoit des architectures sur mesure où matière, lumière et silence composent une expérience sensible du lieu. Paris, depuis 2006.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${marcellus.variable} ${cormorant.variable} ${inter.variable}`}
    >
      <body>
        {children}
        <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}