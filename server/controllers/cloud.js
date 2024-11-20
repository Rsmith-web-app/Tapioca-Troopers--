import Storage from '@google-cloud/storage';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import dotenv from 'dotenv';


//Google Cloud Storage Credentials
const storage = new Storage({
    keyFilename: path.join(__dirname, "../keys/tt-gcp-service-key.json"),
    projectId: process.env.GCP_PROJECT_ID,
});

dotenv.config();
const bucket = storage.bucket(process.env.GCP_STORAGE_BUCKET);

const multerStorage = multer.memoryStorage();
const upload = multer((multerStorage))

async function makeBucketPublic() {
    await storage.bucket(bucket.name).makePublic();
    console.log(`Bucket ${bucket.name} is now publicly readable`);
}
makeBucketPublic().catch(console.error);

// Function to upload a file to Google Cloud
const uploadToGoogleCloud = async (file) => {
    const { path, originalname } = file;

    const destination = `${Date.now()}-${originalname}`;
    const fileStream = fs.createReadStream(path);

    const blob = bucket.file(destination);
    const blobStream = blob.createWriteStream({ resumable: false, metadata: { contentType: file.mimetype } });

    return new Promise((resolve, reject) => {
        fileStream
            .pipe(blobStream)
            .on("finish", () => {
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${destination}`;
                resolve(publicUrl);

            })
            .on("error", (err) => reject(err));
        blobStream.end(file.buffer);
    });
};

module.exports = { uploadToGoogleCloud, makeBucketPublic };

