function SearchBar({ search, setSearch }) {
  return (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 dark:text-stone-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        placeholder="Search dishes..."
        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700
          bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100
          placeholder-stone-400 dark:placeholder-stone-500
          focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent
          transition-all duration-200"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
