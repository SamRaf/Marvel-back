require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const axios = require("axios");
const md5 = require("md5");

const ts = 1;
const privateKey = process.env.MARVEL_SKEY;
const publicKey = process.env.MARVEL_PKEY;
const hash = md5(ts + privateKey + publicKey);

app.get("/characters", async (req, res) => {
  try {
    const page = req.query.page;
    const limit = 100;
    const offset = limit * (page - 1);
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&orderBy=name&limit=${limit}&offset=${offset}`
    );
    res.json(response.data);
  } catch (error) {
    res.json(error.message);
  }
});

app.get("/characters/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters/${req.params.id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );
    res.json(response.data);
  } catch (error) {
    res.json(error.message);
  }
});

app.get("/comics", async (req, res) => {
  try {
    const page = req.query.page;
    const limit = 100;
    const offset = limit * (page - 1);
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}&orderBy=title&limit=${limit}&offset=${offset}`
    );
    res.json(response.data);
  } catch (error) {
    res.json(error.message);
  }
});

// app.get("/user/sign_in", async (req, res) => {
//   try {
//     res.json("SignIn");
//   } catch (error) {
//     res.json(error.message);
//   }
// });

// app.get("/user/sign_up", async (req, res) => {
//   try {
//     res.json("SignUp");
//   } catch (error) {
//     res.json(error.message);
//   }
// });

app.get("/user/favorites", (req, res) => {
  res.json({ message: "Favorites" });
});

app.get("/", (req, res) => {
  res.json({ message: "Hello Marvel" });
});

app.all("*", (req, res) => {
  res.json({ message: "Route not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
