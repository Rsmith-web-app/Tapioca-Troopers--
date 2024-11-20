import { Storage } from '@google-cloud/storage';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import dotenv from 'dotenv';

// Derive __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize dotenv
dotenv.config();

// Google Cloud Storage Initialization
const storage = new Storage({
    keyFilename: path.join(__dirname, "../keys/tt-gcp-service-key.json"),
    projectId: process.env.GCP_PROJECT_ID,
});

const bucket = storage.bucket(process.env.GCP_STORAGE_BUCKET);

// Multer Configuration
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

// Function to make bucket public
async function makeBucketPublic() {
    try {
        await bucket.makePublic();
        console.log(`Bucket ${bucket.name} is now publicly readable`);
    } catch (error) {
        console.error("Error making bucket public:", error);
    }
}
makeBucketPublic();

// Function to upload a file to Google Cloud
const uploadToGoogleCloud = async (file) => {
    const destination = `${Date.now()}-${file.originalname}`;

    const blob = bucket.file(destination);
    const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: { contentType: file.mimetype },
    });

    return new Promise((resolve, reject) => {
        blobStream
            .on("finish", () => {
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${destination}`;
                resolve(publicUrl);
            })
            .on("error", (err) => reject(err));

        blobStream.end(file.buffer);
    });
};

export default uploadToGoogleCloud;
