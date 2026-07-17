"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function RegisterPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Account created successfully 🎉");

    } catch (error: any) {
      alert(error.message);
    }
  };


  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-900">

      <div className="bg-slate-800 p-8 rounded-2xl shadow-xl w-96">

        <h1 className="text-3xl font-bold text-white text-center">
          Create ECHO Account
        </h1>


        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-6 p-3 rounded-lg bg-slate-700 text-white"
        />


        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-4 p-3 rounded-lg bg-slate-700 text-white"
        />


        <button
          onClick={handleRegister}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
        >
          Register
        </button>


      </div>

    </main>
  );
}