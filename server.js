require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const verifyToken = require("./middleware/auth");

const app = express();

const jsonParser = bodyParser.json()

const users = [
    { 
        id: 1, 
        username: "ryan"
    },
    { 
        id: 2,
        username: "john"
    }
]

app.get("/posts", verifyToken, (req, res) => {
    res.json({name: "posts"})
})

app.post("/login", jsonParser, (req, res) => {
    const username = req.body.username
    const user = users.find(user => user.username === username)
    
    if (!user) return res.sendStatus(401);

    // Create JWT
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "10s"})
    res.json({accessToken})
})

const PORT = 4000;

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})