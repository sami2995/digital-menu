import MenuCard from "./MenuCard";
import MenuSkeleton from "./MenuSkeleton";
import MenuEmptyState from "./MenuEmptyState";

function MenuGrid({
  filteredMenu,
  isLoading,
  onSelectItem,
  isFavorite,
  onToggleFavorite,
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredMenu.map((item, index) => (
        <MenuCard
          key={item._id || item.name}
          item={item}
          index={index}
          onSelect={onSelectItem}
          isFavorite={isFavorite?.(item._id || item.name)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export default MenuGrid;
