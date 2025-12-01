# 🛍️✨ VastraCart

VastraCart is a modern and vibrant e-commerce web application for clothing, featuring product listing, product details, shopping cart, user authentication, and order management. It provides a seamless shopping experience with real-time cart updates, guest user support, and smooth checkout functionality.  

The project is divided into **Frontend** (ReactJS + TailwindCSS) and **Backend** (Node.js + Express + MongoDB).  

---

## 🚀 Live Deployment

- **Backend:** [https://vastracart.onrender.com/](https://vastracart.onrender.com/)  
- **Frontend:** [https://vastra-cart.vercel.app/](https://vastra-cart.vercel.app/)  
- **GitHub Repository:** [https://github.com/Saichandanyadav/VastraCart](https://github.com/Saichandanyadav/VastraCart)  

---

## ✨ Features

* 🔑 User authentication (Signup/Login) with JWT  
* 🏷️ Product listing and detailed view  
* 🛒 Add to cart, update quantity, remove items  
* 👤 Guest cart support using Local Storage  
* 📄 Order summary and checkout navigation  
* 📱 Responsive design using TailwindCSS  
* ⚡ Real-time cart updates without page refresh  
* 💾 Persistent cart for logged-in users  
* 📧 Email notifications via SendGrid for orders  

---

## 🛠️ Tech Stack

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
* SendGrid Email API  

---

## 📂 Project Structure

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

````

---

## ⚙️ Installation

### Backend

```bash
cd backend
npm install
````

Create a `.env` file in the backend root using this template:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
FROM_NAME="VastraCart"
FROM_EMAIL=no-reply@yourdomain.com
FRONTEND_URL=http://localhost:5173
SENDGRID_API_KEY=your_sendgrid_api_key
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

Create a `.env` file in the frontend root:

```
VITE_BASE_URL=http://localhost:5000/api
```

Start the frontend server:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173` and communicates with backend API on `http://localhost:5000`.

---

## 📧 How to Create a SendGrid API Key

1. Go to [SendGrid](https://sendgrid.com/) and sign up or log in. ✨
2. Navigate to **Settings > API Keys** in your SendGrid dashboard.
3. Click **Create API Key**.
4. Give your API key a name (e.g., `VastraCart Backend`) and select **Full Access** or **Restricted Access** depending on your requirements.
5. Click **Create & View** to generate the API key. ⚡
6. Copy the API key immediately — you won’t be able to view it again.
7. Paste the API key into your backend `.env` file under `SENDGRID_API_KEY`.
8. Test email sending using a sample endpoint in your backend to ensure emails are delivered correctly. 💌

---

## 🛒 Usage

1. Open the frontend in the browser.
2. Browse products on the Home page.
3. Click **View Details** to see product info.
4. Select size and quantity, then **Add to Cart**.
5. Go to **Cart** to review, update, or remove items.
6. Login or Signup to persist your cart and place orders.
7. Checkout navigates to the checkout page and triggers email notifications via SendGrid.

---

## 📝 Notes

* Guest users’ carts are stored in `localStorage`.
* Authenticated users’ carts are stored in MongoDB.
* Cart updates immediately after add, remove, or quantity change.
* TailwindCSS handles responsive design for mobile, tablet, and desktop.
* SendGrid integration ensures order emails are sent reliably. ✉️

---

## 🔮 Future Enhancements

* 💳 Integrate payment gateway for checkout
* 📦 Add order history and order tracking
* 🔍 Implement product search and filters
* ⭐ Add product reviews and ratings

---

## 👨‍💻 Developer

**Sai Chandan Gundaboina**  

* GitHub: [https://github.com/Saichandanyadav](https://github.com/Saichandanyadav)  
* LinkedIn: [https://www.linkedin.com/in/saichandanyadav/](https://www.linkedin.com/in/saichandanyadav/)  
* Twitter: [https://twitter.com/Saichandanyadav](https://twitter.com/Saichandanyadav)  
* Email: [saichandhanyadav2002#gmail.com](mailto:saichandhanyadav2002#gmail.com)  


---

## 📄 License

This project is open-source and available under the MIT License.
