import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import {
  AWS_ACCESS_KEY_ID,
  AWS_BUCKET_NAME,
  AWS_SECRET_ACCESS_KEY,
} from "../config/constants.js";

const s3Client = new S3Client({
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

/**
 * Generate a signed url to download a file from S3
 * @param {string} key - The key of the file in S3
 * @returns {string} - The signed url
 **/
export const generateSignedUrlService = async (key) => {
  try {
    const command = new GetObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: key,
      ResponseContentType: "video/mp4",
      ResponseContentDisposition: "inline",
    });
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });
    return signedUrl;
  } catch (err) {
    console.error(err);
  }
};
