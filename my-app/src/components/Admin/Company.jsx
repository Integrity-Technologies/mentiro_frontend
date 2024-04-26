import React, { useState, useEffect } from "react";
import { Table, Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../../actions/companyAction";

const Company = () => {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.company.companies);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);


  

  const filteredCompany = companies.filter((company) => {
    const fullName = `${company.name} ${company.website}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  })

  return (
    <div>
      <h1>Companies</h1>
      <Form inline className="mb-3">
        <FormControl
          type="text"
          placeholder="Search by name"
          className="mr-sm-2 w-25"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Company Name</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {filteredCompany.map((company) => (
            <tr key={company.id}>
              <td>{company.id}</td>
              <td>{company.name}</td>
              <td>{company.website}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Company;
