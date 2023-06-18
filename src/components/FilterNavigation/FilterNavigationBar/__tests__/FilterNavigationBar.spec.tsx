import { render, fireEvent } from "@testing-library/react";
import {
  FilterNavigationBar,
  FilterNavigationBarProps,
} from "../FilterNavigationBar";

const filterNavigationBarProps: FilterNavigationBarProps = {
  filter: "All",
  sections: ["National", "Business", "Politics", "Quizzes", "Coronavirus"],
  handleFilterByDate: jest.fn(),
  handleReverseFilterByDate: jest.fn(),
  handleFilterBySection: jest.fn(),
  setFilter: jest.fn(),
  handleClearFilter: jest.fn(),
};

const mount = () =>
  render(<FilterNavigationBar {...filterNavigationBarProps} />);

describe("FilterNavigationBar", () => {
  it("should render FilterNavigationBar correctly", () => {
    const { getByText } = mount();

    const allButton = getByText("All");
    const sectionsButton = getByText("Sections");
    const dateButton = getByText("Date");

    expect(allButton).toHaveStyle({ textDecoration: "underline" });
    expect(sectionsButton).not.toHaveStyle({ textDecoration: "underline" });
    expect(dateButton).not.toHaveStyle({ textDecoration: "underline" });
  });

  it("should call handleClearFilter", () => {
    const { getByText } = mount();
    const dateButton = getByText("Date");

    fireEvent.click(dateButton);
    expect(filterNavigationBarProps.handleFilterByDate).toHaveBeenCalled();
  });
});
