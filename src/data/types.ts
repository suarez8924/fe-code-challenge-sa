export type Owner = {
  login: string;
  avatarUrl: string;
};

export type Repository = {
  id: number;
  language: string;
  name: string;
  url: string;
  owner: Owner;
};
