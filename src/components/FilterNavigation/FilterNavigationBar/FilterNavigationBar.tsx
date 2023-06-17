import "./FilterNavigationBar.css";
import { FilterNavigationButton } from "../FilterNavigationButton/FilterNavigationButton";
import { memo, useState } from "react";

type FilterNavigationBarProps = {
  handleFilterByDate: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleReverseFilterByDate: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
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
          onClick={(e) => {
            handleFilterByDate(e);
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
