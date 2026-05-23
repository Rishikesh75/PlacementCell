"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SingleInput } from "@/src/components/SingleInput";
import { useToast } from "@/src/contexts/ToastContext";

export default function LoginPage() {
  const router = useRouter();
  const { show } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!username || !password) {
      show("Please enter username and password", "error");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        show(data.error || "Invalid credentials", "error");
        return;
      }

      show("Login successful!", "success");
      router.push("/student/mainpage");
      router.refresh();
    } catch {
      show("Error during login. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center">
      <Image
        src="/assets/student.png"
        alt="Student Logo"
        width={120}
        height={120}
        className="mb-6"
      />
      <h2 className="mb-6 text-2xl font-bold">Student Login</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <SingleInput
          placeholder="Username"
          onValueChange={setUsername}
        />
        <SingleInput
          placeholder="Password"
          type="password"
          onValueChange={setPassword}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
