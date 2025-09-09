import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { searchGST } from '../services/api';

const GSTSearch = ({ setSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await searchGST(searchQuery);
      setSearchResults(response.data.gstData || []);
    } catch (error) {
      console.error('Search error:', error);
      alert('Error searching GST data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-4">
      <Card.Header as="h5">GST Search</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSearch}>
          <Row>
            <Col md={8}>
              <Form.Group controlId="searchQuery">
                <Form.Label>Search by GSTIN, Legal Name, or Trade Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter GSTIN, legal name, or trade name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4} className="d-flex align-items-end">
              <Button 
                variant="primary" 
                type="submit" 
                disabled={loading}
                className="w-100"
              >
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default GSTSearch;