const express = require("express");
const {
  query,
  validationResult,
  matchedData,
  param,
  body,
} = require("express-validator");
const knex = require("../db/knex"); //the connection
const moment = require("moment");
const router = express.Router();

// USER SESSIONS FINISHED
router.get(
  "/",
  [query("userID").optional(), query("criteria").optional()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { userID = null, criteria = "day" } = req.query;

    return knex
      .table("sessions")
      .select(
        "sessions.id as sessionID",
        "sessions.startTime",
        "sessions.endTime",
        "sessions.description",
        "sessions.userId"
      )
      .where("sessions.userId", userID)
      .whereNotNull("sessions.endTime")
      .orderBy("sessions.createdAt", "desc")
      .then((result) => {
        const filteredResult = result.filter((session) => {
          if (criteria === "day") {
            return (
              moment(session.startTime).format("YYYY-MM-DD") ==
              moment().format("YYYY-MM-DD")
            );
          }
          if (criteria === "week") {
            return moment().diff(moment(session.startTime), "days") <= 7;
          }
          if (criteria === "month") {
            return moment().diff(moment(session.startTime), "days") <= 30;
          }
        });
        return res.json(filteredResult);
      })
      .catch((err) => {
        return res.json(err);
      });
  }
);

// USER SESSIONS
router.get(
  "/active-sessions",
  [query("userID").optional()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let { userID = null } = req.query;
    console.log(userID, "user");
    return knex
      .table("sessions")
      .select(
        "sessions.id as sessionID",
        "sessions.startTime",
        "sessions.endTime",
        "sessions.description"
      )
      .where("sessions.userId", userID)
      .whereNull("sessions.endTime")
      .orderBy("sessions.createdAt", "desc")
      .then((result) => {
        return res.json(result);
      })
      .catch((err) => {
        return res.json(err);
      });
  }
);

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
    console.log(data, "data a guardar");
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
