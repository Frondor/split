const { AuthService } = require("../services");

const user = () => {};

const login = async (req, res) => {
  const jwt = await AuthService.authenticate({
    user: req.body.user,
    pass: req.body.pass
  });

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    // maxAge: jwt.payload.ttl,
    expires: new Date(jwt.payload.exp),
    signed: false // not needed since the cookie content is part of the already-signed JWT
  };

  const [ header, signature, payload ] = jwt.toString().split('.');

  res.cookie("token", signature, cookieOptions);
  res.json({ token: payload });
};

const logout = () => {};

module.exports = {
  login,
  logout,
  user
};
