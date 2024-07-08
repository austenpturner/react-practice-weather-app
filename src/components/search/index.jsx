import PropTypes from "prop-types";

export default function Search({ search, setSearch, handleSearch }) {
  return (
    <div className="search-engine">
      <input
        type="text"
        placeholder="Enter city name... "
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

Search.propTypes = {
  search: PropTypes.string,
  setSearch: PropTypes.func,
  handleSearch: PropTypes.func,
};
