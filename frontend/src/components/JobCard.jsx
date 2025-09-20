import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function JobCard({ job }){
  const navigate = useNavigate();
  return (
    <div className="card">
      <h3>{job.title}</h3>
      <div className="meta">{job.company} • {job.location}</div>
      <div className="meta">Experience: {job.experience} • Vacancies: {job.vacancies}</div>
      <p style={{color:'var(--muted)', minHeight:40}}>{job.description?.slice(0,120)}{job.description?.length>120?'...':''}</p>
      <div style={{display:'flex',justifyContent:'space-between',marginTop:12}}>
        <button className="btn" onClick={() => window.open(job.applyLink || '#', '_blank')}>Apply / Open</button>
        <button style={{background:'transparent',border:'1px solid rgba(255,255,255,0.06)',color:'var(--muted)',padding:'6px 10px',borderRadius:8}} onClick={()=>navigate(`/job/${job._id}`)}>Details</button>
      </div>
    </div>
  );
}
