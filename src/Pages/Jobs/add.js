import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddJob = () => {
  const [jobData, setJobData] = useState({
    companyName: "",
    jobTitle: "",
    description: "",
    salary: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to the /create/job API
      const response = await axios.post("http://localhost:5000/api/create/job", jobData);

      if (response.status === 201) {
        toast.success("Job created successfully!");
        // Reset the form
        setJobData({
          companyName: "",
          jobTitle: "",
          description: "",
          salary: "",
        });
      }
    } catch (error) {
      console.error("Error creating job:", error.response?.data?.error || error.message);
      toast.error("Failed to create job. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Job</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="companyName" className="form-label">
            Company Name
          </label>
          <input
            type="text"
            className="form-control"
            id="companyName"
            name="companyName"
            value={jobData.companyName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="jobTitle" className="form-label">
            Job Title
          </label>
          <input
            type="text"
            className="form-control"
            id="jobTitle"
            name="jobTitle"
            value={jobData.jobTitle}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="4"
            value={jobData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="salary" className="form-label">
            Salary
          </label>
          <input
            type="number"
            className="form-control"
            id="salary"
            name="salary"
            value={jobData.salary}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Job
        </button>
      </form>
    </div>
  );
};

export default AddJob;
