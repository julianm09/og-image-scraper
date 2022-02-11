const coursera = require("./courseraFiltered.json");

const courses = coursera

console.log(courses.length)

schools = Array.from(new Set(courses.map(({ Skills }) => Skills)));

console.log(schools);