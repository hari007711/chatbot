import React, { useState } from "react";

export default function Auth({ setToken }) {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const res = await fetch(`http://localhost:5000/api/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
    } else {
      alert(data.error || "Something went wrong");
    }
  };

  return (
    <div className="auth-form text-white flex flex-col items-center justify-center h-screen bg-black">
      <h2 className="text-2xl mb-4">{mode === "login" ? "Login" : "Register"}</h2>
      <input
        type="text"
        placeholder="Username"
        className="mb-2 p-2 bg-gray-800 text-white"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="mb-2 p-2 bg-gray-800 text-white"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-green-600 px-4 py-2 rounded"
      >
        {mode}
      </button>
      <p className="mt-2 cursor-pointer" onClick={() => setMode(mode === "login" ? "register" : "login")}>Switch to {mode === "login" ? "Register" : "Login"}</p>
    </div>
  );
}