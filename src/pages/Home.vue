<template>
  <div class="app-container">
    <header class="header">
      <h1 class="title">GitHub Search</h1>
      <nav class="nav">
        <button
          :class="['nav-button', { active: currentView === 'search' }]"
          @click="currentView = 'search'"
        >
          Search
        </button>
        <button
          :class="['nav-button', { active: currentView === 'favorites' }]"
          @click="currentView = 'favorites'"
        >
          Favorites
        </button>
      </nav>
    </header>

    <main class="main-content">
      <SearchBar v-if="currentView === 'search'" />

      <div v-if="isLoading" class="loading-state">
        <span class="loading-text">Loading repositories...</span>
      </div>

      <div v-else-if="error" class="error-state">
        <p class="error-message">{{ error }}</p>
      </div>

      <template v-else>
        <RepositoryList
          v-if="currentView === 'search'"
          :repositories="repositories"
          :total-count="totalCount"
        />

        <FavoriteList v-else :favorites="favorites" />
      </template>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

import { useRepositoryStore } from "../stores/repositories";
import { useFavoritesStore } from "../stores/favorites";

import SearchBar from "../components/SearchBar.vue";
import RepositoryCard from "../components/RepositoryCard.vue";
import RepositoryList from "../components/RepositoryList.vue";
import FavoriteList from "../components/FavoriteList.vue";

export default defineComponent({
  name: "App",

  components: {
    SearchBar,
    RepositoryCard,
    RepositoryList,
    FavoriteList,
  },

  setup() {
    const currentView = ref<"search" | "favorites">("search");
    const repositoryStore = useRepositoryStore();
    const favoritesStore = useFavoritesStore();

    const repositories = computed(() => repositoryStore.repositories);
    const favorites = computed(() => favoritesStore.favorites);
    const isLoading = computed(() => repositoryStore.loading);
    const error = computed(() => repositoryStore.error);
    const totalCount = computed(() => repositoryStore.totalCount);

    return {
      currentView,
      repositories,
      favorites,
      isLoading,
      error,
      totalCount,
    };
  },
});
</script>

<style scoped>
.app-container {
  width: 100%;
  min-height: 100vh;
  background-color: #e8eaee;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 2.5rem;
  border: 1px solid #ccc;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
}

.nav {
  display: flex;
  gap: 1rem;
}

.nav-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
}

.nav-button.active {
  background-color: #000;
  color: white;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 2rem;
}

.loading-text {
  color: #64748b;
  font-size: 1.125rem;
}

.error-message {
  color: #ef4444;
  font-size: 1.125rem;
}

@media (max-width: 640px) {
  .main-content {
    padding: 1rem;
  }

  .repository-grid {
    grid-template-columns: 1fr;
  }
}
</style>
