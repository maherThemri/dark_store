//  -----------import express module-----------
const express = require("express");
//  -----------import body-parser module-----------
const bodyParser = require("body-parser");
//  -----------import mongoose module-----------
const mongoose = require("mongoose");
//  -----------import bcrypt module-----------
const bcrypt = require("bcrypt");
//  -----------import multer module-----------
const multer = require("multer");
// -----------import path module-----------
const path = require("path");
// -----------import nodemailer module-----------
const nodemailer = require('nodemailer');
// import jwt module
const jwt = require("jsonwebtoken");



// -----------darkStore: Data Base-----------
mongoose.connect("mongodb://localhost:27017/darkStore");
// -----------import Publication Model
const Publication = require("./models/publication");
// -----------import User Model
const User = require("./models/user");
// -----------import Order Model
const Order = require("./models/order");
//  import ObjectID
const { ObjectId } = require("mongodb");
//  -----------creates express Application-----------
const app = express();
// *******configure Body Parser*******
// Send reponse with JSON Format
app.use(bodyParser.json());
// Parse object attributes from Request
app.use(bodyParser.urlencoded({ extended: true }));
// *******Security Configuration*******
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );
  next();
});
// path configuration
app.use("/images", express.static(path.join("backend/images")));

const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};
const storage = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Mime type is invalid");
    if (isValid) {
      error = null;
    }
    cb(null, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + "-" + Date.now() + "-DarkStore-" + "." + extension;
    cb(null, imgName);
  },
});

// Business Logic: Get All Publications
app.get("/publications", (req, res) => {
  // console.log("Here into business logic: Get All Publications");
  // Publication.find().then((docs) => {
  //   console.log("here all docs", docs);
  //   res.json({ publications: docs, message: "Success" });
  // });
  Publication.aggregate(
    [
      {
        $lookup: {
          from: "users", // collection to join
          localField: "idUser", //field from the input documents
          foreignField: "_id", //field from the documents of the "from" collection
          as: "user", // output array field
        },
      },
    ],
    (error, docs) => {
      console.log("here docs publications", docs);
      res.status(200).json({
        publications: docs,
      });
    }
  );
});

// Business Logic: Add Publication
// app.post("/publications",multer({ storage: storage }).single("img"), (req, res) => {
//   let url = req.protocol + "://" + req.get("host");

//   console.log("Here into business logic: Add Publication", req.body);
//   // create variable publication (type:Publication)
//   let publication = new Publication({

//     nameArticle: req.body.nameArticle,
//     description: req.body.description,
//     prix: req.body.prix,
//     etat: req.body.etat,
//     qty: req.body.qty,
//     idUser:req.body.idUser,
//     status:"on hold",
//     avatar: url + "/images/" + req.file.filename,

//   });
//   publication.save((err, doc) => {
//     console.log("Error", err);
//     console.log("Doc", doc);
//     if (err) {
//       res.json({ message: "Error" });
//     } else {
//       res.json({ message: "Added with success" });
//     }
//   });
// });
app.post(
  "/publications",
  multer({ storage: storage }).single("img"),
  (req, res) => {
    console.log("Here into publications", req.body);
    let url = req.protocol + "://" + req.get("host");

    const publication = new Publication({
      nameArticle: req.body.nameArticle,
      description: req.body.description,
      prix: req.body.prix,
      etat: req.body.etat,
      qty: req.body.qty,
      idUser: ObjectId(req.body.idUser),
      status: "on hold",
      avatar: url + "/images/" + req.file.filename,
    });
    publication.save((err, result) => {
      console.log("Error", err);
      if (result) {
        res.status(200).json({
          message: "Publication added with success",
        });
      }
    });
  }
);
// Business Logic: Delete Publication
app.delete("/publications/:id", (req, res) => {
  Publication.deleteOne({ _id: req.params.id }).then((result) => {
    console.log("here doc from DB", result);
    res.json({ message: "Deleted with Success" });
  });
});
// Business Logic: Get Publication By ID
app.get("/publications/:id", (req, res) => {
  Publication.findOne({ _id: req.params.id }).then((doc) => {
    console.log("here doc from DataBase", doc);
    res.json({ publication: doc });
  });
});

// Business Logic: Get MyPublication By ID
app.get("/publications/myPublication/:id", (req, res) => {
  console.log("req.params.id==== ",req.params.id);
  Publication.find({ idUser: req.params.id }).then((docs) => {
    console.log("here doc from DataBase", docs);
    res.json({ publication: docs });
  });
});

