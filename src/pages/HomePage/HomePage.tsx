import { Articles } from "../../components/Articles/Articles";
import { FilterNavigationBar } from "../../components/FilterNavigation/FilterNavigationBar/FilterNavigationBar";
import { Toolbar } from "../../components/Toolbar.tsx/Toolbar";
import "./HomePage.css";
import { useHomePage } from "./useHomePage";

export const HomePage = () => {
  const { articleData, errorMessage, handleArticleClick } = useHomePage();

  if (!articleData) {
    return <h1>Loading...</h1>;
  }

  if (errorMessage) {
    return <h1>{errorMessage}</h1>;
  }

  console.log(articleData);

  return (
    <div>
      <Toolbar isHomePage={true} />
      <div className="home-body">
        <FilterNavigationBar />
        <Articles articleData={articleData} onClick={handleArticleClick} />
      </div>
    </div>
  );
};
