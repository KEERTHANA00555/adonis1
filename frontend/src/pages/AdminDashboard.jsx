// import React, { useEffect, useState } from 'react';
// import api from '../api';
// import { useNavigate } from 'react-router-dom';

// export default function AdminDashboard(){
//   const [jobs, setJobs] = useState([]);
//   const [form, setForm] = useState({ title:'', company:'', location:'', experience:'', vacancies:1, description:'', applyLink:'' });
//   const [headerImage, setHeaderImage] = useState('');
//   const nav = useNavigate();

//   const token = localStorage.getItem('token');
//   useEffect(() => {
//     if (!token) return nav('/admin/login');
//     fetchJobs();
//     fetchHeader();
//   }, []);

//   const authCfg = { headers: { Authorization: `Bearer ${token}` } };

//   const fetchJobs = async () => {
//     const res = await api.get('/jobs');
//     setJobs(res.data);
//   };
//   const fetchHeader = async () => {
//     const res = await api.get('/settings/headerImage');
//     setHeaderImage(res.data || '');
//   };

//   const createJob = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post('/jobs', form, authCfg);
//       setForm({ title:'', company:'', location:'', experience:'', vacancies:1, description:'', applyLink:'' });
//       fetchJobs();
//     } catch (err) { alert('Error'); }
//   };

//   const del = async (id) => {
//     if (!confirm('Delete job?')) return;
//     await api.delete('/jobs/'+id, authCfg);
//     fetchJobs();
//   };

//   const updateHeader = async () => {
//     await api.post('/settings/headerImage', { value: headerImage }, authCfg);
//     alert('Saved');
//   };

//   return (
//     <div>
//       <h2 style={{color:'var(--gold)'}}>Admin Dashboard</h2>

//       <div style={{marginBottom:20}}>
//         <h4 style={{color:'var(--muted)'}}>Header image (URL)</h4>
//         <input value={headerImage} onChange={e=>setHeaderImage(e.target.value)} />
//         <div style={{marginTop:8}}><button className="btn" onClick={updateHeader}>Save Header Image</button></div>
//       </div>

//       <div style={{display:'flex',gap:20,flexWrap:'wrap'}}>
//         <div style={{flex:1, minWidth:300}}>
//           <h4 style={{color:'var(--muted)'}}>Create Job</h4>
//           <form onSubmit={createJob}>
//             <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required />
//             <input placeholder="Company" value={form.company} onChange={e=>setForm({...form,company:e.target.value})} />
//             <input placeholder="Location" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} />
//             <input placeholder="Experience" value={form.experience} onChange={e=>setForm({...form,experience:e.target.value})} />
//             <input type="number" placeholder="Vacancies" value={form.vacancies} onChange={e=>setForm({...form,vacancies:Number(e.target.value)})} />
//             <input placeholder="Apply Link" value={form.applyLink} onChange={e=>setForm({...form,applyLink:e.target.value})} />
//             <textarea placeholder="Description" rows={5} value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
//             <div style={{marginTop:8}}>
//               <button className="btn" type="submit">Create Job</button>
//             </div>
//           </form>
//         </div>

//         <div style={{flex:1, minWidth:300}}>
//           <h4 style={{color:'var(--muted)'}}>Existing Jobs</h4>
//           {jobs.map(j => (
//             <div key={j._id} className="card" style={{marginBottom:10}}>
//               <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
//                 <div>
//                   <strong>{j.title}</strong>
//                   <div style={{fontSize:13,color:'var(--muted)'}}>{j.company} • {j.location}</div>
//                 </div>
//                 <div>
//                   <button style={{marginRight:8}} className="btn" onClick={()=> window.open(j.applyLink || '#','_blank')}>Open</button>
//                   <button style={{background:'#333',color:'#fff',padding:'6px 10px',borderRadius:8}} onClick={()=>del(j._id)}>Delete</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



// import React, { useEffect, useState } from 'react';
// import api from '../api';
// import { useNavigate } from 'react-router-dom';

// export default function AdminDashboard() {
//   const [jobs, setJobs] = useState([]);
//   const [form, setForm] = useState({
//     title: '',
//     company: '',
//     location: '',
//     experience: '',
//     vacancies: 1,
//     description: '',
//     applyLink: ''
//   });
//   const [headerImage, setHeaderImage] = useState('');
//   const nav = useNavigate();

//   const token = localStorage.getItem('token');
//   const authCfg = { headers: { Authorization: `Bearer ${token}` } };

//   useEffect(() => {
//     if (!token) {
//       nav('/admin/login');
//       return;
//     }
//     fetchJobs();
//     fetchHeader();
//   }, []);

//   // ----------------- FETCH -----------------
//   const fetchJobs = async () => {
//     try {
//       const res = await api.get('/jobs', authCfg); // ✅ add authCfg
//       setJobs(res.data);
//     } catch (err) {
//       console.error('Error fetching jobs:', err);
//       if (err.response?.status === 401) nav('/admin/login');
//     }
//   };

