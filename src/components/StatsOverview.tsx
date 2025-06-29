import React from 'react';
import { GitBranch, GitPullRequest, CheckCircle, XCircle, Clock, TrendingUp, Users, AlertTriangle } from 'lucide-react';

interface StatsOverviewProps {
  totalRepos: number;
  totalPRs: number;
  successfulBuilds: number;
  failedBuilds: number;
  activeBuilds: number;
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  unassignedUsers: number;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({
  totalRepos,
  totalPRs,
  successfulBuilds,
  failedBuilds,
  activeBuilds,
  totalTasks,
  completedTasks,
  overdueTasks,
  unassignedUsers
}) => {
  const stats = [
    {
      label: 'Total Repositories',
      value: totalRepos,
      icon: GitBranch,
      alert: false
    },
    {
      label: 'Open Pull Requests',
      value: totalPRs,
      icon: GitPullRequest,
      alert: false
    },
    {
      label: 'Successful Builds',
      value: successfulBuilds,
      icon: CheckCircle,
      alert: false
    },
    {
      label: 'Failed Builds',
      value: failedBuilds,
      icon: XCircle,
      alert: failedBuilds > 0
    },
    {
      label: 'Active Builds',
      value: activeBuilds,
      icon: Clock,
      alert: false
    },
    {
      label: 'Total Tasks',
      value: totalTasks,
      icon: TrendingUp,
      alert: false
    },
    {
      label: 'Completed Tasks',
      value: completedTasks,
      icon: CheckCircle,
      alert: false
    },
    {
      label: 'Overdue Tasks',
      value: overdueTasks,
      icon: AlertTriangle,
      alert: overdueTasks > 0
    },
    {
      label: 'Unassigned Users',
      value: unassignedUsers,
      icon: Users,
      alert: unassignedUsers > 0
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className={`bg-white dark:bg-gray-900 rounded-lg border p-4 hover:shadow-sm transition-all duration-200 ${
            stat.alert 
              ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950' 
              : 'border-gray-200 dark:border-gray-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                stat.alert 
                  ? 'text-red-700 dark:text-red-300' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}>
                {stat.label}
              </p>
              <p className={`text-2xl font-semibold mt-1 ${
                stat.alert 
                  ? 'text-red-900 dark:text-red-200' 
                  : 'text-gray-900 dark:text-white'
              }`}>
                {stat.value}
                {stat.alert && stat.value > 0 && (
                  <span className="ml-1 text-sm">⚠️</span>
                )}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${
              stat.alert 
                ? 'bg-red-100 dark:bg-red-900' 
                : 'bg-gray-100 dark:bg-gray-800'
            }`}>
              <stat.icon className={`w-6 h-6 ${
                stat.alert 
                  ? 'text-red-600 dark:text-red-400' 
                  : 'text-gray-600 dark:text-gray-400'
              }`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};