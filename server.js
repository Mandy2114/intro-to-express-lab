//Import Express:
import express from "express";

//Create an Express app:
const app = express();

//Middleware:
// Define routes here:
app.get("/greeting/:username", (req, res) => {
  res.send("Hello, " + req.params.username);
});

app.get("/roll/:number", (req, res) => {
  const numParam = req.params.number;
  const number = parseInt(numParam);
  if (isNaN(number)) {
    return res.send("You must specify a number.");
  }
  const roll = Math.floor(Math.random() * (numParam + 1));
  return res.send(`You rolled a ${roll}.`);
});

//Data Array:
const collectibles = [
  { name: "shiny ball", price: 5.95 },
  { name: "autographed picture of a dog", price: 10 },
  { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
];

app.get("/collectibles/:index", (req, res) => {
  const indexProm = parseInt(req.params.index);

  if (isNaN(indexProm) || indexProm < 0 || indexProm >= collectibles.length) {
    return res.send(" This item is not yet in stock. Check back soon!");
  }
  const collectible = collectibles[indexProm];
  return res.send(
    `So, you want the ${collectible.name}? For ${collectible.price}, it can be yours!`
  );
});

// Using Query Paramenters
app.get("/hello", (req, res) => {
  res.send(
    `Hello there, ${req.query.name}! I hear you are ${req.query.age} years old!`
  );
});
// Filter Shoes by Query Parameters
const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" },
];

app.get("/shoes", (req, res) => {
  const minPrice = parseInt(req.query["min-price"]);
  const maxPrice = parseInt(req.query["max-price"]);
  const type = req.query.type;

  let filteredShoes = shoes;

  if (minPrice !== undefined && !isNaN(minPrice)) {
    filteredShoes = filteredShoes.filter((shoe) => shoe.price >= minPrice);
  }
  // Check if maxPrice is a valid number and filter accordingly
  if (maxPrice !== undefined && !isNaN(maxPrice)) {
    filteredShoes = filteredShoes.filter((shoe) => shoe.price <= maxPrice);
  }
  if (type) {
    filteredShoes = filteredShoes.filter((shoe) => shoe.type === type);
  }
  res.json(filteredShoes);
});

// Listen for requests on post 3000
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
