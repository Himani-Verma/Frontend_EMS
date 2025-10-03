'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Demo login - no backend required
    setTimeout(() => {
      // Mock user data based on username
      let mockUser;
      if (username.includes('admin')) {
        mockUser = {
          id: '1',
          name: 'Admin User',
          username: username,
          role: 'admin'
        };
      } else if (username.includes('executive')) {
        mockUser = {
          id: '2',
          name: 'Executive User',
          username: username,
          role: 'executive'
        };
      } else if (username.includes('customer')) {
        mockUser = {
          id: '3',
          name: 'Customer Executive',
          username: username,
          role: 'customer-executive'
        };
      } else {
        mockUser = {
          id: '4',
          name: 'Demo User',
          username: username,
          role: 'executive'
        };
      }

      localStorage.setItem('ems_token', 'demo-token-123');
      localStorage.setItem('ems_user', JSON.stringify(mockUser));
      
      // Redirect based on role
      if (mockUser.role === 'admin') {
        router.push('/dashboard/admin');
      } else if (mockUser.role === 'executive') {
        router.push('/dashboard/executive');
      } else if (mockUser.role === 'customer-executive') {
        router.push('/dashboard/customer-executive');
      } else {
        router.push('/dashboard/executive');
      }
      
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-[#2d4891] p-6 flex items-center justify-center">
          <Image src="/envirocare-logo.png" alt="Envirocare Labs" width={220} height={56} />
        </div>
        <div className="bg-green-600 text-white text-center py-4 text-xl font-semibold">Login (Demo Mode)</div>

        <div className="p-6">
          {/* Demo Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-blue-700">
              <strong>Demo Login Options:</strong><br/>
              • admin → Admin Dashboard<br/>
              • executive → Executive Dashboard<br/>
              • customer → Customer Executive Dashboard<br/>
              • Any other username → Executive Dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username (demo mode)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d4891] text-gray-900 placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter any password (demo mode)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d4891] text-gray-900 placeholder-gray-400"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Login (Demo Mode)'}
            </button>
          </form>

          <div className="mt-3 text-center text-sm">
            <Link href="/" className="text-blue-600 hover:text-blue-800">Back to site</Link>
          </div>
        </div>
      </div>
    </div>
  );
}