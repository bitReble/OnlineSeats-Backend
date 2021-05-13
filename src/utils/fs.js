const fs = require("fs");

exports.writeThis = (data) => {
  fs.writeFile(`output.json`, JSON.stringify(data), "utf8", (err) => {
    if (err) {
    }
  });
};
