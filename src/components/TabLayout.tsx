import React, { useState } from 'react';
import { ProjectManager } from './ProjectManager';
import { JSONBuilder } from './JSONBuilder';

type TabType = 'manager' | 'builder';

export const TabLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('manager');

  const tabs = [
    { id: 'manager' as TabType, label: 'Project Manager', icon: '📋' },
    { id: 'builder' as TabType, label: 'JSON Builder', icon: '🔧' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Tab Navigation */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-semibold text-sm transition-colors duration-200 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'manager' && <ProjectManager />}
        {activeTab === 'builder' && <JSONBuilder />}
      </div>
    </div>
  );
};