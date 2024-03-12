// var express = require('express');
// var router = express.Router();
// var usersData = require("../data/sampleData.js");

// /* GET users listing. */
// router.get('/', function (req, res, next) {
//   console.log("My Test basically");
//   res.send({ name: 'mihir-is-here' });
// });


// /* GET users listing. */
// router.get('/getUsers', function (req, res, next) {
//   console.log("In get Users", req.query);
//   var name = req.query.name;

//   var users = usersData.users;
//   var resObj = {};

//   for (var i = 0; i < users.length; i++) {
//     if (users[i].name == name) {
//       resObj = users[i];
//       break;
//     }
//   }
//   res.send({ data: resObj, message: "Success", status: 200 });
// });

// router.get('/getAllUsers', function (req, res, next) {
//   res.send({ data: usersData.users, message: "Success", status: 200 });
// });

// router.post('/addUser', function (req, res, next) {
//   console.log("In add user - ", req.body);
//   usersData.users.push(req.body);
//   res.send({ message: "User added Successfully" });
// });

// // Let's Write Put Call 
// router.put('/updateUser', function (req, res, next) {
//   console.log("In update user - ", req.body);
//   var name = req.body.name;
//   var age = req.body.age;
  
//   var index = -1;
//   for(var i=0; i<usersData.users.length; i++){
//     if(usersData.users[i].name == name){
//       index = i;
//       break;
//     }
//   }
//   if(index != -1){
//     usersData.users[index].age = age;
//     return res.send({ message: "User updated Successfully" });
//   } else {
//     return res.send({ message: "User not found" });
//   }
// });


// //Let's Write Delete Call
// router.delete('/deleteUser/:name', function (req, res, next) {
//   console.log("In delete user - ", req.params);
//   var name = req.params.name;

//   var index = -1;
//   for(var i=0; i<usersData.users.length; i++){
//     if(usersData.users[i].name == name){
//       index = i;
//       break;
//     }
//   }
//   if(index != -1){
//     usersData.users.splice(index, 1);
//     return res.send({ message: "User deleted Successfully" });
//   } else {
//     return res.send({ message: "User not found" });
//   }
// });



// module.exports = router;


// <------> For Mongo DB <------>

var express = require('express');
var router = express.Router();
var usersData = require("../data/sampleData.js");
var mongoClient = require("mongodb").MongoClient;

var url = "mongodb://localhost:27017/";

router.get('/getAllUsers', function (req, res, next) {
  mongoClient.connect(url, function(err, client){
    if(err) {
      return res.send({message: "Error in connecting to DB"});
    } else {
      dbObj = client.db("users");
      dbObj.collection("Collection Documents").find({}).toArray(function(error, data){
        if(error){
          client.close();
          return res.send({message: "Error in fetching data"});
        } else {
          client.close();
          return res.send({data: data, message: "Success", status: 200});
        }

      })
  }});
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log("My Test basically");
  res.send({ name: 'mihir-is-here' });
});


/* GET users listing. */
router.get('/getUsers', function (req, res, next) {
  console.log("In get Users", req.query);
  var name = req.query.name;

  var users = usersData.users;
  var resObj = {};

  for (var i = 0; i < users.length; i++) {
    if (users[i].name == name) {
      resObj = users[i];
      break;
    }
  }
  res.send({ data: resObj, message: "Success", status: 200 });
});



router.post('/addUser', function (req, res, next) {
  console.log("In add user - ", req.body);
  usersData.users.push(req.body);
  res.send({ message: "User added Successfully" });
});

// Let's Write Put Call 
router.put('/updateUser', function (req, res, next) {
  console.log("In update user - ", req.body);
  var name = req.body.name;
  var age = req.body.age;
  
  var index = -1;
  for(var i=0; i<usersData.users.length; i++){
    if(usersData.users[i].name == name){
      index = i;
      break;
    }
  }
  if(index != -1){
    usersData.users[index].age = age;
    return res.send({ message: "User updated Successfully" });
  } else {
    return res.send({ message: "User not found" });
  }
});


//Let's Write Delete Call
router.delete('/deleteUser/:name', function (req, res, next) {
  console.log("In delete user - ", req.params);
  var name = req.params.name;

  var index = -1;
  for(var i=0; i<usersData.users.length; i++){
    if(usersData.users[i].name == name){
      index = i;
      break;
    }
  }
  if(index != -1){
    usersData.users.splice(index, 1);
    return res.send({ message: "User deleted Successfully" });
  } else {
    return res.send({ message: "User not found" });
  }
});



module.exports = router;
