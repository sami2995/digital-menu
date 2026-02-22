import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { Analytics } from "@vercel/analytics/react";
import API from "./services/api";
import useFavorites from "./hooks/useFavorites";
import AdminPage from "./AdminPage";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategoryFilter from "./components/CategoryFilter";
import SearchBar from "./components/SearchBar";
import MenuGrid from "./components/MenuGrid";
import PriceFilter from "./components/PriceFilter";
import HighlightFilter from "./components/HighlightFilter";
import MenuItemModal from "./components/MenuItemModal";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import "./App.css";

function App() {
  const [menu, setMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [highlightFilters, setHighlightFilters] = useState({
    isSpicy: false,
    isVegetarian: false,
    isRecommended: false,
  });
  const [highlightAvailability, setHighlightAvailability] = useState({
    isSpicy: false,
    isVegetarian: false,
    isRecommended: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    setIsLoading(true);
    API.get("/api/menu")
      .then((res) => {
        setMenu(res.data);
        setFilteredMenu(res.data);
      })
      .catch((err) => console.error("Error fetching menu:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const hasHighlight = (value) => value === true || value === "true";

  useEffect(() => {
    const availability = {
      isSpicy: menu.some((item) => hasHighlight(item?.isSpicy)),
      isVegetarian: menu.some((item) => hasHighlight(item?.isVegetarian)),
      isRecommended: menu.some((item) => hasHighlight(item?.isRecommended)),
    };
    setHighlightAvailability(availability);
  }, [menu]);

  useEffect(() => {
    setHighlightFilters((prev) => {
      const next = { ...prev };
      let changed = false;
      Object.keys(prev).forEach((key) => {
        if (next[key] && !highlightAvailability[key]) {
          next[key] = false;
          changed = true;
        }
      });
      return changed ? next : prev;
    });
  }, [highlightAvailability]);

  useEffect(() => {
    let items = [...menu];

    if (showFavoritesOnly) {
      items = items.filter((item) =>
        favorites.includes(item._id || item.name)
      );
    }

    if (category !== "All") {
      items = items.filter((item) => item.category === category);
    }
    if (search.trim() !== "") {
      items = items.filter((item) => {
        const query = search.toLowerCase();
        return (
          item.name.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query)
        );
      });
    }
    if (priceFilter !== "all") {
      items = items.filter((item) => {
        const price = Number(item.price) || 0;
        switch (priceFilter) {
          case "under-150":
            return price < 150;
          case "150-300":
            return price >= 150 && price <= 300;
          case "over-300":
            return price > 300;
          default:
            return true;
        }
      });
    }
    const activeHighlightKeys = Object.entries(highlightFilters)
      .filter(([, isActive]) => isActive)
      .map(([key]) => key);

    if (activeHighlightKeys.length > 0) {
      items = items.filter((item) =>
        activeHighlightKeys.some((key) => hasHighlight(item?.[key]))
      );
    }

    setFilteredMenu(items);
  }, [category, search, priceFilter, highlightFilters, menu, showFavoritesOnly, favorites]);

  const toggleHighlight = useCallback((key) => {
    setHighlightFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  return (
    <Router>
      <Analytics />
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300">
              <Navbar favoritesCount={favorites.length} />
              <Hero />
              <main id="menu" className="max-w-7xl mx-auto px-4 py-12">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-stone-900 dark:text-stone-100">
                  Our Menu
                </h2>

                <CategoryFilter
                  category={category}
                  setCategory={setCategory}
                />

                {/* Favorites toggle */}
                <div className="flex justify-center mb-6">
                  <button
                    onClick={() => setShowFavoritesOnly((prev) => !prev)}
                    className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium
                      border transition-all duration-200
                      ${
                        showFavoritesOnly
                          ? "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-300 dark:border-red-600 shadow-sm"
                          : "bg-transparent text-stone-500 dark:text-stone-400 border-stone-200 dark:border-stone-600 hover:bg-stone-50 dark:hover:bg-stone-800"
                      }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Favorites Only
                    {favorites.length > 0 && (
                      <span
                        className={`inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full
                        ${
                          showFavoritesOnly
                            ? "bg-red-500 text-white"
                            : "bg-stone-200 dark:bg-stone-600 text-stone-600 dark:text-stone-300"
                        }`}
                      >
                        {favorites.length}
                      </span>
                    )}
                  </button>
                </div>

                {/* Filters row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <SearchBar search={search} setSearch={setSearch} />
                  <PriceFilter value={priceFilter} onChange={setPriceFilter} />
                  <HighlightFilter
                    highlights={highlightFilters}
                    availability={highlightAvailability}
                    onToggle={toggleHighlight}
                  />
                </div>

                <MenuGrid
                  filteredMenu={filteredMenu}
                  isLoading={isLoading}
                  onSelectItem={setSelectedItem}
                  isFavorite={isFavorite}
                  onToggleFavorite={toggleFavorite}
                />
              </main>
              <Footer />
              <MenuItemModal
                item={selectedItem}
                onClose={() => setSelectedItem(null)}
              />
              <ScrollToTop />
            </div>
          }
        />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
