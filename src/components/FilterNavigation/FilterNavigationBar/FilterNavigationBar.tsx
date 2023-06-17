import "./FilterNavigationBar.css";
import { FilterNavigationButton } from "../FilterNavigationButton/FilterNavigationButton";
import { memo, useState } from "react";

type FilterNavigationBarProps = {
  handleFilterByDate: () => void;
  handleReverseFilterByDate: () => void;
};

export const FilterNavigationBar = memo(
  ({
    handleFilterByDate,
    handleReverseFilterByDate,
  }: FilterNavigationBarProps) => {
    const [activeFilter, setActiveFilter] = useState("All");

    return (
      <div className="filter-navigation-bar">
        <h3>Filter by:</h3>
        <FilterNavigationButton text="Sections" />
        <FilterNavigationButton
          text="Date"
          onClick={() => {
            handleFilterByDate();
            setActiveFilter("Date");
          }}
          onClickToggle={handleReverseFilterByDate}
          isActive={activeFilter === "Date"}
        />
        <FilterNavigationButton text="All" />
      </div>
    );
  }
);
