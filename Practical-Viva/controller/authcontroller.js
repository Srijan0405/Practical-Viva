import bcrypt from "bcrypt";
import genSalt  from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import express from "express";

export function register (req.res) {
    try {
        const {id} = req.body;
        const {name, email ,passwordHash,role,createdAt} = req.body; 
    }
    if (!name || !email) {
        return.res.send(500).json("name and email is required")
    }
    if (!password) {
        return.res.send(500).json("Password required")
    }
    const passwordHash = genSalt.password(10);

    if (!user) {
        return res.send(500).json ("user is required")
    }
    const allowedRoles = ["admin","member"];

    if (role && !allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role!" });
    }
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'member'
    });

  
    logger.info(`New user registered: ${email}`);

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
}