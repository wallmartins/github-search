import { defineStore } from "pinia";

export const useSearchHistoryStore = defineStore("searchHistory", {
  state: () => ({
    history: [] as string[],
  }),
  actions: {
    addSearchQuery(query: string) {
      if (!this.history.includes(query)) {
        this.history.unshift(query);

        // Limit history to last 10 searches
        if (this.history.length > 10) {
          this.history.pop();
        }
      }
    },
  },
});
