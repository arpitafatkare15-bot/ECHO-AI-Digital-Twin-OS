"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async () => {

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Login successful 🎉");

      router.push("/dashboard");

    } catch (error: any) {

      alert(error.message);

    }

  };


  return (

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
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full mt-6 p-3 rounded-lg bg-slate-700 text-white"
        />


        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full mt-4 p-3 rounded-lg bg-slate-700 text-white"
        />


        <button
          onClick={handleLogin}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
        >
          Login
        </button>


      </div>

    </main>

  );
}