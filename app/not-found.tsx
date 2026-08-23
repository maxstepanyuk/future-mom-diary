import Link from "next/link";

// todo: add css
export default function NotFound() {
  return (
    <div>
      <h2>Сторінку не знайдено</h2>
      <Link href="/">Певернутися на головну</Link>
    </div>
  );
}
