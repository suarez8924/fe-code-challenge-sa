import { CSSProperties } from "react";
import { Repository } from "../../data/types";
import RepositoryDetails from "../RepositoryDetails/RepositoryDetails";
import "./RepositoryList.scss";

interface RepositoriesListProps {
  repositories: Array<Repository> | [];
}
const RepositoriesList = (props: RepositoriesListProps) => {
  const { repositories } = props;

  return (
    <>
      {repositories.length > 0 ? (
        <ul data-testid="list">
          {repositories.map((repository, index) => (
            <li
              data-testid="list-item"
              key={repository.id}
              className="repository-item"
              style={{ "--index": index } as CSSProperties}
            >
              <RepositoryDetails repositoryContent={repository} />
            </li>
          ))}
        </ul>
      ) : (
        <div data-testid="not-found" className="not-found">
          <h2 className="heading-large">No elements found</h2>
        </div>
      )}
    </>
  );
};

export default RepositoriesList;
