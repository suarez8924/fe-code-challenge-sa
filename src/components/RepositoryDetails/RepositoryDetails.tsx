import { Repository } from "../../data/types";
import "./RepositoryDetails.scss";
import { ReactComponent as StarIcon } from "../../assets/svg/star-icon.svg";
import { ReactComponent as GithubIcon } from "../../assets/svg/github-icon.svg";

interface RepositoryDetailsProps {
  repositoryContent: Repository;
}

function RepositoryDetails(props: RepositoryDetailsProps) {
  const { name, htmlUrl, description, stargazersCount, language } =
    props.repositoryContent;
  const isStared = false;
  return (
    <div className="repository-details">
      <div className="details-container">
        <h2 className="repository-name">{name}</h2>
        {description && <p className="description">{description}</p>}
        <a
          className="repository-link"
          href={htmlUrl}
          target="_blank"
          aria-label={`Link to ${name} github repository`}
        >
          <GithubIcon className="github-icon" />
        </a>
      </div>
      {language && <p className="language">{language}</p>}
      <div className="stars-container">
        <StarIcon className={`star-icon ${isStared ? "is-stared" : ""}`} />

        <p className="star-count">{stargazersCount} stars</p>
      </div>
    </div>
  );
}

export default RepositoryDetails;
