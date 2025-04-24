import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 8001;
export const CLIENT_URL = process.env.CLIENT_URL;
export const KAFKA_BROKERS = process.env.KAFKA_BROKERS?.split(",");
