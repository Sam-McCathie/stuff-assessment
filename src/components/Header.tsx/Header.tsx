import "./Header.css";

type HeaderProps = {
  isHomePage?: boolean;
};

export const Header = ({ isHomePage }: HeaderProps) => {
  const isHomePageStyle = {
    textDecoration: "underline",
  };

  return (
    <div className="header">
      <div className="header-content-container">
        <h1 className="header-logo header-link">Stuff v0.01</h1>
        <h2
          className="home-link header-link"
          style={isHomePage ? isHomePageStyle : undefined}
        >
          Home
        </h2>
      </div>
    </div>
  );
};
