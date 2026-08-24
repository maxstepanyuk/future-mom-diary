import ProfilePage from "@/components/pages/profile-page/ProfilePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Профіль - Лелека",
  openGraph: {
    title: "Профіль - Лелека",
  },
};

const Page = () => {
  return <ProfilePage />;
};

export default Page;