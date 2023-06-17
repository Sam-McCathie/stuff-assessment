import { useLocation } from "react-router-dom";
import { Toolbar } from "../../components/Toolbar.tsx/Toolbar";
import { findThumbnailImage } from "../../functions";
import { Article } from "../../types";
import "./ArticlePage.css";

export const ArticlePage = () => {
  const location = useLocation();
  const article: Article = location.state.article;

  const { headline, section, images, intro: description, url } = article.story;

  const thumbnailImage = findThumbnailImage(images);

  return (
    <div>
      <Toolbar />
      <div className="article-header">
        <h1 className="article-header-text">{headline}</h1>
      </div>
      <div className="article-body">
        <div className="article-description-container">
          <p className="article-description">{description}</p>
          <a href={url} className="regular-button full-article-button">
            Read Full Article
          </a>
        </div>

        <div className="article-summary">
          <h3>Section: {section}</h3>
          {thumbnailImage && (
            <img
              src={thumbnailImage.src}
              alt={thumbnailImage.caption}
              className="article-image"
            />
          )}
          <p>Views: {article.viewCount}</p>
        </div>
      </div>
    </div>
  );
};
