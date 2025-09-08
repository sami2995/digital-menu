function SearchBar({ search, setSearch }) {
  return (
    <div className="mb-4 text-center">
      <input
        type="text"
        placeholder="Search dishes..."
        className="form-control w-50 mx-auto"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
