const router = require("express").Router();
const db = require("../models");

console.log(db);


router.get("/api/workouts", (req, res) => {
    // console.log("/api/workouts works " + "GET")
    db.Workout.find({})
        .then(data_workout => {
            res.json(data_workout);
        })
        .catch(err => {
            res.json(err);
        });
});

router.get("/api/workouts/range", (req, res) => {
    // console.log("/api/workouts/range works " + "GET")
    db.Workout.find({})
        .then(data_workout => {
            console.log("?????? " + data_workout);
            res.json(data_workout);
        })
        .catch(err => {
            res.json(err);
        });
});

router.get("/api/workouts/:id", (req, res) => {
    // console.log("/api/workouts/id works " + "GET")
    db.Workout.findById(req.params.id)
        .then(data_workout => {
            res.json(data_workout);
        })
        .catch(err => {
            res.json(err);
        });
});



router.post("/api/workouts", ({ body }, res) => {
    // console.log("/api/workouts works " + "POST")
    db.Workout.create(body)
        .then(data_workout => {
            console.log(data_workout);
            res.json(data_workout);
        })
        .catch(err => {
            console.log("Returning error response!")
            res.status(400).json(err);
        });
});


router.put("/api/workouts/:id", (req, res) => {
    // console.log("/api/workouts/id works " + "PUT");
    // console.log("Does put call work? " + req.params.id);
    db.Workout.update(
        { _id: req.params.id },
        { $push: { exercises: req.body } }

    ).then(data => {
        console.log(data);

        res.json(data)
    })
});

module.exports = router;
