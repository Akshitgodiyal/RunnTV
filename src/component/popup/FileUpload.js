import React, { useState, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import './FileUpload.scss';
import { CMS_Uplaod } from '../../service/API_URL';
import instance from '../../service/axiosConfig';

function FileUpload({ onUpload, acceptedFormats }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedFile(file);
    const URL = CMS_Uplaod;

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Define query parameters in the request configuration
      const params = {
        partnerCode: 'AAJTAK',
        assetType: 'VIDEO',
        videoType: 'PROGRAM',
      };

      const response = await instance.post(URL, formData, {
        params, // Include query parameters here
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(percentCompleted);
        },
      });

      // Do something with the response, e.g., update the UI or call a callback function.
      onUpload(response.data);
    } catch (error) {
      console.error('File upload error:', error);
    }
  };

  useEffect(() => {
    // Trigger a click on the file input element when the component is mounted
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptedFormats,
  });

  return (
    <div>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} ref={fileInputRef} style={{ display: "none" }} />
        {/* Render a button or other UI element to trigger the file input */}
        <button onClick={() => fileInputRef.current.click()}>Open File Upload</button>
      </div>
      {uploadedFile && (
        <div>
          <h3>Uploaded File:</h3>
          <p>{uploadedFile.name}</p>
          {uploadProgress > 0 && (
            <div>
              <h3>Upload Progress:</h3>
              <progress value={uploadProgress} max="100" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FileUpload;
