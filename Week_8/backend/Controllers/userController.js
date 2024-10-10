// @desc    Register new user
// @route   POST /api/users/signup
// @access  Public

const signupUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.signup(name, email, password);

        // create a token
        const token = generateToken(user._id);

        res.status(201).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);

        if (user) {
            // create a token
            const token = generateToken(user._id);
            res.status(200).json({ email, token });
        } else {
            res.status(400);
            throw new Error("Invalid credentials");
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};