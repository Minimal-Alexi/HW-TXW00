const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

const logger = require("./Middleware/logger");
const { unknownEndpoint, errorHandler } = require("./Middleware/errorHandling");

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




// App




// Error handling
app.use(unknownEndpoint);
app.use(errorHandler);

// Export the server
module.exports = app;