import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Toolbar } from "../../components/Toolbar.tsx/Toolbar";
import { findThumbnailImage } from "../../functions";
import { Article } from "../../types";
import "./ArticlePage.css";

export const ArticlePage = () => {
  const { id } = useParams();
  const location = useLocation();
  const article: Article | undefined = location?.state?.article;
  const [articleData, setArticleData] = useState<Article | undefined>(article);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (!article) {
      const fetchArticlesData = async () => {
        try {
          const response = await fetch(
            `https://www.stuff.co.nz/static/spade/nCuL9ZmbMXzhGbHTJNJYU6i45y9hj0DJrhPteuU6MGB68zM5goWqk5Q1aNkh.json`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch article data");
          }
          const data = await response.json();
          console.log(data);
          const articlesData = data.stories;

          setArticleData(
            articlesData.find((article: Article) => article.storyId === id)
          );
        } catch (error: any) {
          setErrorMessage(error.message);
        }
      };

      fetchArticlesData();
    }
  }, []);

  const thumbnailImage =
    articleData && findThumbnailImage(articleData.story.images);

  if (!articleData) {
    return <h1>Loading...</h1>;
  }

  if (errorMessage) {
    return <h1>{errorMessage}</h1>;
  }

  return (
    <div>
      <Toolbar />
      <div className="article-header">
        <h1 className="article-header-text">{articleData.story.headline}</h1>
      </div>
      <div className="article-body">
        <div className="article-description-container">
          <p className="article-description">{articleData.story.intro}</p>
          <a
            href={articleData.story.url}
            className="regular-button full-article-button"
          >
            Read Full Article
          </a>
        </div>

        <div className="article-summary">
          <h3>Section: {articleData.story.section}</h3>
          {articleData && thumbnailImage && (
            <img
              src={thumbnailImage.src}
              alt={thumbnailImage.caption}
              className="article-image"
            />
          )}
          <p>Views: {articleData?.viewCount}</p>
        </div>
      </div>
    </div>
  );
};
