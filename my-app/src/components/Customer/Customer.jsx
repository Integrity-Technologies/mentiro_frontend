import React, { useState } from "react";
import { Container, Nav, NavLink, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import LanguageToggleButton from "../Togglebutton";
// import CompanyProfile from "./CompanyProfile";
// import Tests from "./Tests";
// import Category from "./Categories";
// import Candidates from "./Candidates";
// import ViewTestResult from "./ViewTestResult";
// import Company from "./Company";

const Customer = () => {
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
    // "/CompanyProfile": <CompanyProfile />,
    "/Assessment": <></>,
    "/Question": <></>,
  };

  // Define customer menu options
  const customerMenuOptions = [
    { label: "Company Profile", link: "/customer/option1" },
    { label: "Assessment", link: "/customer/option2" },
    { label: "Question", link: "/customer/option3" },
  ];

  return (
    <div>
      <Container fluid>
        <Row>
          <Col md={3} className="bg-light border-end vh-100">
            <Nav className="flex-column">
              {customerMenuOptions.map((option) => (
                <NavLink
                  key={option.link}
                  to={option.link}
                  className={`nav-link ${
                    activeLink === option.link ? "bg-dark text-light" : ""
                  } mb-3`}
                  onClick={() => handleClick(option.link)}
                >
                  {option.label}
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

export default Customer;