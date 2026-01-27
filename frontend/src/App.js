import { useEffect, useState } from "react";
import { getProducts, addProduct, updateProduct, deleteProduct } from "./services/api";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", quantity: "", price: "" });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch {
      setError("Failed to fetch products");
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.quantity || !form.price) {
      setError("All fields are required");
      return;
    }
    try {
      if (editId) {
        await updateProduct(editId, {
          name: form.name,
          quantity: Number(form.quantity),
          price: Number(form.price),
        });
        setEditId(null);
      } else {
        await addProduct({
          name: form.name,
          quantity: Number(form.quantity),
          price: Number(form.price),
        });
      }
      setForm({ name: "", quantity: "", price: "" });
      setError("");
      fetchProducts();
    } catch {
      setError("Operation failed");
    }
  };

  const handleEdit = (product) => {
    setForm({ name: product.name, quantity: product.quantity, price: product.price });
    setEditId(product._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        fetchProducts();
      } catch {
        setError("Delete failed");
      }
    }
  };

  return (
    <div className="container">
      <h1>Inventory Management</h1>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />
        <button type="submit">{editId ? "Update" : "Add"}</button>
      </form>

      <div className="product-list">
        {products.map((p) => (
          <div key={p._id} className="product-card">
            <div className="product-info">
              <strong>{p.name}</strong> — Qty: {p.quantity} — ${p.price}
            </div>
            <div className="product-actions">
              <button className="edit-btn" onClick={() => handleEdit(p)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(p._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
