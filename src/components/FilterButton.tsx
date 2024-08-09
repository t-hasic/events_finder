interface Props {
  id: number;
  title: string;
  isActive: boolean;
  onToggle: (isActive: boolean, id: number) => void;
}

function FilterButton({ id, title, isActive, onToggle }: Props) {
  const handleClick = () => {
    onToggle(!isActive, id);
  };

  return (
    <button
      onClick={handleClick}
      className={`filter-button ${isActive ? "active" : ""}`}
    >
      {title}
    </button>
  );
}

export default FilterButton;
