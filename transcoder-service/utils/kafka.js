import { Kafka } from "kafkajs";
import { KAFKA_BROKERS } from "../config/constants.js";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: KAFKA_BROKERS,
});

const consumer = kafka.consumer({ groupId: "my-app-group" });

export const consume = async (topic) => {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic });
    await consumer.run({
      eachMessage: async ({ partition, message }) => {
        console.log({
          partition,
          offset: message.offset,
          value: message.value.toString(),
        });
      },
    });
  } catch (err) {
    console.error(err);
  }
};
