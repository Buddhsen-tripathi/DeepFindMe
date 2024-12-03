import { Injectable } from '@nestjs/common';
import { exiftool } from 'exiftool-vendored';
import * as ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class MetadataService {
  // Extract EXIF metadata
  private async extractExifData(filePath: string) {
    try {
      const metadata = await exiftool.read(filePath);
      const gpsData = metadata['GPSLatitude'] && metadata['GPSLongitude']
        ? {
            latitude: metadata['GPSLatitude'],
            longitude: metadata['GPSLongitude'],
            altitude: metadata['GPSAltitude'] || undefined,
          }
        : undefined;

      return {
        ...metadata,
        gpsData,
      };
    } catch (error) {
      console.error('ExifTool error:', error);
      return { error: 'Failed to extract EXIF data.' };
    }
  }

  // Extract video metadata
  private async extractVideoMetadata(filePath: string): Promise<Record<string, any>> {
    return new Promise((resolve) => {
      ffmpeg(filePath)
        .ffprobe((err, data) => {
          if (err) {
            console.error('FFmpeg error:', err);
            resolve({ error: 'Failed to extract video metadata.' });
          } else {
            const { streams } = data;
            const videoStream = streams.find((s) => s.codec_type === 'video');
            const audioStream = streams.find((s) => s.codec_type === 'audio');
            resolve({
              dimensions: videoStream
                ? `${videoStream.width}x${videoStream.height}`
                : undefined,
              duration: data.format.duration
                ? `${Math.floor(data.format.duration / 60)}:${Math.floor(
                    data.format.duration % 60,
                  )}`
                : undefined,
              bitrate: data.format.bit_rate
                ? `${(data.format.bit_rate / 1024).toFixed(2)} kbps`
                : undefined,
              codec: videoStream?.codec_name,
              audioCodec: audioStream?.codec_name,
              frameRate: videoStream?.r_frame_rate,
            });
          }
        });
    });
  }

  // Extract audio metadata
  private async extractAudioMetadata(filePath: string): Promise<Record<string, any>> {
    return new Promise((resolve) => {
      ffmpeg(filePath)
        .ffprobe((err, data) => {
          if (err) {
            console.error('FFmpeg error:', err);
            resolve({ error: 'Failed to extract audio metadata.' });
          } else {
            const audioStream = data.streams.find((s) => s.codec_type === 'audio');
            resolve({
              duration: data.format.duration
                ? `${Math.floor(data.format.duration / 60)}:${Math.floor(
                    data.format.duration % 60,
                  )}`
                : undefined,
              bitrate: data.format.bit_rate
                ? `${(data.format.bit_rate / 1024).toFixed(2)} kbps`
                : undefined,
              codec: audioStream?.codec_name,
              channels: audioStream?.channels,
              sampleRate: audioStream?.sample_rate,
            });
          }
        });
    });
  }

  // Main metadata extraction handler
  async extractMetadata(filePath: string) {
    let metadata = {};
    const fileExtension = path.extname(filePath).toLowerCase();

    try {
      // Extract EXIF data
      metadata = await this.extractExifData(filePath);

      // Extract video-specific metadata
      if (fileExtension.match(/\.(mp4|mkv|avi|mov|wmv|flv|webm)$/)) {
        const videoMetadata = await this.extractVideoMetadata(filePath);
        metadata = {
          ...metadata,
          ...(videoMetadata || {}),
        };
      }

      // Extract audio-specific metadata
      if (fileExtension.match(/\.(mp3|wav|flac|aac|ogg)$/)) {
        const audioMetadata = await this.extractAudioMetadata(filePath);
        metadata = {
          ...metadata,
          ...(audioMetadata || {}),
        };
      }
    } catch (error) {
      console.error('Error extracting metadata:', error);
      metadata = { error: 'An unexpected error occurred while processing the file.' };
    } finally {
      // Cleanup uploaded file
      try {
        await fs.unlink(filePath);
      } catch (cleanupError) {
        console.error('Error cleaning up uploaded file:', cleanupError);
      }
    }

    return metadata;
  }
}