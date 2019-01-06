const { Auth } = require('../services');

const user = async (req, res) => {
  req.jwtPayload.iat = new Date(req.jwtPayload.iat * 1000);
  req.jwtPayload.exp = new Date(req.jwtPayload.exp * 1000);

  res.json(req.jwtPayload);
};

const login = async (req, res) => {
  const jwt = await Auth.authenticate({
    user: req.body.user,
    pass: req.body.pass,
  });

  const token = jwt.toString().split('.');
  const payload = token[1];
  const signature = token[2];

  res.cookie(
    Auth.config.cookie.name,
    signature,
    Auth.getCookieOptions({
      expires: new Date(jwt.payload.exp * 1000),
    })
  );
  res.json({ token: payload });
};

const logout = async (req, res) => {
  const { jid, exp } = req.jwtPayload;
  await Auth.revokeToken(jid, exp);

  res.status(204).send();
};

module.exports = {
  login,
  logout,
  user,
};
