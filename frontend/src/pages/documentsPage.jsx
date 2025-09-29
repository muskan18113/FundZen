import React, { useState, useEffect, useCallback } from 'react';
import apiService from '../api/apiService'; // Import the new axios instance
import { UploadCloud, FileText, Download, Trash2, AlertCircle } from 'lucide-react';

const DocumentsPage = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const fetchDocuments = useCallback(async () => {
    try {
      setLoading(true);
      // Use apiService.get() - axios wraps the response in a `data` object
      const response = await apiService.get('/documents');
      if (response.data.success) {
        setDocuments(response.data.data.documents);
      }
    } catch (err) {
      setError('Failed to fetch documents.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('document', file);
    
    try {
      // Use apiService.post() for uploading
      const response = await apiService.post('/documents/upload', formData);
      if (response.data.success) {
        setFile(null);
        document.querySelector('input[type="file"]').value = '';
        fetchDocuments(); // Refresh the list
      } else {
        setError(response.data.message || 'Upload failed.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during upload.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      try {
        // Use apiService.delete() for deletion
        await apiService.delete(`/documents/${id}`);
        fetchDocuments(); // Refresh the list
      } catch (err) {
        alert("Failed to delete document.");
      }
    }
  };
  
  const handleDownload = async (doc) => {
     try {
        // For file downloads with axios, specify the `responseType`
        const response = await apiService.get(`/documents/${doc._id}/download`, {
          responseType: 'blob',
        });
        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = doc.originalName || 'document';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
     } catch (err) {
        alert("Failed to download document.");
     }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Document Manager</h1>

      {/* Upload Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Upload New Statement</h2>
        <div className="flex items-center space-x-4">
          <input type="file" onChange={handleFileChange} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
          <button onClick={handleUpload} disabled={isUploading || !file} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 disabled:bg-gray-400 shrink-0">
            <UploadCloud size={18} />
            <span>{isUploading ? 'Uploading...' : 'Upload'}</span>
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2 flex items-center"><AlertCircle size={16} className="mr-1"/>{error}</p>}
      </div>

      {/* Document List */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Uploaded Documents</h2>
        {loading ? (
          <p>Loading documents...</p>
        ) : (
          <div className="space-y-3">
            {documents.length > 0 ? documents.map(doc => (
              <div key={doc._id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{doc.originalName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {(doc.fileSize / 1024).toFixed(2)} KB • Uploaded on {new Date(doc.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${doc.status === 'processed' ? 'bg-green-100 text-green-800' : doc.status === 'failed' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {doc.status}
                  </span>
                  <button onClick={() => handleDownload(doc)} className="p-2 text-gray-500 hover:text-blue-600"><Download size={18} /></button>
                  <button onClick={() => handleDelete(doc._id)} className="p-2 text-gray-500 hover:text-red-600"><Trash2 size={18} /></button>
                </div>
              </div>
            )) : <p className="text-gray-500">No documents uploaded yet.</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentsPage;