import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import GSTSearch from './components/GSTSearch';
import GSTUpload from './components/GSTUpload';
import GSTResults from './components/GSTResults';
import { Container, Nav, Navbar} from 'react-bootstrap';


function App() {
  const [activeTab, setActiveTab] = useState('search');
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">GST Search - POC</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link 
                active={activeTab === 'search'} 
                onClick={() => setActiveTab('search')}
              >
                Search
              </Nav.Link>
              <Nav.Link 
                active={activeTab === 'upload'} 
                onClick={() => setActiveTab('upload')}
              >
                Upload CSV
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="my-4">
        {activeTab === 'search' && (
          <>
            <GSTSearch setSearchResults={setSearchResults} />
            <GSTResults searchResults={searchResults} />
          </>
        )}
        {activeTab === 'upload' && <GSTUpload />}
      </Container>
    </div>
  );
}

export default App;
