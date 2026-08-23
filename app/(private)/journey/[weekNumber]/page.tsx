import JourneyDetails from "@/components/pages/journey-page/JourneyDetails/JourneyDetails";
import GreetingBlock from "@/components/pages/common/GreetingBlock/GreetingBlock";
import css from "./JourneyPage.module.css"

interface JourneyPageProps {
  params: Promise<{ weekNumber: string }>;
}
export default async function JourneyPage({ params }: JourneyPageProps) {
  const { weekNumber } = await params;
  const week = Number(weekNumber);

  return (
    <div className={css.page}>
      <GreetingBlock />
      <JourneyDetails weekNumber={week} />
    </div>
  );
}
