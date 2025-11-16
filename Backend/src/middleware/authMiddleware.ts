var jwt = require("jsonwebtoken");
var User = require("../models/userModel");

// Type for request with user data
interface AuthRequest extends Request {
  user?: any;
}

const authMiddleware = async (req: any, res: any, next: any) => {
  try {
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "No token provided. Unauthorized" });
    }

    // Verify token
    const decoded: any = jwt.verify(token, "shhhhhhhhhh");

    // Find user from DB
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found. Unauthorized" });
    }

    req.user = user; // Attach user to req
    next();

  } catch (error: any) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ⭐ IMPORTANT: This makes the file a module — prevents TS redeclare errors
module.exports = authMiddleware;
