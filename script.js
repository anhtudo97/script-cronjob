const {
  changeConfigPaypal,
  loginPaypal,
  getTransactions,
  getCurrentAccount,
} = require("./services");

const account = require("./paypal.js");
const get = require("lodash.get");

// get currnet month
const current_month = new Date().getMonth() + 1;
const end_date = new Date(
  new Date().getFullYear(),
  new Date().getMonth() + 1,
  0
).getDate();

const getCurrentUser = async () => {
  try {
    const res = await getCurrentAccount(
      "divaodichuconchoderangcuanaybolaonoquendiroidoconmemalo123456!"
    );
    return res;
  } catch (error) {
    return error;
  }
};

const setConfigPaypal = async ({ username, password, signature }) => {
  try {
    const res = await changeConfigPaypal({
      username,
      password,
      signature,
      key_access:
        "divaodichuconchoderangcuanaybolaonoquendiroidoconmemalo123456!",
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
    return res;
  } catch (e) {
    return e;
  }
};

const getAllTransactions = async (access_token, start_date, end_date) => {
  try {
    const res = await getTransactions({ access_token, start_date, end_date });
    return res;
  } catch (e) {
    return e;
  }
};

const getKey = (api_username, api_password, api_signature) => {
  return account.find(
    (e) =>
      e.username === api_username &&
      e.password === api_password &&
      e.signature === api_signature
  );
};

const getCurrentIndexAccount = (client_id) => {
  return account.map((e) => e.client_id).indexOf(client_id);
};

const getAccessToken = async () => {
  const { data } = await getCurrentUser();
  const { api_username, api_password, api_signature } = data;
  const { client_id, secret_key } = getKey(
    api_username,
    api_password,
    api_signature
  );
  const auth = await authPaypal(client_id, secret_key);
  const access_token = get(auth, "data.access_token", "");
  return {
    access_token,
    client_id,
  };
};

const run = async () => {
  const { access_token, client_id } = await getAccessToken();
  const transactions = await getAllTransactions(
    access_token,
    `2020-${current_month}-01T00:00:00-0700`,
    `2020-${current_month}-${end_date}T23:59:59-0700`
  );
  const listTransaction = get(transactions, "data.transaction_details", []);
  const balance = get(
    listTransaction[listTransaction.length - 1],
    "transaction_info.available_balance.value",
    0
  );

  if (balance > 10) {
    const currentIndex = getCurrentIndexAccount(client_id);
    let index = 0;
    if (currentIndex !== account.length - 1) {
      index = currentIndex + 1;
    }
    const { username, password, signature } = account[index];
    setConfigPaypal({ username, password, signature });
  } else {
    console.log("Below 5000");
  }
};

run();

module.exports = {
  setConfigPaypal,
  getAllTransactions,
  getAccessToken,
  getCurrentUser,
  authPaypal,
};
