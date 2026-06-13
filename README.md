# Restaurant Category CRUD System

A full-stack Restaurant Category Management System built using React, Node.js, Express.js, and MongoDB.

## Features

* Create Categories
* Read Categories
* Update Categories
* Delete Categories
* Parent & Child Category Support
* Hierarchical Menu Structure
* Interactive Category Tree View
* Restaurant Menu Management Dashboard
* MongoDB Database Integration
* REST API Architecture

## Example Hierarchy

```text
Drinks
├── Cold Drinks
│   ├── Mojito
│   ├── Shakes
│   └── Soft Drinks
│
└── Hot Drinks
    ├── Tea
    └── Coffee
```

## Tech Stack

### Frontend

* React.js
* Axios
* CSS3

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

## API Endpoints

### Create Category

```http
POST /api/categories
```

### Get All Categories

```http
GET /api/categories
```

### Update Category

```http
PUT /api/categories/:id
```

### Delete Category

```http
DELETE /api/categories/:id
```

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

## Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

## Project Structure

```text
restaurant-category-crud
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   └── server.js
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
└── README.md
```

## Future Enhancements

* Food Item Management
* Image Upload Support
* Authentication & Authorization
* Search & Filtering
* Drag-and-Drop Category Management
* Restaurant Menu Page for Customers

## Author

Palak Jain
Integrated M.Tech (AI)
VIT Bhopal University