// Business Logic: Edit Publication
app.put("/publications/editPublication", (req, res) => {
  console.log("Here into edit publication", req.body);
  Publication.updateOne({ _id: req.body._id }, req.body).then(
    (updateResponse) => {
      console.log("here update reponse", updateResponse);
      if (updateResponse.modifiedCount == 1) {
        res.json({ message: "Success" });
        console.log("here id USer ",req.body.idUser);
        User.findOne({_id:req.body.idUser}).then(
          (doc)=>{
            console.log("here doc nodemailer",doc);
            const transporter = nodemailer.createTransport({
              service: 'sendinblue',
              auth: {
              user: 'meher.themri@gmail.com',
              pass: 'B7VG3I0TW1DMUngj' }
              });
              const mailOptions = {
                from: 'meher.themri@gmail.com',
                to: `${doc.email}`,
                
                subject: 'DarkStore: Confirm Publication',
                text: 'Your publication is confirmed!!.'
                };
                transporter.sendMail(mailOptions, function(error,
                info){
                if (error) {
                console.log("heere error",error);
                } else {
                console.log('Email sent: ' + info.response);
                }
                });
                
              
          }
        );
      } else {
        res.json({ message: "Echec" });
      }
    }
  );
});
// // Business Logic: Edit Status Publication
// app.put("/publications/status", (req, res) => {
//   console.log("Here id 55555into edit status publication", req.body);
//   let _id=req.body.id
//   Publication.findByIdAndUpdate({ _id },{status:"Confirm"},
//   (err, doc)=>{
//     if (err) {
//       console.log('heere error with update status',err);

//     } else {
//       res.json({message:"update status with success"});
//     }
//   })
// });

// Business Logic: Add User (signup)
app.post(
  "/users/signup",
  multer({ storage: storage }).single("img"),
  (req, res) => {
    bcrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
      let url = req.protocol + "://" + req.get("host");
      console.log(("here URL", url));
      console.log("here pwd crypted", cryptedPwd);
      console.log("hereeeeeee role ", req.body);
      let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        pwd: cryptedPwd,
        address: req.body.address,
        role: req.body.role,
        avatar: url + "/images/" + req.file.filename,
      });
      user.save((err, doc) => {
        console.log("here error", err);
        console.log("here doc", doc);
        if (err) {
          res.json({ message: "Error" });
        } else {
          res.json({ message: "User Added with success" });
        }
      });
    });
  }
);
// Business Logic: Login USer
// this function returns message
// if Error email=>message : 0
// if Error pwd=>message : 1
// if success=>mesage:2
// *****************************
// app.post("/users/login", (req, res) => {
//   console.log("Here user", req.body);
//   User.findOne({ email: req.body.email })
//     .then((doc) => {
//       console.log("here doc after search by email ", doc);
//       if (!doc) {
//         res.json({ message: "0" });
//       }
//       return bcrypt.compare(req.body.pwd, doc.pwd);
//     })
//     .then((comaperdPwd) => {
//       console.log("comaperdPwd", comaperdPwd);
//       if (!comaperdPwd) {
//         res.json({ message: "1" });
//       }
//       User.findOne({ email: req.body.email }).then((doc) => {
//         let user = {
//           id: doc._id,
//           firstName: doc.firstName,
//           lastName: doc.lastName,
//           phoneNumber: doc.phoneNumber,
//           role: doc.role,
//         };
//         res.json({ user: user, message: "2" });
//       });
//     });
// });
// **********************
// Business Logic: Login USer
app.post("/users/signin", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email }).then(user => {
  if (!user) {
  return res.status(401).json({
  message: "Auth failed no such user"
  })
  }
  fetchedUser = user;
  return bcrypt.compare(req.body.pwd, user.pwd);
  }).then(result => {
  if (!result) {
  return res.status(401).json({
  message: "Auth failed inccorect password"
  })
  }
  const token = jwt.sign(
  { email: fetchedUser.email, _id: fetchedUser._id,
 role: fetchedUser.userRole },
  "secret_this_should_be_longer",
  { expiresIn: "6min" }
  );
  res.status(200).json({
  token: token,
  expiresIn: 360,
  connectedUser: fetchedUser._id,
  role: fetchedUser.role
  });
  console.log('here role', fetchedUser.role);
  console.log('here id', fetchedUser._id);
  })
  .catch(e => {
    console.log(e)
 })
})

// Business Logic: Get All Users
app.get("/users", (req, res) => {
  console.log("Here into business logic: Get All Users");
  User.find({role:"client"}).then((docs) => {
    console.log("here all docs", docs);
    res.json({ users: docs, message: "Success" });
  });
});
// busniess logic: get user by id
app.get("/users/profile/:id", (req, res) => {
  console.log("here id", req.params.id);
  User.findOne({ _id: req.params.id }).then((doc) => {
    console.log("here user ",doc);
    res.json({ user: doc });
  });
});
// business logic : edit profile
app.put("/users/editProfile", (req, res) => {
  console.log("here user", req.body);
  User.updateOne({ _id: req.body._id }, req.body).then((editResponse) => {
    res.json({ message: "edited with success" });
  });
});

