<template>
  <section class="results-section">
    <div class="repository-grid">
      <RepositoryCard
        v-for="repo in repositories"
        :key="repo.id"
        :repository="repo"
      />
    </div>
  </section>
</template>
<script lang="ts">
import { Repository } from "../types/repository";
import RepositoryCard from "./RepositoryCard.vue";

export default {
  name: "RepositoryList",

  components: {
    RepositoryCard,
  },

  props: {
    repositories: {
      type: Array as () => Repository[],
      required: true,
    },
    totalCount: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.results-info {
  margin-bottom: 1rem;
  color: #64748b;
}

.repository-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

@media (max-width: 640px) {
  .repository-grid {
    grid-template-columns: 1fr;
  }
}
</style>
