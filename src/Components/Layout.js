import {
    Outlet,
    Link
  } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Layout({user, handleLogout}){
  if(user){
    if(user.user_type == 'employee'){
      return (
      
        <>
          <Navbar bg="dark" data-bs-theme="dark">
            <Container>
            <Navbar.Brand as={Link} to="/">Job Portal</Navbar.Brand>
  
              {user ? (
                <>
                  {/* Conditionally render these items for authenticated users */}
                  <Nav className="me-auto navbar-collapse justify-content-end">
                    <Link to="/home" className="nav-link">
                      Home
                    </Link>
                    <Link to="/about" className="nav-link">About</Link>
                    <Link to="/job-listings" className="nav-link">
                      Job Listings
                    </Link>
                    <Link to="/contact" className="nav-link">
                      Contact
                    </Link>
                    <Link to="/company-showcase" className="nav-link">
                      Company Showcase
                    </Link>
                    <Link to="/login" className="nav-link" onClick={handleLogout}>
                      Logout
                    </Link>
                  </Nav>
                </>
              ) : (
                <Nav className="me-auto navbar-collapse justify-content-end">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </Nav>
              )}
            </Container>
          </Navbar>
          <Outlet />
        </>
      );
    }
    if(user.user_type == 'admin'){
      return (
      
        <>
          <Navbar bg="dark" data-bs-theme="dark">
            <Container>
              <Navbar.Brand href="">Job Portal</Navbar.Brand>
  
              {user ? (
                <>
                  {/* Conditionally render these items for authenticated users */}
                  <Nav className="me-auto navbar-collapse justify-content-end">                   
                    <Link to="/employees" className="nav-link">
                      Employees
                    </Link>
                    <Link to="/addjob" className="nav-link">
                      Add Jobs
                    </Link>
                    <Link to="/login" className="nav-link" onClick={handleLogout}>
                      Logout
                    </Link>
                  </Nav>
                </>
              ) : (
                <Nav className="me-auto navbar-collapse justify-content-end">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </Nav>
              )}
            </Container>
          </Navbar>
          <Outlet />
        </>
      );
  }
}
else{
  return(
    <>
          <Navbar bg="dark" data-bs-theme="dark">
            <Container>
              <Navbar.Brand href="">Job Portal</Navbar.Brand>
  
              
                <Nav className="me-auto navbar-collapse justify-content-end">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </Nav>
         
            </Container>
          </Navbar>
          <Outlet />
        </>
    
  );

}
    
}

export default Layout;