import "./FilterNavigationButton.css";

type FilterNavigationButtonProps = {
  key?: string;
  text: string;
  isActive?: boolean;
  onClick?: () => void;
  onClickToggle?: () => void;
};

// Add directional arrow to button
export const FilterNavigationButton = (props: FilterNavigationButtonProps) => {
  const { key, text, isActive, onClick, onClickToggle } = props;

  return (
    <button
      key={key}
      style={{ textDecoration: isActive ? "underline" : "none" }}
      className="regular-button filter-navigation-button"
      onClick={!isActive ? onClick : onClickToggle}
    >
      {text}
    </button>
  );
};
