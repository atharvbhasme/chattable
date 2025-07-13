import app from "./app.ts";
import dotenv from 'dotenv';

dotenv.config();

const FASTIFY_PORT = Number(process.env.FASTIFY_PORT) || 3006;

const start = async () => {
    try {
        const startApp = await app();
        await startApp.listen({ port: FASTIFY_PORT });
        console.log(`🚀  Fastify server running on port http://localhost:${FASTIFY_PORT}`);
    } catch (error) {
        console.error("Error starting Fastify server:", error);
        process.exit(1);
    }
}
start()