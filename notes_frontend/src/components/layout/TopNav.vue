<script setup lang="ts">
import { useNotesStore } from '@/stores/notes'
import { computed } from 'vue'

const store = useNotesStore()
const noteCount = computed(() => store.notes.length)

/**
 * onCreateNote
 * PUBLIC_INTERFACE
 * Creates a new note from the top navigation bar.
 */
function onCreateNote() {
  store.createNote()
}
</script>

<template>
  <header class="topnav" role="banner" aria-label="Top Navigation">
    <div class="brand">
      <div class="logo" aria-hidden="true">📝</div>
      <div class="titles">
        <h1 class="app-name">Notes</h1>
        <p class="subtitle">{{ noteCount }} {{ noteCount === 1 ? 'note' : 'notes' }}</p>
      </div>
    </div>
    <div class="actions">
      <button class="btn btn-accent" @click="onCreateNote" title="Create new note">+ New</button>
    </div>
  </header>
</template>

<style scoped>
.topnav {
  height: 56px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--topnav-bg, #ffffff);
  border-bottom: 1px solid var(--color-border);
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  font-size: 18px;
  background: var(--primary-10);
  color: var(--primary);
  border: 1px solid var(--color-border);
}

.titles {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.app-name {
  font-size: 16px;
  font-weight: 700;
  color: var(--secondary);
}

.subtitle {
  font-size: 12px;
  color: var(--color-text);
  opacity: 0.7;
}

.actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn {
  appearance: none;
  border: 1px solid var(--color-border);
  padding: 8px 12px;
  border-radius: 8px;
  background: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: all .15s ease;
}

.btn:hover {
  border-color: var(--color-border-hover);
  transform: translateY(-1px);
}

.btn-accent {
  background: var(--accent);
  color: #1a1a1a;
  border-color: transparent;
}

.btn-accent:hover {
  filter: saturate(1.1);
}
</style>
