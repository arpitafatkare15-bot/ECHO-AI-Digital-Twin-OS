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


export default function ChatPage() {

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<any[]>([]);
  const [userId, setUserId] = useState("");



  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {

      if (user) {
        setUserId(user.uid);
        loadChat(user.uid);
      }

    });


    return () => unsubscribe();

  }, []);





  const loadChat = async (uid:string) => {

    const q = query(
      collection(db,"chats"),
      where("userId","==",uid),
      orderBy("createdAt","asc")
    );


    const snapshot = await getDocs(q);


    const messages = snapshot.docs.map((doc)=>({

      id: doc.id,
      ...doc.data()

    }));


    setChat(messages);

  };







  const saveMessage = async (
    sender:string,
    text:string
  ) => {


    await addDoc(collection(db,"chats"),{

      userId:userId,
      sender:sender,
      message:text,
      createdAt:new Date()

    });


  };







  const sendMessage = async () => {


    if(!message.trim()) return;



    const userMessage = message;


    setMessage("");



    await saveMessage(
      "You",
      userMessage
    );



    await saveMessage(
      "ECHO",
      "Hello Arpita 👋 I am your AI Digital Twin."
    );



    loadChat(userId);

  };








  return (

    <main className="min-h-screen bg-slate-900 text-white p-8">


      <h1 className="text-4xl font-bold">
        🤖 ECHO AI Chat
      </h1>


      <p className="text-gray-400 mt-2">
        Your Digital Twin conversation memory.
      </p>





      <div className="mt-8 max-w-2xl">


        <div className="bg-slate-800 rounded-2xl p-5 min-h-[400px]">


          {
            chat.length === 0 ? (

              <p className="text-gray-400">
                Start conversation with ECHO...
              </p>


            ) : (


              chat.map((msg:any)=>(


                <div
                  key={msg.id}
                  className="mb-4"
                >

                  <p className="font-semibold">
                    {msg.sender}
                  </p>


                  <p className="bg-slate-700 p-3 rounded-xl mt-1">
                    {msg.message}
                  </p>


                </div>


              ))

            )
          }


        </div>






        <div className="flex gap-3 mt-5">


          <input

            value={message}

            onChange={(e)=>setMessage(e.target.value)}

            placeholder="Ask ECHO something..."

            className="flex-1 bg-slate-800 p-3 rounded-xl outline-none"

          />



          <button

            onClick={sendMessage}

            className="bg-blue-600 hover:bg-blue-700 px-6 rounded-xl"

          >

            Send

          </button>



        </div>



      </div>



    </main>

  );

}