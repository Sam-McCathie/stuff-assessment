import "./FilterNavigationBar.css";
import { FilterNavigationButton } from "../FilterNavigationButton/FilterNavigationButton";
import { memo, useState } from "react";

type FilterNavigationBarProps = {
  sections: string[];
  handleFilterByDate: () => void;
  handleReverseFilterByDate: () => void;
  handleFilterByCategory: (category: string) => void;
};

export const FilterNavigationBar = memo(
  ({
    sections,
    handleFilterByDate,
    handleReverseFilterByDate,
    handleFilterByCategory,
  }: FilterNavigationBarProps) => {
    const [activeFilter, setActiveFilter] = useState("All");
    const [isSectionsActive, setIsSectionsActive] = useState(false);

    const toggleSections = () => {
      setIsSectionsActive(!isSectionsActive);
    };

    return (
      <div className="filter-navigation-bar">
        <div className="filter-navigation-bar-button-container">
          <h3>Filter by:</h3>
          <FilterNavigationButton text="All" />
          <FilterNavigationButton text="Sections" onClick={toggleSections} />
          <FilterNavigationButton
            text="Date"
            onClick={() => {
              handleFilterByDate();
              setActiveFilter("Date");
            }}
            onClickToggle={handleReverseFilterByDate}
            isActive={activeFilter === "Date"}
          />
        </div>
        {isSectionsActive && (
          <div>
            {sections.map((section) => (
              <FilterNavigationButton
                text={section}
                onClick={() => handleFilterByCategory(section)}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);
