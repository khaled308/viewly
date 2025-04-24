import { Kafka } from "kafkajs";
import { KAFKA_BROKERS } from "../config/constants.js";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: KAFKA_BROKERS,
});

const producer = kafka.producer();

export const produce = async (topic, messages) => {
  try {
    await producer.connect();
    await producer.send({
      topic,
      messages,
    });
  } catch (err) {
    console.error(err);
  } finally {
    await producer.disconnect();
  }
};
