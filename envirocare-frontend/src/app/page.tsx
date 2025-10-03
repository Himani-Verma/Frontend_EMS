'use client';

import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ChatbotWidget from '@/components/ChatbotWidget';
import PipelineFlowchart from '@/components/PipelineFlowchart';
import { getServiceDisplayName } from '@/utils/serviceMapping';

type Visitor = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  region?: string;
  service: string;
  subservice?: string;
  enquiryDetails?: string;
  source: 'chatbot' | 'email' | 'calls' | 'website';
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed';
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
};

export default function HomePage() {
  const router = useRouter();
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState({
    status: 'all',
    service: 'all',
    source: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demonstration
  const mockVisitors: Visitor[] = [
    {
      _id: '1',
      name: 'John Smith',
      email: 'john.smith@company.com',
      phone: '+1-555-0123',
      organization: 'GreenTech Solutions',
      region: 'North America',
      service: 'environmental-consulting',
      subservice: 'compliance-audit',
      enquiryDetails: 'Need help with environmental compliance for our new facility',
      source: 'chatbot',
      status: 'new',
      assignedTo: 'Sarah Wilson',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z'
    },
    {
      _id: '2',
      name: 'Maria Garcia',
      email: 'maria.garcia@eco-corp.com',
      phone: '+1-555-0456',
      organization: 'EcoCorp Industries',
      region: 'South America',
      service: 'waste-management',
      subservice: 'recycling-program',
      enquiryDetails: 'Looking to implement a comprehensive recycling program',
      source: 'email',
      status: 'contacted',
      assignedTo: 'Mike Johnson',
      createdAt: '2024-01-14T14:20:00Z',
      updatedAt: '2024-01-15T09:15:00Z'
    },
    {
      _id: '3',
      name: 'David Chen',
      email: 'david.chen@sustainability.com',
      phone: '+1-555-0789',
      organization: 'Sustainability Partners',
      region: 'Asia Pacific',
      service: 'sustainability-planning',
      subservice: 'carbon-footprint',
      enquiryDetails: 'Carbon footprint assessment and reduction strategies',
      source: 'website',
      status: 'qualified',
      assignedTo: 'Lisa Davis',
      createdAt: '2024-01-13T16:45:00Z',
      updatedAt: '2024-01-15T11:30:00Z'
    },
    {
      _id: '4',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@cleanwater.com',
      phone: '+1-555-0321',
      organization: 'Clean Water Systems',
      region: 'Europe',
      service: 'water-management',
      subservice: 'treatment-systems',
      enquiryDetails: 'Water treatment system optimization',
      source: 'calls',
      status: 'proposal',
      assignedTo: 'Tom Wilson',
      createdAt: '2024-01-12T09:15:00Z',
      updatedAt: '2024-01-15T13:45:00Z'
    },
    {
      _id: '5',
      name: 'Robert Brown',
      email: 'robert.brown@greenenergy.com',
      phone: '+1-555-0654',
      organization: 'Green Energy Corp',
      region: 'North America',
      service: 'energy-efficiency',
      subservice: 'solar-systems',
      enquiryDetails: 'Solar panel installation and energy efficiency audit',
      source: 'chatbot',
      status: 'closed',
      assignedTo: 'Amy Lee',
      createdAt: '2024-01-11T11:30:00Z',
      updatedAt: '2024-01-15T15:20:00Z'
    }
  ];

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setVisitors(mockVisitors);
      } catch (err) {
        setError('Failed to load visitors data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredVisitors = useMemo(() => {
    return visitors.filter(visitor => {
      const matchesStatus = filter.status === 'all' || visitor.status === filter.status;
      const matchesService = filter.service === 'all' || visitor.service === filter.service;
      const matchesSource = filter.source === 'all' || visitor.source === filter.source;
      const matchesSearch = searchTerm === '' || 
        visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        visitor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        visitor.organization?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesStatus && matchesService && matchesSource && matchesSearch;
    });
  }, [visitors, filter, searchTerm]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'qualified': return 'bg-green-100 text-green-800';
      case 'proposal': return 'bg-purple-100 text-purple-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'chatbot': return 'bg-green-100 text-green-800';
      case 'email': return 'bg-blue-100 text-blue-800';
      case 'calls': return 'bg-orange-100 text-orange-800';
      case 'website': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Image src="/envirocare-logo.png" alt="Envirocare Labs" width={180} height={45} />
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/login')}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Visitor Management</h1>
          <p className="text-gray-600">Track and manage visitor interactions and enquiries</p>
        </div>

        {/* Demo Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-blue-700 font-medium">Demo Mode - Using mock data for demonstration</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search visitors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filter.status}
                onChange={(e) => setFilter({...filter, status: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="proposal">Proposal</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
              <select
                value={filter.service}
                onChange={(e) => setFilter({...filter, service: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Services</option>
                <option value="environmental-consulting">Environmental Consulting</option>
                <option value="waste-management">Waste Management</option>
                <option value="sustainability-planning">Sustainability Planning</option>
                <option value="water-management">Water Management</option>
                <option value="energy-efficiency">Energy Efficiency</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
              <select
                value={filter.source}
                onChange={(e) => setFilter({...filter, source: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Sources</option>
                <option value="chatbot">Chatbot</option>
                <option value="email">Email</option>
                <option value="calls">Calls</option>
                <option value="website">Website</option>
              </select>
            </div>
          </div>
        </div>

        {/* Visitors Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Visitors ({filteredVisitors.length})</h2>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <div className="text-gray-600">Loading visitors...</div>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-red-600">{error}</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visitor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredVisitors.map((visitor) => (
                    <tr key={visitor._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{visitor.name}</div>
                          <div className="text-sm text-gray-500">{visitor.email}</div>
                          {visitor.organization && (
                            <div className="text-xs text-gray-400">{visitor.organization}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{getServiceDisplayName(visitor.service)}</div>
                        {visitor.subservice && (
                          <div className="text-xs text-gray-500">{visitor.subservice}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(visitor.status)}`}>
                          {visitor.status.charAt(0).toUpperCase() + visitor.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSourceColor(visitor.source)}`}>
                          {visitor.source.charAt(0).toUpperCase() + visitor.source.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {visitor.assignedTo || 'Unassigned'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(visitor.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pipeline Flowchart */}
        <div className="mt-8">
          <PipelineFlowchart />
        </div>
      </main>

      {/* Chatbot Widget */}
      <ChatbotWidget />
    </div>
  );
}