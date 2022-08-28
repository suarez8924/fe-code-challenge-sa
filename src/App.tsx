import { useEffect, useState } from "react";
import "./App.scss";
import Loader from "./components/Loader/Loader";
import Pagination from "./components/Pagination/Pagination";
import RepositoriesList from "./components/RepositoriesList/RepositoriesList";
import { Repository } from "./data/types";
import useOneWeekAgoDate from "./hooks/useOneWeekAgoDate";

function App() {
  const [repositories, setRepositories] = useState<Array<Repository> | []>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState<Boolean>(false);
  const [currentPage, setCurrentPage] = useState(32);
  const [totalItemCount, setTotalItemCount] = useState(0);

  const lastWeekDate = useOneWeekAgoDate();

  useEffect(() => {
    if (lastWeekDate) {
      setLoading(true);
      fetch(
        `https://api.github.com/search/repositories?q=created:>${lastWeekDate}&sort=stars&order=desc&page=${currentPage}`,
      )
        .then((response) => response.json())
        .then((data) => {
          const { items, total_count: totalCount } = data;
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
  }, [lastWeekDate, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (hasError) {
    return <h1>Something went wrong...</h1>;
  }

  return (
    <main className="App">
      <header className="container header">
        <h1>Top Repositories of the week</h1>
        {repositories.length > 0 && (
          <Pagination
            className="pagination"
            disabled={loading}
            itemCount={totalItemCount}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </header>
      <section className="container app-container">
        {loading ? (
          <Loader />
        ) : (
          <RepositoriesList repositories={repositories} />
        )}
      </section>
    </main>
  );
}

export default App;
