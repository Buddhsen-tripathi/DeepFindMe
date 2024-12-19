'use client';

import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { useDropzone } from 'react-dropzone'; // Import useDropzone
import { FileUp } from 'lucide-react'; // Icon for upload

export default function ImageAnalysis() {
  const [file, setFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
      setError(null); // Reset error when file is selected
    },
  });

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast({
        title: 'No File Selected',
        description: 'Please select an image file before submitting.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setAnalysisResult(null);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/image-location`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 || response.status === 201) {
        setAnalysisResult(response.data);
        toast({
          title: 'Analysis Complete',
          description: 'Check out the result below!',
        });
      } else {
        throw new Error('Failed to analyze the image.');
      }
    } catch (err: any) {
      setError('Failed to upload and analyze the image.');
      toast({
        title: 'Upload Failed',
        description: 'Something went wrong. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6 text-center text-white">
          Satellite Street View Search
        </h1>
        <p className="text-lg mb-8 text-center text-gray-300">
          Upload an image to analyze its content and attempt to determine the location. <br />
          The AI uses the image's content for analysis, so results may not always be accurate.
        </p>

        <Card className="max-w-md mx-auto bg-black bg-opacity-50 border border-cyan-500 hover:border-cyan-400">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-cyan-400">Upload Your Image</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed border-cyan-500 rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? 'border-cyan-400 bg-cyan-900 bg-opacity-20'
                  : 'hover:border-cyan-400 hover:bg-cyan-900 hover:bg-opacity-10'
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
                      setAnalysisResult(null);
                    }}
                    className="ml-2 text-gray-400 hover:text-white"
                  >
                    <span className="text-xl">×</span> {/* X to remove file */}
                  </button>
                </div>
              ) : (
                <p className="text-gray-300">
                  {isDragActive
                    ? 'Drop the file here'
                    : "Drag 'n' drop a file here, or click to select a file"}
                </p>
              )}
            </div>
            <p className="text-sm text-gray-400 mt-2 text-center">Maximum file size: 10MB</p>
            <div className="mt-4 text-center">
              <Button
                onClick={handleUpload}
                disabled={!file || loading}
                className="bg-cyan-500 text-black hover:bg-cyan-400"
              >
                {loading ? 'Analyzing...' : 'Upload & Analyze'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg mt-4">
            {error}
          </div>
        )}

        {analysisResult && (
          <div className="text-center mt-8 text-gray-200">
            <h2 className="text-xl font-semibold mb-4">Analysis Result</h2>
            <p className="bg-gray-800 p-4 rounded-lg">{analysisResult}</p>
          </div>
        )}

        <p className="text-sm text-gray-400 text-center mt-8">
          <em>Note:</em> Your uploaded image will be processed securely and will not be stored.
        </p>
      </div>
    </section>
  );
}