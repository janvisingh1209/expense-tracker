# 💰 Expense Tracker

A full-stack Expense Tracker built with **React (Vite)**, **Node.js/Express**, and **MongoDB**.  
Users can register, log in, and track daily expenses securely with a simple, responsive UI.

---

## 🚀 Features
- User authentication (JWT)
- Add, edit, and delete expenses
- Categorize expenses
- Responsive UI
- MongoDB for storage

---

## 🛠 Tech Stack
- **Frontend:** React (Vite), Bootstrap  
- **Backend:** Node.js, Express  
- **Database:** MongoDB  
- **Auth:** JWT  

---

## ⚙️ Prerequisites
- [Node.js](https://nodejs.org/) (>=16)  
- [MongoDB](https://www.mongodb.com/) (Atlas or local)  
- npm or yarn  

---

## 📂 Project Structure
├── frontend/ # React (Vite) app
├── backend/ # Node.js API


## 🔧 Setup

### Backend
```bash
cd backend
npm install

Create .env (use .env.example as a template):

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=8000


Start backend:
npm start
Runs on http://localhost:8000

### Frontend
cd frontend
npm install

Create .env (use .env.example as a template):
VITE_API_URL=http://localhost:8000

Start frontend:
npm run dev
Runs on http://localhost:5173

✅ Usage

Start backend → npm start

Start frontend → npm run dev

Open browser at http://localhost:5173

Register, log in, and start tracking expenses 🎉
