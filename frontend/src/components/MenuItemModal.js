function MenuItemModal({ item, onClose }) {
  if (!item) return null;

  return (
    <>
      <style>{`
        .menu-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          z-index: 2000;
        }

        .menu-modal {
          position: relative;
          max-width: 500px;
          width: 100%;
          background: white;
          border-radius: 16px;
          padding: 20px;
          overflow-y: auto;
          max-height: 90vh;
        }

        /* FIXED: Visible + functional close button */
        .menu-modal .btn-close {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 34px;
          height: 34px;

          background-color: white !important;
          border: 2px solid #00000022;
          border-radius: 50%;
          padding: 8px;

          opacity: 1 !important;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);

          z-index: 9999;
        }

        .menu-modal img {
          width: 100%;
          height: auto;
          max-height: 250px;
          object-fit: cover;
          border-radius: 12px;
        }

        .menu-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
        }
      `}</style>

      <div className="menu-modal-backdrop" role="dialog" aria-modal="true">
        <div className="menu-modal card shadow-lg">
          <button
            type="button"
            className="btn-close"
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

            <p className="mb-0">
              {item.description || "No description available."}
            </p>
          </div>
        </div>

        <div className="menu-modal-overlay" onClick={onClose} />
      </div>
    </>
  );
}

export default MenuItemModal;
