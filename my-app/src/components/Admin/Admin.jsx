import React, { useState } from "react";
import { Container, Nav, NavLink, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import LanguageToggleButton from "../Togglebutton";
import Users from "./Users"; // Import the Users component
import Tests from "./Tests";
import Category from "./Categories";
import Candidates from "./Candidates";
import ViewTestResult from "./ViewTestResult";
import Company from "./Company";

const Dashboard = () => {
  const { t, i18n } = useTranslation();

  const [activeLink, setActiveLink] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleLanguageChange = (lng) => {
    setSelectedLanguage(lng);
  };

  const handleClick = (link) => {
    setActiveLink(link);
  };

  const sections = {
    "/Users": (
      <Users
        language={selectedLanguage}
        onLanguageChange={handleLanguageChange}
      />
    ), // Pass language and onLanguageChange props to Users component
    "/Tests": (
      <Tests
        language={selectedLanguage}
        onLanguageChange={handleLanguageChange}
      />
    ),
    "/Categories": <Category />,
    "/Candidates": <Candidates />,
    "/View-Test-Result": <ViewTestResult />,
    "/View-Customer-Account": <Company />,
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <Col md={3} className="bg-light border-end vh-100">
            <Nav className="flex-column">
              {Object.keys(sections).map((link) => (
                <NavLink
                  key={link}
                  to={link}
                  className={`nav-link ${
                    activeLink === link ? "bg-dark text-light" : ""
                  } mb-3`}
                  onClick={() => handleClick(link)}
                >
                  {link === "/Users" ? t("users.title") : link.replace("/", "")}
                </NavLink>
              ))}
            </Nav>
            <LanguageToggleButton onLanguageChange={handleLanguageChange} />
            
          </Col>
          <Col md={9} className="pt-3">
            {sections[activeLink]}
          </Col>
          
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
