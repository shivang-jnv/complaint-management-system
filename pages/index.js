import ComplaintForm from '../components/ComplaintForm';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { useAuth } from '../components/AuthContext';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const { user, login, register, logout, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(true);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Complaint Management System
          </h1>
          <p className="text-gray-600">
            Submit your complaints and track their progress
          </p>
          {user && user.role === 'admin' && (
            <Link href="/admin/dashboard" className="inline-block mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
              Admin Dashboard
            </Link>
          )}
        </div>
        {!user ? (
          <div className="max-w-md mx-auto">
            <div className="flex justify-center mb-4">
              <button
                className={`px-4 py-2 rounded-l transition-colors duration-200 cursor-pointer ${showLogin ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 hover:bg-gray-300'}`}
                onClick={() => setShowLogin(true)}
              >
                Login
              </button>
              <button
                className={`px-4 py-2 rounded-r transition-colors duration-200 cursor-pointer ${!showLogin ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-200 hover:bg-gray-300'}`}
                onClick={() => setShowLogin(false)}
              >
                Register
              </button>
            </div>
            {showLogin ? (
              <LoginForm onLogin={login} />
            ) : (
              <RegisterForm onRegister={register} />
            )}
          </div>
        ) : (
          <>
            <div className="flex justify-end mb-4">
              <span className="mr-2">Welcome, {user.username}!</span>
              <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
            </div>
            <ComplaintForm />
          </>
        )}
      </div>
    </div>
  );
}