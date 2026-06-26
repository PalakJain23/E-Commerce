import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

import AdminDashboard from "./Pages/AdminDashboard";
import CustomerDashboard from "./Pages/CustomerDashboard";

const CATEGORY_API = "http://localhost:5000/api/categories";
const PRODUCT_API = "http://localhost:5000/api/products";

function App() {
  const [activeTab, setActiveTab] = useState("category");
  const [view, setView] = useState("admin");

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [categoryName, setCategoryName] = useState("");
  const [parentCategory, setParentCategory] = useState("");

  const [product, setProduct] = useState({
    name: "",
    price: "",
    brand: "",
    description: "",
    stock: "",
    features: "",
    colors: "",
    categories: [],
  });

  const [selectedImages, setSelectedImages] = useState({});

  const fetchData = async () => {
    const catRes = await axios.get(CATEGORY_API);
    const prodRes = await axios.get(PRODUCT_API);

    setCategories(catRes.data);
    setProducts(prodRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app">
      <div className="topbar">
        <h1>Admin Panel</h1>

        <div>
          <button onClick={() => setView("admin")}>Admin Dashboard</button>
          <button onClick={() => setView("customer")}>
            Customer Dashboard
          </button>
        </div>
      </div>

      {view === "admin" ? (
        <AdminDashboard
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          categories={categories}
          products={products}
          categoryName={categoryName}
          setCategoryName={setCategoryName}
          parentCategory={parentCategory}
          setParentCategory={setParentCategory}
          product={product}
          setProduct={setProduct}
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
          fetchData={fetchData}
          CATEGORY_API={CATEGORY_API}
          PRODUCT_API={PRODUCT_API}
        />
      ) : (
        <CustomerDashboard products={products} categories={categories} />
      )}
    </div>
  );
}

export default App;