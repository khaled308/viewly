import dotenv from "dotenv";

dotenv.config();

export const KAFKA_BROKERS = process.env.KAFKA_BROKERS?.split(",");
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
export const AWS_REGION = process.env.AWS_REGION;
export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
export const HLS_DIRECTORY = "output/hls";
export const MP4_DIRECTORY = "output/mp4";
