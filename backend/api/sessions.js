const express = require("express");
const {
  query,
  validationResult,
  matchedData,
  param,
  body,
} = require("express-validator");
const knex = require("../db/knex"); //the connection

const router = express.Router();

// USER SESSIONS
router.get("/", [query("userID").optional()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  var { userID = null } = req.query;

  return knex
    .table("sessions")
    .where("sessions.userId", userID)
    .orderBy("sessions.createdAt", "desc")
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      return res.json(err);
    });
});

// START SESSION
router.post(
  "/",
  [body("description"), body("startTime").toDate(), body("userID")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const data = matchedData(req, { includeOptionals: true });

    knex("sessions")
      .insert({
        description: data.description,
        startTime: data.startTime,
        userId: data.userID,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .then(([newID]) => {
        return res.json({ newID });
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  }
);

// END SESSION
router.post(
  "/:sessionID",
  [param("sessionID"), body("endTime").toDate()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const data = matchedData(req, { includeOptionals: true });

    knex("sessions")
      .update({
        endTime: data.endTime,
        updatedAt: new Date(),
      })
      .where("id", data.sessionID)
      .then((result) => {
        if (result > 0) {
          return res.send(`SESSION COMPLETED`);
        }
        return res.status(404).send("Not found");
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  }
);

// DELETE
router.delete("/:ID", [param("ID").isInt().toInt()], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { ID } = matchedData(req, { includeOptionals: true });

  knex("sessions")
    .where({
      id: ID,
    })
    .del()
    .then((value) => {
      if (value > 0) {
        return res.send("SESSION DELETED");
      }
      return res.status(404).send("SESSION NOT FOUND");
    })
    .catch((error) => {
      return res.status(500).send(error);
    });
});

module.exports = router;