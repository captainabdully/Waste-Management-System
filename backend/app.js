import 'dotenv/config';
import express from 'express';
// import swaggerUi from 'swagger-ui-express';
import { initDB } from './config/db.js';
//  import { verifyToken } from "../middleware/verifyToken.js";

// Import routes
import userRoutes from './routes/userRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import droppingPointRoutes from './routes/droppingPointRoutes.js';
import priceRoutes from './routes/priceRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from "./routes/authRoutes.js";
import setupRoutes from "./routes/setupRoutes.js";

// Import middleware


const app = express();
const PORT = process.env.PORT || 5001;

// Initialize database
await initDB();

// Middleware
app.use(express.json());
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/user-roles', roleRoutes);
app.use('/api/dropping-point', droppingPointRoutes);
app.use('/api/daily-price', priceRoutes);
app.use('/api/pickup-order', orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/setup", setupRoutes);




// Root route
app.get('/', (req, res) => {
  res.send("Developing a backend server for country data");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("my port:", process.env.PORT || 5001);
});

export default app;