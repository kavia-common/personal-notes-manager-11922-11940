"use client";

import { useMemo, useState } from "react";
import { useNotes } from "@/hooks/useNotes";
import { Note } from "@/types";

function NoteListItem({
  note,
  active,
  onClick,
}: {
  note: Note;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2 rounded-lg border transition ${
        active
          ? "border-[var(--color-primary)] bg-indigo-50"
          : "border-[var(--border)] hover:bg-slate-50"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-medium">{note.title || "Untitled"}</span>
        {note.pinned && (
          <span className="text-xs text-[var(--color-primary)]">Pinned</span>
        )}
      </div>
      <div className="text-xs text-[var(--text-soft)] line-clamp-2">
        {note.content || "No content"}
      </div>
    </button>
  );
}

export default function Sidebar() {
  const { filteredNotes, activeNoteId, selectNote, createNote, notes, setFilterTag, filterTag } =
    useNotes();
  const [openFilters, setOpenFilters] = useState(true);

  const allTags = useMemo(() => {
    const t = new Set<string>();
    for (const n of notes) (n.tags || []).forEach((tag) => t.add(tag));
    return Array.from(t).sort();
  }, [notes]);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-[var(--border)]">
        <button className="btn btn-accent w-full" onClick={() => createNote()}>
          + New Note
        </button>
      </div>

      <div className="p-4 border-b border-[var(--border)]">
        <button
          className="w-full flex items-center justify-between btn"
          onClick={() => setOpenFilters((v) => !v)}
        >
          <span>Filters</span>
          <span className="text-slate-500 text-sm">{openFilters ? "−" : "+"}</span>
        </button>

        {openFilters && (
          <div className="mt-3 space-y-2">
            <button
              className={`btn w-full ${filterTag ? "" : "btn-primary text-white"}`}
              onClick={() => setFilterTag(null)}
            >
              All
            </button>
            {allTags.map((t) => (
              <button
                key={t}
                className={`btn w-full ${filterTag === t ? "btn-primary text-white" : ""}`}
                onClick={() => setFilterTag(t)}
              >
                #{t}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto p-3 space-y-2">
        {filteredNotes.length === 0 ? (
          <div className="text-sm text-[var(--text-soft)] p-3">
            No notes. Create one to get started.
          </div>
        ) : (
          filteredNotes.map((n) => (
            <NoteListItem
              key={n.id}
              note={n}
              active={n.id === activeNoteId}
              onClick={() => selectNote(n.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
