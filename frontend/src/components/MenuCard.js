import FavoriteButton from "./FavoriteButton";

function MenuCard({ item, onSelect, index = 0, isFavorite, onToggleFavorite }) {
  const delay = Math.min(index * 80, 400);

  return (
    <div
      className="card-animate"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className="group rounded-2xl overflow-hidden bg-white dark:bg-stone-800
          border border-stone-100 dark:border-stone-700
          shadow-sm hover:shadow-xl transition-all duration-300
          hover:-translate-y-1 cursor-pointer h-full flex flex-col"
        onClick={() => onSelect?.(item)}
      >
        {/* Image container */}
        {item.image && (
          <div className="relative overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Favorite button overlay */}
            <div className="absolute top-3 right-3">
              <FavoriteButton
                isFavorite={isFavorite}
                onToggle={() => onToggleFavorite?.(item._id || item.name)}
              />
            </div>
          </div>
        )}

        {/* Card body */}
        <div className="flex flex-col flex-1 p-4">
          <h5 className="font-bold text-stone-900 dark:text-stone-100 text-lg mb-1">
            {item.name}
          </h5>
          <p className="text-amber-600 dark:text-amber-400 font-semibold text-sm mb-2">
            ETB {item.price}
          </p>
          <p className="text-stone-500 dark:text-stone-400 text-sm mb-3 line-clamp-2">
            {item.description}
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {item.category && (
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300">
                {item.category}
              </span>
            )}
            {(item.isSpicy === true || item.isSpicy === "true") && (
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400">
                Spicy
              </span>
            )}
            {(item.isVegetarian === true || item.isVegetarian === "true") && (
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
                Veg
              </span>
            )}
            {(item.isRecommended === true || item.isRecommended === "true") && (
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300">
                Recommended
              </span>
            )}
          </div>

          {/* View Details button */}
          <div className="mt-auto">
            <button
              type="button"
              className="w-full py-2 rounded-xl text-sm font-medium
                border border-amber-400 dark:border-amber-500 text-amber-600 dark:text-amber-400
                hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 dark:hover:text-white
                transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                onSelect?.(item);
              }}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuCard;
