const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const db = require('./queries');
const port = 3300;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors({
    origin: '*'
}));

app.get("/", (request, response) => {
  response.json({ info: "Postgresql API Data Koleksi" });
});

app.get("/fosil", db.getFosil)
app.get("/fosil/:id", db.getFosilById)
app.post("/fosil", db.postFosil)
app.put("/fosil/:id", db.putFosil)
app.delete("/fosil/:id", db.deleteFosil)

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
