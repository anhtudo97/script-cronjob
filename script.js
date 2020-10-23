const changeConfigPaypal = require("./services");
const account = require("./paypal.js");

const setConfigPaypal = async ({ username, password, signature }) => {
  try {
    const res = await changeConfigPaypal({
      username,
      password,
      signature,
      key_access:
        "divaodichuconchoderangcuanaybolaonoquendiroidoconmemalo123456!@#$%^&",
    });
    console.log(res.data.api_username);
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

const changeInterval = () => {
  account.forEach((acc) => {
    setTimeout(() => {
      const { username, password, signature } = acc;
      setConfigPaypal({ username, password, signature });
    }, 3000);
  });
};

changeInterval();

module.exports = {
  setConfigPaypal,
  // changeInterval,
};
