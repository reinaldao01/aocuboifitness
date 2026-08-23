import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aocubo-fitness.reinaldo11rey.chatgpt.site"),
  title: "AOCUBO FITNESS",
  description: "Moda fitness feminina com presença, conforto e estilo. Conheça os looks Aocubo Fitness.",
  openGraph: {
    title: "AOCUBO FITNESS — Seu movimento. Seu estilo.",
    description: "Moda fitness feminina com presença, conforto e estilo.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "AOCUBO FITNESS — Seu movimento. Seu estilo." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AOCUBO FITNESS — Seu movimento. Seu estilo.",
    description: "Moda fitness feminina com presença, conforto e estilo.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
