import { Repository } from "../../data/types";
import "./RepositoryDetails.scss";
import { ReactComponent as StarIcon } from "../../assets/svg/star-icon.svg";
import { ReactComponent as GithubIcon } from "../../assets/svg/github-icon.svg";
import saveStargazedRepositoryId from "../../utils/saveStargazedRepositoryId";
import { useState } from "react";

// NOTE: The stargazersCount value is displayed with a +1 value to emulate the count update

interface RepositoryDetailsProps {
  repositoryContent: Repository;
}

const RepositoryDetails = (props: RepositoryDetailsProps) => {
  const {
    id,
    name,
    htmlUrl,
    description,
    stargazersCount,
    language,
    isStargazed,
  } = props.repositoryContent;
  const [clicked, setClicked] = useState(false);

  const handleStarClick = () => {
    setClicked(true);
    saveStargazedRepositoryId(id);
  };
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
        <button onClick={handleStarClick} disabled={isStargazed || clicked}>
          <StarIcon
            className={`star-icon ${
              isStargazed || clicked ? "is-stargazed" : ""
            }`}
          />
        </button>

        <p className="star-count">
          {isStargazed || clicked ? stargazersCount + 1 : stargazersCount} stars
        </p>
      </div>
    </div>
  );
};

export default RepositoryDetails;
