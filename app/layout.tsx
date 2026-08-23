import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import TanStackProvider from "@/components/providers/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/providers/AuthProvider/AuthProvider";
import Header from "@/components/layout/Header/Header";
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Breadcrumbs from "@/components/layout/Breadcrumbs/Breadcrumbs";
// import Test from '@/components/common/Test/Test';

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin", "cyrillic"],
  weight: ["700"],
  display: "swap",
});

const lato = localFont({
  src: [
    {
      path: "../fonts/Lato-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Lato-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Lato-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Lato-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Лелека",
  description: "Лелека - щоденник майбутньої матусі",
  openGraph: {
    title: "Лелека",
    description: "Лелека - щоденник майбутньої матусі",
    url: process.env.NEXT_PUBLIC_API_URL,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_API_URL}/images/leleka.jpg`,
        width: 720,
        height: 900,
        alt: "Лелека логотип",
      },
    ],
    type: "article",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${comfortaa.variable} ${lato}`}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            <Sidebar />
            {/* <Test /> */}
            <main>
              <Breadcrumbs />
              {children}
            </main>
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
