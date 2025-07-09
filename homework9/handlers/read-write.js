import { readFile, writeFile } from "fs";

export const read = (fileName) => {
  return new Promise((resolve, reject) => {
    readFile(fileName, "utf-8", (err, data) => {
      if (err) reject(err);
      try {
        data = JSON.parse(data);
        resolve(data);
      }
      catch (e) {
        reject(e);
      }

    });
  });
};

export const write = (fileName, data) => {
  return new Promise((resolve, reject) => {
    data = JSON.stringify(data);
    writeFile(fileName, data, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};