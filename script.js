const {
  changeConfigPaypal,
  loginPaypal,
  getTransactions,
} = require("./services");
const account = require("./paypal.js");
const get = require("lodash.get");

const setConfigPaypal = async ({ username, password, signature }) => {
  try {
    const res = await changeConfigPaypal({
      username,
      password,
      signature,
      key_access:
        "divaodichuconchoderangcuanaybolaonoquendiroidoconmemalo123456!@#$%^&",
    });

    return {
      status: "SUCCESS",
      data: res,
    };
  } catch (e) {
    return {
      status: "ERROR",
      data: e,
    };
  }
};

const authPaypal = async (username, password) => {
  try {
    const res = await loginPaypal({ username, password });
    return {
      status: "SUCCESS",
      data: res,
    };
  } catch (e) {
    return {
      status: "ERROR",
      data: e,
    };
  }
};

const getAllTransactions = async (access_token, start_date, end_date) => {
  try {
    const res = await getTransactions({ access_token, start_date, end_date });
    return {
      status: "SUCCESS",
      data: res,
    };
  } catch (e) {
    return {
      status: "ERROR",
      data: e,
    };
  }
};

const run = async () => {
  const { client_id, secret_key } = account[0];
  const auth = await authPaypal(client_id, secret_key);
  const access_token = get(auth, "data.data.access_token", "");
  const current_month = new Date().getMonth() + 1;
  const end_date = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  ).getDate();
  const transactions = await getAllTransactions(
    access_token,
    `2020-${current_month}-01T00:00:00-0700`,
    `2020-${current_month}-${end_date}T23:59:59-0700`
  );
  const listTransaction = get(
    transactions,
    "data.data.transaction_details",
    []
  );
  const balance = get(
    listTransaction[listTransaction.length - 1],
    "transaction_info.available_balance.value",
    0
  );
  console.log(balance);
};

run();

module.exports = {
  setConfigPaypal,
};
