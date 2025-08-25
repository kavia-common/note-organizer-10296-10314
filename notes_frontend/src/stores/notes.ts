import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

/**
 * Types for Notes
 */
export interface Note {
  id: string
  title: string
  content: string
  createdAt: number
  updatedAt: number
}

/**
 * Key used to persist notes in localStorage
 */
const STORAGE_KEY = 'notes_app__notes_v1'

/**
 * generateId
 * PUBLIC_INTERFACE
 * Generates a reasonably unique id string for notes.
 */
export function generateId(): string {
  /** Generate an ID from timestamp and random segment */
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

/**
 * useNotesStore
 * PUBLIC_INTERFACE
 * Pinia store for managing notes and UI selection state.
 * Exposes CRUD operations and search functionality.
 */
export const useNotesStore = defineStore('notes', () => {
  const notes = ref<Note[]>([])
  const selectedNoteId = ref<string | null>(null)
  const searchQuery = ref<string>('')

  // Load persisted notes on initialization
  const load = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed: Note[] = JSON.parse(raw)
        // Basic validation and sorting by updatedAt desc
        notes.value = parsed
          .filter((n) => typeof n.id === 'string')
          .sort((a, b) => b.updatedAt - a.updatedAt)
      } else {
        notes.value = []
      }
    } catch {
      notes.value = []
    }
  }

  // Persist notes on every change
  watch(
    notes,
    (val) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
      } catch {
        // Best effort persistence; ignore quota errors silently.
      }
    },
    { deep: true }
  )

  // Derived state
  const selectedNote = computed<Note | null>(() => {
    return notes.value.find((n) => n.id === selectedNoteId.value) ?? null
  })

  const filteredNotes = computed<Note[]>(() => {
    const q = searchQuery.value.trim().toLowerCase()
    if (!q) return notes.value
    return notes.value.filter((n) => {
      return (
        n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
      )
    })
  })

  /**
   * createNote
   * PUBLIC_INTERFACE
   * Creates a new note with optional title/content and selects it.
   */
  function createNote(title = 'Untitled note', content = ''): Note {
    const now = Date.now()
    const newNote: Note = {
      id: generateId(),
      title,
      content,
      createdAt: now,
      updatedAt: now,
    }
    notes.value.unshift(newNote)
    selectedNoteId.value = newNote.id
    return newNote
  }

  /**
   * updateNote
   * PUBLIC_INTERFACE
   * Updates the title and/or content of an existing note and bumps updatedAt.
   */
  function updateNote(id: string, payload: Partial<Pick<Note, 'title' | 'content'>>): void {
    const idx = notes.value.findIndex((n) => n.id === id)
    if (idx === -1) return
    const original = notes.value[idx]
    const updated: Note = {
      ...original,
      ...payload,
      updatedAt: Date.now(),
    }
    notes.value.splice(idx, 1, updated)
    // Move to top to reflect most recent update
    notes.value.sort((a, b) => b.updatedAt - a.updatedAt)
  }

  /**
   * deleteNote
   * PUBLIC_INTERFACE
   * Deletes a note by id. If the deleted note is selected, clears or selects another.
   */
  function deleteNote(id: string): void {
    const idx = notes.value.findIndex((n) => n.id === id)
    if (idx === -1) return
    notes.value.splice(idx, 1)
    if (selectedNoteId.value === id) {
      selectedNoteId.value = notes.value.length ? notes.value[0].id : null
    }
  }

  /**
   * selectNote
   * PUBLIC_INTERFACE
   * Selects a note by id for editing/viewing.
   */
  function selectNote(id: string): void {
    selectedNoteId.value = id
  }

  /**
   * setSearchQuery
   * PUBLIC_INTERFACE
   * Sets the search query used to filter notes in the sidebar.
   */
  function setSearchQuery(q: string): void {
    searchQuery.value = q
  }

  // Initialize state
  load()

  if (!notes.value.length) {
    // Seed with a helpful sample note for first run
    const sample = createNote(
      'Welcome to Notes',
      'Start typing here. This is your note content. Use the + button to create a new note, the trash to delete, and the search box to find notes.'
    )
    selectedNoteId.value = sample.id
  }

  return {
    notes,
    selectedNoteId,
    selectedNote,
    searchQuery,
    filteredNotes,
    createNote,
    updateNote,
    deleteNote,
    selectNote,
    setSearchQuery,
  }
})
