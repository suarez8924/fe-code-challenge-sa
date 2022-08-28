import { useEffect, useState } from "react";
import { Repository } from "../data/types";
import getStargazedRepositories from "../utils/getStargazedRepositories";
import useOneWeekAgoDate from "./useOneWeekAgoDate";
interface UseFetchRepositoriesProps {
  currentPage: number;
  searchLanguage: string;
}
const useFetchRepositories = ({
  currentPage,
  searchLanguage,
}: UseFetchRepositoriesProps) => {
  const [repositories, setRepositories] = useState<Array<Repository> | []>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState<Boolean>(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const lastWeekDate = useOneWeekAgoDate();

  useEffect(() => {
    if (lastWeekDate) {
      setLoading(true);
      fetch(
        `https://api.github.com/search/repositories?q=created:>${lastWeekDate}+language:${searchLanguage}&sort=stars&order=desc&page=${currentPage}`,
      )
        .then((response) => response.json())
        .then((data) => {
          const { items, total_count: totalCount } = data;
          const stargazedRepositoriesIds = getStargazedRepositories();
          console.log(data);
          const newRepositories = items.map(
            ({
              id,
              language,
              html_url,
              name,
              description,
              stargazers_count,
            }: any) => ({
              id,
              language,
              htmlUrl: html_url,
              name,
              description,
              stargazersCount: stargazers_count,
              isStargazed: stargazedRepositoriesIds.includes(id),
            }),
          ) as Array<Repository>;

          setTotalItemCount(totalCount >= 1000 ? 1000 : totalCount);
          setRepositories(newRepositories);
          setLoading(false);
        })
        .catch((error) => {
          setHasError(true);
          console.error(error);
        });
    }
  }, [lastWeekDate, currentPage, searchLanguage]);

  return {
    repositories,
    hasError,
    loading,
    totalItemCount,
  };
};

export default useFetchRepositories;
