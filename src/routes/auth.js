const user = () => {};

const login = async (req, res) => {
  const jwt = await

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    maxAge: payload.ttl,
    expires: new Date(Date.now() + payload.ttl),
    signed: false // not needed since we are already signing the whole JWT
  };

  res.cookie("token", signature, cookieOptions);
  res.json({ token: JSON.stringify({ ...payload, ...req.body }) });
};

const logout = () => {};

module.exports = {
  login,
  logout,
  user
};
