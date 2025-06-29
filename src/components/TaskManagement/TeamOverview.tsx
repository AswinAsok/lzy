import React from 'react';
import { User } from '../../types';
import { Users, AlertTriangle, TrendingUp, Clock } from 'lucide-react';

interface TeamOverviewProps {
  users: User[];
}

export const TeamOverview: React.FC<TeamOverviewProps> = ({ users }) => {
  const unassignedUsers = users.filter(user => user.activeTasks === 0);
  const overloadedUsers = users.filter(user => user.activeTasks > 5);
  const averageEfficiency = users.reduce((sum, user) => sum + user.efficiency, 0) / users.length;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-900 dark:bg-white rounded-lg">
            <Users className="w-6 h-6 text-white dark:text-gray-900" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Team Overview</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Workload distribution and performance metrics</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-semibold text-gray-900 dark:text-white">{users.length}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Team Members</div>
        </div>
      </div>

      {/* Alert Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {unassignedUsers.length > 0 && (
          <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
              <span className="font-medium text-red-900 dark:text-red-200">Unassigned Members</span>
            </div>
            <div className="text-2xl font-semibold text-red-600 dark:text-red-400 mb-2">{unassignedUsers.length}</div>
            <div className="space-y-1">
              {unassignedUsers.slice(0, 3).map((user) => (
                <div key={user.id} className="text-sm text-red-700 dark:text-red-300">
                  • {user.name}
                </div>
              ))}
              {unassignedUsers.length > 3 && (
                <div className="text-sm text-red-600 dark:text-red-400">
                  +{unassignedUsers.length - 3} more
                </div>
              )}
            </div>
          </div>
        )}

        {overloadedUsers.length > 0 && (
          <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <span className="font-medium text-yellow-900 dark:text-yellow-200">Overloaded Members</span>
            </div>
            <div className="text-2xl font-semibold text-yellow-600 dark:text-yellow-400 mb-2">{overloadedUsers.length}</div>
            <div className="space-y-1">
              {overloadedUsers.slice(0, 3).map((user) => (
                <div key={user.id} className="text-sm text-yellow-700 dark:text-yellow-300">
                  • {user.name} ({user.activeTasks} tasks)
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="font-medium text-gray-900 dark:text-white">Team Efficiency</span>
          </div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            {Math.round(averageEfficiency)}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Average across all members</div>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className={`bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border transition-all duration-200 hover:shadow-sm ${
              user.activeTasks === 0
                ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950'
                : user.activeTasks > 5
                ? 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="flex items-center space-x-3 mb-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900"
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 dark:text-white truncate">{user.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.role}</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Active Tasks</span>
                <span className={`font-medium ${
                  user.activeTasks === 0 ? 'text-red-600 dark:text-red-400' : 
                  user.activeTasks > 5 ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-900 dark:text-white'
                }`}>
                  {user.activeTasks}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Completed</span>
                <span className="font-medium text-gray-900 dark:text-white">{user.completedTasks}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Efficiency</span>
                <span className="font-medium text-gray-900 dark:text-white">{user.efficiency}%</span>
              </div>
              {user.overdueTasks > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Overdue</span>
                  <span className="font-medium text-red-600 dark:text-red-400">{user.overdueTasks}</span>
                </div>
              )}
            </div>

            {user.activeTasks === 0 && (
              <div className="mt-3 p-2 bg-red-100 dark:bg-red-900 rounded text-center">
                <span className="text-xs font-medium text-red-800 dark:text-red-200">Needs Assignment</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};