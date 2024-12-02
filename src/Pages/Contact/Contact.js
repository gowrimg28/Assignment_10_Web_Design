import { Container, Form, Button, Card } from "react-bootstrap";

function Contact() {

    
  return (
    <div>
    <br />
    <br />
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Contact Us</Card.Title>
          <Card.Text>
            Have a question or need assistance? Reach out to us, and we'll be
            happy to find a job for you!
          </Card.Text>

          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Your Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Label>Your Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Type your message here"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
    </div>
  );
}

export default Contact;
