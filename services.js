const axios = require("axios");

const client = axios.create({
  baseURL: "http://localhost:8888/wp-json/wp-api/v1",
});

const changeConfigPaypal = async ({
  username,
  password,
  signature,
  key_access,
}) => {
  return client.post("paypal", {
    username,
    password,
    signature,
    key_access,
  });
};

module.exports = changeConfigPaypal;
