import { BlobServiceClient } from '@azure/storage-blob';
import 'dotenv/config';

const sasToken = process.env.SAS_TOKEN;
const accountName = process.env.ACCOUNT_NAME;
const containerName = process.env.CONTAINER_NAME;

const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net/?${sasToken}`
);
const containerClient = blobServiceClient.getContainerClient(containerName);

export const uploadFileToBlob = async (file) => {
    try {
        const blobName = `${Date.now()}-${file.originalname}`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        await blockBlobClient.uploadData(file.buffer);
        const fileUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;
        return fileUrl;
    } catch (error) {
        throw new Error(`Error uploading file to blob: ${error.message}`);
    }
};
