"use client";

import { useAuth } from "@/hooks/useAuth";
import { useNotes } from "@/hooks/useNotes";
import { useState } from "react";

export default function Header() {
  const { user, logout } = useAuth();
  const { search, setSearch } = useNotes();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full h-16 px-4 lg:px-6 flex items-center gap-3">
      <div className="flex-1">
        <div className="relative">
          <input
            className="input pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes..."
            aria-label="Search notes"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">⌘K</span>
        </div>
      </div>

      {user && (
        <div className="relative">
          <button
            className="btn btn-ghost"
            onClick={() => setMenuOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
          >
            <div className="size-8 rounded-full bg-[var(--color-primary)] text-white grid place-items-center">
              {user.name?.slice(0, 1).toUpperCase()}
            </div>
            <span className="hidden md:block">{user.name}</span>
          </button>
          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-48 card p-2 bg-white"
            >
              <div className="px-3 py-2 text-sm text-slate-600">{user.email}</div>
              <button
                className="btn w-full"
                onClick={() => {
                  setMenuOpen(false);
                  logout();
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
