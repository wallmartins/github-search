import { defineStore } from "pinia";
import { Repository } from "../types/repository";

interface FavoritesState {
  favorites: Repository[];
}

export const useFavoritesStore = defineStore("favorites", {
  state: (): FavoritesState => ({
    favorites: [],
  }),
  actions: {
    addToFavorites(repo: Repository) {
      if (!this.favorites.some((f) => f.id === repo.id)) {
        this.favorites.push(repo);
      }
    },
    removeFromFavorites(repoId: number) {
      this.favorites = this.favorites.filter((repo) => repo.id !== repoId);
    },
  },
  getters: {
    isFavorite(): (repoId: number) => boolean {
      return (repoId: number) =>
        this.favorites.some((repo) => repo.id === repoId);
    },
  },
  persist: {
    storage: localStorage,
  },
});