//   const fetchHeader = async () => {
//     try {
//       const res = await api.get('/settings/headerImage', authCfg); // ✅ add authCfg
//       setHeaderImage(res.data?.value || '');
//     } catch (err) {
//       console.error('Error fetching header:', err);
//       if (err.response?.status === 401) nav('/admin/login');
//     }
//   };

//   // ----------------- CREATE -----------------
//   const createJob = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post('/jobs', form, authCfg);
//       setForm({
//         title: '',
//         company: '',
//         location: '',
//         experience: '',
//         vacancies: 1,
//         description: '',
//         applyLink: ''
//       });
//       fetchJobs();
//     } catch (err) {
//       console.error('Error creating job:', err);
//       if (err.response?.status === 401) nav('/admin/login');
//       else alert('Error creating job');
//     }
//   };

//   // ----------------- DELETE -----------------
//   const del = async (id) => {
//     if (!window.confirm('Delete job?')) return;
//     try {
//       await api.delete('/jobs/' + id, authCfg);
//       fetchJobs();
//     } catch (err) {
//       console.error('Error deleting job:', err);
//       if (err.response?.status === 401) nav('/admin/login');
//     }
//   };

//   // ----------------- HEADER UPDATE -----------------
//   const updateHeader = async () => {
//     try {
//       await api.post('/settings/headerImage', { value: headerImage }, authCfg);
//       alert('Header image saved');
//     } catch (err) {
//       console.error('Error updating header:', err);
//       if (err.response?.status === 401) nav('/admin/login');
//     }
//   };

//   // ----------------- UI -----------------
//   return (
//     <div>
//       <h2 style={{ color: 'var(--gold)' }}>Admin Dashboard</h2>

//       <div style={{ marginBottom: 20 }}>
//         <h4 style={{ color: 'var(--muted)' }}>Header image (URL)</h4>
//         <input
//           value={headerImage}
//           onChange={(e) => setHeaderImage(e.target.value)}
//         />
//         <div style={{ marginTop: 8 }}>
//           <button className="btn" onClick={updateHeader}>
//             Save Header Image
//           </button>
//         </div>
//       </div>

