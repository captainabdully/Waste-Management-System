import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized. No token provided!" });
        }

        const token = authHeader.split(" ")[1];

        // Verify token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid or expired token" });
            }

            // Attach user info from token to request
            req.user = decoded;  
            next();
        });

    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
