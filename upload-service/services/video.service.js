import { db } from "../config/db.js";
import { videos } from "../schemas/video.schema.js";
import { produce } from "../utils/kafka.js";

/**
 * Add video details to the database
 * @param {object} data - The video details
 * @param {string} data.title - The title of the video
 * @param {string} data.description - The description of the video
 * @param {string} data.author - The author of the video
 * @param {string} data.url - The url of the video
 * @returns {object} - The video details
 **/
export const addVideoDetails = async (data) => {
  try {
    const videoDetails = await db.insert(videos).values(data).returning();
    return videoDetails;
  } catch (err) {
    console.error(err);
  }
};

/**
 * Push video details to Kafka
 * @param {object} data - The video details
 * @param {string} data.key - The key of the video
 * @param {string} data.url - The url of the video
 * @returns {object} - The video details
 * */
export const pushVideoDetailsToKafka = async (data) => {
  try {
    produce("transcode", [{ value: JSON.stringify(data) }]);
  } catch (err) {
    console.error(err);
  }
};
