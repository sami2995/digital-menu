import { useEffect } from "react";

function MenuItemModal({ item, onClose }) {
  useEffect(() => {
    if (item) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [item]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 modal-backdrop-enter"
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal content */}
      <div
        className="relative max-w-lg w-full bg-white dark:bg-stone-800
          rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh] modal-content-enter"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center
            rounded-full bg-white/90 dark:bg-stone-700/90 shadow-md
            text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white
            transition-colors duration-200"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Image */}
        {item.image && (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-64 object-cover"
          />
        )}

        {/* Body */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
            {item.name}
          </h3>
          <p className="text-amber-600 dark:text-amber-400 font-semibold text-lg mb-4">
            ETB {item.price}
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {item.category && (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300">
                {item.category}
              </span>
            )}
            {(item.isSpicy === true || item.isSpicy === "true") && (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400">
                Spicy
              </span>
            )}
            {(item.isVegetarian === true || item.isVegetarian === "true") && (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
                Vegetarian
              </span>
            )}
            {(item.isRecommended === true || item.isRecommended === "true") && (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300">
                Recommended
              </span>
            )}
          </div>

          <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
            {item.description || "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MenuItemModal;
