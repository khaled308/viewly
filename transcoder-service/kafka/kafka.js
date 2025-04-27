import { Kafka } from "kafkajs";
import {
  HLS_DIRECTORY,
  KAFKA_BROKERS,
  MP4_DIRECTORY,
} from "../config/constants.js";
import { downloadFileFromS3, uploadFilesToS3 } from "../services/s3.service.js";
import convertToHLS from "../services/transcode.service.js";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: KAFKA_BROKERS,
});

const consumer = kafka.consumer({ groupId: "my-app-group" });

export const transcoderConsumer = async (topic) => {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic });
    await consumer.run({
      eachMessage: async ({ message }) => {
        const { key, url } = JSON.parse(message.value.toString());

        try {
          console.log(`Downloading file from ${url}...`);
          await downloadFileFromS3(key);
          const dir = await convertToHLS(
            `${MP4_DIRECTORY}/${key}`,
            HLS_DIRECTORY
          );
          await uploadFilesToS3(dir);
        } catch (err) {
          console.error(err);
        }
      },
    });
  } catch (err) {
    console.error(err);
  }
};
