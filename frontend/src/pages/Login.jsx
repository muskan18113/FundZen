import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { Eye, EyeOff } from 'lucide-react';
import Button from '../components/common/button.jsx';
import Input from '../components/common/input.jsx';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login(email, password);
      if (res.success) navigate('/app/dashboard');
      else setError(res.message || 'Login failed');
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
            <h1 className="text-2xl font-bold">Welcome Back!</h1>
            <p className="text-gray-600 dark:text-gray-400">Sign in to continue to FinTrack</p>
        </div>
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
            <Input label="Email Address" id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            <div className="relative">
                <Input label="Password" id="password" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-gray-400">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
            <Button type="submit" loading={loading}>Sign In</Button>
        </form>
        <p className="text-center text-sm">Don't have an account? <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">Sign up</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;
