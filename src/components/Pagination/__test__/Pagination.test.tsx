import { render, screen } from "@testing-library/react";
import Pagination from "../Pagination";

describe("Test Pagination component", () => {
  let handlePageChangeMock = () => {};

  beforeEach(() => {
    handlePageChangeMock = jest.fn();
  });

  it("should not show left pagination button if current page is less or equal to first page", () => {
    const mockProps = {
      disabled: false,
      currentPage: 1,
      itemCount: 1000,
    };

    render(<Pagination {...mockProps} onPageChange={handlePageChangeMock} />);

    expect(screen.queryByTestId("left-button")).not.toBeInTheDocument();
  });

  it("should not show right pagination button if current page is greater or equal to last page", () => {
    const mockProps = {
      disabled: false,
      currentPage: 34,
      itemCount: 1000,
    };

    render(<Pagination {...mockProps} onPageChange={handlePageChangeMock} />);

    expect(screen.queryByTestId("right-button")).not.toBeInTheDocument();
  });
});
