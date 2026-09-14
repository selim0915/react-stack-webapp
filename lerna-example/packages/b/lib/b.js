"use strict";

module.exports = b;

const axios = require("axios");

async function b() {
  const response = await axios.get("https://api.github.com/users");

  return response.data;
}