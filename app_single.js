require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // parses incoming JSON request bodies

// ─── DATABASE CONNECTION ──────────────────────────────────────────────────────

mongoose.connect(process.env.MONGO_DB_CONNECTION_URL)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log('Connection failed:', error));

// ─── MODEL ───────────────────────────────────────────────────────────────────
// Defines the shape of documents in the "users" collection in MongoDB.

const userSchema = new mongoose.Schema({
    name:     { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// ─── ROUTES ──────────────────────────────────────────────────────────────────
// Mounted at /auth, so:
//   POST /auth/register → saves a new user into the "users" collection
//   POST /auth/login    → checks credentials against the "users" collection

const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
        return res.status(400).json({ message: 'Name, Email, Password are required' });

    const existing = await User.findOne({ email });
    if (existing)
        return res.status(400).json({ message: `User already exists with email: ${email}` });

    const user = await new User({ name, email, password }).save();
    return res.status(200).json({ message: 'User registered', user: { id: user._id } });
});

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ message: 'Email and password are required' });

    const user = await User.findOne({ email });
    if (user && user.password === password)
        return res.status(200).json({ message: 'User authenticated', user: { id: user._id, name: user.name, email: user.email } });

    return res.status(400).json({ message: 'Invalid email or password' });
});

app.use('/auth', authRouter);

// ─── SERVER ───────────────────────────────────────────────────────────────────

app.listen(5001, () => console.log('Server running on port 5001'));
