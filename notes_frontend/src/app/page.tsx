"use client";

import { useAuth } from "@/hooks/useAuth";
import AuthView from "@/components/auth/AuthView";
import NotesView from "@/components/notes/NotesView";

export default function Home() {
  const { user } = useAuth();

  return (
    <main className="main p-4 lg:p-6">
      {!user ? <AuthView /> : <NotesView />}
    </main>
  );
}
