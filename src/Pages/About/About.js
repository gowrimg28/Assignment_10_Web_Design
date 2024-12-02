import { Container, Card, ListGroup } from "react-bootstrap";
import aboutusImage from '../../Pages/aboutus.jpg';


function About() {
  return (
    <>
    
        
   
   
    <h1>About Us</h1>
    <div class="about-content">
        <img src={aboutusImage} alt="Job Portals" />
        <p>
        Welcome to JobPortal, your trusted platform for career growth and opportunities. We are dedicated to bridging the gap between job seekers and employers, making it easier for you to find the right job or talent.
    </p>
    <p>
        At JobPortal, we offer a comprehensive range of services to support both job seekers and employers. Our advanced job-matching algorithms ensure that you get tailored job recommendations based on your skills, experience, and career aspirations.
    </p>
    <p>
        For employers, our platform provides an efficient recruitment solution, allowing you to post jobs, review applications, and connect with top candidates effortlessly. We aim to simplify the hiring process, so you can focus on finding the right fit for your organization.
    </p>
    <p>
        We understand the importance of professional development, which is why we also offer resources and tips for resume building, interview preparation, and career advancement. Our mission is to empower you with the tools you need to succeed in today's competitive job market.
    </p>
    <p>
        Whether you're just starting your career or looking for a new opportunity, JobConnect is here to help you every step of the way. Join us and take the next step towards achieving your career goals.
    </p>
    </div>

   
      
    </>
    
  );
}

export default About;



