import { useState } from "react";

function FavoriteButton({ isFavorite, onToggle }) {
  const [animating, setAnimating] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    setAnimating(true);
    onToggle();
    setTimeout(() => setAnimating(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-9 h-9 flex items-center justify-center rounded-full
        bg-white/90 dark:bg-stone-800/90 backdrop-blur-sm
        shadow-md hover:shadow-lg transition-all duration-200
        ${animating ? "heart-pulse" : ""}`}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-red-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-stone-400 dark:text-stone-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      )}
    </button>
  );
}

export default FavoriteButton;
