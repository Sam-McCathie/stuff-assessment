import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FilterNavigationBar } from "../../components/FilterNavigation/FilterNavigationBar/FilterNavigationBar";
import { Header } from "../../components/Header.tsx/Header";
import "./HomePage.css";

export const HomePage = () => {
  const navigate = useNavigate();

  const [articleData, setArticleData] = useState(null);
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

  if (!articleData) {
    return <h1>Loading...</h1>;
  }

  if (errorMessage) {
    return <h1>{errorMessage}</h1>;
  }

  console.log(articleData);

  // TODO: Resolve error if user goes directly to article page
  // - refetch data and filter
  const handleArticleClick = (id: number, title: string) => {
    navigate(`/articles/${id}`, { state: { title } });
  };

  return (
    <div>
      <Header isHomePage={true} />
      <div className="home-body">
        <FilterNavigationBar />
        <button
          onClick={() => {
            handleArticleClick(1, "Testing");
          }}
        >
          To article
        </button>
      </div>
    </div>
  );
};
