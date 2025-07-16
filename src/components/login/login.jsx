import React, { useState } from 'react';
import logo from '../img/timelogo.png'
export default function Login({ onSuccess }) {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can replace this logic with real one
    if (form.username === 'student' && form.password === '1234') {
      onSuccess(); // tell App that login is successful
    } else {
      alert('❌ Incorrect username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-purple-100 p-4">
      <div className="w-ful  l max-w-sm bg-white rounded-2xl shadow-lg p-6">
        <div className='flex item-center justify-center'><img src={logo} alt="" className='w-40'/></div>
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-6"> Time School</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
