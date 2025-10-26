const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const DB = require("./database/index");
const bcrypt = require("bcrypt");

const JWTSecret = "wazsxredctfvygbuhnjmi";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function auth(req, res, next) {
  const authToken = req.headers["authorization"];
  if (authToken != undefined) {
    const bearer = authToken.split(" ");
    var token = bearer[1];
    jwt.verify(token, JWTSecret, (err, data) => {
      if (err) {
        res.status(401);
        res.json({ err: "Token invalido" });
      } else {
        req.token = token;
        req.loggedUser = { id: data.id, email: data.email };
        next();
      }
    });
  } else {
    res.status(401);
    res.json({ err: "Token invalido" });
  }
}

app.post("/signin", (req, res) => {
  let { email, password } = req.body;

  if (email) {
    DB.where({ email: email })
      .table("user")
      .then((data) => {
        if (data) {
          let correctPassword = bcrypt.compareSync(password, data[0].password);
          if (correctPassword) {
            jwt.sign(
              { id: data[0].id, email: data[0].email },
              JWTSecret,
              {
                expiresIn: "48h",
              },
              (err, token) => {
                if (err) {
                  res.sendStatus(400);
                  res.json({ ERROR: err });
                } else {
                  res.status(200).json({ token: token, user: data[0].id });
                }
              }
            );
          }
        } else {
          res.sendStatus(401).json({ err: "CREDENCIAIS INVALIDAS" });
        }
      });
  }
});

app.post("/signup", async (req, res) => {
  let { email, password, username } = req.body;

  if ((email && password && username !== undefined) || null) {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const data = {
      email,
      password: hashPassword,
      username,
    };
    await DB.insert(data)
      .table("user")
      .then((data) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        res.json("ERROR: " + err);
      });
  }
});

app.listen(3000, () => {
  console.log("Running API in https://localhost:3000");
});
