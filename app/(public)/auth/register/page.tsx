import RegistrationForm from '@/components/pages/registration-page/RegistrationForm/RegistrationForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Реєстрація - Лелека",
  openGraph: {
    title: "Реєстрація - Лелека",
  },
};

export default function RegisterPage() {
  return (
    <div>
      <RegistrationForm />
    </div>
  );
}
