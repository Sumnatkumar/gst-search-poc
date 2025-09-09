import React from 'react';
import { Card, Table, Badge } from 'react-bootstrap';

const GSTResults = ({ searchResults }) => {
  if (searchResults.length === 0) {
    return (
      <Card>
        <Card.Body className="text-center">
          <p>No results to display. Perform a search to see GST data.</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Header as="h5">Search Results</Card.Header>
      <Card.Body>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>GSTIN</th>
              <th>Legal Name</th>
              <th>Trade Name</th>
              <th>State</th>
              <th>Status</th>
              <th>Business Type</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((item) => (
              <tr key={item._id}>
                <td>{item.gstin}</td>
                <td>{item.legalName}</td>
                <td>{item.tradeName || 'N/A'}</td>
                <td>{item.state}</td>
                <td>
                  <Badge bg={item.status === 'Active' ? 'success' : 'secondary'}>
                    {item.status}
                  </Badge>
                </td>
                <td>{item.businessType}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default GSTResults;