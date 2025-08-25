"use client";

import { useEffect, useMemo, useState } from "react";
import { useNotes } from "@/hooks/useNotes";
import { Note } from "@/types";

function TagPills({ tags, onRemove }: { tags: string[]; onRemove: (tag: string) => void }) {
  if (!tags.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <span
          key={t}
          className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-full border border-[var(--border)] bg-slate-50"
        >
          #{t}
          <button
            className="text-slate-400 hover:text-slate-600"
            onClick={() => onRemove(t)}
            aria-label={`Remove tag ${t}`}
            title="Remove tag"
          >
            ×
          </button>
        </span>
      ))}
    </div>
  );
}

export default function NoteEditor() {
  const { filteredNotes, activeNoteId, updateNote, deleteNote, togglePin } = useNotes();
  const note: Note | undefined = useMemo(
    () => filteredNotes.find((n) => n.id === activeNoteId),
    [filteredNotes, activeNoteId]
  );

  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");
  const [tagInput, setTagInput] = useState("");
  const tags = useMemo(() => note?.tags ?? [], [note]);

  // Sync state when note changes
  useEffect(() => {
    setTitle(note?.title ?? "");
    setContent(note?.content ?? "");
    setTagInput("");
  }, [note]);

  // Memoize current note title/content to use as previous values
  const prevTitle = useMemo(() => note?.title ?? "", [note?.title]);
  const prevContent = useMemo(() => note?.content ?? "", [note?.content]);

  // Auto-save title/content with debounce
  useEffect(() => {
    if (!note) return;

    const handle = setTimeout(() => {
      if (title !== prevTitle || content !== prevContent) {
        updateNote(note.id, { title, content });
      }
    }, 350);

    return () => clearTimeout(handle);
    // Depend only on primitives + stable refs
  }, [note, title, content, prevTitle, prevContent, updateNote]);

  if (!note) return null;

  const addTag = (t: string) => {
    const clean = t.trim().replace(/^#/, "");
    if (!clean) return;
    if ((note.tags || []).includes(clean)) return;
    updateNote(note.id, { tags: [...(note.tags || []), clean] });
  };

  const removeTag = (t: string) => {
    updateNote(note.id, { tags: (note.tags || []).filter((x) => x !== t) });
  };

  return (
    <div className="max-w-4xl mx-auto p-2 lg:p-0">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <button className="btn" onClick={() => togglePin(note.id)}>
            {note.pinned ? "Unpin" : "Pin"}
          </button>
        </div>
        <div className="flex gap-2">
          <button
            className="btn"
            onClick={() => {
              if (confirm("Delete this note? This action cannot be undone.")) {
                deleteNote(note.id);
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="card p-4">
        <input
          className="input text-2xl font-semibold"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
        />

        <div className="mt-3">
          <textarea
            className="textarea min-h-[300px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start typing your note..."
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm mb-1 text-[var(--text-soft)]">Tags</label>
          <TagPills tags={tags} onRemove={removeTag} />
          <div className="mt-2 flex gap-2">
            <input
              className="input"
              placeholder="Add tag (press Enter)"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag(tagInput);
                  setTagInput("");
                }
              }}
            />
            <button
              className="btn"
              onClick={() => {
                addTag(tagInput);
                setTagInput("");
              }}
            >
              Add
            </button>
          </div>
        </div>

        <div className="mt-4 text-xs text-[var(--text-soft)]">
          <div>
            Created: {new Date(note.createdAt).toLocaleString()}
          </div>
          <div>
            Updated: {new Date(note.updatedAt).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
