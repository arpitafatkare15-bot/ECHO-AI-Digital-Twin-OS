import Navbar from "../components/Navbar";

export default function LoginPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="bg-slate-800 p-8 rounded-2xl shadow-xl w-96">
          <h1 className="text-3xl font-bold text-white text-center">
            Welcome to ECHO
          </h1>

          <p className="text-gray-400 text-center mt-2">
            Sign in to continue
          </p>

          <input
            type="email"
            placeholder="Email"
            className="w-full mt-6 p-3 rounded-lg bg-slate-700 text-white outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mt-4 p-3 rounded-lg bg-slate-700 text-white outline-none"
          />

          <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg">
            Login
          </button>
        </div>
      </main>
    </>
  );
}