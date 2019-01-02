const app = require("./app");
var fs = require("fs");
var https = require("https");

const PORT = 3000;

// app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
module.exports = https
  .createServer(
    {
      key: fs.readFileSync("./cert/server.key"),
      cert: fs.readFileSync("./cert/server.cert")
    },
    app
  )
  .listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
