import Fastify from "fastify";
import cors from "@fastify/cors";
import { connectDB } from "./config/db.ts";
import jwt from "./plugins/jwt.ts";
import authRoutes from "./routes/auth.route.ts";
import health from "./routes/health.route.ts";

const app = async () => {
  const childApp = Fastify({
  logger: !!(process.env.NODE_ENV !== "development"),
});

await childApp.register(cors, {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
});

await connectDB();

childApp.register(jwt)
childApp.register(health)
childApp.register(authRoutes, {prefix: '/api'})

return childApp;
}

export default app;