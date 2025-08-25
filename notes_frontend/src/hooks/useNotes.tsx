"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Note, NotesContextValue } from "@/types";
import { apiCreateNote, apiDeleteNote, apiListNotes, apiUpdateNote } from "@/lib/api";

const NotesContext = createContext<NotesContextValue | undefined>(undefined);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiListNotes();
      setNotes(data);
      if (data.length > 0 && !activeNoteId) {
        setActiveNoteId(data[0].id);
      }
    } finally {
      setLoading(false);
    }
  }, [activeNoteId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const selectNote = useCallback((id: string | null) => {
    setActiveNoteId(id);
  }, []);

  const createNote = useCallback(async () => {
    const n = await apiCreateNote();
    setNotes((prev) => [n, ...prev]);
    setActiveNoteId(n.id);
    return n;
  }, []);

  const updateNote = useCallback(async (id: string, patch: Partial<Note>) => {
    const updated = await apiUpdateNote(id, patch);
    setNotes((prev) => prev.map((n) => (n.id === id ? updated : n)));
  }, []);

  const deleteNote = useCallback(async (id: string) => {
    await apiDeleteNote(id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
    setActiveNoteId((prev) => (prev === id ? null : prev));
  }, []);

  const togglePin = useCallback(async (id: string) => {
    const n = notes.find((x) => x.id === id);
    if (!n) return;
    await updateNote(id, { pinned: !n.pinned });
  }, [notes, updateNote]);

  const filteredNotes = useMemo(() => {
    const q = search.trim().toLowerCase();
    let result = notes;
    if (filterTag) {
      result = result.filter((n) => (n.tags || []).includes(filterTag));
    }
    if (q.length) {
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q) ||
          (n.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    }
    // Pinned first, then by updatedAt desc
    return [...result].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [notes, search, filterTag]);

  const value: NotesContextValue = {
    notes,
    filteredNotes,
    activeNoteId,
    loading,
    search,
    setSearch,
    selectNote,
    createNote,
    updateNote,
    deleteNote,
    togglePin,
    filterTag,
    setFilterTag,
  };

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}

// PUBLIC_INTERFACE
export function useNotes(): NotesContextValue {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error("useNotes must be used within <NotesProvider>");
  return ctx;
}
