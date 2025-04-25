import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 8000;
export const CLIENT_URL = process.env.CLIENT_URL;
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
export const AWS_REGION = process.env.AWS_REGION;
export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
export const KAFKA_BROKERS = process.env.KAFKA_BROKERS?.split(",");
export const FILE_PART_SIZE = process.env.FILE_PART_SIZE || 50 * 1024 * 1024;
