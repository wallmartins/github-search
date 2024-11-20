import { defineStore } from "pinia";
import { githubService } from "../service/githubApi";
import { Repository, SearchParams } from "../types/repository";

export const useRepositoryStore = defineStore("repositories", {
  state: () => ({
    repositories: [] as Repository[],
    loading: false,
    error: null as string | null,
    totalCount: 0,
  }),
  actions: {
    async fetchRepositories(query: string, options?: SearchParams) {
      this.loading = true;
      this.error = null;

      try {
        const response = await githubService.searchRepositories({
          query,
          sort: options?.sort || "stars",
          order: options?.order || "desc",
          page: options?.page || 1,
          per_page: 10,
        });

        this.repositories = response.items;
        this.totalCount = response.total_count;
      } catch (error: any) {
        this.error = error.message;
        this.repositories = [];
      } finally {
        this.loading = false;
      }
    },
    clearRepositories() {
      this.repositories = [];
      this.totalCount = 0;
    },
  },
  getters: {
    repositoryCount(): number {
      return this.repositories.length;
    },
  },
});
