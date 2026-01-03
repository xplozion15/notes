const bcrypt = require("bcryptjs");
const { prisma } = require("../lib/prisma");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;

async function registerUser(req, res) {
  try {
    const { firstName, lastName, email, username, password, adminPassword } =
      req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the user entered the correct admin password
    let isAdmin = false;
    if (adminPassword && adminPassword === process.env.ADMIN_SECRET) {
      isAdmin = true;
    }

    //create the user
    await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: hashedPassword,
        isAdmin: isAdmin,
      },
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to register user" });
  }
}

async function login(req, res) {
  try {
    //destructuring password and username from the request body
    const { username, password } = req.body;

    //get the user
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    //if user doesnt exist
    if (!user) {
      return res.status(401).json({
        message: "invalid credentials",
      });
    }

    // get hashed password from the user
    const hashedPassword = user.password;

    //compare hashed password with plain password in the login controller (if user exists)
    const isMatch = await bcrypt.compare(password, hashedPassword);

    //if password is not  matching then send an error
    if (!isMatch) {
      return res.status(401).json({
        message: "invalid credentials",
      });
    }

    // else if password is correct then sign the jwt
    const token = jwt.sign({ userId: user.id }, secret, {
      expiresIn: "7d",
    });

    res.json({
      message: "login successful",
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: "login failed",
    });
  }
}

 function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = decoded;
    next();
  });
}

module.exports = { registerUser, login ,authenticateToken};
