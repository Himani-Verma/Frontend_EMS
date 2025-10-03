'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../../../components/Sidebar';
import DashboardHeader from '../../../../components/DashboardHeader';
import StatBox from '../../../../components/StatBox';
import DailyVisitorsChart from '../../../../components/DailyVisitorsChart';
import ConversionRateChart from '../../../../components/ConversationRatioChart';
import DailyAnalysisTable from '../../../../components/DailyAnalysisTable';
import RecentConversations from '../../../../components/RecentConversations';

export default function OverviewPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  // Mock data for demonstration
  const mockTotals = {
    visitors: 1247,
    messages: 892,
    faqs: 156,
    articles: 23
  };

  const mockToday = {
    visitors: 89,
    messages: 67
  };

  const mockDailyVisitorsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Visitors',
      data: [45, 67, 89, 123, 98, 76, 54],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)'
    }]
  };

  const mockConversationRatioData = {
    visitors: 1247,
    leadsConverted: 234,
    conversionRate: 18.8
  };

  const mockDailyAnalysisData = [
    { id: '1', visitor: 'John Doe', agent: 'Sarah Wilson', enquiry: 'Environmental Consulting', dateTime: '2024-01-15 10:30', status: 'active' as const },
    { id: '2', visitor: 'Jane Smith', agent: 'Mike Johnson', enquiry: 'Waste Management', dateTime: '2024-01-15 11:15', status: 'completed' as const },
    { id: '3', visitor: 'Bob Brown', agent: 'Lisa Davis', enquiry: 'Sustainability Planning', dateTime: '2024-01-15 14:20', status: 'pending' as const }
  ];

  const mockRecentConversationsData = [
    {
      id: '1',
      visitor: 'John Doe',
      lastMessage: 'Thank you for the information!',
      timestamp: '2 minutes ago',
      messages: [
        { sender: 'visitor' as const, message: 'Hello, I need help with environmental compliance', timestamp: '10:30 AM' },
        { sender: 'agent' as const, message: 'I\'d be happy to help you with that!', timestamp: '10:31 AM' }
      ]
    },
    {
      id: '2',
      visitor: 'Jane Smith',
      lastMessage: 'Can you send me more details?',
      timestamp: '5 minutes ago',
      messages: [
        { sender: 'visitor' as const, message: 'I\'m interested in your waste management services', timestamp: '11:15 AM' },
        { sender: 'agent' as const, message: 'Absolutely! Let me get you the information you need.', timestamp: '11:16 AM' }
      ]
    }
  ];

  useEffect(() => {
    // Get user info from localStorage
    const userStr = localStorage.getItem('ems_user');
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
        
        // Check if user has admin role, if not redirect to appropriate dashboard
        if (userData.role !== 'admin') {
          console.warn(`User ${userData.name} (${userData.role}) attempted to access admin route`);
          if (userData.role === 'executive') {
            router.push('/dashboard/executive');
          } else {
            router.push('/login');
          }
          return;
        }
      } catch (e) {
        console.error('Error parsing user data:', e);
        router.push('/login');
        return;
      }
    } else {
      router.push('/login');
      return;
    }
  }, [router]);

  // Calculate derived statistics
  const leadsAcquired = mockConversationRatioData.leadsConverted;
  const chatbotEnquiries = mockTotals.messages;
  const pendingConversations = Math.max(0, mockTotals.visitors - leadsAcquired);

  // Don't render if user is not admin
  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar userRole={user.role} userName={user.name} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader userRole={user.role} userName={user.name} />
        
        <div className="flex-1 p-2 sm:p-2.5 overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100">
          {/* Page Header */}
          <div className="mb-2">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-base sm:text-lg font-bold text-gray-900 mb-0.5">
                  Admin Dashboard
                </h1>
                <p className="text-xs text-gray-600">
                  Welcome back, {user?.name}! Here&apos;s your system overview.
                </p>
              </div>
            </div>
          </div>
          
          {/* Demo Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 shadow-sm">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-blue-700 font-medium">Demo Mode - Using mock data for demonstration</div>
            </div>
          </div>

          {/* Stat Boxes - First Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-2 sm:mb-3">
            <div className="group h-full">
              <StatBox
                title="Total Visitors"
                value={mockTotals.visitors}
                icon="👥"
                color="blue"
                change={{ value: 12, isPositive: true }}
              />
            </div>
            <div className="group h-full">
              <StatBox
                title="Leads Acquired"
                value={leadsAcquired}
                icon="🎯"
                color="green"
                change={{ value: 8, isPositive: true }}
              />
            </div>
            <div className="group h-full">
              <StatBox
                title="Chatbot Enquiries"
                value={chatbotEnquiries}
                icon="🤖"
                color="orange"
                change={{ value: 15, isPositive: true }}
              />
            </div>
            <div className="group h-full">
              <StatBox
                title="Pending Conversations"
                value={pendingConversations}
                icon="⏳"
                color="red"
                change={{ value: 5, isPositive: false }}
              />
            </div>
          </div>

          {/* Charts - Second Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-2 sm:mb-3">
            <div className="group h-full">
              <DailyVisitorsChart 
                data={mockDailyVisitorsData} 
              />
            </div>
            <div className="group h-full">
              <ConversionRateChart 
                visitors={mockConversationRatioData.visitors} 
                leadsConverted={mockConversationRatioData.leadsConverted} 
              />
            </div>
          </div>

          {/* Tables - Third Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div className="group">
              <DailyAnalysisTable data={mockDailyAnalysisData} />
            </div>
            <div className="group">
              <RecentConversations conversations={mockRecentConversationsData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

