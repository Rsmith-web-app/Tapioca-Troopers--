import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access Denied: Missing or invalid token" });
        }

        const token = authHeader.split(" ")[1];
        const secret = process.env.JWT_SECRET || "auth_code";
        const { id, email, alias } = jwt.verify(token, secret); // Include alias
        req.user = { id, email, alias }; // Attach alias to req.user
        next();
    } catch (err) {
        console.error("JWT verification failed:", err.message);
        res.status(403).json({ message: "Invalid Token" });
    }
};

export default verifyJWT;
