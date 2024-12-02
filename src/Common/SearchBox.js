import { useState } from "react";
import { InputGroup, FormControl, Button, Row, Col } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

function SearchBox({ onSearch }){

    const [searchTerm, setSearchTerm] = useState("");
    const [location, setLocation] = useState("");

    const handleSubmit = (event) => {
      event.preventDefault();

      onSearch && onSearch(searchTerm, location);
      
    };

    return (
      <div>
        <br />
        <h4>Welcome to Indeed !</h4>
        <br />
        <Row className="justify-content-md-center">
          <Col md={8}>
            <form onSubmit={handleSubmit}>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Job title, keywords, or company"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ marginRight: "20px", borderRadius: "10px" }}
                />
                <FormControl
                  placeholder="City, state, zip code"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={{ marginRight: "20px", borderRadius: "10px" }}
                />
                <Button type="submit" variant="primary">
                  <FaSearch />
                </Button>
              </InputGroup>
            </form>
          </Col>
        </Row>
      </div>
    );
}

export default SearchBox;