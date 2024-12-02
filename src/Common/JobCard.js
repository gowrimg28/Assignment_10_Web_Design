import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";

function JobCard({ title, location, description}) {
  return (
    <div>   
    <Card style={{ width: "22rem", margin: "0 auto", height: "300px" }}className="job-card">
      <Card.Body className="text-center">
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{location}</Card.Subtitle>
        <br/>
        <Card.Text>{description}</Card.Text>
        {/* Add other job details as needed */}
        <br/>
        <Button variant="primary" style={{margin: "0 auto"}}>Apply Now</Button>
      </Card.Body>
    </Card>
    <br />
    </div>
  );
}

export default JobCard;