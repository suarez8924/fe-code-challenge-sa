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
        <ul>
          {repositories.map((repository) => (
            <li key={repository.id} className="repository-item">
              <RepositoryDetails repositoryContent={repository} />
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <h2>No elements found</h2>
        </div>
      )}
    </>
  );
};

export default RepositoriesList;