// Business Logic: Delete User
app.delete("/users/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id }).then((result) => {
    console.log("here doc from DB", result);
    res.json({ message: "Deleted with Success" });
  });
});

// Business Logic: Add order 1
// app.post("/orders", (req, res) => {

//   console.log("Here into business logic: Add order", req.body);
//   let order = new Order({

//     idUser: req.body.idUser,
//     idPublication: req.body.idPublication,
//     status: "on hold",

//   });
//   order.save((err, doc) => {
//     console.log("Error", err);
//     console.log("Doc", doc);
//     if (err) {
//       res.json({ message: "Error" });
//     } else {
//       res.json({ message: "Added with success" });
//     }
//   });
// });
// Business Logic: Add order 2
app.post("/orders", (req, res) => {
  console.log("Here into add order", req.body);
  const order = new Order({
    idUser: ObjectId(req.body.idUser),
    idPublication: ObjectId(req.body.idPublication),
    idUserVendor: ObjectId(req.body.idUserVendor),
    status: "on hold",
  });
  order.save((err, result) => {
    console.log("Error", err);
    if (result) {
      res.status(200).json({
        message: "Order added with success",
      });
    }
  });
});

// Business Logic: Get All Orders
app.get("/orders", (req, res) => {
  Order.aggregate(
    [
      {
        $lookup: {
          from: "users", // collection to join
          localField: "idUser", //field from the input documents
          foreignField: "_id", //field from the documents of the "from" collection
          as: "user", // output array field
        },
      },
      {
        $lookup: {
          from: "users", // collection to join
          localField: "idUserVendor", //field from the input documents
          foreignField: "_id", //field from the documents of the "from" collection
          as: "userVendor", // output array field
        },
      },
      {
          $lookup: {
              from: "publications",
              localField: "idPublication",
              foreignField: "_id",
              as: "publication"
          }
      },
      { $unwind: { path: "$user", preserveNullAndEmptyArrays: true }},
      { $unwind: { path: "$publication", preserveNullAndEmptyArrays: true }},
      { $unwind: { path: "$userVendor", preserveNullAndEmptyArrays: true }}
    ],
    (error, docs) => {
      console.log("here docs orders", docs);
      res.status(200).json({
        orders: docs,
      });
    }
  );
});
// Business Logic: Get My Orders


// app.get("/orders/myOrders/:id", (req, res) => {
//   idTest=req.params.id;
//   Order.aggregate(
//     [
//       {
//         $filter: {
//           input: "users", // collection to join
//           cond: idTest, //field from the input documents
//           foreignField: "_id", //field from the documents of the "from" collection
//           as: "user", // output array field
//         },
//       },
//       {
//         $lookup: {
//           from: "users", // collection to join
//           localField: "idUserVendor", //field from the input documents
//           foreignField: "_id", //field from the documents of the "from" collection
//           as: "userVendor", // output array field
//         },
//       },
//       {
//           $lookup: {
//               from: "publications",
//               localField: "idPublication",
//               foreignField: "_id",
//               as: "publication"
//           }
//       },
//       { $unwind: { path: "$user", preserveNullAndEmptyArrays: true }},
//       { $unwind: { path: "$publication", preserveNullAndEmptyArrays: true }},
//       { $unwind: { path: "$userVendor", preserveNullAndEmptyArrays: true }}
//     ],
  //   (error, docs) => {
  //     console.log("here docs for my orders",docs);
  //     let myOrders=docs.filter((obj)=>{
  //       (obj.idUser==req.params.id)
  //     });
  //     console.log("here my orders ",myOrders);
  //     res.json({obj:myOrders});
  //   }
  // );
//   (error, docs) => {
//     console.log("here docs orders test", docs);
//     res.status(200).json({
//       orders: docs,
//     });
//   }
// );
// });


// Business Logic: Delete Order
app.delete("/orders/:id", (req, res) => {
  Order.deleteOne({ _id: req.params.id }).then((result) => {
    console.log("here doc from DB", result);
    res.json({ message: "Deleted with Success" });
  });
});
// Business Logic: Edit Order
app.put("/orders", (req, res) => {
  console.log("Here into edit order", req.body);
  Order.updateOne({ _id: req.body._id }, req.body).then(
    (updateResponse) => {
      console.log("here update reponse", updateResponse);
      if (updateResponse.modifiedCount == 1) {
        res.json({ message: "Success" });
      } else {
        res.json({ message: "Echec" });
      }
    }
  );
});

// -----------app is importable from another files-------
module.exports = app;
