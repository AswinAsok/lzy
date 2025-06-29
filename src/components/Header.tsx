import React from 'react';
import { Activity, Zap, Clock, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface NetlifyAccount {
  name: string;
  usedMinutes: number;
  totalMinutes: number;
  percentage: number;
}

interface HeaderProps {
  netlifyAccounts: NetlifyAccount[];
}

export const Header: React.FC<HeaderProps> = ({ netlifyAccounts }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-900 dark:bg-white rounded-lg">
              <Activity className="w-6 h-6 text-white dark:text-gray-900" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">DevOps Dashboard</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Repository & Deployment Monitor</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            {netlifyAccounts.map((account, index) => (
              <div key={index} className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-2">
                <Zap className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{account.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {account.usedMinutes}/{account.totalMinutes} minutes
                  </div>
                </div>
                <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      account.percentage > 80
                        ? 'bg-red-500'
                        : account.percentage > 60
                        ? 'bg-yellow-500'
                        : 'bg-gray-900 dark:bg-white'
                    }`}
                    style={{ width: `${account.percentage}%` }}
                  />
                </div>
              </div>
            ))}
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
            
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};