"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function TasksPage() {

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<any[]>([]);
  const [userId, setUserId] = useState("");


  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {

      if (user) {
        setUserId(user.uid);
        loadTasks(user.uid);
      }

    });

    return () => unsubscribe();

  }, []);



  const loadTasks = async (uid: string) => {

    const q = query(
      collection(db, "tasks"),
      where("userId", "==", uid)
    );


    const snapshot = await getDocs(q);


    const taskData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));


    setTasks(taskData);

  };



  const addTask = async () => {

    if (!task.trim()) {
      alert("Please enter task");
      return;
    }


    await addDoc(collection(db, "tasks"), {

      title: task,
      completed: false,
      userId: userId,
      createdAt: new Date(),

    });


    setTask("");

    loadTasks(userId);

  };



  const completeTask = async (id:string) => {

    await updateDoc(doc(db,"tasks",id),{

      completed:true

    });


    loadTasks(userId);

  };



  return (

    <main className="min-h-screen bg-slate-900 text-white p-8">


      <h1 className="text-4xl font-bold">
        ✅ ECHO Tasks
      </h1>


      <p className="text-gray-400 mt-2">
        Manage your daily tasks with your AI Twin.
      </p>



      <div className="mt-8 max-w-xl">


        <input

          value={task}

          onChange={(e)=>setTask(e.target.value)}

          placeholder="Add new task..."

          className="w-full p-3 rounded-xl bg-slate-800 text-white"

        />



        <button

          onClick={addTask}

          className="mt-4 bg-blue-600 px-6 py-3 rounded-xl"

        >

          Add Task

        </button>


      </div>




      <div className="mt-10 max-w-xl">


        <h2 className="text-2xl font-semibold mb-4">
          Your Tasks
        </h2>



        {tasks.map((item)=>(


          <div

            key={item.id}

            className="bg-slate-800 p-4 rounded-xl mb-3 flex justify-between items-center"

          >


            <span className={item.completed ? "line-through text-gray-500" : ""}>

              {item.title}

            </span>



            {!item.completed && (

              <button

                onClick={()=>completeTask(item.id)}

                className="bg-green-600 px-3 py-1 rounded-lg"

              >

                Done

              </button>

            )}


          </div>


        ))}



      </div>


    </main>

  );

}