//       <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
//         {/* Create Job */}
//         <div style={{ flex: 1, minWidth: 300 }}>
//           <h4 style={{ color: 'var(--muted)' }}>Create Job</h4>
//           <form onSubmit={createJob}>
//             <input
//               placeholder="Title"
//               value={form.title}
//               onChange={(e) => setForm({ ...form, title: e.target.value })}
//               required
//             />
//             <input
//               placeholder="Company"
//               value={form.company}
//               onChange={(e) => setForm({ ...form, company: e.target.value })}
//             />
//             <input
//               placeholder="Location"
//               value={form.location}
//               onChange={(e) => setForm({ ...form, location: e.target.value })}
//             />
//             <input
//               placeholder="Experience"
//               value={form.experience}
//               onChange={(e) =>
//                 setForm({ ...form, experience: e.target.value })
//               }
//             />
//             <input
//               type="number"
//               placeholder="Vacancies"
//               value={form.vacancies}
//               onChange={(e) =>
//                 setForm({ ...form, vacancies: Number(e.target.value) })
//               }
//             />
//             <input
//               placeholder="Apply Link"
//               value={form.applyLink}
//               onChange={(e) =>
//                 setForm({ ...form, applyLink: e.target.value })
//               }
//             />
//             <textarea
//               placeholder="Description"
//               rows={5}
//               value={form.description}
//               onChange={(e) =>
//                 setForm({ ...form, description: e.target.value })
//               }
//             />
//             <div style={{ marginTop: 8 }}>
//               <button className="btn" type="submit">
//                 Create Job
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Existing Jobs */}
//         <div style={{ flex: 1, minWidth: 300 }}>
//           <h4 style={{ color: 'var(--muted)' }}>Existing Jobs</h4>
//           {jobs.map((j) => (
//             <div key={j._id} className="card" style={{ marginBottom: 10 }}>
//               <div
//                 style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center'
//                 }}
//               >
//                 <div>
//                   <strong>{j.title}</strong>
//                   <div style={{ fontSize: 13, color: 'var(--muted)' }}>
//                     {j.company} • {j.location}
//                   </div>
//                 </div>
//                 <div>
//                   <button
//                     style={{ marginRight: 8 }}
//                     className="btn"
//                     onClick={() =>
//                       window.open(j.applyLink || '#', '_blank')
//                     }
//                   >
//                     Open
//                   </button>
//                   <button
//                     style={{
//                       background: '#333',
//                       color: '#fff',
//                       padding: '6px 10px',
//                       borderRadius: 8
//                     }}
//                     onClick={() => del(j._id)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("jobs");
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    experience: "",
    vacancies: 1,
    description: "",
    applyLink: "",
  });
  const [headerImage, setHeaderImage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const nav = useNavigate();
  const token = localStorage.getItem("token");
  const authCfg = { headers: { Authorization: `Bearer ${token}` } };

  // Redirect to login if no token
  useEffect(() => {
    if (!token) {
      nav("/admin/login");
      return;
    }
    fetchJobs();
    fetchHeader();
    fetchAppliedJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs", authCfg);
      setJobs(res.data);
    } catch (err) {
      if (err.response?.status === 401) nav("/admin/login");
    }
  };

  const fetchHeader = async () => {
    try {
      const res = await api.get("/settings/headerImage", authCfg);
      setHeaderImage(res.data?.value || "");
    } catch (err) {
      if (err.response?.status === 401) nav("/admin/login");
    }
  };

  const fetchAppliedJobs = async () => {
    try {
      const res = await api.get("/hiringRequests", authCfg);
      setAppliedJobs(res.data);
    } catch (err) {
      console.error("Error fetching applied jobs", err);
    }
  };

  const createJob = async (e) => {
    e.preventDefault();
    try {
      await api.post("/jobs", form, authCfg);
      setForm({
        title: "",
        company: "",
        location: "",
        experience: "",
        vacancies: 1,
        description: "",
        applyLink: "",
      });
      fetchJobs();
      setActiveTab("jobs");
    } catch {
      alert("Error creating job");
    }
  };

  const del = async (id) => {
    if (!window.confirm("Delete job?")) return;
    try {
      await api.delete(`/jobs/${id}`, authCfg);
      fetchJobs();
    } catch {}
  };

  const updateHeader = async () => {
    try {
      await api.post("/settings/headerImage", { value: headerImage }, authCfg);
      alert("Header image saved");
    } catch {}
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem("token");
    nav("/admin/login");
  };

  // Toggle sidebar for mobile
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="admin-dashboard-container">
      {/* Mobile top bar with hamburger and logout */}
      <div className="mobile-topbar">
        <button className="hamburger-btn" onClick={toggleSidebar}>
          &#9776;
        </button>
        <button className="btn logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`admin-sidebar${sidebarOpen ? " open" : ""}`}>
        <button
          className={`menu-btn${activeTab === "jobs" ? " active" : ""}`}
          onClick={() => {
            setActiveTab("jobs");
            setSidebarOpen(false);
          }}
        >
          Jobs
        </button>
        <button
          className={`menu-btn${activeTab === "add" ? " active" : ""}`}
          onClick={() => {
            setActiveTab("add");
            setSidebarOpen(false);
          }}
        >
          Add Job
        </button>
        <button
          className={`menu-btn${activeTab === "applied" ? " active" : ""}`}
          onClick={() => {
            setActiveTab("applied");
            setSidebarOpen(false);
          }}
        >
          Applied Jobs
        </button>
        <button className="btn logout-btn-sidebar" onClick={logout}>
          Logout
        </button>
      </aside>

      {/* Main content area */}
      <main className="admin-main">
        <h2>Admin Dashboard</h2>

        {activeTab === "add" && (
          <section>
            <h4>Create Job</h4>
            <form onSubmit={createJob}>
              <input
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
              <input
                placeholder="Company"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
              <input
                placeholder="Location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
              <input
                placeholder="Experience"
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
              />
              <input
                type="number"
                placeholder="Vacancies"
                value={form.vacancies}
                onChange={(e) =>
                  setForm({ ...form, vacancies: Number(e.target.value) })
                }
              />
              <input
                placeholder="Apply Link"
                value={form.applyLink}
                onChange={(e) => setForm({ ...form, applyLink: e.target.value })}
              />
              <textarea
                placeholder="Description"
                rows={5}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
              <div style={{ marginTop: 8 }}>
                <button className="btn" type="submit">
                  Create Job
                </button>
              </div>
            </form>
          </section>
        )}

        {activeTab === "jobs" && (
          <section>
            <h4>Existing Jobs</h4>
            {jobs.map((j) => (
              <div key={j._id} className="card">
                <div className="job-card-info">
                  <div>
                    <strong>{j.title}</strong>
                    <div className="job-company-loc">
                      {j.company} • {j.location}
                    </div>
                  </div>
                  <button
                    className="btn danger"
                    aria-label="delete"
                    onClick={() => del(j._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}

        {activeTab === "applied" && (
          <section>
            <h4>Applied Jobs</h4>
            {appliedJobs.length === 0 ? (
              <p>No applications yet</p>
            ) : (
              appliedJobs.map((a) => (
                <div key={a._id} className="card">
                  <div><strong>Company:</strong> {a.companyName}</div>
                  <div><strong>Name:</strong> {a.name}</div>
                  <div><strong>Mobile:</strong> {a.mobile}</div>
                  <div><strong>Designation:</strong> {a.designation}</div>
                </div>
              ))
            )}
          </section>
        )}
      </main>
    </div>
  );
}
