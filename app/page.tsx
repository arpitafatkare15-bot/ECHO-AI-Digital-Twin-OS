import Link from "next/link";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-blue-950 text-white flex flex-col items-center justify-center px-6">

        <h1 className="text-7xl font-extrabold">
          ECHO
        </h1>

        <p className="mt-6 text-2xl text-gray-300">
          Your AI Digital Twin Operating System
        </p>

        <p className="mt-4 max-w-2xl text-center text-gray-400">
          Build your second brain using AI. Store memories, chat with your digital
          twin, manage files, notes, tasks and automate your life.
        </p>

        <div className="mt-10 flex gap-5">

          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-semibold"
          >
            Login
          </Link>

          <button className="border border-gray-500 px-8 py-3 rounded-xl hover:bg-white hover:text-black transition">
            Learn More
          </button>

        </div>

      </main>
    </>
  );
}