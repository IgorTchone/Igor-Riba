// server.js

const express = require('express'); // Import express
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const bodyParser = require('body-parser'); // Import body-parser
const cors = require('cors'); // Import cors

const app = express(); // Create an Express application
const PORT = process.env.PORT || 3000; // Set the port

// Middleware
app.use(bodyParser.json()); // Parse JSON requests
app.use(cors()); // Enable CORS

// In-memory database simulation
let users = [
    { id: 1, username: 'user1', score: 100 },
    { id: 2, username: 'user2', score: 200 },
];

// Middleware to authenticate JWT
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']; // Get token from header
    if (!token) return res.status(403).json({ message: 'Token required' }); // Check token

    jwt.verify(token, 'your-secret-key', (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' }); // Verify token
        req.user = user; // Attach user info to request
        next(); // Proceed to the next middleware
    });
};

// Endpoint to update user score
app.post('/api/update-score', authenticateToken, (req, res) => {
    const { user_id, new_score } = req.body; // Extract user_id and new_score

    const user = users.find(u => u.id === user_id); // Find user by ID
    if (!user) return res.status(404).json({ message: "User not found" }); // Check if user exists

    user.score += new_score; // Update user score

    return res.status(200).json({ message: "Score updated", newScore: user.score }); // Respond with new score
});

// Endpoint to login and generate a token
app.post('/api/login', (req, res) => {
    const { username } = req.body; // Extract username
    const user = users.find(u => u.username === username); // Find user by username
    if (!user) return res.status(404).json({ message: "User not found" }); // Check if user exists

    // Generate JWT
    const token = jwt.sign({ id: user.id, username: user.username }, 'your-secret-key', { expiresIn: '1h' });
    res.json({ token }); // Send token as response
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`); // Log server status
});
