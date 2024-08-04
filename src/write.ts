import * as fs from "fs";
export function writeJson(data) {
  const json = JSON.stringify(data);
  fs.writeFile("data.json", json, "utf8", (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("JSON data has been saved to data.json");
    }
  });
}
