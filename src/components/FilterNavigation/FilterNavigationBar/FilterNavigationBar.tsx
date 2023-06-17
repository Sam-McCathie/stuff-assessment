import "./FilterNavigationBar.css";
import { FilterNavigationButton } from "../FilterNavigationButton/FilterNavigationButton";
import { memo, useState } from "react";
import { FilterActive } from "../../../pages/HomePage/useHomePage";

type FilterNavigationBarProps = {
  filterActive: FilterActive;
  sections: string[];
  handleFilterByDate: () => void;
  handleReverseFilterByDate: () => void;
  handleFilterByCategory: (category: string) => void;
  setFilterActive: (filterActive: FilterActive) => void;
  handleClearFilter: () => void;
};

export const FilterNavigationBar = memo(
  ({
    filterActive,
    sections,
    handleFilterByDate,
    handleReverseFilterByDate,
    handleFilterByCategory,
    setFilterActive,
    handleClearFilter,
  }: FilterNavigationBarProps) => {
    const [isSectionsActive, setIsSectionsActive] = useState(false);

    const toggleSections = () => {
      setIsSectionsActive(!isSectionsActive);
      isSectionsActive && setFilterActive("All");
    };

    return (
      <div className="filter-navigation-bar">
        <div className="filter-navigation-bar-button-container">
          <h3>Filter by:</h3>
          <FilterNavigationButton text="All" onClick={handleClearFilter} />
          <FilterNavigationButton text="Sections" onClick={toggleSections} />
          <FilterNavigationButton
            text="Date"
            onClick={handleFilterByDate}
            onClickToggle={handleReverseFilterByDate}
            isActive={filterActive === "Date"}
          />
        </div>
        {isSectionsActive && (
          <div>
            {sections.map((section) => (
              <FilterNavigationButton
                key={section}
                text={section}
                onClick={() => {
                  handleFilterByCategory(section);
                  setFilterActive("Section");
                }}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);
