# 🍔 MERN Foods – Uber Eats Clone (TypeScript + Redux + TailwindCSS)

🚀 **Live Demo**: [https://gilson96.github.io/mern-foods](https://gilson96.github.io/mern-foods)  
🔌 **Backend API**: [https://github.com/Gilson96/react-foods_api](https://github.com/Gilson96/react-foods_api)

---

## 📌 Overview

**MERN Foods** is a full-stack food delivery web app inspired by Uber Eats, built using the **MERN** stack with modern frontend tools like **TypeScript**, **Redux Toolkit**, **TailwindCSS**, and **Redux Persist**.

The app includes search, filter by category, cart management, secure user authentication, and Stripe-powered payments — demonstrating a production-level e-commerce experience.

---

## ✨ Features

- 🔐 **Authentication** – JWT-based login & registration
- 🔎 **Search & Filter** – Live product search & category filtering
- 🛒 **Redux Cart** – Cart state managed via Redux Toolkit & Redux Persist
- 💳 **Stripe Checkout** – Fully integrated with Stripe (test mode)
- ⚡ **TypeScript** – Strong typing across components & state
- 🎨 **TailwindCSS** – Utility-first styling with responsive design
- 🌐 **Full-Stack Deployment** – GitHub Pages (frontend) + Heroku (backend)

---

## 🧪 Demo Login

You can test the app with the following credentials:

- **Email**: `test@test.com`  
- **Password**: `abc123456`

---

## 💻 Tech Stack

| Technology           | Usage                         |
|----------------------|-------------------------------|
| **React (with Vite)**| Frontend framework            |
| **TypeScript**       | Typed JavaScript              |
| **Redux Toolkit**    | State management              |
| **Redux Persist**    | Local storage persistence     |
| **TailwindCSS**      | Responsive UI styling         |
| **Node.js + Express**| REST API backend              |
| **MongoDB Atlas**    | Cloud-hosted NoSQL database   |
| **JWT**              | User auth                     |
| **Stripe API**       | Payment integration           |
| **Heroku**           | Backend deployment            |
| **GitHub Pages**     | Frontend deployment           |

---

## 📷 Screenshots

### 🔐 Login Page  
![Login Page](https://github.com/Gilson96/mern-foods/blob/master/src/screenshots/login_page.png?raw=true)

### 🏠 Homepage with Search & Filters  
![Homepage](https://github.com/Gilson96/mern-foods/blob/master/src/screenshots/homepage.png?raw=true)
![Search & Filters](https://github.com/Gilson96/mern-foods/blob/master/src/screenshots/search.png?raw=true)

### 🍕 Product List  
![Product List](https://github.com/Gilson96/mern-foods/blob/master/src/screenshots/product-list.png?raw=true)

### 🛒 Cart with Redux  
![Cart](https://github.com/Gilson96/mern-foods/blob/master/src/screenshots/cart.png?raw=true)

### 💳 Stripe Checkout  
![Checkout](https://github.com/Gilson96/mern-foods/blob/master/src/screenshots/confirmation.png?raw=true)

### ✅ Orders
![Orders](https://github.com/Gilson96/mern-foods/blob/master/src/screenshots/orders.png?raw=true)

### ❤️ Favourites
![Favourites](https://github.com/Gilson96/mern-foods/blob/master/src/screenshots/favourites.png?raw=true)

---

## 🧭 How to Run Locally

### 1. Clone the Repositories

```bash
# Frontend
git clone https://github.com/Gilson96/mern-foods.git
cd mern-foods
npm install
npm run dev

# Backend
git clone https://github.com/Gilson96/react-foods_api.git
cd react-foods_api
npm install
npm run dev
```
### 2. Configure Backend .env
```bash
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_test_secret
```

### 3. Update Frontend API URL
If you develop locally, please ensure the frontend uses your local API (e.g., via .env or direct configuration).

---

## 🏁 Stripe Test Details
Use the following **Stripe test card:**
```bash
Card Number: 4242 4242 4242 4242
Expiry Date: Any future date
CVC: Any 3 digits
```

🤝 Contact

👤 GitHub: @Gilson96

💼 LinkedIn: www.linkedin.com/in/gilson-de-almeida

📧 Email: grafael99@gmail.com

Built with ❤️ using TypeScript, Redux, TailwindCSS and the MERN stack – by a developer passionate about crafting real-world apps for real users. 🇬🇧
