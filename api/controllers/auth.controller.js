const bcrypt = require("bcryptjs");
const { prisma } = require("../lib/prisma");
const jwt = require("jsonwebtoken");
const { query, validationResult } = require("express-validator");
require("dotenv").config();
const secret = process.env.JWT_SECRET;

async function registerUser(req, res) {
  //validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
    });
  }

  //try catch block for the controller
  try {
    const { firstName, lastName, email, username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    // always keep admin false
    let isAdmin = false;

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
  //validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
    });
  }

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
    // console.log(decoded);  // req.user.userId is user id in decoded.
    req.user = decoded;
    next();
  });
}

async function getMe(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        isAdmin: true, //needed for checking if its admin or not on frontend too
        //not sending password to client for security purposes
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get the user",
    });
  }
}

module.exports = { registerUser, login, authenticateToken, getMe };
