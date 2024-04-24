import React, { useState } from "react";
import { Container, Nav, NavLink, Row, Col, Image } from "react-bootstrap"; // Import Image component
import { useTranslation } from "react-i18next";
import LanguageToggleButton from "../Togglebutton";
import Assesment from "./Assesment";
const logoImage = "/assets/icon.jpg";


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
    "/CompanyProfile": <></>,
    "/Assesments": <Assesment />,
  };

  // Define customer menu options
  const customerMenuOptions = [
    { label: "Company Profile", link: "/customer/option1" },
    { label: "Assessment", link: "/customer/option2" },
  ];

  return (
    <div>
      <Container fluid>
        <Row>
          <Col xs={2} id="sidebar" className="bg-white shadow vh-100">
            <div className="text-center mb-3"> {/* Center the logo */}
              <Image src={logoImage} alt="Logo" className="rounded-circle img-fluid w-50 mt-5" />
            </div>
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
                  {link === "/Assesment"
                    ? t("users.title")
                    : link.replace("/", "")}
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
