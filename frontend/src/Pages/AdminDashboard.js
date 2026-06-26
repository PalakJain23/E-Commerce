import axios from "axios";

function AdminDashboard({
  activeTab,
  setActiveTab,
  categories,
  products,
  categoryName,
  setCategoryName,
  parentCategory,
  setParentCategory,
  product,
  setProduct,
  selectedImages,
  setSelectedImages,
  fetchData,
  CATEGORY_API,
  PRODUCT_API,
}) {
  const addCategory = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      alert("Please enter category name");
      return;
    }

    await axios.post(CATEGORY_API, {
      name: categoryName,
      parentCategory: parentCategory || null,
    });

    setCategoryName("");
    setParentCategory("");
    fetchData();
  };

  const handleProductChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleCategorySelect = (e) => {
    const selected = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setProduct({ ...product, categories: selected });
  };

  const addProduct = async (e) => {
    e.preventDefault();

    const data = {
      ...product,
      price: Number(product.price),
      stock: Number(product.stock),
      features: product.features
        ? product.features.split(",").map((item) => item.trim())
        : [],
      colors: product.colors
        ? product.colors.split(",").map((item) => item.trim())
        : [],
    };

    await axios.post(PRODUCT_API, data);

    setProduct({
      name: "",
      price: "",
      brand: "",
      description: "",
      stock: "",
      features: "",
      colors: "",
      categories: [],
    });

    fetchData();
  };

  const uploadImage = async (productId) => {
    const file = selectedImages[productId];

    if (!file) {
      alert("Please select image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    await axios.post(`${PRODUCT_API}/${productId}/images`, formData);

    setSelectedImages({ ...selectedImages, [productId]: null });
    fetchData();
  };

  const deleteImage = async (productId, imageId) => {
    await axios.delete(`${PRODUCT_API}/${productId}/images/${imageId}`);
    fetchData();
  };

  const moveImageUp = async (productId, imageId) => {
    await axios.put(`${PRODUCT_API}/${productId}/images/${imageId}/up`);
    fetchData();
  };

  const moveImageDown = async (productId, imageId) => {
    await axios.put(`${PRODUCT_API}/${productId}/images/${imageId}/down`);
    fetchData();
  };

  const publishProduct = async (productId) => {
    try {
      await axios.put(`${PRODUCT_API}/${productId}/publish`);
      alert("Product added to website successfully");
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="tabs">
        <button onClick={() => setActiveTab("category")}>Add Category</button>
        <button onClick={() => setActiveTab("product")}>Add Product</button>
      </div>

      {activeTab === "category" && (
        <form className="form-card" onSubmit={addCategory}>
          <h2>Add Category</h2>

          <input
            type="text"
            placeholder="Category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />

          <select
            value={parentCategory}
            onChange={(e) => setParentCategory(e.target.value)}
          >
            <option value="">None - Parent Category</option>

            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <button type="submit">Save Category</button>
        </form>
      )}

      {activeTab === "product" && (
        <form className="form-card" onSubmit={addProduct}>
          <h2>Add Product</h2>

          <input name="name" placeholder="Product Name" value={product.name} onChange={handleProductChange} />
          <input name="price" placeholder="Price" value={product.price} onChange={handleProductChange} />
          <input name="brand" placeholder="Brand" value={product.brand} onChange={handleProductChange} />
          <input name="stock" placeholder="Stock" value={product.stock} onChange={handleProductChange} />
          <input name="features" placeholder="Features comma separated" value={product.features} onChange={handleProductChange} />
          <input name="colors" placeholder="Colors comma separated" value={product.colors} onChange={handleProductChange} />

          <textarea
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleProductChange}
          />

          <label>Select Multiple Categories</label>

          <select
            multiple
            value={product.categories}
            onChange={handleCategorySelect}
          >
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <button type="submit">Save Product</button>
        </form>
      )}

      <h2 className="section-title">Product Management</h2>

      <div className="products">
        {products.map((item) => (
          <div className="product-card" key={item._id}>
            <div className="status">
              {item.isPublished ? "Published on Website" : "Draft / Locked"}
            </div>

            <h2>{item.name}</h2>
            <p><b>Brand:</b> {item.brand}</p>
            <p><b>Price:</b> ₹{item.price}</p>
            <p><b>Stock:</b> {item.stock}</p>
            <p><b>Description:</b> {item.description}</p>
            <p><b>Categories:</b> {item.categories?.map((cat) => cat.name).join(", ")}</p>
            <p><b>Features:</b> {item.features?.join(", ")}</p>
            <p><b>Colors:</b> {item.colors?.join(", ")}</p>

            {!item.isPublished && (
              <>
                <div className="upload-box">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setSelectedImages({
                        ...selectedImages,
                        [item._id]: e.target.files[0],
                      })
                    }
                  />

                  <button type="button" onClick={() => uploadImage(item._id)}>
                    Upload Image
                  </button>
                </div>

                <div className="image-gallery">
                  {item.images?.map((img) => (
                    <div className="image-card" key={img._id}>
                      <img src={img.url} alt={item.name} />

                      <div className="image-actions">
                        <button onClick={() => moveImageUp(item._id, img._id)}>↑</button>
                        <button onClick={() => moveImageDown(item._id, img._id)}>↓</button>
                        <button onClick={() => deleteImage(item._id, img._id)}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  className="publish-btn"
                  disabled={!item.images || item.images.length === 0}
                  onClick={() => publishProduct(item._id)}
                >
                  Add Product to Website
                </button>
              </>
            )}

            {item.isPublished && (
              <p className="locked-text">
                Product is locked and visible on customer dashboard.
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default AdminDashboard;