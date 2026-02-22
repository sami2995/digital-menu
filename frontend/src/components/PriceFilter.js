const PriceFilter = ({ value, onChange }) => {
  return (
    <div className="rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 p-3 shadow-sm">
      <label
        htmlFor="priceFilter"
        className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-1.5"
      >
        Price Range
      </label>
      <select
        id="priceFilter"
        className="w-full rounded-lg border border-stone-200 dark:border-stone-600
          bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-stone-100
          px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400
          focus:border-transparent transition-all duration-200"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="all">Any price</option>
        <option value="under-150">Under 150 ETB</option>
        <option value="150-300">150 - 300 ETB</option>
        <option value="over-300">Over 300 ETB</option>
      </select>
    </div>
  );
};

export default PriceFilter;
