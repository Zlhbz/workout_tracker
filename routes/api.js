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



router.get("/api/workouts", ({ body }, res) => {
    console.log("Returning workouts!")
    Workout.find({})
        .then(data_workout => {
            res.json(data_workout);
        })
        .catch(err => {
            res.json(err);
        });
});

router.post("/api/workouts/:id", ({ body }, res) => {
    console.log("working")
    Workout.create(body)
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
    Workout.find({}).then(data => {
        res.json(data)
    })
});


router.put("/api/workouts/:id", (req, res) => {
    Workout.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (data_workout) {
        res.json(data_workout);
    });

});


module.exports = router;
