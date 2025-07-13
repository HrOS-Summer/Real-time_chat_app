import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token) return res.status(401).json({message: "Unauthorized - No token provided"})

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) return res.status(401).json({message: "Unauthorized - Invalid Token"});

        const user = await User.findById(decoded.userId).select("-password"); //we don't want to grab password
        if(!user) return res.status(404).json({message: "User not found"});

        req.user = user; //if user authenticated add user to request

        next(); //call next function (update profile)
    } catch (error) {
        console.log("Error in protect route middleware", error);
        return res.status(500).json({message: "Internal server error"});
    }
}



// import jwt from "jsonwebtoken";
// import User from "../models/user.model.js";

// export const protectRoute = async (req, res, next) => {
//   try {
//     const token = req.cookies.jwt;
//     console.log("🧪 JWT Cookie:", token);

//     if (!token) {
//       console.log("⛔ No token received");
//       return res.status(401).json({ message: "Unauthorized - No token" });
//     }

//     let decoded;
//     try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET);
//       console.log("✅ Decoded token:", decoded);
//     } catch (err) {
//       console.log("❌ Invalid token:", err.message);
//       return res.status(401).json({ message: "Unauthorized - Invalid Token" });
//     }

//     const user = await User.findById(decoded.userId).select("-password");
//     if (!user) {
//       console.log("❌ User not found");
//       return res.status(404).json({ message: "User not found" });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.log("🔥 Error in protectRoute:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
