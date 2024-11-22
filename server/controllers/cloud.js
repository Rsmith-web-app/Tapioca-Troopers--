import { Storage } from '@google-cloud/storage';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import dotenv from 'dotenv';
import verifyJWT from "../controllers/authorization.js";

// Derive __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize dotenv
dotenv.config();

// Google Cloud Storage Initialization
const storage = new Storage({
    keyFilename: path.join(__dirname, "../keys/ttkey.json"),
    projectId: process.env.GCP_PROJECT_ID,
});

const bucket = storage.bucket(process.env.GCP_STORAGE_BUCKET);

// Multer Configuration
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 20 * 1024 * 1024 } // 20MB limit
});


// Function to make bucket public
const makeBucketPublic = async () => {
    try {
        await bucket.makePublic();
        console.log(`Bucket ${bucket.name} is now publicly readable`);
    } catch (error) {
        console.error("Error making bucket public:", error);
    }
};

// Function to upload a file to Google Cloud
const uploadToGoogleCloud = async (file) => {
    try {
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
                .on("error", (err) => {
                    console.error("Error in blobStream:", err);
                    reject(err);
                });

            blobStream.end(file.buffer);
        });
    } catch (error) {
        console.error("Upload Function Error:", error);
        throw error;
    }
};

export { uploadToGoogleCloud, makeBucketPublic, upload, storage };
