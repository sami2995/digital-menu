function MenuSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white dark:bg-stone-800 border border-stone-100 dark:border-stone-700 shadow-sm">
      <div className="skeleton-shimmer h-52 w-full" />
      <div className="p-4">
        <div className="skeleton-shimmer h-5 w-3/5 mb-3 rounded" />
        <div className="skeleton-shimmer h-3.5 w-full mb-2 rounded" />
        <div className="skeleton-shimmer h-3.5 w-4/5 mb-4 rounded" />
        <div className="flex gap-2">
          <div className="skeleton-shimmer h-5 w-16 rounded-full" />
          <div className="skeleton-shimmer h-5 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default MenuSkeleton;
