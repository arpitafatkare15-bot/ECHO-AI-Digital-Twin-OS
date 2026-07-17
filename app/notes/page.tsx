"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function NotesPage() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<any[]>([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchNotes(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);


  const fetchNotes = async (uid: string) => {
    const q = query(
      collection(db, "notes"),
      where("userId", "==", uid),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    const notesData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setNotes(notesData);
  };


  const saveNote = async () => {
    if (!note.trim()) {
      alert("Please write something");
      return;
    }

    await addDoc(collection(db, "notes"), {
      text: note,
      userId: userId,
      createdAt: new Date(),
    });

    setNote("");

    fetchNotes(userId);
  };


  return (
    <main className="min-h-screen bg-slate-900 text-white p-8">

      <h1 className="text-4xl font-bold">
        📝 ECHO Notes
      </h1>

      <p className="text-gray-400 mt-2">
        Your AI Digital Twin Memory
      </p>


      <div className="mt-8 max-w-xl">

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write your memory..."
          className="w-full h-32 p-4 rounded-xl bg-slate-800 text-white outline-none"
        />


        <button
          onClick={saveNote}
          className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl"
        >
          Save Note
        </button>

      </div>


      <div className="mt-10 max-w-xl">

        <h2 className="text-2xl font-semibold mb-4">
          Saved Notes
        </h2>


        {notes.length === 0 ? (
          <p className="text-gray-400">
            No notes yet.
          </p>
        ) : (

          notes.map((item) => (

            <div
              key={item.id}
              className="bg-slate-800 p-4 rounded-xl mb-3"
            >
              {item.text}
            </div>

          ))

        )}

      </div>

    </main>
  );
}