import { MouseEvent, ChangeEvent, useState } from "react";
import { ReactComponent as MagnifyingGlassIcon } from "../../assets/svg/magnifying-glass.svg";
import "./Search.scss";

interface SearchProps {
  className?: string;
  ariaLabel?: string;
  placeholder?: string;
  disabled?: boolean;
  onSearch: (searchValue: string) => void;
}
const Search = ({
  className = "",
  ariaLabel = "",
  placeholder = "Search",
  disabled = false,
  onSearch,
}: SearchProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    onSearch(searchValue);
    setSearchValue("");
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <form className={`search ${className}`} aria-label={ariaLabel}>
      <input
        data-testid="input"
        className="search-input"
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      <button
        data-testid="search-button"
        className="search-button"
        type="button"
        onClick={handleClick}
        disabled={disabled}
      >
        <MagnifyingGlassIcon />
      </button>
    </form>
  );
};

export default Search;
