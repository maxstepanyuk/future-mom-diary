import JourneyDetails from "@/components/pages/journey-page/JourneyDetails/JourneyDetails";
import css from "./JourneyPage.module.css";
import { Metadata } from "next";

interface JourneyPageProps {
  params: Promise<{ weekNumber: string }>;
}

export const metadata: Metadata = {
  title: "Подорож - Лелека",
  openGraph: {
    title: "Подорож - Лелека",
  },
};

export default async function JourneyPage({ params }: JourneyPageProps) {
  const { weekNumber } = await params;
  const week = Number(weekNumber);

  return (
    <div className={css.page}>
      <JourneyDetails weekNumber={week} />
    </div>
  );
}
