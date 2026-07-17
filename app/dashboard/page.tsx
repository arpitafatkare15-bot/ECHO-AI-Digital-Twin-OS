"use client";

import { useEffect, useState } from "react";
import { auth } from "../../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function DashboardPage() {

  const router = useRouter();

  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {

      if (user) {
        setUserEmail(user.email || "");
      } else {
        router.push("/login");
      }

    });

    return () => unsubscribe();

  }, [router]);


  const handleLogout = async () => {

    await signOut(auth);

    router.push("/login");

  };


  return (

    <>
      <Navbar />

      <div className="flex">

        <Sidebar />


        <main className="flex-1 min-h-screen bg-slate-900 text-white p-8">

          <div className="flex justify-between items-center">

            <div>
              <h1 className="text-4xl font-bold">
                Welcome to ECHO Dashboard 👋
              </h1>

              <p className="text-gray-400 mt-2">
                Your AI Digital Twin starts here.
              </p>

              <p className="mt-4 text-blue-400">
                Logged in as: {userEmail}
              </p>
            </div>


            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl"
            >
              Logout
            </button>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">


            <div className="bg-slate-800 p-6 rounded-2xl">
              <h2 className="text-2xl font-semibold">📝 Notes</h2>
              <p className="text-gray-400 mt-2">
                Store your important notes.
              </p>
            </div>


            <div className="bg-slate-800 p-6 rounded-2xl">
              <h2 className="text-2xl font-semibold">📁 Files</h2>
              <p className="text-gray-400 mt-2">
                Upload and manage your files.
              </p>
            </div>


            <div className="bg-slate-800 p-6 rounded-2xl">
              <h2 className="text-2xl font-semibold">✅ Tasks</h2>
              <p className="text-gray-400 mt-2">
                Track your daily tasks.
              </p>
            </div>


            <div className="bg-slate-800 p-6 rounded-2xl">
              <h2 className="text-2xl font-semibold">🤖 AI Chat</h2>
              <p className="text-gray-400 mt-2">
                Talk with your AI assistant.
              </p>
            </div>


            <div className="bg-slate-800 p-6 rounded-2xl">
              <h2 className="text-2xl font-semibold">🧠 Memory</h2>
              <p className="text-gray-400 mt-2">
                Save everything important.
              </p>
            </div>


            <div className="bg-slate-800 p-6 rounded-2xl">
              <h2 className="text-2xl font-semibold">⚙️ Settings</h2>
              <p className="text-gray-400 mt-2">
                Manage your account settings.
              </p>
            </div>


          </div>

        </main>

      </div>

    </>

  );

}