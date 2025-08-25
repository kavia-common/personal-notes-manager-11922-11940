"use client";

import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export default function AuthView() {
  const { login, signup, loading } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="card max-w-md w-full p-6">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-sm text-[var(--text-soft)] mt-1">
            {mode === "login"
              ? "Log in to access your notes."
              : "Sign up to start managing your notes."}
          </p>
        </div>

        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (mode === "login") {
              login({ email, password, name });
            } else {
              signup({ email, password, name });
            }
          }}
        >
          {mode === "signup" && (
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>
          <button className="btn btn-primary w-full text-white" disabled={loading}>
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Sign up"}
          </button>
        </form>

        <div className="mt-4 text-sm text-center">
          {mode === "login" ? (
            <button className="text-[var(--color-primary)]" onClick={() => setMode("signup")}>
              Don&apos;t have an account? Sign up
            </button>
          ) : (
            <button className="text-[var(--color-primary)]" onClick={() => setMode("login")}>
              Already have an account? Log in
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
