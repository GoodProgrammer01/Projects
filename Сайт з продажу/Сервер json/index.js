const express = require("express");
const app = express();

// Встановлюємо заголовок Access-Control-Allow-Origin
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Дозволяємо доступ з будь-якого джерела
  next();
});

// Маршрут для обробки GET-запитів на /products.json
app.get("/products.json", (req, res) => {
  const products = require('./products.json'); // Зчитуємо дані з файлу products.json
  res.json(products); // Надсилаємо дані у форматі JSON
});

const HOST = "127.0.0.1"
const PORT = 3000; 
app.listen(PORT, () => {
  console.log(`http://${HOST}:${PORT}/products.json`);
});