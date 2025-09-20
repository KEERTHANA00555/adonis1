import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

export default function JobDetails(){
  const { id } = useParams();
  const [job, setJob] = useState(null);
  useEffect(()=> {
    api.get('/jobs/'+id).then(r => {
      setJob(r.data);
      // If requirement is to redirect directly to apply link:
      // if (r.data?.applyLink) window.location.href = r.data.applyLink;
    }).catch(()=>{});
  },[id]);

  if (!job) return <div>Loading...</div>;

  return (
    <div className="card">
      <h2 style={{color:'var(--gold)'}}>{job.title}</h2>
      <div className="meta">{job.company} • {job.location}</div>
      <div className="meta">Experience: {job.experience} • Vacancies: {job.vacancies}</div>
      <p style={{whiteSpace:'pre-wrap', color:'var(--muted)'}}>{job.description}</p>
      <div style={{marginTop:12}}>
        <button className="btn" onClick={()=> window.open(job.applyLink || '#','_blank')}>Open Apply Link</button>
      </div>
    </div>
  );
}
