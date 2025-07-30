import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const users = [
  {
    email: "abc@gmail.com",
    password: "123",
  },
];

const checkEmailInDatabase = (email) => {
  return users.find((user) => user.email === email);
};

const userInputCheck = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  next();
};

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/signup", userInputCheck, (req, res) => {
  //   console.log("req.body", req.body);
  const { email, password } = req.body;

  //   if (!email || !password) {
  //     return res.status(400).json({ message: "Email and password are required" });
  //   }

  const existingUser = checkEmailInDatabase(email);

  if (existingUser) {
    return res.status(400).json({ message: "User already exists...!" });
  }

  const newUser = { email, password };

  users.push(newUser);

  return res.status(201).json({ message: "User Created Successfully...!" });
});

app.post("/login", userInputCheck, (req, res) => {
  const { email, password } = req.body;

  //   if (!email || !password) {
  //     return res.status(400).json({ message: "Email and password are required" });
  //   }

  const existingUser = checkEmailInDatabase(email);

  if (!existingUser) {
    return res.status(404).json({ message: "User Not Found...!" });
  }

  if (password != existingUser.password) {
    return res.status(401).json({ message: "Invalid Password...!" });
  }

  return res.status(200).json({ message: "Login Successful...!" });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});