"use client";

import { AuthProvider } from "@/hooks/useAuth";
import { NotesProvider } from "@/hooks/useNotes";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <NotesProvider>
        <div className="container-app">
          <aside className="sidebar">
            <Sidebar />
          </aside>
          <header className="header">
            <Header />
          </header>
          <Main>{children}</Main>
        </div>
      </NotesProvider>
    </AuthProvider>
  );
}
