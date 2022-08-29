import "./Loader.scss";

interface LoaderProps {
  className?: string;
}
const Loader = ({ className = "" }: LoaderProps) => {
  return (
    <div
      data-testid="loader"
      className={`loader-container heading-large ${className}`}
    >
      <h2>LOADING...</h2>
    </div>
  );
};

export default Loader;
