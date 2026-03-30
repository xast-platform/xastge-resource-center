const Storage = require("./storage");
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const crypto = require("crypto");

class R2Storage extends Storage {
   constructor() {
      super();
      this.bucket = process.env.R2_BUCKET;
      this.endpoint = process.env.R2_ENDPOINT;
      this.accessKey = process.env.R2_ACCESS_KEY;
      this.secretKey = process.env.R2_SECRET_KEY;
      this.publicUrl = process.env.R2_PUBLIC_URL;

      this.client = null;
   }

   ensureConfigured() {
      const missingEnv = [
         [ "R2_BUCKET", this.bucket ],
         [ "R2_ENDPOINT", this.endpoint ],
         [ "R2_ACCESS_KEY", this.accessKey ],
         [ "R2_SECRET_KEY", this.secretKey ],
         [ "R2_PUBLIC_URL", this.publicUrl ],
      ]
         .filter(([, value]) => !value)
         .map(([name]) => name);

      if (missingEnv.length > 0) {
         const error = new Error(`Missing R2 configuration: ${missingEnv.join(", ")}`);
         error.status = 500;
         throw error;
      }

      if (!this.client) {
         this.client = new S3Client({
            region: "auto",
            endpoint: this.endpoint,
            credentials: {
               accessKeyId: this.accessKey,
               secretAccessKey: this.secretKey,
            },
         });
      }
   }

   generateKey(userId, originalName) {
      const ext = originalName.split(".").pop();
      const random = crypto.randomUUID();

      return `users/${userId}/${random}.${ext}`;
   }

   async upload(file, userId) {
      this.ensureConfigured();

      const key = this.generateKey(userId, file.originalname);

      await this.client.send(new PutObjectCommand({
         Bucket: this.bucket,
         Key: key,
         Body: file.buffer,
         ContentType: file.mimetype
      }));

      return {
         id: key,
         url: `${this.publicUrl}/${key}`,
         size: file.size,
         type: file.mimetype
      };
   }

   async delete(key) {
      this.ensureConfigured();

      await this.client.send(new DeleteObjectCommand({
         Bucket: this.bucket,
         Key: key
      }));
   }

   getPublicUrl(key) {
      this.ensureConfigured();

      return `${this.publicUrl}/${key}`;
   }
}

module.exports = new R2Storage();