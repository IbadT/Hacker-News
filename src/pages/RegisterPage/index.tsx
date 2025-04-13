import React from 'react';
import { RegisterForm } from '@/widgets/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white">Register</h2>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage; 