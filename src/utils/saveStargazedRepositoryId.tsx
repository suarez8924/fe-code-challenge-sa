import { StargazedRepositories } from "../data/types";

const saveStargazedRepositoryId = (repositoryId: number) => {
  const stargazedRepositories = localStorage.getItem("stargazed-repositories");

  if (stargazedRepositories) {
    const { repositoriesIds } = JSON.parse(
      stargazedRepositories,
    ) as StargazedRepositories;

    if (!repositoriesIds.includes(repositoryId)) {
      localStorage.setItem(
        "stargazed-repositories",
        JSON.stringify({
          repositoriesIds: [...repositoriesIds, repositoryId],
        }),
      );
    }
  } else {
    localStorage.setItem(
      "stargazed-repositories",
      JSON.stringify({ repositoriesIds: [repositoryId] }),
    );
  }
};

export default saveStargazedRepositoryId;
