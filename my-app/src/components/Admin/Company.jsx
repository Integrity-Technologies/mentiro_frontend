import React, { useState } from "react";
import { Table, Form, FormControl } from "react-bootstrap";

const Company = () => {
    const [company] = useState([
        {
          id: 1,
          companyName: "ABC",
          website: "weblink",
        },
        {
          id: 2,
          companyName: "ABC",
          website: "weblink",
        },
      ]);
      const [searchTerm, setSearchTerm] = useState("");

  const filteredCompany = company.filter(company => {
    return company.companyName.toLowerCase().includes(searchTerm.toLowerCase());
  });


  return (
    <div>
      <h1>Companies</h1>
      <Form inline className="mb-3">
        <FormControl
          type="text"
          placeholder="Search by candidate name"
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
            <th>website</th>
          </tr>
        </thead>
        <tbody>
          {filteredCompany.map((company) => (
            <tr key={company.id}>
              <td>{company.id}</td>
              <td>{company.companyName}</td>
              <td>{company.website}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Company