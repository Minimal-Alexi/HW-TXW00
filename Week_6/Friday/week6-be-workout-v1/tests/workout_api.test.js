const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Workout = require("../models/workoutModel");

const initialWorkouts = [
  {
    title: "test workout 1",
    reps: 11,
    load: 101,
  },
  {
    title: "test workout 2",
    reps: 12,
    load: 102,
  },
];

const workoutsInDb = async () => {
  const workouts = await Workout.find({});
  return workouts.map((workout) => workout.toJSON());
};

beforeEach(async () => {
  await Workout.deleteMany({});
  let workoutObject = new Workout(initialWorkouts[0]);
  await workoutObject.save();
  workoutObject = new Workout(initialWorkouts[1]);
  await workoutObject.save();
});

describe("Workout API", function () {
  
  describe("GET /api/workouts", function () {
    describe("when fetching workouts", function () {
      it("should return all existing workouts", async function () {
        const response = await api.get("/api/workouts");
        expect(response.body).toHaveLength(initialWorkouts.length);
      });

      it("should include a specific workout in the returned list", async function () {
        const response = await api.get("/api/workouts");
        const titles = response.body.map((workout) => workout.title);
        expect(titles).toContain("test workout 2");
      });

      it("should return workouts in JSON format", async function () {
        await api
          .get("/api/workouts")
          .expect(200)
          .expect("Content-Type", /application\/json/);
      });
    });
  });

  describe("POST /api/workouts", function () {
    describe("when adding a new workout", function () {
      it("should successfully add a new workout", async function () {
        const newWorkout = {
          title: "test workout x",
          reps: 19,
          load: 109,
        };

        await api.post("/api/workouts").send(newWorkout).expect(201);
      });

      it("should save and return the newly added workout", async function () {
        const newWorkout = {
          title: "Situps",
          reps: 25,
          load: 10,
        };

        await api
          .post("/api/workouts")
          .send(newWorkout)
          .expect(201)
          .expect("Content-Type", /application\/json/);

        const response = await api.get("/api/workouts");
        const titles = response.body.map((workout) => workout.title);

        expect(response.body).toHaveLength(initialWorkouts.length + 1);
        expect(titles).toContain("Situps");
      });

      it("should not allow adding a workout without a title", async function () {
        const invalidWorkout = { reps: 23 };

        await api.post("/api/workouts").send(invalidWorkout).expect(400);

        const response = await api.get("/api/workouts");
        expect(response.body).toHaveLength(initialWorkouts.length);
      });
    });
  });

  describe("DELETE /api/workouts/:id", function () {
    describe("when deleting a workout", function () {
      it("should delete the workout if the ID is valid", async function () {
        const workoutsAtStart = await workoutsInDb();
        const workoutToDelete = workoutsAtStart[0];

        await api.delete(`/api/workouts/${workoutToDelete.id}`).expect(204);

        const workoutsAtEnd = await workoutsInDb();
        expect(workoutsAtEnd).toHaveLength(initialWorkouts.length - 1);

        const titles = workoutsAtEnd.map((workout) => workout.title);
        expect(titles).not.toContain(workoutToDelete.title);
      });
    });
  });

});

afterAll(() => {
  mongoose.connection.close();
});
