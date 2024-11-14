"use client"
import { useState } from "react";
import { registerUser } from "../utils/api";
import { useRouter } from "next/navigation";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await registerUser(email, password, name);
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleRegister} className="p-6 bg-white text-black shadow-lg rounded-md">
        <h2 className="text-lg font-bold mb-4">Create an Account</h2>
        <input className="border p-2 mb-4 w-full text-black" type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input className="border p-2 mb-4 w-full text-black" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input className="border p-2 mb-4 w-full text-black" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="bg-blue-500 text-white py-2 w-full rounded">Sign Up</button>
      </form>
    </div>
  );
}
