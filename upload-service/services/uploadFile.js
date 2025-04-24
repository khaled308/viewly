import { s3 } from "../config/aws.js";
import { AWS_BUCKET_NAME } from "../config/constants.js";

export const uploadToS3 = async (key, data) => {
  const params = {
    Bucket: AWS_BUCKET_NAME,
    Key: key,
    Body: data,
  };

  await s3.upload(params, (err, data) => {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully at ${data.Location}`);
  });
};
