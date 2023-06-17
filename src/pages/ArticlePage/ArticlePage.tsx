import { useLocation, useParams } from "react-router-dom";
import { Toolbar } from "../../components/Toolbar.tsx/Toolbar";
import { Article } from "../../types";

export const ArticlePage = () => {
  const { id } = useParams();
  const location = useLocation();
  const article: Article = location.state.article;

  console.log(article);

  return (
    <div>
      <Toolbar />
      <div className="article-body">
        <h1>
          {article.story.headline}: {id}
        </h1>
      </div>
    </div>
  );
};
