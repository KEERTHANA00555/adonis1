import React, { useState } from 'react';
import api from '../api';

export default function Contact(){
  const [form, setForm] = useState({name:'',email:'',phone:'',message:''});
  const [status, setStatus] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/contact', form);
      setStatus('Sent — thank you!');
      setForm({name:'',email:'',phone:'',message:''});
    } catch (err) {
      setStatus('Error sending');
    }
  };

  return (
    <div style={{maxWidth:700}}>
      <h2 style={{color:'var(--gold)'}}>Contact for Hiring</h2>
      <form onSubmit={submit}>
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
        <input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
        <textarea placeholder="Message" rows={6} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} required />
        <div style={{marginTop:8}}><button className="btn" type="submit">Send</button></div>
      </form>
      {status && <div style={{marginTop:8}}>{status}</div>}
    </div>
  );
}
