import Link from "next/link";
import css from "./AuthBar.module.css";

export default function AuthBar() {
  return (
    <div className={css.wrapper}>
      <Link href="/auth/register" className={css.registerLink}>
        Зареєструватися
      </Link>
      <Link href="/auth/login" className={css.loginLink}>
        Увійти
      </Link>
    </div>
  );
}
