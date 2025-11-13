import { useState, useEffect, useCallback } from "react";
import API from "./services/api";

function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [menuItems, setMenuItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken");

    if (storedToken) {
      API.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setMenuItems([]);
    setErrorMessage("");
    delete API.defaults.headers.common.Authorization;
    localStorage.removeItem("adminToken");
  }, []);

  const fetchMenu = useCallback(() => {
    API.get("/api/menu")
      .then((res) => {
        setMenuItems(res.data);
        setErrorMessage("");
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          alert("Session expired. Please log in again.");
          handleLogout();
        } else {
          const message =
            err.response?.data?.message ||
            "Unable to load menu items. Please try again.";
          setErrorMessage(message);
        }
      });
  }, [handleLogout]);
  useEffect(() => {
    if (isLoggedIn) {
      fetchMenu();
    } else {
      setErrorMessage("");
    }
  }, [isLoggedIn, fetchMenu]);
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await API.post("/api/auth/login", {
        username,
        password,
      });

      const token = response.data?.token;
      if (token) {
        API.defaults.headers.common.Authorization = `Bearer ${token}`;
        localStorage.setItem("adminToken", token);
        setIsLoggedIn(true);
        setPassword("");
        setErrorMessage("");
      } else {
        alert("No token received from server.");
      }
    } catch (err) {
      const message =
        err.response?.data?.message || "Invalid username or password";
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      API.put(`/api/menu/${editId}`, form)
        .then(() => {
          alert("Item updated!");
          resetForm();
          fetchMenu();
        })
        .catch((err) => {
          if (err.response?.status === 401) {
            alert("Session expired. Please log in again.");
            handleLogout();
          } else {
            alert("Error updating item");
          }
        });
    } else {
      API.post("/api/menu", form)
        .then(() => {
          alert("Item added!");
          resetForm();
          fetchMenu();
        })
        .catch((err) => {
          if (err.response?.status === 401) {
            alert("Session expired. Please log in again.");
            handleLogout();
          } else {
            alert("Error adding item");
          }
        });
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item._id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      API.delete(`/api/menu/${id}`)
        .then(() => fetchMenu())
        .catch((err) => {
          if (err.response?.status === 401) {
            alert("Session expired. Please log in again.");
            handleLogout();
          } else {
            alert("Error deleting item");
          }
        });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ name: "", price: "", description: "", category: "", image: "" });
    setEditId(null);
  };

 // --- Render login if not logged in ---
if (!isLoggedIn) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg col-md-4">
        <h3 className="mb-3 text-center">Admin Login</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

  

  // --- Render admin dashboard if logged in ---
  return (
    <div className="container py-4">
      {/* Admin Navbar */}
      <nav className="navbar navbar-dark bg-dark rounded shadow-sm mb-4 px-3">
        <span className="navbar-brand fw-bold">⚙️ Admin Dashboard</span>
        <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      {/* Form Card */}
      <div className="card p-4 shadow-sm mb-5">
        <h4 className="mb-4">{editId ? "✏️ Edit Menu Item" : "➕ Add New Menu Item"}</h4>
        {errorMessage && (
          <div className="alert alert-warning" role="alert">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Price:</label>
            <input
              type="number"
              name="price"
              className="form-control"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-12">
            <label className="form-label">Description:</label>
            <textarea
              name="description"
              className="form-control"
              rows="2"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Category:</label>
            <select
              name="category"
              className="form-select"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">-- Select --</option>
              <option value="Starters">Starters</option>
              <option value="Mains">Mains</option>
              <option value="Drinks">Drinks</option>
              <option value="Desserts">Desserts</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Image URL:</label>
            <input
              type="text"
              name="image"
              className="form-control"
              value={form.image}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-success w-100">
              {editId ? "Update Item" : "Add Item"}
            </button>
            {editId && (
              <button
                type="button"
                className="btn btn-secondary w-100 mt-2"
                onClick={resetForm}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Existing Menu Items */}
      <h4 className="mb-3">📋 Existing Menu Items</h4>
      <div className="row">
        {menuItems.length === 0 ? (
          <p>No items yet.</p>
        ) : (
          menuItems.map((item) => (
            <div key={item._id} className="col-md-4 col-sm-6 mb-4">
              <div className="card h-100 shadow-sm border-0">
                {item.image && (
                  <img
                    src={item.image}
                    className="card-img-top"
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title fw-bold">{item.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    ${item.price}
                  </h6>
                  <p className="card-text">{item.description}</p>
                  <span className="badge bg-primary rounded-pill">
                    {item.category}
                  </span>
                  <div className="mt-3 d-flex justify-content-between">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminPage;