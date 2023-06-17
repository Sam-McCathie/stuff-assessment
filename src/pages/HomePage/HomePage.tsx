import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Articles } from "../../components/Articles/Articles";
import { FilterNavigationBar } from "../../components/FilterNavigation/FilterNavigationBar/FilterNavigationBar";
import { Toolbar } from "../../components/Toolbar.tsx/Toolbar";
import { Article } from "../../types";
import "./HomePage.css";

export const HomePage = () => {
  const navigate = useNavigate();

  const [articleData, setArticleData] = useState<Article[]>([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchArticlesData = async () => {
      try {
        const response = await fetch(
          `https://www.stuff.co.nz/static/spade/nCuL9ZmbMXzhGbHTJNJYU6i45y9hj0DJrhPteuU6MGB68zM5goWqk5Q1aNkh.json`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch article data");
        }
        const data = await response.json();
        setArticleData(data.stories);
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    };

    fetchArticlesData();
  }, []);

  // TODO: Resolve error if user goes directly to article page
  // - refetch data and filter
  const handleArticleClick = useCallback(
    (id: string) => {
      const article = articleData.find((article) => article.storyId === id);
      navigate(`/articles/${id}`, { state: { article } });
    },
    [articleData]
  );

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
