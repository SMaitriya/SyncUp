"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase";




export default function auth() {


    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState<boolean>(true)
    const [gender, setGender] = useState<string>("");
    const [name, setName] = useState<string>("");


  async function handleSubmit() {

    if (isLogin) {

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        console.log(data)
        console.log(error)

    } else {

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        })

        console.log(data)
        console.log(error)
    }
}




 return (
  <div className="min-h-screen flex items-center justify-center bg-zinc-950">
    
    <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-8 flex flex-col gap-4">
      
      <h1 className="text-2xl font-bold text-white text-center">
        {isLogin ? "Welcome Back" : "Create Account"}
      </h1>

      {!isLogin && (
        <div className="flex flex-col gap-4">
          
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="bg-zinc-800 text-white border border-zinc-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-zinc-800 text-white placeholder:text-zinc-400 border border-zinc-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-zinc-800 text-white placeholder:text-zinc-400 border border-zinc-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="bg-zinc-800 text-white placeholder:text-zinc-400 border border-zinc-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <button
        onClick={handleSubmit}
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition duration-200"
      >
        {isLogin ? "Log in" : "Sign up"}
      </button>

      <button
        onClick={() => setIsLogin(!isLogin)}
        className="text-sm text-zinc-400 hover:text-white transition"
      >
        {isLogin
          ? "Create an account ?"
          : "You already have an account?"}
      </button>

    </div>
  </div>
)}


