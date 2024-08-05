interface Props {
  id: number;
  label: string;
  isActive: boolean;
  onToggle: (isActive: boolean, id: number) => void;
}

function FilterButton({ id, label, isActive, onToggle }: Props) {
  const handleClick = () => {
    onToggle(!isActive, id);
  };

  return (
    <button
      onClick={handleClick}
      className={`filter-button ${isActive ? "active" : ""}`}
    >
      {label}
    </button>
  );
}

export default FilterButton;
