# 💬 Product Feedback Web App

A full-stack **Feedback Web App** where users can post their feedback about a product. Built using modern frontend and backend technologies with a clean, maintainable codebase following the **MVC (Model-View-Controller)** architecture.

## 📦 Tech Stack

### 🖥️ Frontend
- **React** – Component-based UI rendering
- **Redux** – Global state management
- **Tailwind CSS** – Utility-first CSS framework
- **DaisyUI** – Pre-styled Tailwind component library

### 🛠️ Backend
- **Node.js** – JavaScript runtime environment
- **Express.js** – Minimalist web framework
- **Mongoose** – ODM for MongoDB

### 🗃️ Database
- **MongoDB** – NoSQL document-based database

## 🚀 Getting Started

### 1. Clone the Repository
git clone https://github.com/your-username/feedback-app.git
cd feedback-app

### 2. Setup Frontend
cd frontend
npm install
npm run dev

### 2. Setup Backend
cd frontend
npm install
npm run dev

### 🔐 Environment Variables

#### 📦 Backend (`/backend/.env`)

Create a `.env` file inside the `backend` folder with the following content.  
> ⚠️ **Important**: Replace the placeholder values with your own credentials for security.

```env
PORT=5001
MONGO_ATLAS_URI=your_mongo_connection_string
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
ORIGIN=http://localhost:5173
```

#### 🧩 Frontend (`/frontend/.env`)

Create a `.env` file inside the `frontend` folder:

```env
VITE_SERVER_URL=http://localhost:5001
```

> 💡 The `VITE_SERVER_URL` should match the backend’s running URL in development.
