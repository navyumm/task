import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Define the user schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    refreshToken: {
        type: String
    }
}, {
    timestamps: true
});

// Pre-save middleware for hashing the password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // Check if password is modified
    try {
        this.password = await bcrypt.hash(this.password, 10); // Hash the password
        next(); // Proceed to save
    } catch (err) {
        next(err); // Pass error to the next middleware
    }
});

// Method to check if password is correct
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Method to generate access token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

// Method to generate refresh token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};

// Export the User model
export const User = mongoose.model("User", userSchema);
