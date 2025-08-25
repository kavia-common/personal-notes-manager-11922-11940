"use client";

import { useNotes } from "@/hooks/useNotes";
import NoteEditor from "./NoteEditor";

export default function NotesView() {
  const { activeNoteId, createNote } = useNotes();

  if (!activeNoteId) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="text-center space-y-3">
          <h2 className="text-xl font-semibold">No note selected</h2>
          <p className="text-[var(--text-soft)]">Create a new note to get started.</p>
          <button className="btn btn-accent" onClick={() => createNote()}>
            + New Note
          </button>
        </div>
      </div>
    );
  }

  return <NoteEditor />;
}
