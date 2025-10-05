'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'

// Mock data for executive quotations
const quotationsData = [
  {
    id: 1,
    quoteNumber: 'Q-2024-001',
    client: 'ABC Corporation',
    project: 'Environmental Impact Assessment',
    amount: '$15,000',
    status: 'Draft',
    created: '2024-01-15',
    validUntil: '2024-02-15',
    assignedTo: 'John Smith'
  },
  {
    id: 2,
    quoteNumber: 'Q-2024-002',
    client: 'XYZ Industries',
    project: 'Waste Management Consultation',
    amount: '$8,500',
    status: 'Sent',
    created: '2024-01-18',
    validUntil: '2024-02-18',
    assignedTo: 'Sarah Johnson'
  },
  {
    id: 3,
    quoteNumber: 'Q-2024-003',
    client: 'Green Tech Ltd',
    project: 'Sustainability Audit',
    amount: '$22,000',
    status: 'Approved',
    created: '2024-01-20',
    validUntil: '2024-02-20',
    assignedTo: 'Mike Wilson'
  },
  {
    id: 4,
    quoteNumber: 'Q-2024-004',
    client: 'Eco Solutions Inc',
    project: 'Carbon Footprint Analysis',
    amount: '$12,000',
    status: 'Rejected',
    created: '2024-01-22',
    validUntil: '2024-02-22',
    assignedTo: 'Lisa Brown'
  },
  {
    id: 5,
    quoteNumber: 'Q-2024-005',
    client: 'Clean Energy Co',
    project: 'Environmental Compliance Review',
    amount: '$18,500',
    status: 'Pending',
    created: '2024-01-25',
    validUntil: '2024-02-25',
    assignedTo: 'David Lee'
  }
]

interface Quotation {
  id: number
  quoteNumber: string
  client: string
  project: string
  amount: string
  status: string
  created: string
  validUntil: string
  assignedTo: string
}

export default function ExecutiveQuotationsPage() {
  const [quotations, setQuotations] = useState<Quotation[]>(quotationsData)
  const [filteredQuotations, setFilteredQuotations] = useState<Quotation[]>(quotationsData)
  const [currentTime, setCurrentTime] = useState('')
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [assignedFilter, setAssignedFilter] = useState('All')

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleString())
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Apply filters
  useEffect(() => {
    let filtered = [...quotations]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(quotation => 
        quotation.quoteNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quotation.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quotation.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quotation.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(quotation => quotation.status === statusFilter)
    }

    // Assigned filter
    if (assignedFilter !== 'All') {
      filtered = filtered.filter(quotation => quotation.assignedTo === assignedFilter)
    }

    setFilteredQuotations(filtered)
  }, [quotations, searchQuery, statusFilter, assignedFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft':
        return 'bg-gray-100 text-gray-800'
      case 'Sent':
        return 'bg-blue-100 text-blue-800'
      case 'Approved':
        return 'bg-green-100 text-green-800'
      case 'Rejected':
        return 'bg-red-100 text-red-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar userRole="executive" userName="Executive User" />
        
        <div className="flex-1 ml-0 md:ml-0">
          <div className="p-6 space-y-6">
            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Quotations</h1>
              <p className="mt-2 text-gray-600">Oversee and manage all quotations</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-2xl border p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Quotations</p>
                    <p className="text-2xl font-bold text-gray-900">{quotations.length}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-500">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Review</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {quotations.filter(q => q.status === 'Pending').length}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-yellow-500">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Approved</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {quotations.filter(q => q.status === 'Approved').length}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-500">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Value</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${quotations.reduce((sum, q) => sum + parseInt(q.amount.replace('$', '').replace(',', '')), 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-500">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl border p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Search</label>
                  <input
                    type="text"
                    placeholder="Quote number, client, or project..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="All">All Status</option>
                    <option value="Draft">Draft</option>
                    <option value="Sent">Sent</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>

                {/* Assigned Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Assigned To</label>
                  <select
                    value={assignedFilter}
                    onChange={(e) => setAssignedFilter(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="All">All Assignees</option>
                    <option value="John Smith">John Smith</option>
                    <option value="Sarah Johnson">Sarah Johnson</option>
                    <option value="Mike Wilson">Mike Wilson</option>
                    <option value="Lisa Brown">Lisa Brown</option>
                    <option value="David Lee">David Lee</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Quotations Table */}
            <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Quotations</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quote Number</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valid Until</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredQuotations.map((quotation) => (
                      <tr key={quotation.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {quotation.quoteNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {quotation.client}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {quotation.project}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {quotation.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(quotation.status)}`}>
                            {quotation.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {quotation.assignedTo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {quotation.created}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {quotation.validUntil}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => console.log('View quotation:', quotation.id)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              View
                            </button>
                            <button 
                              onClick={() => console.log('Edit quotation:', quotation.id)}
                              className="text-green-600 hover:text-green-900"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => console.log('Reassign quotation:', quotation.id)}
                              className="text-orange-600 hover:text-orange-900"
                            >
                              Reassign
                            </button>
                            <button 
                              onClick={() => console.log('Approve quotation:', quotation.id)}
                              className="text-purple-600 hover:text-purple-900"
                            >
                              Approve
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredQuotations.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No quotations found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
