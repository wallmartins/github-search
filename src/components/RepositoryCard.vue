<template>
  <div class="repository-card">
    <div class="card-header">
      <img
        :src="repository.owner.avatar_url"
        :alt="repository.owner.login"
        class="avatar"
      />
      <div class="header-info">
        <h3 class="repo-name">
          <a
            :href="repository.html_url"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ repository.name }}
          </a>
        </h3>
        <p class="owner-name">{{ repository.owner.login }}</p>
      </div>
      <button
        @click="toggleFavorite"
        :class="['favorite-button', { 'is-favorite': isFavorite }]"
        :aria-label="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
      >
        <span v-if="isFavorite">★</span>
        <span v-else>☆</span>
      </button>
    </div>

    <div class="card-body">
      <p class="description" v-if="repository.description">
        {{ repository.description }}
      </p>
      <p v-else class="no-description">No description available</p>
    </div>

    <div class="card-footer">
      <div class="stats">
        <div class="stat-item">
          <span class="stat-icon">★</span>
          <span class="stat-value">{{
            formatNumber(repository.stargazers_count)
          }}</span>
        </div>
        <div class="stat-item" v-if="repository.language">
          <span
            class="language-dot"
            :style="{ backgroundColor: getLanguageColor(repository.language) }"
          ></span>
          <span class="stat-value">{{ repository.language }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useFavoritesStore } from "../stores/favorites";
import { Repository } from "../types/repository";

export default defineComponent({
  name: "RepositoryCard",

  props: {
    repository: {
      type: Object as () => Repository,
      required: true,
    },
  },

  setup(props) {
    const favoritesStore = useFavoritesStore();

    const isFavorite = computed(() =>
      favoritesStore.isFavorite(props.repository.id)
    );

    const toggleFavorite = () => {
      if (isFavorite.value) {
        favoritesStore.removeFromFavorites(props.repository.id);
      } else {
        favoritesStore.addToFavorites(props.repository);
      }
    };

    const formatNumber = (num: number): string => {
      if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}k`;
      }
      return num.toString();
    };

    const getLanguageColor = (language: string): string => {
      const colors: Record<string, string> = {
        JavaScript: "#f1e05a",
        TypeScript: "#3178c6",
        Python: "#3572A5",
        Java: "#b07219",
        "C++": "#f34b7d",
        Ruby: "#701516",
        Go: "#00ADD8",
        Rust: "#dea584",
        default: "#6e7681",
      };
      return colors[language] || colors.default;
    };

    return {
      isFavorite,
      toggleFavorite,
      formatNumber,
      getLanguageColor,
    };
  },
});
</script>

<style scoped>
.repository-card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  transition: transform 0.2s, box-shadow 0.2s;
  width: 93%;
}

.repository-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
}

.header-info {
  flex: 1;
  min-width: 0;
}

.repo-name {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.repo-name a {
  color: #1e293b;
  text-decoration: none;
}

.repo-name a:hover {
  color: #4a90e2;
}

.owner-name {
  color: #64748b;
  margin: 0.25rem 0 0;
  font-size: 0.875rem;
}

.favorite-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  color: #94a3b8;
  transition: color 0.2s;
}

.favorite-button:hover {
  color: #eab308;
}

.favorite-button.is-favorite {
  color: #eab308;
}

.card-body {
  margin-bottom: 1rem;
}

.description {
  color: #475569;
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 40px;
}

.no-description {
  color: #94a3b8;
  font-style: italic;
  margin: 0;
  font-size: 0.8rem;
}

.card-footer {
  border-top: 1px solid #e2e8f0;
  padding-top: 1rem;
}

.stats {
  display: flex;
  gap: 1rem;
  color: #64748b;
  font-size: 0.8rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.stat-icon {
  color: #eab308;
}

.language-dot {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
}
</style>
