import {
  S3Client,
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
} from "@aws-sdk/client-s3";

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
 * Initialize a multipart upload
 * @param {string} key - Path where you want to save the object(file).
 */
export const initializeS3UploadMultiPartService = async (key) => {
  try {
    const multipartUpload = await s3Client.send(
      new CreateMultipartUploadCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: key,
      })
    );

    return multipartUpload.UploadId;
  } catch (err) {
    console.error(err);
  }
};

/**
 * Upload a chunk of the file
 * @param {Object} params
 * @param {string} params.key - Path where you want to save the object(file).
 * @param {string} params.body - File's buffer.
 * @param {string} params.uploadId - The multipart upload id
 * @param {number} params.partNumber - The part number
 */
export const uploadS3ChunkService = async (params) => {
  try {
    const response = await s3Client.send(
      new UploadPartCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: params.key,
        Body: params.body,
        UploadId: params.uploadId,
        PartNumber: params.partNumber,
      })
    );

    return response;
  } catch (err) {
    console.error(err);
  }
};

/**
 * Complete the multipart upload
 * @param {Object} params
 * @param {string} params.key - Path where you want to save the object(file).
 * @param {string} params.uploadId - The multipart upload id
 * @param {Array} params.parts - The parts of the file
 * @returns
 */
export const completeS3MultipartUploadService = async (params) => {
  try {
    const response = await s3Client.send(
      new CompleteMultipartUploadCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: params.key,
        MultipartUpload: {
          Parts: params.parts,
        },
        UploadId: params.uploadId,
      })
    );

    return response;
  } catch (err) {
    console.error(err);
  }
};
