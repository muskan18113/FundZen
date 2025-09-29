import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import Button from '../components/common/button.jsx';
import Input from '../components/common/input.jsx';

const SignUpPage = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', phone: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await register(formData);
      if (res.success) navigate('/app/dashboard');
      else setError(res.message || 'Signup failed');
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
            <h1 className="text-2xl font-bold">Create your Account</h1>
            <p className="text-gray-600 dark:text-gray-400">Join FinTrack today!</p>
        </div>
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" id="firstName" value={formData.firstName} onChange={handleChange} required />
            <Input label="Last Name" id="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
          <Input label="Email" id="email" type="email" value={formData.email} onChange={handleChange} required />
          <Input label="Phone" id="phone" type="tel" value={formData.phone} onChange={handleChange} required />
          <Input label="Password" id="password" type="password" value={formData.password} onChange={handleChange} required />
          <Button type="submit" loading={loading}>Create Account</Button>
        </form>
        <p className="text-center text-sm">Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">Sign in</Link></p>
      </div>
    </div>
  );
};

export default SignUpPage;
