const express = require("express");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");

// Initialize app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Load environment variables from .env file
dotenv.config();

// MongoDB connection URI and PORT
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/bloodConnectDB";
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
MongoClient.connect(MONGO_URI)
  .then((client) => {
    console.log("✅ MongoDB connected successfully!");

    // Optionally store DB reference
    const db = client.db();

    // Example route
    app.get("/", (req, res) => {
      res.send("Server is running and MongoDB is connected!");
    });

    // Start the server after DB connection
    app.listen(PORT, () => {
      console.log(`🚀 Server started and running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error connecting to MongoDB:", error);
  });
