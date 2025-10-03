import React from 'react';

interface VisitorInfo {
  id: string;
  visitor: string;
  agent: string;
  enquiry: string;
  dateTime: string;
  status: 'active' | 'completed' | 'pending';
}

interface DailyAnalysisTableProps {
  data: VisitorInfo[];
}

export default function DailyAnalysisTable({ data }: DailyAnalysisTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-xs font-semibold text-gray-900 mb-1.5">Daily Analysis</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-1 px-1 font-medium text-gray-900 text-xs">Visitor</th>
              <th className="text-left py-1 px-1 font-medium text-gray-900 text-xs">Agent</th>
              <th className="text-left py-1 px-1 font-medium text-gray-900 text-xs">Enquiry</th>
              <th className="text-left py-1 px-1 font-medium text-gray-900 text-xs">Date & Time</th>
              <th className="text-left py-1 px-1 font-medium text-gray-900 text-xs">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr 
                key={item.id} 
                className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <td className="py-1 px-1">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-1.5">
                      <span className="text-blue-600 font-medium text-xs">
                        {item.visitor.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="font-medium text-gray-900 text-xs">{item.visitor}</span>
                  </div>
                </td>
                <td className="py-1 px-1">
                  <span className="text-gray-900 text-xs">{item.agent}</span>
                </td>
                <td className="py-1 px-1">
                  <span className="text-gray-900 truncate max-w-20 block text-xs" title={item.enquiry}>
                    {item.enquiry}
                  </span>
                </td>
                <td className="py-1 px-1">
                  <span className="text-gray-800 text-xs">{formatDateTime(item.dateTime)}</span>
                </td>
                <td className="py-1 px-1">
                  <span className={`inline-flex px-1 py-0.5 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
