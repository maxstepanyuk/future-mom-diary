import JourneyDetails from "@/components/pages/journey-page/JourneyDetails/JourneyDetails";
interface JourneyPageProps {
  params: Promise<{ weekNumber: string }>;
}
export default async function JourneyPage({ params }: JourneyPageProps) {
  const { weekNumber } = await params;
  const week = Number(weekNumber);

  return (
    <div>
      <JourneyDetails weekNumber={week} />
    </div>
  );
}
