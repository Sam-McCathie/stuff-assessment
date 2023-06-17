import { useLocation, useParams } from "react-router-dom";
import { Header } from "../../components/Header.tsx/Header";

export const ArticlePage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { title } = location.state;

  return (
    <div>
      <Header />
      <div className="article-body">
        <h1>
          {title}: {id}
        </h1>
      </div>
    </div>
  );
};
