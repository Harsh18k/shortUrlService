require("dotenv").config(); // ✅ Load .env

const express = require("express");
const urlRoutes = require("./routes/url");
const { staticRouter } = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const path = require("path");
const cookieParser = require("cookie-parser");

const { restrictTo, checkForAuthentication } = require("./middleware/auth");
const { connectToDatabase } = require("./connect");

const app = express();

// ✅ PORT from .env
const port = process.env.PORT || 4000;

// ✅ MongoDB connection from .env
connectToDatabase(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err);
  });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ THIS IS THE NEW LINE FOR CSS
app.use(express.static("public"));

app.use(checkForAuthentication);
app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoutes);
app.use("/user", userRoute);
app.use("/", staticRouter);

app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});