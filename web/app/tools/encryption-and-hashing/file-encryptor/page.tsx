'use client';

import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { useDropzone } from 'react-dropzone';
import { FileUp, Lock, Unlock } from 'lucide-react';

export default function FileEncryptor() {
  const [file, setFile] = useState<File | null>(null);
  const [operation, setOperation] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processedFile, setProcessedFile] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'application/pdf': [], 'image/*': [], 'application/msword': [] },
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
      setError(null);
      setProcessedFile(null);
    },
  });

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: 'No File Selected',
        description: 'Please select a file before proceeding.',
        variant: 'destructive',
      });
      return;
    }
  
    setLoading(true);
    setError(null);
    setProcessedFile(null);
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/file-encryptor?operation=${operation}`,
        formData,
        { responseType: 'blob' } // Fix: Receive binary response as a blob
      );
  
      if (response.status === 200 || response.status === 201) {
        // Create a Blob from the binary response
        const blob = new Blob([response.data], { type: file.type });
  
        // Generate a temporary download URL
        const downloadUrl = URL.createObjectURL(blob);
        setProcessedFile(downloadUrl);
  
        toast({
          title: 'Operation Successful',
          description: `File has been ${operation}ed successfully!`,
        });
      } else {
        throw new Error('Operation failed.');
      }
    } catch (err: any) {
      console.error('Error:', err.message);
      setError('Error processing the file.');
      toast({
        title: 'Operation Failed',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };  

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6 text-center text-cyan-500">
          File Encryptor Tool
        </h1>
        <p className="text-lg mb-8 text-center text-gray-300">
          Securely encrypt or decrypt files (PDF, DOC, Images). Your data remains private.
        </p>

        <Card className="max-w-md mx-auto bg-black bg-opacity-50 border border-cyan-500 hover:border-cyan-400">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-cyan-400">Choose Operation</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center gap-4">
            <Button
              onClick={() => setOperation('encrypt')}
              className={`px-6 py-2 flex items-center gap-2 ${operation === 'encrypt' ? 'bg-cyan-500 text-black' : 'bg-gray-700 text-gray-300'
                }`}
            >
              <Lock className="w-5 h-5" />
              Encrypt
            </Button>
            <Button
              onClick={() => setOperation('decrypt')}
              className={`px-6 py-2 flex items-center gap-2 ${operation === 'decrypt' ? 'bg-cyan-500 text-black' : 'bg-gray-700 text-gray-300'
                }`}
            >
              <Unlock className="w-5 h-5" />
              Decrypt
            </Button>
          </CardContent>
        </Card>

        <Card className="max-w-md mx-auto mt-6 bg-black bg-opacity-50 border border-cyan-500 hover:border-cyan-400">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-cyan-400">Upload Your File</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed border-cyan-500 rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive
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
                      setProcessedFile(null);
                    }}
                    className="ml-2 text-gray-400 hover:text-white"
                  >
                    <span className="text-xl">×</span>
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
            <p className="text-sm text-gray-400 mt-2 text-center">Supported formats: PDF, DOC, Images</p>

            <div className="mt-4 text-center">
              <Button
                onClick={handleUpload}
                disabled={!file || loading}
                className="bg-cyan-500 text-black hover:bg-cyan-400"
              >
                {loading ? 'Processing...' : 'Upload & Process'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg mt-4 text-center">
            {error}
          </div>
        )}

        {processedFile && (
          <div className="text-center mt-8 text-gray-200">
            <h2 className="text-xl font-semibold mb-4">Download Processed File</h2>
            <a
              href={processedFile}
              download={`processed-${file?.name}`} // Preserves original filename
              className="bg-cyan-500 text-black px-4 py-2 rounded-lg hover:bg-cyan-400"
            >
              Download File
            </a>
          </div>
        )}

        <p className="text-sm text-gray-400 text-center mt-8">
          <em>Note:</em> Your uploaded file is processed securely and not stored.
        </p>
      </div>
    </section>
  );
}