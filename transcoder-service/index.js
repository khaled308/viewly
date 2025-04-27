import { transcoderConsumer } from "./utils/kafka.js";

transcoderConsumer("transcode").catch((err) => console.error(err));
