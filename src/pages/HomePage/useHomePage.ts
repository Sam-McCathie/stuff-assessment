import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Article } from "../../types";

export const useHomePage = () => {
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

  return {
    articleData,
    errorMessage,
    handleArticleClick,
  };
};
