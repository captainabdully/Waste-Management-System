// import sql from "../config/db.js";   // Import the database connection

export const isAdmin = async (req, res, next) => {
    try {
        const userId = req.user?.user_id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized. Missing user ID." });
        }

        const role = await sql`
            SELECT role FROM user_roles WHERE user_id = ${userId}
        `;
        
        if (role.length === 0 || role[0].role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admin only." });
        }

        next();
    } catch (error) {
        console.error("Admin auth error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default { isAdmin };
