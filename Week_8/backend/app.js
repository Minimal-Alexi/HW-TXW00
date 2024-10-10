const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

const logger = require("./Middleware/logger");
const { unknownEndpoint, errorHandler } = require("./Middleware/errorHandling");
const userRouter = require("./Routers/userRouter");
const courseRouter = require("./Routers/courseRouter");

// Middleware
app.use(cors());
app.use(express.json());

if(process.env.NODE_ENV !== 'test')
    {
        //this makes it so only the tests are console logged.
        app.use(logger);
    }

connectDB();

// Routes

app.use("/api/users",userRouter);
app.use("/api/courses",courseRouter);


// Error handling
app.use(unknownEndpoint);
app.use(errorHandler);

// Export the server
module.exports = app;