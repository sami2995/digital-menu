import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "./services/api";
import AdminPage from "./AdminPage";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategoryFilter from "./components/CategoryFilter";
import SearchBar from "./components/SearchBar";
import MenuGrid from "./components/MenuGrid";
import Footer from "./components/Footer";
import './App.css';


function App() {
  const [menu, setMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    API.get("/api/menu")
      .then((res) => {
        setMenu(res.data);
        setFilteredMenu(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    let items = [...menu];
    if (category !== "All") {
      items = items.filter((item) => item.category === category);
    }
    if (search.trim() !== "") {
      items = items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredMenu(items);
  }, [category, search, menu]);

  return (
    <Router>
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
                <SearchBar search={search} setSearch={setSearch} />
                <MenuGrid filteredMenu={filteredMenu} />
              </div>
              <Footer />
            </>
          }
        />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
