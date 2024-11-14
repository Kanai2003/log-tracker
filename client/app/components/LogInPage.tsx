"use client";
import { useState } from "react";
import { loginUser } from "../utils/api";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = await loginUser(email, password);

    // setting user data into local storage due to short period of time
    localStorage.setItem("userData", JSON.stringify(userData))
    
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="p-6 bg-white text-black shadow-lg rounded-md">
        <h2 className="text-lg font-bold mb-4">Login</h2>
        <input className="border p-2 mb-4 w-full text-black" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input className="border p-2 mb-4 w-full text-black" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="bg-blue-500 text-white py-2 w-full rounded">Login</button>
      </form>
    </div>
  );
}
