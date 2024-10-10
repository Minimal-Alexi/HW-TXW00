const User = require("../Models/userModel");
const { generateToken } = require("../config/jwtHandling");
const bcrypt = require('bcrypt');

// @desc    Register new user
// @route   POST /api/users/signup
// @access  Public

const signupUser = async (req, res) => {
    try {
        const { firstName, lastName, username, password, gender, contactNumber, occupation } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already taken" });
        }

        if (!firstName || !lastName || !username || !password || !gender || !contactNumber || !occupation) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            username,
            password: hashedPassword,
            gender,
            contactNumber,
            occupation
        });

        await newUser.save();
        const token = generateToken(newUser._id);

        return res.status(201).json({ username, token });
    } catch (error) {
        return res.status(500).json({ message: "Error during signup", error });
    }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({username});

        if (user && (await bcrypt.compare(password,user.password))) {
            // create a token
            const token = generateToken(user._id);
            res.status(200).json({ username, token });
        } else {
            res.status(400);
            throw new Error("Invalid credentials");
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    signupUser,
    loginUser
}