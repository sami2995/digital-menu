import { useState, useEffect, useCallback } from "react";
import API from "./services/api";

function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [menuItems, setMenuItems] = useState([]);
  const getBlankForm = () => ({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
    isSpicy: false,
    isVegetarian: false,
    isRecommended: false,
  });
  const [form, setForm] = useState(getBlankForm);
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
    const formData = {
      ...form,
      price: Number(form.price) || 0,
      isSpicy: Boolean(form.isSpicy),
      isVegetarian: Boolean(form.isVegetarian),
      isRecommended: Boolean(form.isRecommended),
    };

    if (editId) {
      API.put(`/api/menu/${editId}`, formData)
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
      API.post("/api/menu", formData)
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
    setForm({
      name: item.name || "",
      price: item.price ?? "",
      description: item.description || "",
      category: item.category || "",
      image: item.image || "",
      isSpicy: Boolean(item.isSpicy),
      isVegetarian: Boolean(item.isVegetarian),
      isRecommended: Boolean(item.isRecommended),
    });
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
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const resetForm = () => {
    setForm(getBlankForm());
    setEditId(null);
  };

  // --- Login screen ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-900 px-4">
        <div className="w-full max-w-md bg-white dark:bg-stone-800 rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-center text-stone-900 dark:text-stone-100 mb-6">
            Admin Login
          </h3>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                Username
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-600
                  bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-stone-100
                  focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent
                  transition-all duration-200"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-600
                  bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-stone-100
                  focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent
                  transition-all duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold
                rounded-xl transition-colors duration-200 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- Admin dashboard ---
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900">
      {/* Admin nav */}
      <nav className="bg-stone-900 dark:bg-stone-950 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          <span className="text-white font-bold text-lg">Admin Dashboard</span>
          <button
            className="px-4 py-1.5 border border-stone-600 text-stone-300 rounded-lg text-sm
              hover:bg-stone-700 transition-colors duration-200"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Form card */}
        <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-700 p-6 mb-8">
          <h4 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
            {editId ? "Edit Menu Item" : "Add New Menu Item"}
          </h4>

          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 text-amber-700 dark:text-amber-300 text-sm">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-600
                  bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-stone-100
                  focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm transition-all"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                className="w-full px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-600
                  bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-stone-100
                  focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm transition-all"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                Description
              </label>
              <textarea
                name="description"
                rows="2"
                className="w-full px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-600
                  bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-stone-100
                  focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm transition-all resize-none"
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                Category
              </label>
              <select
                name="category"
                className="w-full px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-600
                  bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-stone-100
                  focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm transition-all"
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
            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                className="w-full px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-600
                  bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-stone-100
                  focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm transition-all"
                value={form.image}
                onChange={handleChange}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                Highlights
              </label>
              <div className="flex flex-wrap gap-4">
                {[
                  { name: "isRecommended", label: "Recommended" },
                  { name: "isSpicy", label: "Spicy" },
                  { name: "isVegetarian", label: "Vegetarian" },
                ].map(({ name, label }) => (
                  <label key={name} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name={name}
                      checked={form[name]}
                      onChange={handleChange}
                      className="w-4 h-4 rounded border-stone-300 dark:border-stone-600
                        text-amber-500 focus:ring-amber-400"
                    />
                    <span className="text-sm text-stone-700 dark:text-stone-300">
                      {label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div className="md:col-span-2 flex flex-col gap-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold
                  rounded-xl transition-colors duration-200"
              >
                {editId ? "Update Item" : "Add Item"}
              </button>
              {editId && (
                <button
                  type="button"
                  className="w-full py-2.5 bg-stone-200 dark:bg-stone-600 hover:bg-stone-300 dark:hover:bg-stone-500
                    text-stone-700 dark:text-stone-200 font-medium rounded-xl transition-colors duration-200"
                  onClick={resetForm}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Existing menu items */}
        <h4 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          Existing Menu Items
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.length === 0 ? (
            <p className="text-stone-500 dark:text-stone-400 col-span-full">
              No items yet.
            </p>
          ) : (
            menuItems.map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-100 dark:border-stone-700 shadow-sm overflow-hidden flex flex-col"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4 flex flex-col flex-1">
                  <h5 className="font-bold text-stone-900 dark:text-stone-100 mb-1">
                    {item.name}
                  </h5>
                  <p className="text-amber-600 dark:text-amber-400 font-semibold text-sm mb-2">
                    ETB {item.price}
                  </p>
                  <p className="text-stone-500 dark:text-stone-400 text-sm mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <span className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 mb-3 self-start">
                    {item.category}
                  </span>
                  <div className="mt-auto flex gap-2">
                    <button
                      className="flex-1 py-1.5 text-sm font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300
                        rounded-lg hover:bg-amber-200 dark:hover:bg-amber-800/50 transition-colors"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="flex-1 py-1.5 text-sm font-medium bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400
                        rounded-lg hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
