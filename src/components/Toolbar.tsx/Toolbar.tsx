import { useNavigate } from "react-router-dom";
import "./Toolbar.css";

type ToolbarProps = {
  isHomePage?: boolean;
};

export const Toolbar = ({ isHomePage }: ToolbarProps) => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };

  const isHomePageStyle = {
    textDecoration: "underline",
  };

  return (
    <div className="toolbar">
      <div className="toolbar-content-container">
        <h1 className="toolbar-logo toolbar-link" onClick={navigateHome}>
          Stuff v0.01
        </h1>
        <h2
          className="home-link toolbar-link"
          style={isHomePage ? isHomePageStyle : undefined}
          onClick={navigateHome}
        >
          Home
        </h2>
      </div>
    </div>
  );
};
