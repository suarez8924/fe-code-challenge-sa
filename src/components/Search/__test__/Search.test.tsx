import { fireEvent, render, screen } from "@testing-library/react";
import Search from "../Search";

let handleSearchMock = () => {};

describe("Test Search component", () => {
  beforeEach(() => {
    handleSearchMock = jest.fn();
  });

  it("should show placeholder correctly if placeholder is provided", () => {
    render(<Search onSearch={handleSearchMock} placeholder="Test Search" />);
    const input = screen.getByTestId("input");
    expect(input.getAttribute("placeholder")).toBe("Test Search");
  });

  it("should show default placeholder correctly if placeholder is not provided", () => {
    render(<Search onSearch={handleSearchMock} />);
    const input = screen.getByTestId("input");

    expect(input.getAttribute("placeholder")).toBe("Search");
  });

  it("should disable search button when disabled prop is true", () => {
    render(<Search onSearch={handleSearchMock} disabled />);
    const searchButton = screen.getByTestId("search-button");

    expect(searchButton).toBeDisabled();
  });

  it("should show correct search text in input", () => {
    render(<Search onSearch={handleSearchMock} />);
    const input = screen.getByTestId("input");

    fireEvent.change(input, { target: { value: "js" } });
    expect(input.getAttribute("value")).toBe("js");
  });

  it("should call onSearch prop after button click", () => {
    const handleSearchMock = jest.fn();

    render(<Search onSearch={handleSearchMock} />);

    const searchButton = screen.getByTestId("search-button");

    fireEvent.click(searchButton);

    expect(handleSearchMock).toHaveBeenCalledTimes(1);
  });

  it("should blank input after clicking button", async () => {
    const handleSearchMock = jest.fn();
    render(<Search onSearch={handleSearchMock} />);

    const searchButton = screen.getByTestId("search-button");
    const input = screen.getByTestId("input");

    fireEvent.change(input, { target: { value: "js" } });

    expect(input.getAttribute("value")).toBe("js");

    fireEvent.click(searchButton);

    expect(input.getAttribute("value")).toBe("");
  });
});
