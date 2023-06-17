import "./FilterNavigationBar.css";
import { FilterNavigationButton } from "../FilterNavigationButton/FilterNavigationButton";
import { memo, useEffect, useState } from "react";
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
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const toggleSections = () => {
      setIsSectionsActive(!isSectionsActive);
      if (isSectionsActive) {
        setFilterActive("All");
        setActiveSection(null);
      }
    };

    // handles if user selects a different filter instead of collapsing sections
    useEffect(() => {
      if (filterActive !== "Section") {
        setIsSectionsActive(false);
        setActiveSection(null);
      }
    }, [filterActive]);

    const handleActiveSection = (section: string) => {
      setActiveSection(section);
    };

    return (
      <div className="filter-navigation-bar">
        <div className="filter-navigation-bar-button-container">
          <h3>Filter by:</h3>
          <FilterNavigationButton
            text="All"
            onClick={handleClearFilter}
            isActive={filterActive === "All"}
          />
          <FilterNavigationButton
            text="Sections"
            onClick={toggleSections}
            isActive={filterActive === "Section"}
          />
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
                  handleActiveSection(section);
                  setFilterActive("Section");
                }}
                isActive={activeSection === section}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);
