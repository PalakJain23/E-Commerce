import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:5000/api/categories";

function App() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [editId, setEditId] = useState(null);
  const [openItems, setOpenItems] = useState({});

  const fetchCategories = async () => {
    const res = await axios.get(API_URL);
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const buildTree = (items) => {
    const map = {};
    const roots = [];

    items.forEach((item) => {
      map[item._id] = { ...item, children: [] };
    });

    items.forEach((item) => {
      const parentId = item.parentCategory?._id || item.parentCategory;

      if (parentId && map[parentId]) {
        map[parentId].children.push(map[item._id]);
      } else {
        roots.push(map[item._id]);
      }
    });

    return roots;
  };

  const toggleOpen = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderTree = (nodes, level = 0) => {
    return nodes.map((node) => (
      <div key={node._id} className="tree-item" style={{ marginLeft: level * 24 }}>
        <div className="tree-row" onClick={() => toggleOpen(node._id)}>
          <span className="arrow">
            {node.children.length > 0 ? (openItems[node._id] ? "▼" : "▶") : "•"}
          </span>
          <span className="tree-name">{node.name}</span>
        </div>

        {openItems[node._id] && node.children.length > 0 && (
          <div>{renderTree(node.children, level + 1)}</div>
        )}
      </div>
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter category name");
      return;
    }

    const data = {
      name,
      parentCategory: parentCategory || null,
    };

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, data);
        setEditId(null);
      } else {
        await axios.post(API_URL, data);
      }

      setName("");
      setParentCategory("");
      fetchCategories();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleEdit = (cat) => {
    setEditId(cat._id);
    setName(cat.name);
    setParentCategory(cat.parentCategory?._id || "");
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this category?")) {
        await axios.delete(`${API_URL}/${id}`);
        fetchCategories();
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setName("");
    setParentCategory("");
  };

  const treeData = buildTree(categories);

  return (
    <div className="app">
      <section className="hero">
        <h1>Restaurant Menu</h1>
        <p>Clickable parent-child category hierarchy</p>
      </section>

      <section className="menu-section">
        <div className="menu-card">
          <h2>Menu Categories</h2>

          {treeData.length > 0 ? (
            <div className="tree">{renderTree(treeData)}</div>
          ) : (
            <p className="empty">No menu categories added yet</p>
          )}
        </div>
      </section>

      <section className="manager-title">
        <h1>Menu Manager</h1>
        <p>Add, edit and delete restaurant menu categories</p>
      </section>

      <section className="dashboard">
        <div className="card form-card">
          <h2>{editId ? "Edit Category" : "Add Category"}</h2>

          <form onSubmit={handleSubmit}>
            <label>Category Name</label>
            <input
              type="text"
              placeholder="Example: Drinks, Cold Drinks, Mojito"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Parent Category</label>
            <select
              value={parentCategory}
              onChange={(e) => setParentCategory(e.target.value)}
            >
              <option value="">None - Parent Category</option>

              {categories
                .filter((cat) => cat._id !== editId)
                .map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
            </select>

            <div className="btn-group">
              <button className="primary-btn" type="submit">
                {editId ? "Update Category" : "Add Category"}
              </button>

              {editId && (
                <button className="cancel-btn" type="button" onClick={cancelEdit}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="card table-card">
          <div className="table-header">
            <h2>Category Records</h2>
            <span>{categories.length} Categories</span>
          </div>

          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Parent</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((cat) => (
                <tr key={cat._id}>
                  <td className="category-name">{cat.name}</td>
                  <td>{cat.parentCategory ? cat.parentCategory.name : "None"}</td>
                  <td>
                    <span className={cat.parentCategory ? "child-badge" : "parent-badge"}>
                      {cat.parentCategory ? "Child" : "Parent"}
                    </span>
                  </td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(cat)}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(cat._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {categories.length === 0 && (
                <tr>
                  <td colSpan="4" className="empty">
                    No categories added yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default App;