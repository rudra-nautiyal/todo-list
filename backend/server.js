const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cors = require("cors");

dotenv.config();

const app = express();
const users = [];

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const existingUser = users.find((user) => user.username === username);

  if (existingUser) {
    return res.status(401).json({
      message: "User already exists!",
    });
  } else {
    users.push({ username, password });

    return res.json({
      message: "Registered user.",
    });
  }
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = users.find(
    (user) => username === user.username && password === user.password,
  );

  if (user) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET);

    return res.json({
      message: "Successfully logged in!",
      token,
    });
  }

  return res.status(401).json({
    message: "Incorrect credentials",
  });
});

app.get("/me", (req, res) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = users.find((user) => decodedToken.username === user.username);

    if (user) {
      return res.json({
        message: "Welcome back, " + user.username,
      });
    } else {
      return res.status(401).json({
        message: "Invalid token!",
      });
    }
  } catch {
    return res.status(401).json({
      message: "Who is this?",
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Active on port ${process.env.PORT}`);
});
