import type { Metadata } from "next";
import { bodoniModa, cormorant, inter } from "./fonts";
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
      className={`${bodoniModa.variable} ${cormorant.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}