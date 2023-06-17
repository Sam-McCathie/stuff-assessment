import { findThumbnailImage } from "../../functions";
import { Article } from "../../types";
import { ArticleCard, ArticleCardProps } from "../ArticleCard/ArticleCard";
import "./Articles.css";

type ArticlesProps = {
  articleData: Article[];
  onClick: (id: string) => void;
};

export const Articles = ({ articleData, onClick }: ArticlesProps) => {
  return (
    <div className="articles">
      {articleData.map((article: Article) => {
        const thumbnailImage = findThumbnailImage(article.story.images);

        const openArticle = () => {
          onClick(article.storyId);
        };

        const articleCardProps: ArticleCardProps = {
          id: article.storyId,
          title: article.story.headline,
          imageUrl: thumbnailImage?.src || "",
          imageAlt: thumbnailImage?.caption || "",
          introduction: article.story.intro,
          openArticle: openArticle,
        };
        return <ArticleCard {...articleCardProps} />;
      })}
    </div>
  );
};
