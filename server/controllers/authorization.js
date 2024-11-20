import jwt from 'jsonwebtoken';

const verifyJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(403).json({message: "Authentication Revoked, invalid Token"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "auth_code");
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({message: `${error}`});
    }
};

export default verifyJWT;