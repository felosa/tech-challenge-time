const express = require("express");
const {
  query,
  validationResult,
  matchedData,
  param,
  body,
} = require("express-validator");
const knex = require("../db/knex"); //the connection
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

// CREAR USER
router.post("/", [body("email"), body("password")], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const data = matchedData(req, { includeOptionals: true });

  bcrypt.genSalt(10).then((salt, err) => {
    if (err) {
      this.logger.logError(err, "registerUser");

      reject(err);
    }

    bcrypt.hash(data.password, salt).then((hash, err) => {
      if (err) {
        this.logger.logError(err, "registerUser");

        reject(err);
      }
      console.log(data.email, hash);
      knex("users")
        .insert({
          email: data.email,
          password: hash,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .then(([newID]) => {
          const loadedUser = {
            userID: newID,
            email: data.email,
            password: hash,
          };
          const token = jwt.sign(
            {
              email: data.email,
              userId: newID,
            },
            "secretWordForPento",
            { expiresIn: "3h" }
          );
          return res.json({ token: token, user: loadedUser });
        })
        .catch((err) => {
          return res.status(500).send(err);
        });
    });
  });
});

// LOGUEAR USUARIO
router.post("/login", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  knex("users")
    .select("users.id as userID", "users.email", "users.password")
    .where("users.email", email)
    .first()
    .then(async (user) => {
      console.log(user, "user");
      if (!user) {
        const error = new Error("A user with this email could not be found.");
        error.statusCode = 401;
        throw error;
      }

      loadedUser = user;
      const hash = user.password;
      //   hash = hash.replace(/^\$2y(.+)$/i, "$2a$1");
      return bcrypt.compare(password, hash);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password!");
        error.statusCode = 401;
        throw error;
      }

      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser.userID,
        },
        "secretWordForPento",
        { expiresIn: "3h" }
      );
      console.log(token, "token");
      res.status(200).json({ token: token, user: loadedUser });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
});

// CHECK IF IS ALREADY LOGED IN
router.get("/isLogged/:token", (req, res, next) => {
  // check header or url parameters or post parameters for token
  const token = req.params.token || req.query.token;

  console.log(token, "viene el token");
  if (!token) {
    return res.status(401).json({ message: "Must pass token" });
  }
  // Check token that was passed by decoding token using secret
  jwt.verify(token, "secretWordForPento", function (err, user) {
    console.log(err, "error");
    if (err) {
      res.json({
        user: "",
      });
    }

    //return user using the id from w/in JWTToken
    knex("users")
      .select("users.id as userID", "users.email", "users.password")
      .where("users.id", user.userId)
      .first()
      .then(async (user) => {
        console.log(user, "este es el user");
        const { userID, email } = user;
        // user = utils.getCleanUser(user);
        //Note: you can renew token by creating new token(i.e.
        //refresh it)w/ new expiration time at this point, but I’m
        //passing the old token back.
        // var token = utils.generateToken(user);
        res.json({
          user: { userID, email },
          token: token,
        });
      })
      .catch((err) => {
        res.json({ err: "NO USER LOGGED" });
      });
  });
});

module.exports = router;
