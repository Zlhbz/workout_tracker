const router = require("express").Router();
const Workout = require("../models/workout.js");
const path = require("path");


router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
})
router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
})
router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
})

router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
        .then(data_workout => {
            res.json(data_workout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/api/workouts", ({ body }, res) => {
    Workout.findAll({})
        .then(data_workout => {
            res.json(data_workout);
        })
        .catch(err => {
            res.json(err);
        });
});




router.put("/api/workouts/:id", ({ body }, res) => {

    workout.update({
        where: {
            id: body.id
        }
    }, body)
        .then(data => {
            res.json(data)
        })
});


module.exports = router;
