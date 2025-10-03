import React, { useState } from 'react';

interface Conversation {
  id: string;
  visitor: string;
  messages: {
    sender: 'visitor' | 'agent';
    message: string;
    timestamp: string;
  }[];
  lastMessage: string;
  timestamp: string;
}

interface RecentConversationsProps {
  conversations: Conversation[];
}

export default function RecentConversations({ conversations }: RecentConversationsProps) {
  const [expandedConversation, setExpandedConversation] = useState<string | null>(null);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const toggleConversation = (conversationId: string) => {
    setExpandedConversation(expandedConversation === conversationId ? null : conversationId);
  };

  return (
    <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-xs font-semibold text-gray-900 mb-1.5">Recent Conversations</h3>
      
      <div className="space-y-1">
        {conversations.map((conversation) => (
          <div key={conversation.id} className="border border-gray-200 rounded-lg">
            {/* Conversation Header */}
            <button
              onClick={() => toggleConversation(conversation.id)}
              className="w-full p-1.5 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center space-x-1.5">
                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium text-xs">
                    {conversation.visitor.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-900 text-xs">{conversation.visitor}</div>
                  <div className="text-xs text-gray-900 truncate max-w-24">
                    {conversation.lastMessage}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-700">{formatTime(conversation.timestamp)}</span>
                <svg 
                  className={`w-3 h-3 text-gray-400 transition-transform ${
                    expandedConversation === conversation.id ? 'rotate-180' : ''
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {/* Expanded Conversation History */}
            {expandedConversation === conversation.id && (
              <div className="border-t border-gray-200 p-2 bg-gray-50">
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {conversation.messages.map((message, index) => (
                    <div 
                      key={index} 
                      className={`flex ${message.sender === 'visitor' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div 
                        className={`max-w-xs px-1.5 py-1 rounded-lg ${
                          message.sender === 'visitor' 
                            ? 'bg-white border border-gray-200' 
                            : 'bg-blue-600 text-white'
                        }`}
                      >
                        <div className={`text-xs ${message.sender === 'visitor' ? 'text-gray-900' : 'text-white'}`}>{message.message}</div>
                        <div className={`text-xs mt-0.5 ${
                          message.sender === 'visitor' ? 'text-gray-700' : 'text-blue-100'
                        }`}>
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
