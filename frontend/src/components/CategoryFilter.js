function CategoryFilter({ category, setCategory }) {
  const categories = ["All", "Starters", "Mains", "Drinks", "Desserts"];

  return (
    <div className="d-flex flex-wrap justify-content-center mb-4">
      {categories.map((cat) => {
        let btnClass =
          cat === "Starters" ? "success" :
          cat === "Mains" ? "warning" :
          cat === "Drinks" ? "info" :
          cat === "Desserts" ? "danger" : "primary";

        return (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`btn me-2 mb-2 ${
              category === cat ? `btn-${btnClass}` : `btn-outline-${btnClass}`
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

