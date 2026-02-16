import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { Analytics } from "@vercel/analytics/react";
import API from "./services/api";
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

  useEffect(() => {
    setIsLoading(true);
    API.get("/api/menu")
      .then((res) => {
        console.log("Menu data received:", res.data);
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
  }, [category, search, priceFilter, highlightFilters, menu]);

  const toggleHighlight = useCallback((key) => {
    setHighlightFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  return (
    <Router>
      <Analytics />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <div id="menu" className="container mt-5">
                <h2 className="mb-4 text-center fw-bold">Our Menu</h2>
                <CategoryFilter category={category} setCategory={setCategory} />
                <div className="row g-3 align-items-center mb-4">
                  <div className="col-12 col-lg-4">
                    <SearchBar search={search} setSearch={setSearch} />
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <PriceFilter value={priceFilter} onChange={setPriceFilter} />
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <HighlightFilter
                      highlights={highlightFilters}
                      availability={highlightAvailability}
                      onToggle={toggleHighlight}
                    />
                  </div>
                </div>
                <MenuGrid
                  filteredMenu={filteredMenu}
                  isLoading={isLoading}
                  onSelectItem={setSelectedItem}
                />
              </div>
              <Footer />
              <MenuItemModal
                item={selectedItem}
                onClose={() => setSelectedItem(null)}
              />
            </>
          }
        />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
