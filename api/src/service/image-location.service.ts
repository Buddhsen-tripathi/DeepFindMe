import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import OpenAI from "openai";
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class ImageService {
    private s3: S3;
    private openai: OpenAI;

    constructor() {
        // Initialize AWS S3
        this.s3 = new S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
        });

        // Initialize OpenAI API Helper
        this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    }

    async uploadImageToS3(file: Express.Multer.File): Promise<string> {
        const bucketName = process.env.AWS_S3_BUCKET_NAME;
        const fileExtension = file.originalname.split('.').pop(); // Extract file extension
        const baseFileName = file.originalname.replace(/\.[^/.]+$/, ''); // Remove the extension from the original name
        const uniqueFileName = `${baseFileName}-${uuidv4()}.${fileExtension}`; // Append UUID to ensure uniqueness
        const fileKey = `satelite-image/${uniqueFileName}`; // Ensure the file is uploaded to the 'satelite-image' folder

        try {
            await this.s3
                .upload({
                    Bucket: bucketName,
                    Key: fileKey,
                    Body: file.buffer,
                    ContentType: file.mimetype,
                })
                .promise();

            return `https://${bucketName}.s3.amazonaws.com/${fileKey}`;
        } catch (error) {
            throw new HttpException(
                `Failed to upload image to S3: ${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async analyzeImageWithOpenAI(imageUrl: string): Promise<string> {
        try {
            const response = await this.openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [{
                    role: 'user',
                    content: [
                        { type: 'text', text: `Based on the image, look for the clues in the picture and make a guess where the location could be. Only reply with estimated coordinates and nearest city and nothing else` },
                        { type: 'image_url', image_url: { 'url': imageUrl } }
                    ]
                }],
            });

            console.log(response.choices[0].message.content);

            if (typeof response === 'string') {
                return response;
            }

            // Handle ResultType 0 (JSON response) for completeness
            if (response && typeof response === 'object' && response) {
                return response.choices?.[0]?.message.content || 'No result found';
            }

            throw new Error('Unexpected response format from OpenAI API');
        } catch (error) {
            throw new HttpException(
                `Failed to analyze image with OpenAI: ${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async handleImage(file: Express.Multer.File): Promise<string> {
        const imageUrl = await this.uploadImageToS3(file);
        return this.analyzeImageWithOpenAI(imageUrl);
    }
}
