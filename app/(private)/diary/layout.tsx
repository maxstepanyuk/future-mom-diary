import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Щоденник - Лелека",
  openGraph: {
    title: "Щоденник - Лелека",
  },
};

// todo: fix: added because diary pages are "use client"
export default function DiaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
