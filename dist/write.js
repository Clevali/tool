"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeJson = writeJson;
var fs = require("fs");
function writeJson(data, fileName) {
    var json = JSON.stringify(data);
    fs.writeFile(fileName || "data.json", json, "utf8", function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("JSON data has been saved to data.json");
        }
    });
}
