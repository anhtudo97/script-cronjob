const { changeInterval, setConfigPaypal } = require("./script");

const account = {
  username: "tuanh",
  password: "4456",
  signature: "2234",
};

describe("config paypal", () => {
  it("change config", async () => {
    const { username, password, signature } = account;
    const res = await setConfigPaypal({ username, password, signature });
    expect(res.data.data.api_username).toEqual(username);
    expect(res.data.data.api_password).toEqual(password);
    expect(res.data.data.api_signature).toEqual(signature);
  });
});
