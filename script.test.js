const { getAllTransactions, getCurrentUser, authPaypal } = require("./script");
const get = require("lodash.get");

// mock client_id , secret_key
const client_id =
  "AUXFhrI_h6SWaMLGIOo4HDfm_OgEIpYNRl6HVP7OH6cEOXjXcaalPNv9RsBk6Ocm8UFp3rNCuJmcFSp-";
const secret_key =
  "EFopgPwptcS2BLHlRVau3gSwien3i2ducXmJBUHqw73XEH-3U-uDELhJf5OX824Ak7dSMn5x4zXpXgca";

// get currnet month
const current_month = new Date().getMonth() + 1;
const end_date = new Date(
  new Date().getFullYear(),
  new Date().getMonth() + 1,
  0
).getDate();

describe("config paypal", () => {
  it("get current account data respon is object", async () => {
    const res = await getCurrentUser();
    expect(res.data.hasOwnProperty("api_username")).toBe(true);
    expect(res.data.hasOwnProperty("api_password")).toBe(true);
    expect(res.data.hasOwnProperty("api_signature")).toBe(true);
  });
  it("get current account data fetch with an error", async () => {
    try {
      await getCurrentUser();
    } catch (error) {
      expect(error).toMatch("error");
    }
  });
});

describe("paypal account", () => {
  it("get access token success", async () => {
    const auth = await authPaypal(client_id, secret_key);
    expect(auth.data.hasOwnProperty("access_token")).toBe(true);
  });
  it("get access token failure", async () => {
    try {
      await authPaypal(client_id, secret_key);
    } catch (error) {
      expect(error).toMatch("error");
    }
  });
  it("get all transactions successful", async () => {
    const res = await authPaypal(client_id, secret_key);
    const access_token = get(res, "data.access_token", "");
    const transactions = await getAllTransactions(
      access_token,
      `2020-${current_month}-01T00:00:00-0700`,
      `2020-${current_month}-${end_date}T23:59:59-0700`
    );
    expect(transactions.data.hasOwnProperty("transaction_details")).toBe(true);
  });
  it("get all transactions failure", async () => {
    const res = await authPaypal(client_id, secret_key);
    const access_token = get(res, "data.access_token", "");
    await getAllTransactions(
      access_token,
      `2020-${current_month}-01T00:00:00-0700`,
      `2020-${current_month}-${end_date}T23:59:59-0700`
    );
    try {
    } catch (error) {
      expect(error).toMatch("error");
    }
  });
});
