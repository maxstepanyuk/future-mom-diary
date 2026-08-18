import type { Metadata } from "next";
import { Comfortaa, Lato } from "next/font/google";
import "./globals.css";

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin", "cyrillic"],
  weight: ["700"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"], // todo: no cyrillic
  weight: ["100", "300", "400", "700", "900"], // todo: remove unused
});

export const metadata: Metadata = {
  title: "Лелека",
  description: "Лелека - щоденник майбутньої матусі",
  openGraph: {
    title: "Лелека",
    description: "Лелека - щоденник майбутньої матусі",
    url: process.env.NEXT_PUBLIC_API_URL,
    // // todo:
    // images: [
    //   {
    //     url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Лелека логотип",
    //   },
    // ],
    type: "article",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className={`${comfortaa.variable} ${lato.variable}`}>
        {children}
      </body>
    </html>
  );
}
