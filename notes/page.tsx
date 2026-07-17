"use client";

import { useEffect, useState } from "react";
import { db, auth } from "../../lib/firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
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
        loadNotes(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);


  const loadNotes = async (uid: string) => {
    const q = query(
      collection(db, "notes"),
      where("userId", "==", uid)
    );

    const querySnapshot = await getDocs(q);

    const savedNotes = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setNotes(savedNotes);
  };


  const saveNote = async () => {

    if (!note.trim()) return;

    await addDoc(collection(db, "notes"), {
      text: note,
      userId: userId,
      createdAt: new Date(),
    });

    setNote("");

    loadNotes(userId);
  };


  return (
    <main className="min-h-screen bg-slate-900 text-white p-8">

      <h1 className="text-4xl font-bold">
        📝 ECHO Notes
      </h1>

      <p className="text-gray-400 mt-2">
        Save your important memories.
      </p>


      <div className="mt-8">

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write your note..."
          className="w-full max-w-xl h-32 p-4 rounded-lg bg-slate-800 text-white"
        />


        <button
          onClick={saveNote}
          className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
        >
          Save Note
        </button>

      </div>


      <div className="mt-10 max-w-xl">

        <h2 className="text-2xl font-semibold mb-4">
          Your Notes
        </h2>


        {notes.map((item) => (
          <div
            key={item.id}
            className="bg-slate-800 p-4 rounded-lg mb-3"
          >
            {item.text}
          </div>
        ))}

      </div>


    </main>
  );
}