const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json()); //to read JSON body

//Fake database (array)
let items = [];

//Create

app.post("items", (req, res) => {
    const item = { id:DataTransfer.now(), ...req.body };
    items.push(item);
    res.status(201).json(item);
});

app.get("/items", (req, res) => {
  res.json(items);
});

// READ one
app.get("/items/:id", (req, res) => {
  const item = items.find(i => i.id == req.params.id);
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json(item);
});

// UPDATE
app.put("/items/:id", (req, res) => {
  const index = items.findIndex(i => i.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: "Item not found" });

  items[index] = { ...items[index], ...req.body };
  res.json(items[index]);
});

// DELETE
app.delete("/items/:id", (req, res) => {
  const index = items.findIndex(i => i.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: "Item not found" });

  const deleted = items.splice(index, 1);
  res.json(deleted[0]);
});

// Run server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));