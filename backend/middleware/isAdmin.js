import e from "express";


export const isAdmin = async (req, res, next) => {
    try {
        const userId = req.user?.user_id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized. Missing user ID!!!" });
        }

        const roleResult = await sql`
            SELECT role FROM user_roles WHERE user_id = ${userId}
        `;

        if (roleResult.count === 0) {
            return res.status(403).json({ message: "Access denied. Role not found." });
        }

        const userRole = roleResult[0].role;

        if (userRole !== "admin") {
            return res.status(403).json({ message: "Access denied. Admin only." });
        }

        next();
    } catch (error) {
        console.error("Admin auth error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default { isAdmin };
