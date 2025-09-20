// import React, { useEffect, useState } from "react";
// import api from "../api";
// import JobCard from "../components/JobCard";

// export default function Home() {
//   const [jobs, setJobs] = useState([]);
//   const [q, setQ] = useState("");

//   const fetchJobs = async (qstr = "") => {
//     const res = await api.get(`/jobs${qstr ? "?q=" + encodeURIComponent(qstr) : ""}`);
//     setJobs(res.data);
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const onSearch = (e) => {
//     e.preventDefault();
//     fetchJobs(q);
//   };

//   return (
//     <div className="container">
//       <form className="searchbar" onSubmit={onSearch}>
//         <input
//           type="text"
//           placeholder="Search jobs, title, location..."
//           value={q}
//           onChange={(e) => setQ(e.target.value)}
//         />
//         <button className="btn" type="submit">
//           Search
//         </button>
//       </form>

//       <div className="grid">
//         {jobs.length === 0 && <div style={{ color: "var(--muted)" }}>No jobs found</div>}
//         {jobs.map((job) => (
//           <JobCard key={job._id} job={job} />
//         ))}
//       </div>
//     </div>
//   );
// }


// Home.jsx
import React, { useEffect, useState } from "react";
import api from "../api";
import JobCard from "../components/JobCard";
import "./Home.css";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    companyName: "",
    name: "",
    mobile: "",
    designation: "",
  });

  // Fetch all jobs from the API
  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data);
      setFilteredJobs(res.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Handle the search input to filter jobs
  const handleSearchChange = (e) => {
    const val = e.target.value.toLowerCase();
    setSearchQuery(val);

    if (!val) {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(val) ||
          job.company.toLowerCase().includes(val) ||
          (job.location && job.location.toLowerCase().includes(val)) ||
          (job.designation && job.designation.toLowerCase().includes(val))
      );
      setFilteredJobs(filtered);
    }
    setSelectedJob(null); // Reset any selected job when searching
  };

  // Submit contact form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/hiringRequests", formData);
      alert("Submitted successfully!");
      setFormData({
        companyName: "",
        name: "",
        mobile: "",
        designation: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="home-container">
      {/* Show job list or selected job detail */}
      {!selectedJob ? (
        <>
          {/* Left section with search and job list */}
          <div className="jobs-section">
            <div className="jobs-header">
              <h2>Hot Vacancies For Candidates</h2>
              <p>
                Looking for the next big career break? Get access to
                opportunities with companies across India and abroad.
              </p>
            </div>

            <div className="searchbar">
              <input
                type="text"
                placeholder="Search jobs by title, company, location..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>

            <div className="jobs-list">
              {filteredJobs.length === 0 ? (
                <div className="no-jobs">No jobs found</div>
              ) : (
                filteredJobs.map((job, idx) => (
                  <div
                    key={job._id}
                    onClick={() => setSelectedJob(job)}
                    style={{ cursor: "pointer" }}
                  >
                    <JobCard job={job} index={idx} />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right section with contact form */}
          <div className="contact-section">
            <div className="contact-header">
              <h2>📩 Contact For Hiring Needs</h2>
              <p>
                Need to close your critical positions? Please enter details
                below. We will get back and work together.
              </p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Enter Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <input
                type="tel"
                placeholder="Enter Mobile Number"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Your Designation"
                value={formData.designation}
                onChange={(e) =>
                  setFormData({ ...formData, designation: e.target.value })
                }
                required
              />
              <button type="submit">Submit Hiring Request</button>
            </form>
          </div>
        </>
      ) : (
        // Single selected job detail view
        <div className="job-details-section">
          <button className="btn back-btn" onClick={() => setSelectedJob(null)}>
            ← Back to Job Listings
          </button>
          <h2>{selectedJob.title}</h2>
          <p>
            <strong>Company:</strong> {selectedJob.company}
          </p>
          <p>
            <strong>Location:</strong> {selectedJob.location || "N/A"}
          </p>
          <p>
            <strong>Experience:</strong> {selectedJob.experience || "N/A"}
          </p>
          <p>
            <strong>Vacancies:</strong> {selectedJob.vacancies || "N/A"}
          </p>
          <p>
            <strong>Description:</strong>
          </p>
          <p>{selectedJob.description || "No description provided."}</p>
          {selectedJob.salary && (
            <p>
              <strong>Salary:</strong> {selectedJob.salary}
            </p>
          )}
          {selectedJob.link && (
            <p>
              <strong>Apply Link:</strong>{" "}
              <a href={selectedJob.link} target="_blank" rel="noreferrer">
                Click Here
              </a>
            </p>
          )}
        </div>
      )}
    </div>
    
  );
  
}
