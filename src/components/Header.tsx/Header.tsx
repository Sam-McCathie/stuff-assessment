import { useNavigate } from "react-router-dom";
import "./Header.css";

type HeaderProps = {
  isHomePage?: boolean;
};

export const Header = ({ isHomePage }: HeaderProps) => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };

  const isHomePageStyle = {
    textDecoration: "underline",
  };

  return (
    <div className="header">
      <div className="header-content-container">
        <h1 className="header-logo header-link" onClick={navigateHome}>
          Stuff v0.01
        </h1>
        <h2
          className="home-link header-link"
          style={isHomePage ? isHomePageStyle : undefined}
          onClick={navigateHome}
        >
          Home
        </h2>
      </div>
    </div>
  );
};
