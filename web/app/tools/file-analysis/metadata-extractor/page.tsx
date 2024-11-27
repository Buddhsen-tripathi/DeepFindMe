"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUp, File, AlertCircle, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import * as dotenv from 'dotenv'

dotenv.config()

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

const EXCLUDED_KEYS = ["SourceFile", "Directory", "errors", "warnings","SpecialInstructions"];

function formatDate(date: any): string {
  if (!date) return "N/A";
  const { year, month, day, hour, minute, second } = date;
  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")} ${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
}

function flattenAndFilterMetadata(metadata: any) {
  const filtered: Record<string, string> = {};

  for (const key in metadata) {
    if (EXCLUDED_KEYS.includes(key)) continue;

    const value = metadata[key];
    if (value && typeof value === "object" && value._ctor === "ExifDateTime") {
      filtered[key] = formatDate(value);
    } else if (value && typeof value !== "object") {
      filtered[key] = value.toString();
    } else {
      filtered[key] = "N/A";
    }
  }

  return filtered;
}

export default function MetadataExtractor() {
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles[0]) {
      const selectedFile = acceptedFiles[0];
      if (selectedFile.size > MAX_FILE_SIZE) {
        setError("File size exceeds the maximum limit of 10MB. Please choose a smaller file.");
        setFile(null);
      } else {
        setFile(selectedFile);
        setMetadata(null);
        setError(null);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: MAX_FILE_SIZE,
    multiple: false,
  });

  const extractMetadata = async () => {
    if (!file) {
      setError("Please select a file to analyze.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/metadata-extractor`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data) {
        setMetadata(flattenAndFilterMetadata(response.data));
      } else {
        throw new Error("Invalid response from server.");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "An unexpected error occurred.");
      } else if (err instanceof Error) {
        setError(err.message || "An unknown error occurred.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4 text-center text-white">Metadata Extractor</h1>
        <p className="text-xl mb-8 text-center text-gray-300">
          Upload a file to extract its metadata. Supports images, videos, audio files, and documents.
        </p>
        <div className="max-w-xl mx-auto mb-8">
          <Card className="bg-black bg-opacity-50 border border-cyan-500">
            <CardContent className="p-6">
              <div
                {...getRootProps()}
                className={`border-2 border-dashed border-cyan-500 rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? "border-cyan-400 bg-cyan-900 bg-opacity-20"
                    : "hover:border-cyan-400 hover:bg-cyan-900 hover:bg-opacity-10"
                }`}
              >
                <input {...getInputProps()} />
                <FileUp className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                {file ? (
                  <div className="flex items-center justify-center">
                    <span className="text-cyan-400">{file.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                        setMetadata(null);
                      }}
                      className="ml-2 text-gray-400 hover:text-white"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-300">
                    {isDragActive
                      ? "Drop the file here"
                      : "Drag 'n' drop a file here, or click to select a file"}
                  </p>
                )}
              </div>
              <p className="text-sm text-gray-400 mt-2 text-center">Maximum file size: 10MB</p>
              <div className="mt-4 text-center">
                <Button
                  onClick={extractMetadata}
                  disabled={!file || loading}
                  className="bg-cyan-500 text-black hover:bg-cyan-400"
                >
                  {loading ? "Extracting..." : "Extract Metadata"}
                </Button>
              </div>
            </CardContent>
          </Card>
          {error && (
            <div className="bg-red-500 text-white p-4 rounded-lg mt-4 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>
        {metadata && (
          <Card className="bg-black bg-opacity-50 border border-cyan-500 hover:border-cyan-400 transition-colors group hover:bg-cyan-900 hover:bg-opacity-20">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-cyan-400 flex items-center">
                <File className="w-12 h-12 text-cyan-400" />
                <span className="ml-4">{metadata.FileName}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(metadata).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-white font-semibold">{key}: </span>
                    <span className="text-gray-300">{value ?? "N/A"}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
