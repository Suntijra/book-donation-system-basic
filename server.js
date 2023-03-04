const express = require("express");
const app = express();
const mysql = require("mysql");
const _ = require("lodash");
const bodyParser = require("body-parser");
// const pgp = require("pg-promise")(/*options*/);
//const cn = "postgres://postgres:GM9uukvgCz9zueMR@localhost:5432/abitrage";
// const db = pgp(cn);


// var mysql = require('mysql');

const server = app.listen(3000, () => { 
    console.log('node run')
});

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "book_donation_system"
})

db.connect(function(err){
    if(err) throw err;
    console.log("Connected");
});

app.post("/api/setinsertperson", (req, res) => {
    var PName = _.get(req, ["body", "name"]);
    var PLName = _.get(req, ["body", "lname"]);
    var P_address_line = _.get(req, ["body", "address"]);
    var P_address_line2 = _.get(req, ["body", "address2"]);
    var PTYPE = _.get(req, ["body", "dn1"]);
    var PTYPE2 = _.get(req, ["body", "dn2"]);


    if (coinname <= 0) {
        return res.status(200).json({
          ms: "bad",
          MESSAGE: "Add coin fail",
          CODE: "400",
        });
      }
    if (coinname != null){
    db.any(
      `insert into donator (pname, plname, p_address_line_1, p_address_line_2, pphone, pemail, plineid, ptype, username, password)
      values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
    []
    )
  
      .then((data) => {
        return res.status(200).json({
          ms: "good",
          MESSAGE: "success",
          CODE: "200",
        });
      })
      .catch((error) => {
        console.log("error => ", error);
        return res.status(200).json({
          ms: "bad",
          MESSAGE: "system error",
          CODE: "500",
        });
      });
  } else {
    return res.status(200).json({
      ms: "bad",
      MESSAGE: "Email incorrect",
      CODE: "400",
    });
  }
});


module.exports = app;