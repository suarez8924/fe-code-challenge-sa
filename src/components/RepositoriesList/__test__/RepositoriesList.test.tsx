import { render, screen } from "@testing-library/react";
import { Repository } from "../../../data/types";
import mockRepositories from "../../../utils/__mock__/mockRepositories";
import RepositoriesList from "../RepositoriesList";

let mockData: Repository[] | [] = [];

describe("Test RepositoriesList component", () => {
  beforeAll(() => {
    mockData = mockRepositories;
  });

  it("should display not found message if no repositories items", () => {
    render(<RepositoriesList repositories={[]} />);

    const notFoundElement = screen.getByTestId("not-found");

    expect(notFoundElement).toBeInTheDocument();
  });

  it("should render list if there are repository items", () => {
    render(<RepositoriesList repositories={mockRepositories} />);

    const list = screen.getByTestId("list");

    expect(list).toBeInTheDocument();
  });

  it("should render correct amount of items in list", () => {
    render(<RepositoriesList repositories={mockRepositories} />);

    const listItems = screen.queryAllByTestId("list-item");
    const expectedLength = mockRepositories.length;

    expect(listItems.length).toBe(expectedLength);
  });
});
