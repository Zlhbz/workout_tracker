const router = require("express").Router();
const db = require("../models");

console.log(db);


router.get("/api/workouts", (req, res) => {
    console.log("Returning workouts!")
    db.Workout.find({})
        .then(data_workout => {
            res.json(data_workout);
        })
        .catch(err => {
            res.json(err);
        });
});

router.post("/api/workouts", ({ body }, res) => {
    console.log("working")
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

router.get("/api/workouts/range", ({ body }, res) => {
    console.log("working range");
    db.Workout.find({}).then(data => {
        res.json(data)
    })
});


router.put("/api/workouts/:id", (req, res) => {
    console.log("working on /api/workouts/:id!");
    console.log("Does put call work? " + req.params.id);
    db.Workout.update(
        { _id: req.params.id },
        { $push: { exercises: req.body } }

    ).then(data => {
        console.log(data);

        res.json(data)
    })
});

module.exports = router;
