import React, { useState } from 'react';
import { User, Task } from '../../types';
import { TaskCard } from './TaskCard';
import { Clock, CheckCircle, AlertTriangle, Calendar, TrendingUp } from 'lucide-react';

interface UserTaskBoardProps {
  user: User;
  tasks: Task[];
  onTaskStatusChange: (taskId: string, status: Task['status']) => void;
  onTimeUpdate: (taskId: string, hours: number) => void;
}

export const UserTaskBoard: React.FC<UserTaskBoardProps> = ({
  user,
  tasks,
  onTaskStatusChange,
  onTimeUpdate,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | Task['status']>('all');

  const filteredTasks =
    selectedFilter === 'all' ? tasks : tasks.filter((task) => task.status === selectedFilter);

  const tasksByStatus = {
    todo: tasks.filter((t) => t.status === 'todo'),
    in_progress: tasks.filter((t) => t.status === 'in_progress'),
    review: tasks.filter((t) => t.status === 'review'),
    completed: tasks.filter((t) => t.status === 'completed'),
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return 'text-gray-900 dark:text-white';
    if (efficiency >= 70) return 'text-gray-700 dark:text-gray-300';
    if (efficiency >= 50) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className='bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden'>
      {/* User Header */}
      <div className='bg-gray-50 dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <img
              src={user.avatar}
              alt={user.name}
              className='w-16 h-16 rounded-full border-4 border-white dark:border-gray-900'
            />
            <div>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>{user.name}</h3>
              <p className='text-sm text-gray-600 dark:text-gray-400'>{user.role}</p>
              <p className='text-xs text-gray-500 dark:text-gray-500'>
                Last active: {user.lastActive}
              </p>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4 text-center'>
            <div className='bg-white dark:bg-gray-900 rounded-lg p-3 border border-gray-200 dark:border-gray-700'>
              <div className='text-2xl font-semibold text-gray-900 dark:text-white'>
                {user.activeTasks}
              </div>
              <div className='text-xs text-gray-500 dark:text-gray-400'>Active Tasks</div>
            </div>
            <div className='bg-white dark:bg-gray-900 rounded-lg p-3 border border-gray-200 dark:border-gray-700'>
              <div className={`text-2xl font-semibold ${getEfficiencyColor(user.efficiency)}`}>
                {user.efficiency}%
              </div>
              <div className='text-xs text-gray-500 dark:text-gray-400'>Efficiency</div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className='grid grid-cols-4 gap-4 mt-4'>
          <div className='bg-white dark:bg-gray-900 rounded-lg p-3 text-center border border-gray-200 dark:border-gray-700'>
            <div className='flex items-center justify-center space-x-1 mb-1'>
              <Calendar className='w-4 h-4 text-gray-400 dark:text-gray-500' />
              <span className='text-sm font-medium text-gray-900 dark:text-white'>
                {user.totalTasks}
              </span>
            </div>
            <div className='text-xs text-gray-500 dark:text-gray-400'>Total Tasks</div>
          </div>
          <div className='bg-white dark:bg-gray-900 rounded-lg p-3 text-center border border-gray-200 dark:border-gray-700'>
            <div className='flex items-center justify-center space-x-1 mb-1'>
              <CheckCircle className='w-4 h-4 text-gray-600 dark:text-gray-400' />
              <span className='text-sm font-medium text-gray-900 dark:text-white'>
                {user.completedTasks}
              </span>
            </div>
            <div className='text-xs text-gray-500 dark:text-gray-400'>Completed</div>
          </div>
          <div className='bg-white dark:bg-gray-900 rounded-lg p-3 text-center border border-gray-200 dark:border-gray-700'>
            <div className='flex items-center justify-center space-x-1 mb-1'>
              <AlertTriangle className='w-4 h-4 text-red-500 dark:text-red-400' />
              <span className='text-sm font-medium text-gray-900 dark:text-white'>
                {user.overdueTasks}
              </span>
            </div>
            <div className='text-xs text-gray-500 dark:text-gray-400'>Overdue</div>
          </div>
          <div className='bg-white dark:bg-gray-900 rounded-lg p-3 text-center border border-gray-200 dark:border-gray-700'>
            <div className='flex items-center justify-center space-x-1 mb-1'>
              <Clock className='w-4 h-4 text-gray-600 dark:text-gray-400' />
              <span className='text-sm font-medium text-gray-900 dark:text-white'>
                {user.totalHoursThisWeek}h
              </span>
            </div>
            <div className='text-xs text-gray-500 dark:text-gray-400'>This Week</div>
          </div>
        </div>
      </div>

      {/* Task Filters */}
      <div className='p-4 border-b border-gray-200 dark:border-gray-700'>
        <div className='flex items-center space-x-2 overflow-x-auto'>
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
              selectedFilter === 'all'
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            All ({tasks.length})
          </button>
          <button
            onClick={() => setSelectedFilter('todo')}
            className={`px-3 py-1 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
              selectedFilter === 'todo'
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            To Do ({tasksByStatus.todo.length})
          </button>
          <button
            onClick={() => setSelectedFilter('in_progress')}
            className={`px-3 py-1 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
              selectedFilter === 'in_progress'
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            In Progress ({tasksByStatus.in_progress.length})
          </button>
          <button
            onClick={() => setSelectedFilter('review')}
            className={`px-3 py-1 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
              selectedFilter === 'review'
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Review ({tasksByStatus.review.length})
          </button>
          <button
            onClick={() => setSelectedFilter('completed')}
            className={`px-3 py-1 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
              selectedFilter === 'completed'
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Completed ({tasksByStatus.completed.length})
          </button>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className='p-4'>
        {filteredTasks.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={onTaskStatusChange}
                onTimeUpdate={onTimeUpdate}
              />
            ))}
          </div>
        ) : (
          <div className='text-center py-8'>
            <div className='text-gray-400 dark:text-gray-500 mb-2'>
              {selectedFilter === 'all' ? (
                <Calendar className='w-12 h-12 mx-auto' />
              ) : (
                <CheckCircle className='w-12 h-12 mx-auto' />
              )}
            </div>
            <p className='text-gray-500 dark:text-gray-400'>
              {selectedFilter === 'all'
                ? 'No tasks assigned yet'
                : `No ${selectedFilter.replace('_', ' ')} tasks`}
            </p>
            {selectedFilter === 'all' && user.activeTasks === 0 && (
              <p className='text-sm text-red-500 dark:text-red-400 mt-1 font-medium'>
                ⚠️ This user needs task assignments
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
