require("dotenv").config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");
const formidableMiddleware = require("express-formidable");
const uid2 = require("uid2");
const app = express();
const md5 = require("md5");

app.use(cors());
app.use(formidableMiddleware());

const publicKey = process.env.MARVEL_PKEY;
const privateKey = process.env.MARVEL_SKEY;
const ts = uid2(8);
const hash = md5(ts + privateKey + publicKey);

app.get("/characters", async (req, res) => {
  try {
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=100&offset=0`
    );
    console.log(response.data);

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/characters/comics/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters/${id}/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );
    console.log(response.data.data.results);
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=100&offset=0`
    );
    console.log(response.data.data.results);
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
  }
});

app.all("*", function(req, res) {
  res.json({ message: "all routes" });
});
app.listen(process.env.PORT || 3001, () => {
  console.log("server has started");
});
