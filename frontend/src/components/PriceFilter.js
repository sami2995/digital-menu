const PriceFilter = ({ value, onChange }) => {
  return (
    <div className="price-filter card card-body shadow-sm">
      <label htmlFor="priceFilter" className="form-label fw-semibold mb-2">
        Price Range
      </label>
      <select
        id="priceFilter"
        className="form-select"
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
