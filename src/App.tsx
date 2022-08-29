import { useEffect, useState } from "react";
import "./App.scss";
import Loader from "./components/Loader/Loader";
import Pagination from "./components/Pagination/Pagination";
import RepositoriesList from "./components/RepositoriesList/RepositoriesList";
import Search from "./components/Search/Search";
import useFetchRepositories from "./hooks/useFetchRepositories";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchLanguage, setSearchLanguage] = useState("");
  const { loading, hasError, repositories, totalItemCount } =
    useFetchRepositories({
      currentPage,
      searchLanguage,
    });

  useEffect(() => {
    const stargazedRepositories = localStorage.getItem(
      "stargazed-repositories",
    );
    if (!stargazedRepositories) {
      localStorage.setItem(
        "stargazed-repositories",
        JSON.stringify({ repositoriesIds: [] }),
      );
    }
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleLanguageSearch = (searchValue: string) => {
    setSearchLanguage(searchValue);
  };

  if (hasError) {
    return <h1>Something went wrong...</h1>;
  }

  return (
    <main className="App">
      <header className="container header">
        <h1 className="main-title heading-large">
          Top Repositories of the week
        </h1>
        {repositories.length > 0 && (
          <Pagination
            className="pagination"
            disabled={loading}
            itemCount={totalItemCount}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
        <Search
          className="language-search"
          onSearch={handleLanguageSearch}
          disabled={loading}
          placeholder="Search By Language"
        />
      </header>
      <section className="container app-container">
        {loading ? (
          <Loader className="loader" />
        ) : (
          <RepositoriesList repositories={repositories} />
        )}
      </section>
    </main>
  );
}

export default App;
