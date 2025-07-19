require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const connectDB=require("./config/db")

console.log("🟡 Starting server.js");
const authRoutes=require("./routes/authRoutes")
const incomeRoutes=require("./routes/incomeRoutes")
const expenseRoutes=require("./routes/expenseRoutes")
const dashboardRoutes=require("./routes/dashboardRoutes")

// Middleware to handle CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",       //allows req from frontend client url is in frontend env with the port where react is running
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
connectDB();

console.log("🔌 Mounting /api/v1/auth");
app.use("/api/v1/auth", authRoutes);


console.log("🔌 Mounting /api/v1/income");
app.use("/api/v1/income",incomeRoutes)

console.log("🔌 Mounting /api/v1/expense");
app.use("/api/v1/expense",expenseRoutes)

console.log("🔌 Mounting /api/v1/dashboard");
app.use("/api/v1/dashboard", dashboardRoutes);






app.use("/uploads",express.static(path.join(__dirname,"uploads")))  //returns image url from uploads
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
