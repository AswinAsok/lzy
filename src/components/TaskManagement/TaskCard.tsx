import React from 'react';
import { Clock, Calendar, Flag, User, CheckCircle, AlertCircle } from 'lucide-react';
import { Task } from '../../types';

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, status: Task['status']) => void;
  onTimeUpdate: (taskId: string, hours: number) => void;
}

const getPriorityColor = (priority: Task['priority']) => {
  switch (priority) {
    case 'urgent':
      return 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800';
    case 'high':
      return 'bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800';
    case 'medium':
      return 'bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
    case 'low':
      return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700';
    default:
      return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700';
  }
};

const getStatusColor = (status: Task['status']) => {
  switch (status) {
    case 'completed':
      return 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700';
    case 'in_progress':
      return 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700';
    case 'review':
      return 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700';
    default:
      return 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700';
  }
};

const isOverdue = (dueDate?: string) => {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date();
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onStatusChange, onTimeUpdate }) => {
  const overdue = isOverdue(task.dueDate);

  return (
    <div
      className={`bg-white dark:bg-gray-900 rounded-lg border p-4 hover:shadow-sm transition-all duration-200 ${
        overdue
          ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950'
          : 'border-gray-200 dark:border-gray-800'
      }`}
    >
      <div className='flex items-start justify-between mb-3'>
        <div className='flex-1'>
          <h4 className='font-semibold text-gray-900 dark:text-white mb-1'>{task.title}</h4>
          {task.description && (
            <p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>{task.description}</p>
          )}
        </div>
        <div className='flex items-center space-x-2'>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(task.priority)}`}
          >
            {task.priority}
          </span>
          {overdue && <AlertCircle className='w-4 h-4 text-red-500 dark:text-red-400' />}
        </div>
      </div>

      <div className='space-y-2 mb-3'>
        <div className='flex items-center justify-between text-sm'>
          <div className='flex items-center space-x-2 text-gray-600 dark:text-gray-400'>
            <User className='w-4 h-4' />
            <span>{task.repositoryName}</span>
          </div>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(task.status)}`}
          >
            {task.status.replace('_', ' ')}
          </span>
        </div>

        <div className='flex items-center justify-between text-sm text-gray-600 dark:text-gray-400'>
          <div className='flex items-center space-x-2'>
            <Clock className='w-4 h-4' />
            <span>
              {task.actualHours || 0}h / {task.estimatedHours}h
            </span>
          </div>
          {task.dueDate && (
            <div className='flex items-center space-x-1'>
              <Calendar className='w-4 h-4' />
              <span className={overdue ? 'text-red-600 dark:text-red-400 font-medium' : ''}>
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className='flex items-center justify-between'>
        <div className='flex flex-wrap gap-1'>
          {task.tags.map((tag, index) => (
            <span
              key={index}
              className='px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full'
            >
              {tag}
            </span>
          ))}
        </div>

        <div className='flex items-center space-x-2'>
          {task.status !== 'completed' && (
            <button
              onClick={() => onStatusChange(task.id, 'completed')}
              className='p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors'
              title='Mark as completed'
            >
              <CheckCircle className='w-4 h-4' />
            </button>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className='mt-3'>
        <div className='flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1'>
          <span>Progress</span>
          <span>{Math.round(((task.actualHours || 0) / task.estimatedHours) * 100)}%</span>
        </div>
        <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              (task.actualHours || 0) > task.estimatedHours
                ? 'bg-red-500 dark:bg-red-400'
                : task.status === 'completed'
                  ? 'bg-gray-900 dark:bg-white'
                  : 'bg-gray-600 dark:bg-gray-400'
            }`}
            style={{
              width: `${Math.min(((task.actualHours || 0) / task.estimatedHours) * 100, 100)}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
