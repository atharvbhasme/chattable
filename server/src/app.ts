import Fastify from "fastify";
import cors from "@fastify/cors";
import { connectDB } from "./config/db.ts";
import jwt from "./plugins/jwt.ts";
import authRoutes from "./routes/auth.route.ts";
import health from "./routes/health.route.ts";
import userRoutes from "./routes/user.route.ts";
import { authMiddleware } from "./middleware/authenticate.ts";

const app = async () => {
  const childApp = Fastify({
  logger: !!(process.env.NODE_ENV !== "development"),
});

const prefix = '/api'

await childApp.register(cors, {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
});

await connectDB();

await childApp.register(jwt)

childApp.addHook("onRequest", authMiddleware(childApp))
childApp.register(health)
childApp.register(authRoutes, {prefix: prefix})
childApp.register(userRoutes, {prefix: prefix})

return childApp;
}

export default app;