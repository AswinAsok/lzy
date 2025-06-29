import React from 'react';
import {
  GitBranch,
  GitPullRequest,
  User,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  ExternalLink,
  Calendar,
} from 'lucide-react';

interface PullRequest {
  id: number;
  title: string;
  status: 'pending' | 'approved' | 'changes_requested' | 'merged';
  author: string;
  reviewCount: number;
}

interface BuildStatus {
  status: 'success' | 'failed' | 'running' | 'queued';
  deployUrl?: string;
  timestamp: string;
  duration?: string;
}

interface Repository {
  name: string;
  assignee: string;
  assigneeAvatar: string;
  currentBranch: string;
  lastCommit: {
    message: string;
    author: string;
    timestamp: string;
  };
  pullRequests: PullRequest[];
  buildStatus: BuildStatus;
  currentTask?: string;
  isPrivate: boolean;
}

interface RepositoryCardProps {
  repository: Repository;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'success':
      return <CheckCircle className='w-5 h-5 text-gray-900 dark:text-white' />;
    case 'failed':
      return <XCircle className='w-5 h-5 text-red-600 dark:text-red-400' />;
    case 'running':
      return <Clock className='w-5 h-5 text-gray-600 dark:text-gray-400 animate-spin' />;
    case 'queued':
      return <Clock className='w-5 h-5 text-gray-400 dark:text-gray-500' />;
    default:
      return <AlertCircle className='w-5 h-5 text-gray-400 dark:text-gray-500' />;
  }
};

const getPRStatusColor = (status: string) => {
  switch (status) {
    case 'approved':
      return 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700';
    case 'changes_requested':
      return 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800';
    case 'merged':
      return 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700';
    default:
      return 'bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
  }
};

export const RepositoryCard: React.FC<RepositoryCardProps> = ({ repository }) => {
  return (
    <div className='bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 hover:shadow-sm transition-all duration-200 overflow-hidden'>
      {/* Header */}
      <div className='p-6 border-b border-gray-100 dark:border-gray-800'>
        <div className='flex items-start justify-between'>
          <div className='flex-1'>
            <div className='flex items-center space-x-2 mb-2'>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                {repository.name}
              </h3>
              {repository.isPrivate && (
                <span className='px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full'>
                  Private
                </span>
              )}
            </div>
            <div className='flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400'>
              <GitBranch className='w-4 h-4' />
              <span>{repository.currentBranch}</span>
            </div>
          </div>
          <div className='flex items-center space-x-2'>
            <img
              src={repository.assigneeAvatar}
              alt={repository.assignee}
              className='w-8 h-8 rounded-full border-2 border-white dark:border-gray-900'
            />
            <div className='text-right'>
              <div className='text-sm font-medium text-gray-900 dark:text-white'>
                {repository.assignee}
              </div>
              <div className='text-xs text-gray-500 dark:text-gray-400'>Assignee</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='p-6 space-y-4'>
        {/* Current Task */}
        {repository.currentTask && (
          <div className='bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3'>
            <div className='flex items-start space-x-2'>
              <User className='w-4 h-4 text-gray-600 dark:text-gray-400 mt-0.5' />
              <div>
                <div className='text-sm font-medium text-gray-900 dark:text-white'>
                  Current Task
                </div>
                <div className='text-sm text-gray-700 dark:text-gray-300'>
                  {repository.currentTask}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Last Commit */}
        <div className='space-y-2'>
          <div className='flex items-center space-x-2'>
            <Calendar className='w-4 h-4 text-gray-400 dark:text-gray-500' />
            <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
              Last Commit
            </span>
          </div>
          <div className='bg-gray-50 dark:bg-gray-800 rounded-lg p-3'>
            <div className='text-sm text-gray-900 dark:text-white mb-1'>
              {repository.lastCommit.message}
            </div>
            <div className='text-xs text-gray-500 dark:text-gray-400'>
              by {repository.lastCommit.author} • {repository.lastCommit.timestamp}
            </div>
          </div>
        </div>

        {/* Pull Requests */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <GitPullRequest className='w-4 h-4 text-gray-400 dark:text-gray-500' />
              <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                Pull Requests
              </span>
            </div>
            <span className='text-xs text-gray-500 dark:text-gray-400'>
              {repository.pullRequests.length} open
            </span>
          </div>

          {repository.pullRequests.length > 0 ? (
            <div className='space-y-2'>
              {repository.pullRequests.slice(0, 3).map((pr) => (
                <div
                  key={pr.id}
                  className='flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg'
                >
                  <div className='flex-1 min-w-0'>
                    <div className='text-sm text-gray-900 dark:text-white truncate'>
                      #{pr.id} {pr.title}
                    </div>
                    <div className='text-xs text-gray-500 dark:text-gray-400'>by {pr.author}</div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full border ${getPRStatusColor(pr.status)}`}
                  >
                    {pr.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
              {repository.pullRequests.length > 3 && (
                <div className='text-xs text-gray-500 dark:text-gray-400 text-center'>
                  +{repository.pullRequests.length - 3} more
                </div>
              )}
            </div>
          ) : (
            <div className='text-sm text-gray-500 dark:text-gray-400 text-center py-2'>
              No open pull requests
            </div>
          )}
        </div>
      </div>

      {/* Footer - Build Status */}
      <div className='px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-3'>
            {getStatusIcon(repository.buildStatus.status)}
            <div>
              <div className='text-sm font-medium text-gray-900 dark:text-white capitalize'>
                {repository.buildStatus.status === 'success'
                  ? 'Deploy Successful'
                  : repository.buildStatus.status === 'failed'
                    ? 'Deploy Failed'
                    : repository.buildStatus.status === 'running'
                      ? 'Building...'
                      : 'Queued'}
              </div>
              <div className='text-xs text-gray-500 dark:text-gray-400'>
                {repository.buildStatus.timestamp}
                {repository.buildStatus.duration && ` • ${repository.buildStatus.duration}`}
              </div>
            </div>
          </div>

          {repository.buildStatus.deployUrl && repository.buildStatus.status === 'success' && (
            <a
              href={repository.buildStatus.deployUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors'
            >
              <span>View Live</span>
              <ExternalLink className='w-3 h-3' />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
