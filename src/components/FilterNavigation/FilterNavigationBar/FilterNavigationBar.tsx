import "./FilterNavigationBar.css";
import { FilterNavigationButton } from "../FilterNavigationButton/FilterNavigationButton";

export const FilterNavigationBar = () => {
  return (
    <div className="filter-navigation-bar">
      <h3>Filter by:</h3>
      <FilterNavigationButton text="Sections" />
      <FilterNavigationButton text="Date" />
    </div>
  );
};
