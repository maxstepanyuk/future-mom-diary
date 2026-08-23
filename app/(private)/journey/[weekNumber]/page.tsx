import JourneyDetails from "@/components/pages/journey-page/JourneyDetails/JourneyDetails";
import css from "./JourneyPage.module.css";

interface JourneyPageProps {
  params: Promise<{ weekNumber: string }>;
}
export default async function JourneyPage({ params }: JourneyPageProps) {
  const { weekNumber } = await params;
  const week = Number(weekNumber);

  return (
    <div className={css.page}>
      <JourneyDetails weekNumber={week} />
    </div>
  );
}
