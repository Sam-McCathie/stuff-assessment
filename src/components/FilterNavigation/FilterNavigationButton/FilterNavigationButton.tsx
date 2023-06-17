import "./FilterNavigationButton.css";

type FilterNavigationButtonProps = {
  text: string;
  isActive?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickToggle?: (event: React.MouseEvent<HTMLButtonElement>) => void;
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
