import MenuCard from "./MenuCard";
import MenuSkeleton from "./MenuSkeleton";
import MenuEmptyState from "./MenuEmptyState";

function MenuGrid({ filteredMenu, isLoading, onSelectItem }) {
  if (isLoading) {
    return (
      <div className="row">
        {Array.from({ length: 6 }).map((_, index) => (
          <MenuSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (filteredMenu.length === 0) {
    return <MenuEmptyState />;
  }

  return (
    <div className="row">
      {filteredMenu.map((item) => (
        <MenuCard key={item._id || item.name} item={item} onSelect={onSelectItem} />
      ))}
    </div>
  );
}

export default MenuGrid;
