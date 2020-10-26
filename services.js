const axios = require("axios");
const qs = require("qs");

const woo = axios.create({
  baseURL: "http://localhost:8888/wp-json/wp-api/v1",
});

const paypal = axios.create({
  baseURL: "https://api.paypal.com",
});

const changeConfigPaypal = async ({
  username,
  password,
  signature,
  key_access,
}) => {
  return woo.post("paypal", {
    username,
    password,
    signature,
    key_access,
  });
};

const loginPaypal = ({ username, password }) => {
  const data = qs.stringify({
    grant_type: "client_credentials",
  });
  return axios.post("https://api.paypal.com/v1/oauth2/token", data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    auth: {
      username: username,
      password: password,
    },
  });
};

const getTransactions = ({ access_token, start_date, end_date }) => {
  return axios.get(
    `https://api.paypal.com/v1/reporting/transactions?start_date=${start_date}&end_date=${end_date}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
};

module.exports = { changeConfigPaypal, loginPaypal, getTransactions };
