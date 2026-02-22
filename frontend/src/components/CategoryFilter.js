const categoryStyles = {
  All: {
    active: "bg-amber-500 text-white shadow-md",
    inactive:
      "bg-transparent text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950",
  },
  Starters: {
    active: "bg-emerald-500 text-white shadow-md",
    inactive:
      "bg-transparent text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950",
  },
  Mains: {
    active: "bg-orange-500 text-white shadow-md",
    inactive:
      "bg-transparent text-orange-600 dark:text-orange-400 border-orange-300 dark:border-orange-700 hover:bg-orange-50 dark:hover:bg-orange-950",
  },
  Drinks: {
    active: "bg-sky-500 text-white shadow-md",
    inactive:
      "bg-transparent text-sky-600 dark:text-sky-400 border-sky-300 dark:border-sky-700 hover:bg-sky-50 dark:hover:bg-sky-950",
  },
  Desserts: {
    active: "bg-rose-500 text-white shadow-md",
    inactive:
      "bg-transparent text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950",
  },
};

function CategoryFilter({ category, setCategory }) {
  const categories = ["All", "Starters", "Mains", "Drinks", "Desserts"];

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {categories.map((cat) => {
        const style = categoryStyles[cat] || categoryStyles.All;
        const isActive = category === cat;
        return (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
              isActive ? style.active : style.inactive
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryFilter;
