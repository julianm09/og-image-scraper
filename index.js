const ogs = require("open-graph-scraper");
const coursera = require("./data/coursera.json");

const courses = coursera;

var fs = require("fs");

const getOgImages = (arr) => {
  const newArr = [];

  var length = 3522;
  console.log("running");

  return new Promise((resolve) => {
    arr.forEach((element) => {
      const options = {
        url: element["Course URL"],
        timeout: 1000000,
        retry: 5,
        downloadLimit: 10000000,
      };
      ogs(options, (error, results, response) => {
        if (results.ogImage) {
          const url = results.ogImage.url;
          element["Image"] = url;
          newArr.push(element);
        }

        if (error) {
          console.log(error);
          console.log(length);
          length = length - 1;
        }

        console.log(results);

        if (newArr.length >= length) {
          resolve(newArr);
        }
      });
    });
  });
};

getOgImages(courses).then((r) => {
  try {
    fs.writeFile("courseraImages.json", JSON.stringify(r), function (err) {
      if (err) {
        console.log(err);
      }
    });
    console.log(r.splice(0, 5));
  } catch (error) {
    console.log("Error", error);
  }
});
