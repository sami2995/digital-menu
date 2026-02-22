function MenuEmptyState() {
  return (
    <div className="flex justify-center py-12 w-full">
      <div className="max-w-md text-center bg-white dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-2xl shadow-sm p-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 mx-auto text-stone-300 dark:text-stone-600 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <h5 className="font-bold text-stone-900 dark:text-stone-100 text-lg mb-2">
          No matching dishes
        </h5>
        <p className="text-stone-500 dark:text-stone-400 text-sm">
          Try adjusting your filters or search for a different item. Our team is
          constantly updating the menu with new favorites!
        </p>
      </div>
    </div>
  );
}

export default MenuEmptyState;
