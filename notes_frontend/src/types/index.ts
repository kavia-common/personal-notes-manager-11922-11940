export type NoteTag = string;

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  pinned?: boolean;
  tags?: NoteTag[];
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
  name?: string;
}

export interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (creds: AuthCredentials) => Promise<void>;
  signup: (creds: AuthCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

export interface NotesContextValue {
  notes: Note[];
  filteredNotes: Note[];
  activeNoteId: string | null;
  loading: boolean;
  search: string;
  setSearch: (s: string) => void;
  selectNote: (id: string | null) => void;
  createNote: () => Promise<Note>;
  updateNote: (id: string, patch: Partial<Note>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  togglePin: (id: string) => Promise<void>;
  setFilterTag: (tag: string | null) => void;
  filterTag: string | null;
}
