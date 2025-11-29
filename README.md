# VastraCart

VastraCart is a modern e-commerce web application for clothing, featuring product listing, product details, shopping cart, user authentication, and order management. It provides a seamless shopping experience with real-time cart updates, guest user support, and smooth checkout functionality.

The project is divided into **Frontend** (ReactJS + TailwindCSS) and **Backend** (Node.js + Express + MongoDB).

---

## Features

* User authentication (Signup/Login) with JWT
* Product listing and detailed view
* Add to cart, update quantity, remove items
* Guest cart support using Local Storage
* Order summary and checkout navigation
* Responsive design using TailwindCSS
* Real-time cart updates without page refresh
* Persistent cart for logged-in users

---

## Tech Stack

**Frontend:**

* ReactJS
* TailwindCSS
* React Router DOM
* Axios
* Lucide-react (Icons)

**Backend:**

* Node.js
* Express.js
* MongoDB & Mongoose
* JWT Authentication
* bcrypt for password hashing

---

## Project Structure

### Backend

```
backend/
├─ config/
│  └─ db.js               # MongoDB connection setup
├─ controllers/
│  ├─ authController.js   # Signup/Login logic
│  ├─ cartController.js   # Cart CRUD operations
│  └─ productController.js# Fetch products and details
├─ models/
│  ├─ User.js             # User schema
│  ├─ Product.js          # Product schema
│  └─ Cart.js             # Cart schema
├─ routes/
│  ├─ auth.js             # Authentication routes
│  ├─ cart.js             # Cart routes
│  └─ product.js          # Product routes
├─ middleware/
│  └─ authMiddleware.js   # JWT token validation
├─ utils/
│  └─ helpers.js          # Helper functions
├─ server.js              # Express server
└─ package.json
```

### Frontend

```
frontend/
├─ public/
│  └─ index.html
├─ src/
│  ├─ components/
│  │  ├─ Navbar.jsx
│  │  ├─ ProductCard.jsx
│  │  └─ CartItem.jsx
│  ├─ context/
│  │  ├─ AuthContext.jsx
│  │  └─ CartContext.jsx
│  ├─ pages/
│  │  ├─ Home.jsx
│  │  ├─ ProductDetails.jsx
│  │  └─ Cart.jsx
│  ├─ services/
│  │  ├─ productService.js
│  │  └─ cartService.js
│  ├─ index.css
│  ├─ main.jsx
│  └─ App.jsx
├─ package.json
└─ tailwind.config.js
```

---

## Installation

### Backend

```bash
cd backend
npm install
```

Create a `.env` file in the backend root:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Start the backend server:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

Start the frontend server:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173` (Vite default) and communicates with backend API on `http://localhost:5000`.

---

## Usage

1. Open the frontend in the browser.
2. Browse products on the Home page.
3. Click **View Details** to see product info.
4. Select size and quantity, then **Add to Cart**.
5. Go to **Cart** to review, update, or remove items.
6. Login or Signup to persist your cart and place orders.
7. Checkout navigates to the checkout page (can be integrated with payment gateway).

---

## Notes

* Guest users’ carts are stored in `localStorage`.
* Authenticated users’ carts are stored in MongoDB.
* Cart updates immediately after add, remove, or quantity change.
* TailwindCSS handles responsive design for mobile, tablet, and desktop.

---

## Future Enhancements

* Integrate payment gateway for checkout
* Add order history and order tracking
* Implement product search and filters
* Add product reviews and ratings

---

## License

This project is open-source and available under the MIT License.