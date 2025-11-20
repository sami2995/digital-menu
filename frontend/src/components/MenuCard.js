function MenuCard({ item, onSelect }) {
  return (
    <div className="col-md-4 col-sm-6 mb-4">
      <div className="card h-100 shadow-sm border-0">
        {item.image && (
          <img
            src={item.image}
            className="card-img-top"
            alt={item.name}
            style={{ height: "220px", objectFit: "cover" }}
          />
        )}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-bold">{item.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">ETB {item.price}</h6>
          <p className="card-text">{item.description}</p>
          <div className="mt-2">
            {item.category && (
              <span className="badge bg-primary me-2">{item.category}</span>
            )}
            {(item.isSpicy === true || item.isSpicy === "true") && (
              <span className="badge bg-danger me-2">🌶️ Spicy</span>
            )}
            {(item.isVegetarian === true || item.isVegetarian === "true") && (
              <span className="badge bg-success me-2">🥗 Veg</span>
            )}
            {(item.isRecommended === true || item.isRecommended === "true") && (
              <span className="badge bg-warning text-dark">⭐ Recommended</span>
            )}
          </div>
          <div className="mt-auto pt-3">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm w-100"
              onClick={() => onSelect?.(item)}
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
