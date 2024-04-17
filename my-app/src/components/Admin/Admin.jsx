import { useState } from "react";
import React from "react";
import LanguageToggleButton from "./Togglebutton";
import { Container, Nav, NavLink, Row, Col } from "react-bootstrap";

// Import the components for different sections
// import Home from "./Home";
import Tests from "./Tests";
import Users from "./Users";
import Category from "./Categories";
import Candidates from "./Candidates";
// import Categories from "./Categories";
// import Candidates from "./Candidates";
import ViewTestResult from "./ViewTestResult";
import Company from "./Company";

// import ViewCustomerAccount from "./ViewCustomerAccount";

const Dashboard = () => {
  const [activeLink, setActiveLink] = useState("");
  const [language, setLanguage] = useState("english");

  const handleClick = (link) => {
    setActiveLink(link);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    console.log("New language:", newLanguage);
    // You can add logic here to change the language in your application
  };

  const handleLogout = () => {
    // Add logout logic here
  };
  // Define components for different sections
  const sections = {
    // "/": <Home />,
    "/Users": <Users />,
    "/Tests": <Tests />,
    "/Categories": <Category />,
    "/Candidates": <Candidates />,
    "/View-Test-Result": <ViewTestResult />,
    "/View-Customer-Account": <Company />,
  };

  return (
    <div>
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

              {/* <NavLink
                to="/view-test-result"
                className={`nav-link ${
                  activeLink === "/view-test-result" ? "bg-dark text-light" : ""
                } mb-3`}
                onClick={() => handleClick("/view-test-result")}
              >
                Candidates
              </NavLink> */}

              {/* <NavLink
                to="/view-test-result"
                className={`nav-link ${
                  activeLink === "/view-test-result" ? "bg-dark text-light" : ""
                } mb-3`}
                onClick={() => handleClick("/view-test-result")}
              >
                View Test Result (Candidates)
              </NavLink> */}
              {/* <NavLink
                to="/view-customer-account"
                className={`nav-link ${
                  activeLink === "/view-customer-account"
                    ? "bg-dark text-light"
                    : ""
                } mb-3`}
                onClick={() => handleClick("/view-customer-account")}
              >
                View Customer Account (Company)
              </NavLink> */}
            </Nav>
          </Col>

          {/* Main Section */}
          <Col md={9} className="pt-3">
            <LanguageToggleButton
              language={language} // Pass the language state directly
              onLanguageChange={handleLanguageChange}
              onLogout={handleLogout}
            />
            {sections[activeLink]}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
