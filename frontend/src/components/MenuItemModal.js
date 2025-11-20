function MenuItemModal({ item, onClose }) {
  if (!item) {
    return null;
  }

  return (
    <div className="menu-modal-backdrop" role="dialog" aria-modal="true">
      <div className="menu-modal card shadow-lg">
        <button
          type="button"
          className="btn-close ms-auto"
          aria-label="Close"
          onClick={onClose}
        ></button>
        <div className="modal-body">
          {item.image && (
            <img
              src={item.image}
              alt={item.name}
              className="img-fluid rounded mb-3"
            />
          )}
          <h3 className="fw-bold mb-2">{item.name}</h3>
          <p className="text-muted mb-1">ETB {item.price}</p>
          <div className="mb-3">
            {item.category && (
              <span className="badge bg-primary me-2">{item.category}</span>
            )}
            {item.isSpicy && (
              <span className="badge bg-danger me-2">🌶️ Spicy</span>
            )}
            {item.isVegetarian && (
              <span className="badge bg-success me-2">🥗 Vegetarian</span>
            )}
            {item.isRecommended && (
              <span className="badge bg-warning text-dark">⭐ Recommended</span>
            )}
          </div>
          <p className="mb-0">{item.description || "No description available."}</p>
        </div>
      </div>
      <div className="menu-modal-overlay" onClick={onClose} aria-hidden="true" />
    </div>
  );
}

export default MenuItemModal;
