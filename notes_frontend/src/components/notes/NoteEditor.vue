<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useNotesStore } from '@/stores/notes'

const store = useNotesStore()

const selected = computed(() => store.selectedNote)
const title = ref(selected.value?.title ?? '')
const content = ref(selected.value?.content ?? '')

/**
 * syncSelected
 * Keep local form state in sync when selection changes.
 */
watch(
  () => store.selectedNoteId,
  () => {
    title.value = selected.value?.title ?? ''
    content.value = selected.value?.content ?? ''
  },
  { immediate: true }
)

/**
 * onInputTitle
 * PUBLIC_INTERFACE
 * Handler for title input updates.
 */
function onInputTitle() {
  if (!selected.value) return
  store.updateNote(selected.value.id, { title: title.value })
}

/**
 * onInputContent
 * PUBLIC_INTERFACE
 * Handler for content textarea updates.
 */
function onInputContent() {
  if (!selected.value) return
  store.updateNote(selected.value.id, { content: content.value })
}

/**
 * onDeleteCurrent
 * PUBLIC_INTERFACE
 * Deletes the currently selected note.
 */
function onDeleteCurrent() {
  if (!selected.value) return
  if (confirm(`Delete "${selected.value.title || 'Untitled note'}"?`)) {
    store.deleteNote(selected.value.id)
  }
}
</script>

<template>
  <section class="editor" aria-label="Note Editor">
    <div v-if="!selected" class="empty">
      <p>Select a note from the sidebar or create a new one.</p>
    </div>
    <div v-else class="paper">
      <div class="editor-actions">
        <button class="btn danger" title="Delete note" @click="onDeleteCurrent">Delete</button>
      </div>
      <input
        class="title"
        type="text"
        v-model="title"
        @input="onInputTitle"
        placeholder="Note title"
        aria-label="Note title"
      />
      <textarea
        class="content"
        v-model="content"
        @input="onInputContent"
        placeholder="Start writing your note here…"
        aria-label="Note content"
      />
    </div>
  </section>
</template>

<style scoped>
.editor {
  display: flex;
  height: 100%;
  min-height: 0;
}

.empty {
  margin: auto;
  color: #666;
}

.paper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #ffffff;
  border: 1px solid var(--color-border);
  border-radius: 14px;
  padding: 16px;
  box-shadow: 0 1px 2px rgba(0,0,0,.04);
}

.editor-actions {
  display: flex;
  justify-content: flex-end;
}

.btn {
  appearance: none;
  border: 1px solid var(--color-border);
  padding: 6px 10px;
  border-radius: 8px;
  background: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: all .12s ease;
}

.btn:hover {
  border-color: var(--color-border-hover);
}

.btn.danger {
  color: #b3261e;
  background: #ffeceb;
  border-color: #ffd1cf;
}

.title {
  width: 100%;
  font-size: 20px;
  font-weight: 800;
  border: none;
  outline: none;
  padding: 6px 2px;
  color: var(--secondary);
}

.content {
  width: 100%;
  min-height: 48vh;
  flex: 1;
  resize: none;
  border: none;
  outline: none;
  font-size: 14px;
  line-height: 1.6;
  padding: 6px 2px 12px 2px;
  color: #222;
}
</style>
