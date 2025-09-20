import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin(){
  const [form, setForm] = useState({email:'',password:''});
  const [err, setErr] = useState(null);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      nav('/admin/dashboard');
    } catch (err) {
      setErr(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{maxWidth:420}}>
      <h2 style={{color:'var(--gold)'}}>Admin Login</h2>
      <form onSubmit={submit}>
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
        <input type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
        <div style={{marginTop:8}}><button className="btn" type="submit">Login</button></div>
      </form>
      {err && <div style={{color:'salmon', marginTop:8}}>{err}</div>}
    </div>
  );
}
