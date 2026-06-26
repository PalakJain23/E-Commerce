import { useState } from "react";

function CustomerProductCard({ item, onView }) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    if (!item.images || item.images.length === 0) return;

    setCurrentImage((prev) =>
      prev === item.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!item.images || item.images.length === 0) return;

    setCurrentImage((prev) =>
      prev === 0 ? item.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="customer-card">
      {item.images && item.images.length > 0 && (
        <>
          <div className="banner-slider">
            <button className="nav-arrow left-arrow" onClick={prevImage}>
              ❮
            </button>

            <img
              src={item.images[currentImage]?.url}
              alt={item.name}
              className="banner-image"
            />

            <button className="nav-arrow right-arrow" onClick={nextImage}>
              ❯
            </button>
          </div>

          <div className="dots">
            {item.images.map((_, index) => (
              <span
                key={index}
                className={currentImage === index ? "dot active-dot" : "dot"}
                onClick={() => setCurrentImage(index)}
              ></span>
            ))}
          </div>
        </>
      )}

      <h3>{item.name}</h3>
      <p className="brand">{item.brand}</p>
      <p className="price">₹{item.price}</p>
      <p>{item.description}</p>

      <p><b>Colors:</b> {item.colors?.join(", ")}</p>
      <p><b>Features:</b> {item.features?.join(", ")}</p>

      <button onClick={() => onView(item)}>View Product</button>
    </div>
  );
}

function CustomerProductDetail({ item, onClose }) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    if (!item.images || item.images.length === 0) return;

    setCurrentImage((prev) =>
      prev === item.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!item.images || item.images.length === 0) return;

    setCurrentImage((prev) =>
      prev === 0 ? item.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="product-detail">
      <button className="back-button" onClick={onClose}>
        ← Back to Products
      </button>

      <div className="detail-header">
        <div>
          <h2>{item.name}</h2>
          <p className="brand">{item.brand}</p>
          <p className="price">₹{item.price}</p>
          <p>
            <b>Stock:</b> {item.stock}
          </p>
          <p>
            <b>Categories:</b> {item.categories?.map((cat) => cat.name).join(", ")}
          </p>
        </div>

        {item.images && item.images.length > 0 && (
          <div className="banner-slider detail-slider">
            <button className="nav-arrow left-arrow" onClick={prevImage}>
              ❮
            </button>

            <img
              src={item.images[currentImage]?.url}
              alt={item.name}
              className="banner-image"
            />

            <button className="nav-arrow right-arrow" onClick={nextImage}>
              ❯
            </button>
          </div>
        )}
      </div>

      {item.images && item.images.length > 0 && (
        <div className="dots detail-dots">
          {item.images.map((_, index) => (
            <span
              key={index}
              className={currentImage === index ? "dot active-dot" : "dot"}
              onClick={() => setCurrentImage(index)}
            ></span>
          ))}
        </div>
      )}

      <div className="detail-body">
        <p>{item.description}</p>

        <p><b>Colors:</b> {item.colors?.join(", ")}</p>
        <p><b>Features:</b> {item.features?.join(", ")}</p>
      </div>
    </div>
  );
}

function CustomerDashboard({ products, categories }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const publishedProducts = products.filter((item) => item.isPublished);

  const filteredProducts = publishedProducts.filter((item) => {
    const matchesSearch = [item.name, item.brand, item.description]
      .filter(Boolean)
      .some((field) =>
        field.toLowerCase().includes(search.trim().toLowerCase())
      );

    const matchesCategory = selectedCategory
      ? item.categories?.some((cat) => cat._id === selectedCategory)
      : true;

    const price = Number(item.price);
    const matchesMinPrice = minPrice ? price >= Number(minPrice) : true;
    const matchesMaxPrice = maxPrice ? price <= Number(maxPrice) : true;

    return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
  });

  return (
    <>
      <h2 className="section-title">Customer Dashboard</h2>

      {selectedProduct ? (
        <CustomerProductDetail
          item={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      ) : (
        <>
          <div className="filter-panel">
            <input
              type="text"
              placeholder="Search by name, brand, or description"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              min="0"
              onChange={(e) => setMinPrice(e.target.value)}
            />

            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              min="0"
              onChange={(e) => setMaxPrice(e.target.value)}
            />

            <button
              type="button"
              className="clear-filters"
              onClick={() => {
                setSearch("");
                setSelectedCategory("");
                setMinPrice("");
                setMaxPrice("");
              }}
            >
              Clear Filters
            </button>
          </div>

          <div className="customer-products">
            {filteredProducts.map((item) => (
              <CustomerProductCard
                key={item._id}
                item={item}
                onView={setSelectedProduct}
              />
            ))}

            {filteredProducts.length === 0 && (
              <h3>No products match your filters.</h3>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default CustomerDashboard;