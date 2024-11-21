<template>
  <div class="search-container">
    <form @submit.prevent="handleSearch" class="search-form">
      <div class="search-input-container">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search repositories..."
          class="search-input"
          :disabled="isLoading"
          @input="handleInput"
        />
        <SearchIcon />
        <div
          v-if="showHistory && searchHistory.length > 0"
          class="search-history"
        >
          <ul>
            <li
              v-for="query in searchHistory"
              :key="query"
              @click="selectHistoryItem(query)"
              class="history-item"
            >
              {{ query }}
            </li>
          </ul>
        </div>
      </div>

      <div class="search-options">
        <select v-model="sortBy" class="sort-select">
          <option value="stars">Stars</option>
          <option value="forks">Forks</option>
          <option value="updated">Updated</option>
        </select>

        <select v-model="orderBy" class="order-select">
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      <button
        type="submit"
        class="search-button"
        :disabled="isLoading || !searchQuery.trim()"
      >
        {{ isLoading ? "Searching..." : "Search" }}
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRepositoryStore } from "../stores/repositories";
import { useSearchHistoryStore } from "../stores/search";
import debounce from "lodash/debounce";
import SearchIcon from "../assets/searchIcon.vue";

export default defineComponent({
  name: "SearchBar",

  components: {
    SearchIcon,
  },

  setup() {
    const repositoryStore = useRepositoryStore();
    const searchHistoryStore = useSearchHistoryStore();

    const searchQuery = ref("");
    const sortBy = ref<"stars" | "forks" | "updated">("stars");
    const orderBy = ref<"asc" | "desc">("desc");
    const showHistory = ref(false);

    const isLoading = computed(() => repositoryStore.loading);
    const searchHistory = computed(() => searchHistoryStore.history);

    const handleSearch = async () => {
      if (!searchQuery.value.trim() || isLoading.value) return;

      try {
        await repositoryStore.fetchRepositories(searchQuery.value, {
          sort: sortBy.value,
          order: orderBy.value,
        });

        searchHistoryStore.addSearchQuery(searchQuery.value);
        showHistory.value = false;
      } catch (error) {
        console.error("Search error:", error);
      }
    };

    const handleInput = debounce(() => {
      showHistory.value = searchQuery.value.length > 0;
    }, 300);

    const selectHistoryItem = (query: string) => {
      searchQuery.value = query;
      showHistory.value = false;
      handleSearch();
    };

    return {
      searchQuery,
      sortBy,
      orderBy,
      isLoading,
      showHistory,
      searchHistory,
      handleSearch,
      handleInput,
      selectHistoryItem,
    };
  },
});
</script>

<style scoped>
.search-container {
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 20px;
}

.search-form {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.search-input-container {
  position: relative;
  flex: 1;
}

.search-input {
  width: 100%;
  padding: 1.25rem 1.25rem 1.25rem 3rem;
  background: #e8eaee;
  border-radius: 0.75rem;
  font-size: 1rem;
  color: #000;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: #4a90e2;
}

.search-history {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  margin-top: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.history-item {
  padding: 0.75rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.history-item:hover {
  background-color: #f7fafc;
}

.search-options {
  display: flex;
  gap: 0.5rem;
}

.sort-select,
.order-select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 1.25rem 2rem;
  background: #fff;
  border-radius: 0.75rem;
  border: 1px solid #f2f4f8;
  cursor: pointer;
  background: url("../assets/caret.svg") no-repeat 94% center;
  background-size: 1rem;
}

.search-button {
  padding: 1.25rem 1rem;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.search-button:hover:not(:disabled) {
  background-color: #357abd;
}

.search-button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

@media (max-width: 640px) {
  .search-form {
    flex-direction: column;
  }
}
</style>
