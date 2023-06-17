import "./FilterNavigationButton.css";

type FilterNavigationButtonProps = {
  text: string;
  isActive?: boolean;
  onClick?: () => void;
};

export const FilterNavigationButton = (props: FilterNavigationButtonProps) => {
  const { text, isActive, onClick } = props;

  return (
    <button className="regular-button filter-navigation-button">{text}</button>
  );
};
