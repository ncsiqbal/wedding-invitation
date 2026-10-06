import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://nanda-agung-wedding-invitation.vercel.app"
  ),

  title: "The Wedding of Agung & Nanda",

  description:
    "Undangan Pernikahan Agung Mustofa & Dwi Nanda Rachmanto — 10 Oktober 2026",

  icons: {
    icon: "/images/favicon.png",
  },

  openGraph: {
    title: "The Wedding of Agung & Nanda",

    description:
      "Undangan Pernikahan Agung Mustofa & Dwi Nanda Rachmanto",

    type: "website",

    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Agung & Nanda Wedding",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}