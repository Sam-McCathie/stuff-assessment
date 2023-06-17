import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArticleCard,
  ArticleCardProps,
} from "../../components/ArticleCard/ArticleCard";
import { FilterNavigationBar } from "../../components/FilterNavigation/FilterNavigationBar/FilterNavigationBar";
import { Header } from "../../components/Header.tsx/Header";
import { Article } from "../../types";
import "./HomePage.css";

export const HomePage = () => {
  const navigate = useNavigate();

  const [articleData, setArticleData] = useState<any[]>([]);
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
    (id: number, title: string) => {
      navigate(`/articles/${id}`, { state: { title } });
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
      <Header isHomePage={true} />
      <div className="home-body">
        <FilterNavigationBar />
        {articleData.map((article: Article) => {
          const thumbnailImage = article.story.images.find(
            (image) => image.type === "Thumbnail 1:1"
          );
          const articleCardProps: ArticleCardProps = {
            id: article.storyId,
            title: article.story.headline,
            imageUrl: thumbnailImage?.src || "",
            imageAlt: thumbnailImage?.caption || "",
            introduction: article.story.intro,
            onClick: handleArticleClick,
          };
          return <ArticleCard {...articleCardProps} />;
        })}
      </div>
    </div>
  );
};
