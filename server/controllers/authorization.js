import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Access Denied" });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || "auth_code");
        req.user = verified; // Assign user data to req.user
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid Token" });
    }
};

export default verifyJWT;
