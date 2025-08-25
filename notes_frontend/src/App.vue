<script setup lang="ts">
import { TopNav, NotesSidebar } from '@/components/layout'
import NoteEditor from '@/components/notes/NoteEditor.vue'
</script>

<template>
  <div class="app-root">
    <TopNav />
    <div class="app-body">
      <NotesSidebar class="sidebar" />
      <main class="main">
        <NoteEditor />
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-root {
  display: flex;
  flex-direction: column;
  height: 100dvh;
  background: var(--color-background);
  color: var(--color-text);
}

/* Body layout: sidebar + main */
.app-body {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 0;
  height: calc(100dvh - 56px);
  border-top: 1px solid var(--color-border);
}

/* Sidebar specifics handled inside the component as well */
.sidebar {
  border-right: 1px solid var(--color-border);
  background: var(--color-background-soft);
}

/* Main content area */
.main {
  min-width: 0;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

/* Responsive: collapse sidebar for small screens */
@media (max-width: 900px) {
  .app-body {
    grid-template-columns: 1fr;
  }
  .sidebar {
    display: none;
  }
}
</style>
