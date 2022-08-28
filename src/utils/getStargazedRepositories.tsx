import { StargazedRepositories } from "../data/types";

const getStargazedRepositories = () => {
  const stargazedRepositories = localStorage.getItem("stargazed-repositories");

  if (!stargazedRepositories) return [];

  return (JSON.parse(stargazedRepositories) as StargazedRepositories)
    .repositoriesIds;
};

export default getStargazedRepositories;
