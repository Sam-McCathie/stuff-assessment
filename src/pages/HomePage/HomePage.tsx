import { Articles } from "../../components/Articles/Articles";
import { FilterNavigationBar } from "../../components/FilterNavigation/FilterNavigationBar/FilterNavigationBar";
import { Toolbar } from "../../components/Toolbar.tsx/Toolbar";
import "./HomePage.css";
import { useHomePage } from "./useHomePage";

export const HomePage = () => {
  const {
    data: { articleData, errorMessage, sortedArticleData, filter, sections },
    operations: {
      handleArticleClick,
      handleFilterByDate,
      handleReverseFilterByDate,
      handleFilterBySection,
      setFilter,
      handleClearFilter,
    },
  } = useHomePage();

  if (!articleData) {
    return <h1>Loading...</h1>;
  }

  if (errorMessage) {
    return <h1>{errorMessage}</h1>;
  }

  const FilterNavigationBarProps = {
    filter,
    sections,
    handleFilterByDate,
    handleReverseFilterByDate,
    handleFilterBySection,
    setFilter,
    handleClearFilter,
  };

  return (
    <div>
      <Toolbar isHomePage={true} />
      <div className="home-body">
        <FilterNavigationBar {...FilterNavigationBarProps} />
        <Articles
          articleData={filter === "All" ? articleData : sortedArticleData}
          onClick={handleArticleClick}
        />
      </div>
    </div>
  );
};
