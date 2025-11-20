function MenuEmptyState() {
  return (
    <div className="text-center py-5 w-100">
      <div className="empty-state card border-0 shadow-sm mx-auto p-4">
        <h5 className="fw-bold mb-2">No matching dishes</h5>
        <p className="mb-3">
          Try adjusting your filters or search for a different item. Our team is
          constantly updating the menu with new favorites!
        </p>
      </div>
    </div>
  );
}

export default MenuEmptyState;
