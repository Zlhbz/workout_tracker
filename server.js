const express = require("express");
const mongoose = require("mongoose");
const path = require("path");


const app = express();
const PORT = process.env.PORT || 3006

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false
});

app.use(require("./routes/api.js"));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
})
app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
})
app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
})


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
