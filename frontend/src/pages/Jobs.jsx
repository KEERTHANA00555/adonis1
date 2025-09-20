// import { useState, useEffect } from "react";
// import API from "../api";
// import JobCard from "../components/JobCard";

// export default function Jobs() {
//   const [jobs, setJobs] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     API.get("/jobs").then(res => setJobs(res.data));
//   }, []);

//   const filtered = jobs.filter(job =>
//     job.designation.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="jobs">
//       <input
//         type="text"
//         placeholder="Search job..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />
//       <div className="job-list">
//         {filtered.map(job => <JobCard key={job._id} job={job} />)}
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import API from "../api";
import JobCard from "../components/JobCard";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ companyName: "", name: "", mobile: "", designation: "" });

  useEffect(() => {
    API.get("/jobs").then(res => setJobs(res.data));
  }, []);

  const filtered = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  const submitHiringReq = async (e) => {
    e.preventDefault();
    try {
      await API.post("/hiringRequests", form);
      alert("Request submitted!");
      setForm({ companyName: "", name: "", mobile: "", designation: "" });
    } catch (err) {
      console.error(err);
      alert("Error submitting request");
    }
  };

  return (
    <div className="jobs">
      {/* Search and jobs */}
      <div className="left">
        <input
          type="text"
          placeholder="Search job..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="job-list">
          {filtered.map(job => <JobCard key={job._id} job={job} />)}
        </div>
      </div>

      {/* Contact Form */}
      <div className="right">
        <h3>Contact For Hiring Needs</h3>
        <form onSubmit={submitHiringReq}>
          <input
            placeholder="Company Name"
            value={form.companyName}
            onChange={(e) => setForm({ ...form, companyName: e.target.value })}
            required
          />
          <input
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            required
          />
          <input
            placeholder="Designation"
            value={form.designation}
            onChange={(e) => setForm({ ...form, designation: e.target.value })}
            required
          />
          <button type="submit" className="btn">Submit Hiring Request</button>
        </form>
      </div>
    </div>
  );
}
