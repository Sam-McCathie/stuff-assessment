import { Articles } from "../../components/Articles/Articles";
import { FilterNavigationBar } from "../../components/FilterNavigation/FilterNavigationBar/FilterNavigationBar";
import { Toolbar } from "../../components/Toolbar.tsx/Toolbar";
import "./HomePage.css";
import { useHomePage } from "./useHomePage";

export const HomePage = () => {
  const {
    data: { articleData, errorMessage, sortedArticleData, filterActive },
    operations: {
      handleArticleClick,
      handleFilterByDate,
      handleReverseFilterByDate,
    },
  } = useHomePage();

  if (!articleData) {
    return <h1>Loading...</h1>;
  }

  if (errorMessage) {
    return <h1>{errorMessage}</h1>;
  }

  console.log(articleData);
  console.log(sortedArticleData);

  const FilterNavigationBarProps = {
    handleFilterByDate,
    handleReverseFilterByDate,
  };

  return (
    <div>
      <Toolbar isHomePage={true} />
      <div className="home-body">
        <FilterNavigationBar {...FilterNavigationBarProps} />
        <Articles
          articleData={!filterActive ? articleData : sortedArticleData}
          onClick={handleArticleClick}
        />
      </div>
    </div>
  );
};
