import React from 'react';
import { Activity, Clock } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className='bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center space-x-3'>
            <div className='flex items-center justify-center w-10 h-10 bg-gray-900 dark:bg-white rounded-lg'>
              <Activity className='w-6 h-6 text-white dark:text-gray-900' />
            </div>
            <div>
              <h1 className='text-xl font-semibold text-gray-900 dark:text-white'>
                DevOps Dashboard
              </h1>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Repository & Deployment Monitor
              </p>
            </div>
          </div>

          <div className='flex items-center space-x-6'>
            <div className='flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400'>
              <Clock className='w-4 h-4' />
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
