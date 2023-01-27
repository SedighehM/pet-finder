const express = require("express");
const axios = require("axios");
const utils = require("./utils");

const router = express.Router();
const BASE_URL = "https://api.petfinder.com/v2";

//make api keys secure
router.get("/token", async (req, res, next) => {
  try {
    //make a request to fetch token from pet finder
    const { data } = await axios.post(BASE_URL + "/oauth2/token", {
      grant_type: "client_credentials",
      client_id: process.env.API_KEY,
      client_secret: process.env.SECRET,
    });
    //send returend data as response to client
    res.json(data);
  } catch (error) {
    next(error);
  }
});

//get statics
router.get("/statics", async (req, res, next) => {
  const token = req.query.token;
  const attribute = req.query.attribute;

  try {
    //make a request to pet finder with token to get animals(Just first page for now)
    const { data } = await axios.get(BASE_URL + "/animals", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    //build desire statics considering passed attribute and returned data
    let statics = utils.getStatics(attribute, data.animals);
    //send computed statics to client as a response
    res.json(statics);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
