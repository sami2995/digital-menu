import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "./services/api";
import AdminPage from "./AdminPage";

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

  // Filter & search logic
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
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
        <div className="container">
          <Link to="/" className="navbar-brand fw-bold">
            <img
              src="https://cdn-icons-png.flaticon.com/512/857/857681.png"
              alt="logo"
              width="30"
              className="me-2"
            />
            Digital Menu
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a href="#hero" className="nav-link">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a href="#menu" className="nav-link">
                  Menu
                </a>
              </li>
              <li className="nav-item">
                <a href="#contact" className="nav-link">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* Hero Section */}
              <section
                id="hero"
                className="text-white text-center d-flex align-items-center"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "70vh",
                }}
              >
                <div className="container">
                  <h1 className="display-3 fw-bold">Welcome to Our Restaurant</h1>
                  <p className="lead">Authentic Flavors, Made Fresh Daily 🍲</p>
                  <a href="#menu" className="btn btn-primary btn-lg mt-3">
                    Browse Menu
                  </a>
                </div>
              </section>

              {/* Menu Section */}
              <div id="menu" className="container mt-5">
                <h2 className="mb-4 text-center fw-bold">Our Menu</h2>

                {/* Search + Filter */}
                <div className="d-flex flex-wrap justify-content-center mb-4">
                  {["All", "Starters", "Mains", "Drinks", "Desserts"].map(
                    (cat) => (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`btn me-2 mb-2 ${
                          category === cat ? "btn-primary" : "btn-outline-primary"
                        }`}
                      >
                        {cat}
                      </button>
                    )
                  )}
                </div>

                <div className="mb-4 text-center">
                  <input
                    type="text"
                    placeholder="Search dishes..."
                    className="form-control w-50 mx-auto"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                {/* Menu Cards */}
                <div className="row">
                  {filteredMenu.length === 0 ? (
                    <p className="text-center">No menu items found.</p>
                  ) : (
                    filteredMenu.map((item, index) => (
                      <div key={index} className="col-md-4 col-sm-6 mb-4">
                        <div className="card h-100 shadow-sm border-0">
                          {item.image && (
                            <img
                              src={item.image}
                              className="card-img-top"
                              alt={item.name}
                              style={{
                                height: "220px",
                                objectFit: "cover",
                              }}
                            />
                          )}
                          <div className="card-body">
                            <h5 className="card-title fw-bold">{item.name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                              ETB{item.price}
                            </h6>
                            <p className="card-text">{item.description}</p>

                            {/* Example badges */}
                            <div className="mt-2">
                              {item.category && (
                                <span className="badge bg-primary me-2">
                                  {item.category}
                                </span>
                              )}
                              {item.isSpicy && (
                                <span className="badge bg-danger me-2">
                                  🌶️ Spicy
                                </span>
                              )}
                              {item.isVegetarian && (
                                <span className="badge bg-success me-2">
                                  🥗 Veg
                                </span>
                              )}
                              {item.isRecommended && (
                                <span className="badge bg-warning text-dark">
                                  ⭐ Recommended
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Footer */}
              <footer id="contact" className="bg-dark text-white mt-5 py-5">
                <div className="container text-center">
                  <h4 className="fw-bold mb-3">Contact Us</h4>
                  <p className="mb-1">📞 +1 (555) 123-4567</p>
                  <p className="mb-1">✉️ support@digitalmenu.com</p>
                  <p className="mb-3">📍 123 Main Street, Food City</p>

                  <div className="mb-3">
                    🌐 Follow us:
                    <a href="#" className="text-white ms-2">
                      Facebook
                    </a>{" "}
                    |{" "}
                    <a href="#" className="text-white ms-2">
                      Instagram
                    </a>{" "}
                    |{" "}
                    <a href="#" className="text-white ms-2">
                      Twitter
                    </a>
                  </div>

                  {/* Opening hours */}
                  <p className="mb-3">🕒 Open Daily: 10:00 AM – 11:00 PM</p>

                  
                  {/* Google Maps Embed 
                  <div className="ratio ratio-16x9 mb-3">
                    <iframe
                      src=""
                      width="600"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      title="Restaurant Location"
                    ></iframe>
                  </div>
*/}
                  <p className="mb-0">
                    &copy; {new Date().getFullYear()} Digital Menu. All rights
                    reserved.
                  </p>
                </div>
              </footer>
            </>
          }
        />

        {/* Admin page - hidden */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
