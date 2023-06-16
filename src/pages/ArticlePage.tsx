import { useLocation, useParams } from "react-router-dom";

export const ArticlePage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { title } = location.state;

  return (
    <h1>
      {title}: {id}
    </h1>
  );
};
