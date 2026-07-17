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


export default function MemoryPage() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [memories, setMemories] = useState<any[]>([]);
  const [userId, setUserId] = useState("");



  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {

      if (user) {

        setUserId(user.uid);

        loadMemories(user.uid);

      }

    });


    return () => unsubscribe();

  }, []);






  const loadMemories = async (uid:string) => {


    const q = query(

      collection(db,"memories"),

      where("userId","==",uid),

      orderBy("createdAt","desc")

    );



    const snapshot = await getDocs(q);



    const data = snapshot.docs.map((doc)=>({

      id: doc.id,

      ...doc.data()

    }));



    setMemories(data);


  };








  const saveMemory = async () => {


    if(!title.trim() || !content.trim()) {

      alert("Please fill all fields");

      return;

    }




    await addDoc(collection(db,"memories"),{


      title:title,

      content:content,

      userId:userId,

      createdAt:new Date()


    });



    setTitle("");

    setContent("");



    loadMemories(userId);


  };








  return (

    <main className="min-h-screen bg-slate-900 text-white p-8">


      <h1 className="text-4xl font-bold">
        🧠 ECHO Memory
      </h1>


      <p className="text-gray-400 mt-2">
        Store important memories for your Digital Twin.
      </p>





      <div className="max-w-xl mt-8">



        <input

          value={title}

          onChange={(e)=>setTitle(e.target.value)}

          placeholder="Memory title..."

          className="w-full bg-slate-800 p-3 rounded-xl mb-4"

        />



        <textarea

          value={content}

          onChange={(e)=>setContent(e.target.value)}

          placeholder="Write memory..."

          className="w-full h-32 bg-slate-800 p-3 rounded-xl"

        />



        <button

          onClick={saveMemory}

          className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl"

        >

          Save Memory

        </button>


      </div>








      <div className="mt-10 max-w-xl">


        <h2 className="text-2xl font-semibold mb-4">
          Saved Memories
        </h2>




        {memories.length === 0 ? (

          <p className="text-gray-400">
            No memories saved yet.
          </p>


        ) : (


          memories.map((item)=>(


            <div

              key={item.id}

              className="bg-slate-800 p-5 rounded-xl mb-4"

            >

              <h3 className="text-xl font-semibold">
                {item.title}
              </h3>


              <p className="text-gray-300 mt-2">
                {item.content}
              </p>


            </div>


          ))


        )}



      </div>



    </main>

  );

}