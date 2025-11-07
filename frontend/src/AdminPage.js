import { useState, useEffect } from "react";
import API from "./services/api";

function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
    if (isLoggedIn) {
      fetchMenu();
    }
  }, [isLoggedIn]);

  const fetchMenu = () => {
    API.get("/api/menu")
      .then((res) => setMenuItems(res.data))
      .catch((err) => console.error(err));
  };
/*
  // --- Login handler ---
  const handleLogin = (e) => {
    e.preventDefault();
    
    if (username === "admin" && password === "1234.") {
      setIsLoggedIn(true);
    } 
      
      else {
      alert("Invalid username or password");
    }
  };
*/
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
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
        .catch(() => alert("Error updating item"));
    } else {
      API.post("/api/menu", form)
        .then(() => {
          alert("Item added!");
          resetForm();
          fetchMenu();
        })
        .catch(() => alert("Error adding item"));
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
        .catch(() => alert("Error deleting item"));
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
      <div className="card p-4 shadow-lg col-md-4 text-center">
        <h3 className="mb-4">⚠️ Admin access is temporarily disabled for security.</h3>
        <p>Please wait until proper backend authentication is implemented.</p>
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