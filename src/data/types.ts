export type Repository = {
  id: number;
  language: string;
  name: string;
  htmlUrl: string;
  description: string;
  stargazersCount: number;
  isStargazed: boolean;
};

export type StargazedRepositories = {
  repositoriesIds: Array<number>;
};
