<template>
  <section class="favorites-section">
    <div v-if="favorites.length > 0" class="repository-grid">
      <RepositoryCard
        v-for="repo in favorites"
        :key="repo.id"
        :repository="repo"
      />
    </div>
    <div v-else class="empty-state">No favorite repositories yet</div>
  </section>
</template>

<script lang="ts">
import { Repository } from "../types/repository";
import RepositoryCard from "./RepositoryCard.vue";

export default {
  name: "FavoriteList",

  components: {
    RepositoryCard,
  },

  props: {
    favorites: {
      type: Array as () => Repository[],
      required: true,
    },
  },
};
</script>

<style scoped>
.repository-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #64748b;
  font-size: 1rem;
}

@media (max-width: 640px) {
  .repository-grid {
    grid-template-columns: 1fr;
  }
}
</style>
