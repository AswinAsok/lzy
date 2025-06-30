import { useState } from 'react';
// import { Header } from './components/Header';
import { StatsOverview } from './components/StatsOverview';
import { RepositoryCard } from './components/RepositoryCard';
import { TeamOverview } from './components/TaskManagement/TeamOverview';
import { UserTaskBoard } from './components/TaskManagement/UserTaskBoard';
import { useDashboardData } from './hooks/useDashboardData';
import { useTaskManagement } from './hooks/useTaskManagement';
import { Users, GitBranch } from 'lucide-react';

type ViewMode = 'repositories' | 'tasks';

function AppContent() {
  const { repositories, stats, isLoading } = useDashboardData();
  const {
    users,
    isLoading: tasksLoading,
    updateTaskStatus,
    updateTaskTime,
    getTasksForUser,
    getTaskStats,
  } = useTaskManagement();

  const [viewMode, setViewMode] = useState<ViewMode>('repositories');
  const taskStats = getTaskStats();

  if (isLoading || tasksLoading) {
    return (
      <div className='min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto mb-4'></div>
          <p className='text-gray-600 dark:text-gray-400'>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  const enhancedStats = {
    ...stats,
    ...taskStats,
  };

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-950'>
      {/* <Header netlifyAccounts={netlifyAccounts} /> */}

      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* View Mode Toggle */}
        <div className='flex items-start justify-start mb-8'>
          <div className='bg-white dark:bg-gray-900 rounded-lg p-1 border border-gray-200 dark:border-gray-800 flex'>
            <button
              onClick={() => setViewMode('repositories')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                viewMode === 'repositories'
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <GitBranch className='w-4 h-4' />
              <span>Repositories</span>
            </button>
            <button
              onClick={() => setViewMode('tasks')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                viewMode === 'tasks'
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <Users className='w-4 h-4' />
              <span>Task Management</span>
            </button>
          </div>
        </div>

        <StatsOverview {...enhancedStats} />

        {/* Content based on view mode */}
        {viewMode === 'repositories' ? (
          <>
            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
              {repositories.map((repository, index) => (
                <RepositoryCard key={index} repository={repository} />
              ))}
            </div>

            {repositories.length === 0 && (
              <div className='text-center py-12'>
                <p className='text-gray-500 dark:text-gray-400 text-lg'>No repositories found</p>
                <p className='text-gray-400 dark:text-gray-500 text-sm mt-2'>
                  Connect your GitHub account to start monitoring repositories
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            <TeamOverview users={users} />

            <div className='space-y-8'>
              {users.map((user) => (
                <UserTaskBoard
                  key={user.id}
                  user={user}
                  tasks={getTasksForUser(user.name)}
                  onTaskStatusChange={updateTaskStatus}
                  onTimeUpdate={updateTaskTime}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function App() {
  return <AppContent />;
}

export default App;
