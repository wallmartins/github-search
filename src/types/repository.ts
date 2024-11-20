export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  language: string;
  html_url: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface SearchResponse {
  total_count: number;
  items: Repository[];
}

export interface SearchParams {
  query?: string;
  sort?: "stars" | "forks" | "updated";
  order?: "asc" | "desc";
  page?: number;
  per_page?: number;
}

export interface RepositoryState {
  repositories: Repository[];
  loading: boolean;
  error: string | null;
  totalCount: number;
}
