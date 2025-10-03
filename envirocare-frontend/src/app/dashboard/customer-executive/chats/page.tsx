'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Sidebar from '../../../../components/Sidebar';
import DashboardHeader from '../../../../components/DashboardHeader';

type Visitor = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  service: string;
  createdAt: string;
  lastInteractionAt?: string;
  isConverted: boolean;
};

type ChatMessage = {
  _id: string;
  visitorId: string;
  sender: 'user' | 'bot';
  message: string;
  at: string;
};

type ConversationData = {
  visitor: Visitor;
  messages: ChatMessage[];
};

export default function ExecutiveChatHistoryPage() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);
  const [conversationData, setConversationData] = useState<ConversationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const token = useMemo(() => (typeof window !== 'undefined' ? localStorage.getItem('ems_token') : null), []);
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000';

  useEffect(() => {
    // Get user info from localStorage
    const userStr = localStorage.getItem('ems_user');
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }

    const loadVisitors = async () => {
      if (!token) {
        setError('No authentication token found. Please login again.');
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await fetch(`${API_BASE}/api/visitors?limit=100&page=1&q=`, { headers });

        if (response.status === 401) {
          setError('Authentication failed. Please login again.');
          localStorage.removeItem('ems_token');
          localStorage.removeItem('ems_user');
          window.location.href = '/login';
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to load visitors');
        }

        const responseData = await response.json();
        
        // The /api/visitors endpoint returns { total, page, pageSize, items }
        const visitorsData = responseData.items || responseData;
        
        // Check if we got valid data
        if (!visitorsData || visitorsData.length === 0) {
          console.warn('No visitors data received');
          setVisitors([]);
          return;
        }
        
        console.log('Real visitors data received:', visitorsData.length, 'visitors out of', responseData.total || 'unknown', 'total');
        console.log('Visitor sources:', visitorsData.map((v: any) => v.source || 'unknown').join(', '));
        console.log('First few visitors:', visitorsData.slice(0, 3).map((v: any) => ({ name: v.name, email: v.email, source: v.source })));
        
        // Filter to show only chatbot visitors (if you want to see all visitors, remove this filter)
        const chatbotVisitors = visitorsData.filter((v: any) => v.source === 'chatbot' || !v.source);
        console.log('Chatbot visitors:', chatbotVisitors.length, 'out of', visitorsData.length, 'total');
        
        setVisitors(chatbotVisitors);

        // Auto-select first visitor if available
        if (chatbotVisitors.length > 0 && !selectedVisitor) {
          setSelectedVisitor(chatbotVisitors[0]);
        }

      } catch (e: any) {
        console.error('Error loading visitors:', e);
        setError(e.message || 'Failed to load visitors');
      } finally {
        setLoading(false);
      }
    };

    loadVisitors();
  }, [API_BASE, token]);

  useEffect(() => {
    const loadConversation = async () => {
      if (!selectedVisitor || !token) return;

      try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await fetch(`${API_BASE}/api/analytics/executive-chat-conversation/${selectedVisitor._id}`, { headers });

        if (response.ok) {
          const conversationData = await response.json();
          setConversationData(conversationData);
        } else {
          console.error('Failed to load conversation');
        }
      } catch (e) {
        console.error('Error loading conversation:', e);
      }
    };

    loadConversation();
  }, [selectedVisitor, API_BASE, token]);

  const filteredVisitors = visitors.filter(visitor =>
    visitor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visitor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visitor.organization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visitor.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visitor.region?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visitor.service?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visitor.subservice?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visitor.agentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visitor.salesExecutiveName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visitor.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visitor.enquiryDetails?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visitor.comments?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visitor.source?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatMessageTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar userRole="executive" userName={user?.name} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader userRole="executive" userName={user?.name} />
          <div className="flex-1 p-6 flex items-center justify-center">
            <div className="text-gray-600">Loading your chat history...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar userRole="executive" userName={user?.name} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader userRole="executive" userName={user?.name} />
          <div className="flex-1 p-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="text-red-600">{error}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar userRole="executive" userName={user?.name} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader userRole="executive" userName={user?.name} />
        
        <div className="flex-1 flex overflow-hidden">
          {/* Left Section - Visitors List */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">My Visitors</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search visitors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2">
              {filteredVisitors.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  {searchTerm ? 'No visitors found' : 'No visitors available'}
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredVisitors.map((visitor) => (
                    <div
                      key={visitor._id}
                      onClick={() => setSelectedVisitor(visitor)}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedVisitor?._id === visitor._id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-blue-600 font-medium text-sm">
                                {visitor.name ? visitor.name.charAt(0).toUpperCase() : visitor.email.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {visitor.name || 'Anonymous'}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                {visitor.email}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`w-2 h-2 rounded-full ${
                            visitor.isConverted ? 'bg-green-500' : 'bg-gray-300'
                          }`}></div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs text-gray-500">
                          {formatDate(visitor.lastInteractionAt || visitor.createdAt)}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {visitor.service || 'General Inquiry'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Middle Section - Conversation Window */}
          <div className="flex-1 bg-white flex flex-col">
            {selectedVisitor ? (
              <>
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Conversation with {selectedVisitor.name || 'Anonymous'}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {selectedVisitor.email} • {formatDate(selectedVisitor.lastInteractionAt || selectedVisitor.createdAt)}
                  </p>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4">
                  {conversationData?.messages && conversationData.messages.length > 0 ? (
                    <div className="space-y-4">
                      {conversationData.messages.map((message) => (
                        <div
                          key={message._id}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.sender === 'user'
                                ? 'bg-white border border-gray-200 text-gray-900'
                                : 'bg-blue-900 text-white'
                            }`}
                          >
                            <p className="text-sm">{message.message}</p>
                            <p className={`text-xs mt-1 ${
                              message.sender === 'user' ? 'text-gray-700' : 'text-blue-100'
                            }`}>
                              {formatMessageTime(message.at)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center text-gray-500">
                        <p>No messages found for this visitor</p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-500">
                  <p>Select a visitor to view conversation</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Section - Visitor Information */}
          <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
            {selectedVisitor ? (
              <div className="p-4 flex flex-col h-full">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Visitor Information</h3>
                
                <div className="space-y-4 flex-1 overflow-y-auto pr-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <p className="text-sm text-gray-900">
                      {selectedVisitor.name || 'Not provided'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-sm text-gray-900">
                      {selectedVisitor.email || 'Not provided'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <p className="text-sm text-gray-900">
                      {selectedVisitor.phone || 'Not provided'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                    <p className="text-sm text-gray-900">
                      {selectedVisitor.organization || 'Not provided'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Interest</label>
                    <p className="text-sm text-gray-900">
                      {selectedVisitor.service || 'General Inquiry'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lead Conversion</label>
                    <div className="flex items-center">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        selectedVisitor.isConverted 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {selectedVisitor.isConverted ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Visit</label>
                    <p className="text-sm text-gray-900">
                      {formatDate(selectedVisitor.createdAt)}
                    </p>
                  </div>

                  {selectedVisitor.lastInteractionAt && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Interaction</label>
                      <p className="text-sm text-gray-900">
                        {formatDate(selectedVisitor.lastInteractionAt)}
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Messages</label>
                    <p className="text-sm text-gray-900">
                      {conversationData?.messages?.length || 0}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Visitor Information</h3>
                <div className="text-center text-gray-500">
                  <p>Select a visitor to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
