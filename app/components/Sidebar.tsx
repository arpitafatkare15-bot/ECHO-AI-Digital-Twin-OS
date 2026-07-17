import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-950 text-white p-6">

      <h1 className="text-3xl font-bold mb-10">
        ECHO
      </h1>

      <nav className="flex flex-col gap-5">

        <Link href="/dashboard" className="hover:text-blue-400">
          🏠 Dashboard
        </Link>

        <Link href="/login" className="hover:text-blue-400">
          🔑 Login
        </Link>

        <Link href="/register" className="hover:text-blue-400">
          👤 Register
        </Link>

        <Link href="#" className="hover:text-blue-400">
          🤖 AI Chat
        </Link>

        <Link href="#" className="hover:text-blue-400">
          📝 Notes
        </Link>

        <Link href="#" className="hover:text-blue-400">
          📁 Files
        </Link>

        <Link href="#" className="hover:text-blue-400">
          ✅ Tasks
        </Link>

        <Link href="#" className="hover:text-blue-400">
          🧠 Memory
        </Link>

        <Link href="#" className="hover:text-blue-400">
          ⚙️ Settings
        </Link>

      </nav>

    </aside>
  );
}