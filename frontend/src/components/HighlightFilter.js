const highlightOptions = [
  { key: "isRecommended", label: "Recommended" },
  { key: "isSpicy", label: "Spicy" },
  { key: "isVegetarian", label: "Vegetarian" },
];

function HighlightFilter({ highlights, availability, onToggle }) {
  return (
    <div className="rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 p-3 shadow-sm">
      <p className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
        Highlights
      </p>
      <div className="flex flex-wrap gap-2">
        {highlightOptions.map(({ key, label }) => {
          const isAvailable = Boolean(availability?.[key]);
          const isActive = Boolean(highlights[key]);
          const isDisabled = !isAvailable;

          return (
            <button
              key={key}
              type="button"
              disabled={isDisabled}
              onClick={() => {
                if (!isDisabled) onToggle(key);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200
                ${
                  isActive
                    ? "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-600"
                    : "bg-transparent text-stone-500 dark:text-stone-400 border-stone-200 dark:border-stone-600 hover:bg-stone-50 dark:hover:bg-stone-700"
                }
                ${isDisabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default HighlightFilter;
