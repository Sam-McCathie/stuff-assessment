import "./FilterNavigationButton.css";

type FilterNavigationButtonProps = {
  text: string;
  isActive?: boolean;
  onClick?: () => void;
  onClickToggle?: () => void;
};

export const FilterNavigationButton = (props: FilterNavigationButtonProps) => {
  const { text, isActive, onClick, onClickToggle } = props;

  console.log(isActive);

  return (
    <button
      className="regular-button filter-navigation-button"
      onClick={!isActive ? onClick : onClickToggle}
    >
      {text}
    </button>
  );
};
