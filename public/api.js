const API = {
  async getLastWorkout() {
    const res = await fetch("/api/workouts");
    const json = await res.json();

    return json[json.length - 1];
  },
  async addExercise(data) {
    console.log("Adding excercise:" + JSON.stringify(data))
    console.log("Location is:" + location.search)
    console.log(location);
    const id = location.search.split("=")[1];


    const res = await fetch("/api/workouts/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    return json;
  },
  async createWorkout() {
    const res = await fetch("/api/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });

    const json = await res.json();

    return json;
  },

  async getWorkoutsInRange() {
    const res = await fetch(`/api/workouts/range`);
    const json = await res.json();

    return json;
  },
};
