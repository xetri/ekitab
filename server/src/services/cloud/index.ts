import * as minio from "minio";
import config from "@/config";

const minioClient = new minio.Client({
  endPoint: config.minio.endPoint,
  port: config.minio.port,
  useSSL: config.minio.useSSL,
  accessKey: config.minio.accessKey,
  secretKey: config.minio.secretKey,
});

export async function setup() {
  const bucketName = config.MINIO_BUCKET;
  const policy = {
    Version: "2012-10-17",
    Statement: [
      {
        Action: ["s3:GetObject"],
        Effect: "Allow",
        Principal: { AWS: ["*"] },
        Resource: [`arn:aws:s3:::${bucketName}/*`],
        Sid: "",
      },
    ],
  };

  const exists = await minioClient.bucketExists(bucketName);

  if (!exists) {
    await minioClient.makeBucket(bucketName, "");
  }

  await minioClient.setBucketPolicy(bucketName, JSON.stringify(policy));
}

export const uploadFile = async (bucketName: string, fileName: string, fileContent: Buffer) => {
  try {
    await minioClient.putObject(bucketName, fileName, fileContent);
    return { success: true, message: "File uploaded successfully" };
  } catch (error) {
    console.error("Error uploading file:", error);
    return { success: false, message: "Failed to upload file" };
  }
};

export const getFileUrl = (bucketName: string, fileName: string) => {
    return `${config.minio.url}/${bucketName}/${fileName}`;
};

export default minioClient;