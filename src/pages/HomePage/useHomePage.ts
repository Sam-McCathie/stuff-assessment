import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Article } from "../../types";

export const useHomePage = () => {
  const navigate = useNavigate();

  const [articleData, setArticleData] = useState<Article[]>([]);
  const [sortedArticleData, setSortedArticleData] = useState<Article[]>([]);
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

    console.log("Fetching data");
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

  // clean up how this is handled
  // handle filter active here instead of filter nav bar?
  const [filterActive, setFilterActive] = useState(false);

  const handleFilterByDate = () => {
    const sortedData = [...articleData];
    sortedData.sort((a, b) => {
      const dateA = moment(a.publishedDate, "HH:mm DD/MM/YYYY").toDate();
      const dateB = moment(b.publishedDate, "HH:mm DD/MM/YYYY").toDate();
      return dateA.getTime() - dateB.getTime();
    });

    setSortedArticleData(sortedData);
    setFilterActive(true);
  };

  const handleReverseFilterByDate = () => {
    console.log("reverse filter by date");

    const sortedData = [...sortedArticleData];
    setSortedArticleData(sortedData.reverse());
  };

  return {
    data: {
      articleData,
      sortedArticleData,
      errorMessage,
      filterActive,
    },
    operations: {
      handleArticleClick,
      handleFilterByDate,
      handleReverseFilterByDate,
    },
  };
};
