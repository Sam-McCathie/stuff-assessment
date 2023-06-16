import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();

  const handleArticleClick = (id: number, title: string) => {
    navigate(`/articles/${id}`, { state: { title } });
  };

  return (
    <div>
      <h1>Hello World</h1>
      <button
        onClick={() => {
          handleArticleClick(1, "Testing");
        }}
      >
        To article
      </button>
    </div>
  );
};
