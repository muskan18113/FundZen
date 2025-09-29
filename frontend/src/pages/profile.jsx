import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import apiService from '../api/apiService.js';
import Button from '../components/common/button.jsx';
import Input from '../components/common/input.jsx';

const ProfilePage = () => {
    const { user, updateUser } = useAuth();
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        phone: user?.phone || '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            // Corrected API call
            const res = await apiService.put('/users/profile', formData);
            if (res.data.success) {
                updateUser(res.data.data.user);
                setMessage('Profile updated successfully!');
            }
        } catch (error) {
            setMessage('Failed to update profile.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 max-w-lg mx-auto">
            <h1 className="text-xl font-bold mb-6">Your Profile</h1>
            {message && <p className="mb-4 text-green-600">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="First Name" id="firstName" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                <Input label="Last Name" id="lastName" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                <Input label="Phone Number" id="phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email</label>
                  <p>{user?.email}</p>
                </div>
                <div className="pt-2"><Button type="submit" loading={loading}>Save Changes</Button></div>
            </form>
        </div>
    );
};

export default ProfilePage;