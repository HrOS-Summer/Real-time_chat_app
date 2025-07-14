import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import {generateToken} from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const {fullName, email, password} = req.body;
    try {
        if(!fullName || !email || !password) {
            return res.status(400).json({message: "All fields are required"});
        }
        if(password.length < 6) {
            return res.status(400).json({message: "Password must be at least 6 characters!"});
        }

        const user = await User.findOne({email});

        if (user) return res.status(400).json({message: "Email already exists!"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        if(newUser) {
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })
        } else {
            res.status(400).json({message: "Invalid user data!"});
        }
    } catch (err) {
        console.log("Error in signup controller: ", err);
        res.status(500).json({message:"Internal server error"})
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email})

        if(!user) return res.status(400).json({message: "Invalid credentials"});

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) return res.status(400).json({message: "Invalid credentials"});

        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        })
    } catch (err) {
        console.log("Error in login controller: ", err);
        return res.status(500).json({message:"Internal server error"});
    }
    
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {
            maxAge: 0,
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development", // only over HTTPS in production
            sameSite: "strict",
            path: '/'
        })
        res.status(200).json({message: "Logged out successfully"});
    } catch (error) {
        console.log("Error in logout controller");
        res.status(500).json({message:"Internal server error"})
    }
}

export const updateProfile = async (req, res) => {
    try {
        const {profilePic} = req.body;
        const userId = req.user._id;
        if(!profilePic) return res.status(404).json({message: "Profile Picture is required"})

        console.log("Received profilePic length:", profilePic.length); // Log base64 string length

        const uploadResponse = await cloudinary.uploader.upload(profilePic, {folder: "profile_pics", }); //organize uploads in a folder
        
        console.log("Cloudinary upload response:", uploadResponse); // Log Cloudinary response

        const updatedUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new: true});

        res.status(200).json(updatedUser)
    } catch (err) {
        console.log(`error in update profile controller: `, err)
        res.status(500).json({message: "Internal server error"});
    }
}

export const checkAuth = (req, res) => {
    try {
        
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        res.status(200).json(req.user);       
    } catch (error) {
        console.log("Error in checkAuth controller: ", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const deleteProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete profile picture from Cloudinary if it exists
        if (user.profilePic) {
            const publicId = user.profilePic.split("/").pop().split(".")[0]; // Extract public ID from URL
            try {
                await cloudinary.uploader.destroy(`profile_pics/${publicId}`);
                console.log("Deleted profile picture from Cloudinary:", publicId);
            } catch (cloudinaryError) {
                console.error("Error deleting profile picture from Cloudinary:", cloudinaryError);
                // Continue with deletion even if Cloudinary fails
            }
        }

        // Delete user from database
        await User.findByIdAndDelete(userId);

        // Clear session or token (handled by client-side logout)
        res.status(200).json({ message: "Profile deleted successfully" });
    } catch (err) {
        console.error("Error in delete profile controller:", err.message);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate reset token
        const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Save token and expiry to user
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        // Send email
        const transporter = nodemailer.createTransport({
            service: "Gmail", // Use your email service
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset Request",
            html: `
                <p>You requested a password reset. Click the link below to reset your password:</p>
                <a href="${resetUrl}">Reset Password</a>
                <p>This link will expire in 1 hour.</p>
                <p>If you did not request this, please ignore this email.</p>
            `,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Password reset email sent" });
    } catch (err) {
        console.error("Error in forgot password controller:", err.message);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ message: "New password is required" });
        }

        // Verify token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(400).json({ message: "Invalid or expired reset token" });
        }

        const user = await User.findOne({
            _id: decoded.userId,
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired reset token" });
        }

        // Update password
        user.password = password; // bcrypt hashing handled by pre-save hook
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        res.status(200).json({ message: "Password reset successfully" });
    } catch (err) {
        console.error("Error in reset password controller:", err.message);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};