import Link from "next/link";

export default function Home() {
  // const [ src, setSrc] = useState('');
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello World! This is dashboard
      <Link href="/offline-downloads">Please go to here</Link>
    </main>
  );
}
