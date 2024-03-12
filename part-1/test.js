// const fs = require('fs');

// fs.readFile("server.js", function(){
//   console.log("2");

// setTimeout(function(){
//     console.log("3");
// });

// setImmediate(function(){
//     console.log("1");
// });

// console.log("4");

// });


console.log("1");

setTimeout(function(){
    console.log("2");
});

setImmediate(function(){
    console.log("3");
});

console.log("4");

process.nextTick(function(){
    console.log("5");
});
