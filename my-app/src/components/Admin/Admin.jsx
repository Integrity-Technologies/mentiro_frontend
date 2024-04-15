import { useState } from "react";
import React from "react";
import { Container, Navbar, Nav, NavLink, Row, Col } from "react-bootstrap";

// Import the components for different sections
// import Home from "./Home";
import Tests from "./Tests";
import Users from "./Users";
import Category from "./Categories";
// import Categories from "./Categories";
// import Candidates from "./Candidates";
// import ViewTestResult from "./ViewTestResult";
// import ViewCustomerAccount from "./ViewCustomerAccount";

const Dashboard = () => {
  const [activeLink, setActiveLink] = useState("");

  const handleClick = (link) => {
    setActiveLink(link);
  };

  // Define components for different sections
  const sections = {
    // "/": <Home />,
    "/Tests": <Tests />,
    "/Users": <Users />,
   "/Categories": <Category />,
    // "/candidates": <Candidates />,
    // "/view-test-result": <ViewTestResult />,
    // "/view-customer-account": <ViewCustomerAccount />,
  };

  return (
    <>
      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col md={3} className="bg-light border-end vh-100">
            <Nav className="flex-column">
              <NavLink
                to="/"
                className={`nav-link ${
                  activeLink === "/" ? "bg-dark text-light" : ""
                } mb-3`}
                onClick={() => handleClick("/")}
              >
                Home
              </NavLink>
              {Object.keys(sections).map((link) => (
                <NavLink
                  key={link}
                  to={link}
                  className={`nav-link ${
                    activeLink === link ? "bg-dark text-light" : ""
                  } mb-3`}
                  onClick={() => handleClick(link)}
                >
                  {link === "/Users" ? "Users" : link.replace("/", "")}
                </NavLink>
))}


              <NavLink
                to="/view-test-result"
                className={`nav-link ${
                  activeLink === "/view-test-result" ? "bg-dark text-light" : ""
                } mb-3`}
                onClick={() => handleClick("/view-test-result")}
              >
                View Test Result (Candidates)
              </NavLink>
              <NavLink
                to="/view-customer-account"
                className={`nav-link ${
                  activeLink === "/view-customer-account"
                    ? "bg-dark text-light"
                    : ""
                } mb-3`}
                onClick={() => handleClick("/view-customer-account")}
              >
                View Customer Account (Company)
              </NavLink>
            </Nav>
          </Col>

          {/* Main Section */}
          <Col md={9} className="pt-3">
            {sections[activeLink]}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
