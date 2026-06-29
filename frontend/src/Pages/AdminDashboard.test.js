import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";

jest.mock("axios");

describe("AdminDashboard", () => {
  const baseProps = {
    activeTab: "product",
    setActiveTab: jest.fn(),
    categories: [],
    products: [
      {
        _id: "product-1",
        name: "Test Product",
        brand: "Test Brand",
        price: 100,
        stock: 10,
        description: "A test product",
        categories: [],
        features: ["Feature 1"],
        colors: ["Red"],
        images: [],
        isPublished: false,
      },
    ],
    categoryName: "",
    setCategoryName: jest.fn(),
    parentCategory: "",
    setParentCategory: jest.fn(),
    product: {
      name: "",
      price: "",
      brand: "",
      description: "",
      stock: "",
      features: "",
      colors: "",
      categories: [],
    },
    setProduct: jest.fn(),
    selectedImages: {},
    setSelectedImages: jest.fn(),
    fetchData: jest.fn(),
    CATEGORY_API: "http://localhost:5000/api/categories",
    PRODUCT_API: "http://localhost:5000/api/products",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    window.confirm = jest.fn(() => true);
    window.alert = jest.fn();
  });

  test("allows deleting a product from the admin dashboard", async () => {
    axios.delete.mockResolvedValue({ data: { message: "Product deleted successfully" } });

    render(<AdminDashboard {...baseProps} />);

    await userEvent.click(screen.getByRole("button", { name: /delete product/i }));

    expect(axios.delete).toHaveBeenCalledWith(
      "http://localhost:5000/api/products/product-1"
    );

    await waitFor(() => {
      expect(baseProps.fetchData).toHaveBeenCalledTimes(1);
    });
  });
});
