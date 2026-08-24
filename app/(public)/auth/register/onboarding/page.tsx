import OnboardingForm from "@/components/pages/onboarding-page/OnboardingForm/OnboardingForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Знайомство - Лелека",
  openGraph: {
    title: "Знайомство - Лелека",
  },
};

export default function OnboardingPage() {
  return (
    <div>
      <OnboardingForm />
    </div>
  );
}
