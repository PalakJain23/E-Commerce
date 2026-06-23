# 🛒 Amazon Style Product Management System

A full-stack Amazon-inspired Product Management System built using **React.js, Node.js, Express.js, MongoDB, and Multer**. The platform allows administrators to manage hierarchical categories, products, multiple product images, and publishing workflows while providing customers with a clean product browsing experience.

---

## 🚀 Features

### 📂 Category Management

- Create Categories
- Update Categories
- Delete Categories
- Parent-Child Category Hierarchy
- Nested Category Support

Example:

```text
Electronics
│
├── Mobiles
│
├── Laptops
│
└── Earbuds
```

---

### 📦 Product Management

- Add Products
- Update Products
- Delete Products
- Product Stock Management
- Product Description Management
- Product Brand Management
- Product Features Management
- Product Colors Management

---

### 🏷 Multiple Category Mapping

A product can belong to multiple categories.

Example:

```text
iPhone 15

Categories:
- Electronics
- Mobiles
- Apple
```

---

### 🖼 Product Image Management

- Upload Multiple Images
- One Image Upload at a Time
- Delete Images
- Reorder Images
- Product Image Gallery

Example:

```text
Image 1
Image 2
Image 3
Image 4
```

Admin can:

- Upload Images
- Delete Images
- Move Images Up
- Move Images Down

---

### 🌐 Product Publishing Workflow

Products are initially created as drafts.

Workflow:

```text
Create Product
        ↓
Upload Images
        ↓
Add Product To Website
        ↓
Published
```

Only published products are visible to customers.

---

### 👨‍💼 Admin Dashboard

Admin can:

- Manage Categories
- Manage Products
- Upload Product Images
- Reorder Product Images
- Publish Products
- Delete Products

---

### 👨‍💻 Customer Dashboard

Customers can:

- View Published Products
- Browse Product Images
- Navigate Through Product Image Slider
- View Product Details

---

## 🏗 System Architecture

```text
React Frontend
       │
       │
 REST APIs
       │
       │
Node.js + Express
       │
       │
MongoDB Atlas
```

---

## 📊 Database Design

### Category Schema

```js
{
  name: String,
  parentCategory: ObjectId
}
```

Example:

```json
{
  "name": "Mobiles",
  "parentCategory": "electronics_id"
}
```

---

### Product Schema

```js
{
  name: String,
  price: Number,
  brand: String,
  description: String,
  stock: Number,

  categories: [
    ObjectId
  ],

  features: [String],
  colors: [String],

  images: [
    {
      url: String,
      filename: String,
      order: Number
    }
  ],

  isPublished: Boolean
}
```

---

## 🔗 API Endpoints

### Category APIs

#### Create Category

```http
POST /api/categories
```

#### Get Categories

```http
GET /api/categories
```

#### Update Category

```http
PUT /api/categories/:id
```

#### Delete Category

```http
DELETE /api/categories/:id
```

---

### Product APIs

#### Create Product

```http
POST /api/products
```

#### Get Products

```http
GET /api/products
```

#### Update Product

```http
PUT /api/products/:id
```

#### Delete Product

```http
DELETE /api/products/:id
```

---

### Image APIs

#### Upload Product Image

```http
POST /api/products/:id/images
```

#### Delete Product Image

```http
DELETE /api/products/:productId/images/:imageId
```

#### Move Image Up

```http
PUT /api/products/:productId/images/:imageId/up
```

#### Move Image Down

```http
PUT /api/products/:productId/images/:imageId/down
```

---

### Publish Product

```http
PUT /api/products/:id/publish
```

---

## 🛠 Tech Stack

### Frontend

- React.js
- Axios
- CSS3

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas
- Mongoose

### File Upload

- Multer

---

## 📸 Screenshots

### Admin Dashboard

- Category Management
- Product Management
- Image Upload Management
- Product Publishing

### Customer Dashboard

- Product Cards
- Product Image Slider
- Product Details

---

## 🎯 Learning Outcomes

This project helped in understanding:

- Full Stack Development
- REST API Design
- CRUD Operations
- MongoDB Relationships
- Parent-Child Category Hierarchy
- Multiple Category Mapping
- File Upload Handling
- Product Publishing Workflow
- Image Management System
- E-Commerce Application Design

---

## 🚀 Future Enhancements

- User Authentication & Authorization
- Shopping Cart
- Wishlist
- Product Search
- Product Filters
- Product Reviews & Ratings
- Order Management
- Payment Gateway Integration
- Admin Analytics Dashboard
- Cloudinary Image Storage
- Role-Based Access Control

---

## 👨‍💻 Author

**Palak Jain**

Integrated M.Tech AI Student  
VIT Bhopal University

---

## ⭐ If you like this project

Give this repository a star ⭐ and support the project.
