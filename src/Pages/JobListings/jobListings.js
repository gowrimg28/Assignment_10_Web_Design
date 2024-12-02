import { Container, Card, Row, Col, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

function JobListings() {
  const [jobPosts, setJobPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Fetch job data from the API
        const response = await axios.get("http://localhost:5000/api/get/jobs");
        setJobPosts(response.data); // Update the state with fetched data
        setLoading(false); // Set loading to false
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load job listings. Please try again later.");
        setLoading(false); // Set loading to false even on error
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <Container className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading job listings...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center">
        <p className="text-danger">{error}</p>
      </Container>
    );
  }

  return (
    <div>
      <br />
      <br />
      <Container>
        <Card>
          <Card.Body>
            <Card.Title>Job Listings</Card.Title>
            <Card.Text>
              Browse through our job listings to find a role that matches your
              skills and career goals.
            </Card.Text>

            <Row>
              {jobPosts.map((job, index) => (
                <Col key={index} md={4} className="mb-4">
                  <Card>
                    <Card.Body>
                      <Card.Title>{job.jobTitle}</Card.Title>
                      <Card.Text>
                        <strong>Company:</strong> {job.companyName}
                      </Card.Text>
                      <Card.Text>
                        <strong>Description:</strong> {job.description}
                      </Card.Text>
                      <Card.Text>
                        <strong>Salary:</strong> ${job.salary}
                      </Card.Text>
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

export default JobListings;
