import "./FilterNavigationBar.css";
import { FilterNavigationButton } from "../FilterNavigationButton/FilterNavigationButton";
import { memo, useEffect, useState } from "react";
import { Filter } from "../../../pages/HomePage/useHomePage";

export type FilterNavigationBarProps = {
  filter: Filter;
  sections: string[];
  handleFilterByDate: () => void;
  handleReverseFilterByDate: () => void;
  handleFilterBySection: (section: string) => void;
  setFilter: (filter: Filter) => void;
  handleClearFilter: () => void;
};

export const FilterNavigationBar = memo(
  ({
    filter,
    sections,
    handleFilterByDate,
    handleReverseFilterByDate,
    handleFilterBySection,
    setFilter,
    handleClearFilter,
  }: FilterNavigationBarProps) => {
    const [isSectionsActive, setIsSectionsActive] = useState(false);
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const toggleSections = () => {
      setIsSectionsActive(!isSectionsActive);
      if (isSectionsActive) {
        setFilter("All");
        setActiveSection(null);
      }
    };

    // handles if user selects a different filter instead of collapsing sections
    useEffect(() => {
      if (filter !== "Section") {
        setIsSectionsActive(false);
        setActiveSection(null);
      }
    }, [filter]);

    const handleActiveSection = (section: string) => {
      setActiveSection(section);
    };

    return (
      <div className="filter-navigation-bar">
        <div className="filter-navigation-bar-button-container-alignment">
          <div className="filter-navigation-bar-button-container">
            <h3 className="filter-text">Filter by:</h3>
            <div className="filter-buttons-container">
              <FilterNavigationButton
                text="All"
                onClick={handleClearFilter}
                isActive={filter === "All"}
              />
              <FilterNavigationButton
                text="Sections"
                onClick={toggleSections}
                isActive={filter === "Section"}
              />
              <FilterNavigationButton
                text="Date"
                onClick={handleFilterByDate}
                onClickToggle={handleReverseFilterByDate}
                isActive={filter === "Date"}
              />
            </div>
          </div>
        </div>
        {isSectionsActive && (
          <div className="filter-sections-container">
            {sections.map((section) => (
              <FilterNavigationButton
                key={section}
                text={section}
                onClick={() => {
                  handleFilterBySection(section);
                  handleActiveSection(section);
                  setFilter("Section");
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
