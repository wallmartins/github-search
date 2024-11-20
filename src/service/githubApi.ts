import axios, { AxiosInstance } from "axios";
import { Repository, SearchParams, SearchResponse } from "../types/repository";

class GitHubService {
  private api: AxiosInstance;

  constructor() {
    const API_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

    this.api = axios.create({
      baseURL: "https://api.github.com",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    });
  }

  async searchRepositories(params: SearchParams): Promise<SearchResponse> {
    try {
      const response = await this.api.get<SearchResponse>(
        "/search/repositories",
        {
          params: {
            q: params.query,
            sort: params.sort || "stars",
            order: params.order || "desc",
            page: params.page || 1,
            per_page: params.per_page || 10,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("GitHub API Error:", error);
      throw error;
    }
  }

  async getRepository(owner: string, repo: string): Promise<Repository> {
    const response = await this.api.get<Repository>(`/repos/${owner}/${repo}`);
    return response.data;
  }
}

export const githubService = new GitHubService();
