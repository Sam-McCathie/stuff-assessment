import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Article } from "../../types";

export type Filter = "All" | "Section" | "Date";

export const useHomePage = () => {
  const navigate = useNavigate();

  const [articleData, setArticleData] = useState<Article[]>([]);
  const [sortedArticleData, setSortedArticleData] = useState<Article[]>([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [sections, setSections] = useState<string[]>([]);

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

  useEffect(() => {
    const createSectionsArray = () => {
      const articles = [...articleData];
      const sections = articles.map((article) => article.story.section);
      const sectionsArray = Array.from(new Set(sections));
      setSections(sectionsArray);
    };

    createSectionsArray();
  }, [articleData]);

  // TODO: Resolve error if user goes directly to article page
  // - refetch data and filter
  const handleArticleClick = useCallback(
    (id: string) => {
      const article = articleData.find((article) => article.storyId === id);
      navigate(`/articles/${id}`, { state: { article } });
    },
    [articleData]
  );

  const [filter, setFilter] = useState<Filter>("All");

  const handleFilterByDate = () => {
    const sortedData = [...articleData];
    sortedData.sort((a, b) => {
      const dateA = moment(a.publishedDate, "HH:mm DD/MM/YYYY").toDate();
      const dateB = moment(b.publishedDate, "HH:mm DD/MM/YYYY").toDate();
      return dateA.getTime() - dateB.getTime();
    });

    setSortedArticleData(sortedData);
    setFilter("Date");
  };

  const handleReverseFilterByDate = () => {
    const sortedData = [...sortedArticleData];
    setSortedArticleData(sortedData.reverse());
  };

  const handleFilterBySection = (section: string) => {
    const articles = [...articleData];
    const filteredArticlesArray = articles.filter(
      (article) => article.story.section === section
    );
    setSortedArticleData(filteredArticlesArray);
    setFilter("Section");
  };

  const handleClearFilter = () => {
    setSortedArticleData([]);
    setFilter("All");
  };

  return {
    data: {
      articleData,
      sortedArticleData,
      errorMessage,
      filter,
      sections,
    },
    operations: {
      handleArticleClick,
      handleFilterByDate,
      handleReverseFilterByDate,
      handleFilterBySection,
      setFilter,
      handleClearFilter,
    },
  };
};
