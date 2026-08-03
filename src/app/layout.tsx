import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lithos Architectes — Construire l'exception, penser l'éternité",
  description:
    "Atelier d'architecture parisien spécialisé dans les résidences privées, l'architecture d'intérieur et la rénovation patrimoniale d'exception.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
