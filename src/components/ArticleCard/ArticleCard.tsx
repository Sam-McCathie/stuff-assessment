import { memo } from "react";
import "./ArticleCard.css";

export type ArticleCardProps = {
  id: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  introduction: string;
  openArticle: (id: string) => void; // TODO: Add onClick
};

export const ArticleCard = memo(
  ({
    id,
    title,
    imageUrl,
    imageAlt,
    introduction,
    openArticle,
  }: ArticleCardProps) => {
    const trucatedTitle = title.slice(0, 100) + "...";
    const trucatedIntroduction = introduction.slice(0, 90) + "...";

    const handOpenArticle = () => {
      openArticle(id);
    };

    return (
      <div className="article-card" key={id} onClick={handOpenArticle}>
        <div className="article-header">
          <h1 className="article-title">{trucatedTitle}</h1>
          <img src={imageUrl} alt={imageAlt} className="article-image" />
        </div>
        <p className="article-introduction">{trucatedIntroduction}</p>
      </div>
    );
  }
);
