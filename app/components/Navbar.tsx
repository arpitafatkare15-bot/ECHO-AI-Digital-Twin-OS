import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6 bg-slate-950 text-white">

      <h1 className="text-2xl font-bold">
        ECHO
      </h1>

      <div className="flex gap-6">

        <Link href="/">
          Home
        </Link>

        <Link href="/login">
          Login
        </Link>

      </div>

    </nav>
  );
}