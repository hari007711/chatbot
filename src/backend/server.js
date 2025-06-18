const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const SECRET_KEY = "your_jwt_secret";

// app.post("/api/register", async (req, res) => {
//   const { username, password } = req.body;
//   const existingUser = users.find(u => u.username === username);
//   if (existingUser) return res.status(400).json({ error: "User exists" });

//   const hashedPassword = await bcrypt.hash(password, 10);
//   users.push({ username, password: hashedPassword });
//   res.json({ message: "User registered" });
// });

// app.post("/api/login", async (req, res) => {
//   const { username, password } = req.body;
//   const user = users.find(u => u.username === username);
//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(401).json({ error: "Invalid credentials" });
//   }
//   const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
//   res.json({ token });
// });

app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) return res.status(400).json({ error: "User exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ name, email, password: hashedPassword });
  res.json({ message: "User registered" });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
