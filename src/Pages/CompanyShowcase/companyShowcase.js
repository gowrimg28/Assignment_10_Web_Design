import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";

function CompanyShowcase() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/images/gallery"); // GET API to fetch data
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div>
      <br />
      <br />
      <Container>
        <Card>
          <Card.Body>
            <Card.Title>Company Showcase</Card.Title>
            <Card.Text>
              Discover companies and learn more about potential employers. Explore
              the opportunities they offer and connect with top industry leaders.
            </Card.Text>

            <Row>
              {companies.map((company) => (
                <Col key={company._id} md={4} className="mb-4">
                  <Card>
                    <Card.Img
                      variant="top"
                      src={`http://localhost:5000${company.path}`} // Image path from MongoDB
                      alt={`${company.name} logo`}
                    />
                    <Card.Body>
                      <Card.Title>{company.name}</Card.Title>
                      <Card.Text>{company.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default CompanyShowcase;
