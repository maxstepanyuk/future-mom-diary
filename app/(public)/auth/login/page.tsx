import LoginForm from "@/components/pages/login-page/LoginForm/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Вхід - Лелека",
  openGraph: {
    title: "Вхід - Лелека",
  },
};

export default function LoginPage() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
