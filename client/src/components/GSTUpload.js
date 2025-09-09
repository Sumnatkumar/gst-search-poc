import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { uploadCSV } from '../services/api';

const GSTUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setVariant('danger');
      setMessage('Please select a file first');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await uploadCSV(formData);
      setVariant('success');
      setMessage(`File uploaded successfully. ${response.data.records} records processed.`);
      setFile(null);
      // Clear file input
      document.getElementById('csvFile').value = '';
    } catch (error) {
      setVariant('danger');
      setMessage('Error uploading file: ' + (error.response?.data?.message || error.message));
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card>
      <Card.Header as="h5">Upload GST Data CSV</Card.Header>
      <Card.Body>
        {message && <Alert variant={variant}>{message}</Alert>}
        
        <Form onSubmit={handleUpload}>
          <Form.Group controlId="csvFile" className="mb-3">
            <Form.Label>Select CSV File</Form.Label>
            <Form.Control
              type="file"
              accept=".csv"
              onChange={handleFileChange}
            />
            <Form.Text className="text-muted">
              CSV should contain columns: gstin, legalName, tradeName, registrationDate, state, businessType, status, address
            </Form.Text>
          </Form.Group>
          
          <Button 
            variant="primary" 
            type="submit" 
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload CSV'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default GSTUpload;