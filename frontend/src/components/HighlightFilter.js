const highlightOptions = [
  { key: "isRecommended", label: "⭐ Recommended" },
  { key: "isSpicy", label: "🌶️ Spicy" },
  { key: "isVegetarian", label: "🥗 Vegetarian" },
];

function HighlightFilter({ highlights, availability, onToggle }) {
  return (
    <div className="highlight-filter card card-body shadow-sm">
      <p className="fw-semibold mb-2">Highlights</p>
      <div className="d-flex flex-wrap gap-2">
        {highlightOptions.map(({ key, label }) => {
          const isAvailable = Boolean(availability?.[key]);
          const isActive = Boolean(highlights[key]);
          const isDisabled = !isAvailable;
          return (
            <button
              key={key}
              type="button"
              className={`btn btn-sm ${
                isActive ? "btn-outline-warning active" : "btn-outline-secondary"
              } ${isDisabled ? "disabled-highlight" : ""}`}
              disabled={isDisabled}
              onClick={() => {
                if (!isDisabled) {
                  onToggle(key);
                }
              }}
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
