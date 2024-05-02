const express = require("express");
const bodyParser = require("body-parser");
const storeRoutes = require("./store");
const categoryRoutes = require("./category");
const productRoutes = require("./product");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use("/api/stores", storeRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
