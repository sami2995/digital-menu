function MenuSkeleton() {
  return (
    <div className="col-md-4 col-sm-6 mb-4">
      <div className="card h-100 border-0 skeleton-card">
        <div className="skeleton skeleton-img" />
        <div className="card-body">
          <div className="skeleton skeleton-title mb-2" />
          <div className="skeleton skeleton-text mb-1" />
          <div className="skeleton skeleton-text w-75 mb-3" />
          <div className="d-flex gap-2">
            <div className="skeleton skeleton-badge" />
            <div className="skeleton skeleton-badge" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuSkeleton;
