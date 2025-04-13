'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);

    try {

      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      const responseToken = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: formData.email, password: formData.password})
      });

      if (!responseToken.ok) {
        throw new Error('Login failed');
      }

      const dataToken = await responseToken.json();

      // Save authentication data to localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('access_token', dataToken.access_token);
      localStorage.setItem('email', formData.email);
      
      // Force a storage event to update other components
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'isAuthenticated',
        newValue: 'true',
        storageArea: localStorage
      }));
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="ascii-card w-full max-w-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center ascii-title">[ Register ]</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded ascii-text">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 ascii-text">
              [ Email ]
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded ascii-input"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block mb-2 ascii-text">
              [ Password ]
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded ascii-input"
              required
            />
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block mb-2 ascii-text">
              [ Confirm Password ]
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded ascii-input"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded ascii-button"
          >
            {loading ? '[ Loading... ]' : '[ Register ]'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <p className="ascii-text">
            [ Already have an account? ]{' '}
            <Link href="/login" className="text-blue-400 hover:text-blue-300 ascii-link">
              [ Login ]
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}; 