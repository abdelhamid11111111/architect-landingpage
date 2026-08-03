import type { Metadata } from "next";
// import { anton, jetbrainsMono } from "./font/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forge",
  description: "Salle de sport — Paris 11e",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" >
      <body>{children}</body>
    </html>
  );
}