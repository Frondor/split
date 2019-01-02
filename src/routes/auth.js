const { Auth } = require("../services");

const user = async (req, res) => {
  res.json(req.jwtPayload);
};

const login = async (req, res) => {
  const jwt = await Auth.authenticate({
    user: req.body.user,
    pass: req.body.pass
  });

  const [header, payload, signature] = jwt.toString().split(".");

  res.cookie("token", signature, Auth.getCookieOptions());
  res.json({ token: payload });
};

const logout = () => {};

module.exports = {
  login,
  logout,
  user
};
