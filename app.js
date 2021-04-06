const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Item = require("./models/items");
const mongodb =
  "mongodb+srv://zaki:zaki123@cluster0.ne4ws.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
app.set("view engine", "ejs");
mongoose
  .connect(mongodb, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));

app.listen(3000);

app.get("/", (req, res) => {
  res.redirect("/get-items");
});

app.get("/add-item", (req, res) => {
  res.render("add-item");
});

app.get("/get-items", (req, res) => {
  Item.find()
    .then((result) => {
      res.render("index", { items: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/items", (req, res) => {
  const item = Item(req.body);
  item
    .save()
    .then(() => {
      res.redirect("/get-items");
    })
    .catch((err) => console.log(err));
});

app.get("/items/:id", (req, res) => {
  const id = req.params.id;
  Item.findById(id).then((result) => {
    res.render("item-details", { items: result });
  });
});

app.delete("/items/:id", (req, res) => {
  const id = req.params.id;
  Item.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use((req, res) => {
  res.render("error");
});
