import { useState, useEffect } from 'react';

// Mock data - in production, this would come from GitHub and Netlify APIs
const mockRepositories = [
  {
    name: 'ecommerce-frontend',
    assignee: 'Sarah Chen',
    assigneeAvatar:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    currentBranch: 'feature/checkout-optimization',
    lastCommit: {
      message: 'Optimize checkout flow performance',
      author: 'Sarah Chen',
      timestamp: '2 hours ago',
    },
    pullRequests: [
      {
        id: 124,
        title: 'Add payment gateway integration',
        status: 'approved' as const,
        author: 'Sarah Chen',
        reviewCount: 2,
      },
      {
        id: 125,
        title: 'Fix mobile responsive issues',
        status: 'pending' as const,
        author: 'Sarah Chen',
        reviewCount: 0,
      },
    ],
    buildStatus: {
      status: 'success' as const,
      deployUrl: 'https://ecommerce-frontend.netlify.app',
      timestamp: '1 hour ago',
      duration: '3m 42s',
    },
    currentTask: 'Implementing Stripe payment integration',
    isPrivate: true,
  },
  {
    name: 'api-backend',
    assignee: 'Marcus Rodriguez',
    assigneeAvatar:
      'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    currentBranch: 'main',
    lastCommit: {
      message: 'Add user authentication middleware',
      author: 'Marcus Rodriguez',
      timestamp: '4 hours ago',
    },
    pullRequests: [
      {
        id: 89,
        title: 'Implement JWT token refresh',
        status: 'changes_requested' as const,
        author: 'Marcus Rodriguez',
        reviewCount: 1,
      },
    ],
    buildStatus: {
      status: 'failed' as const,
      timestamp: '3 hours ago',
      duration: '1m 23s',
    },
    currentTask: 'Fixing authentication token expiration bug',
    isPrivate: true,
  },
  {
    name: 'dashboard-analytics',
    assignee: 'Emily Watson',
    assigneeAvatar:
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    currentBranch: 'develop',
    lastCommit: {
      message: 'Add real-time chart updates',
      author: 'Emily Watson',
      timestamp: '30 minutes ago',
    },
    pullRequests: [
      {
        id: 67,
        title: 'Add export functionality',
        status: 'merged' as const,
        author: 'Emily Watson',
        reviewCount: 3,
      },
      {
        id: 68,
        title: 'Implement dark mode',
        status: 'pending' as const,
        author: 'Emily Watson',
        reviewCount: 1,
      },
    ],
    buildStatus: {
      status: 'running' as const,
      timestamp: '5 minutes ago',
    },
    currentTask: 'Building comprehensive analytics dashboard',
    isPrivate: true,
  },
  {
    name: 'mobile-app',
    assignee: 'David Kim',
    assigneeAvatar:
      'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    currentBranch: 'feature/push-notifications',
    lastCommit: {
      message: 'Implement push notification service',
      author: 'David Kim',
      timestamp: '6 hours ago',
    },
    pullRequests: [],
    buildStatus: {
      status: 'success' as const,
      deployUrl: 'https://mobile-app-preview.netlify.app',
      timestamp: '5 hours ago',
      duration: '7m 12s',
    },
    currentTask: 'Integrating Firebase push notifications',
    isPrivate: true,
  },
  {
    name: 'documentation-site',
    assignee: 'Lisa Park',
    assigneeAvatar:
      'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    currentBranch: 'content/api-docs',
    lastCommit: {
      message: 'Update API documentation',
      author: 'Lisa Park',
      timestamp: '1 day ago',
    },
    pullRequests: [
      {
        id: 45,
        title: 'Add code examples to API docs',
        status: 'approved' as const,
        author: 'Lisa Park',
        reviewCount: 2,
      },
    ],
    buildStatus: {
      status: 'success' as const,
      deployUrl: 'https://docs.company.com',
      timestamp: '1 day ago',
      duration: '2m 15s',
    },
    isPrivate: false,
  },
  {
    name: 'admin-panel',
    assignee: 'Alex Thompson',
    assigneeAvatar:
      'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    currentBranch: 'feature/user-management',
    lastCommit: {
      message: 'Add user role management',
      author: 'Alex Thompson',
      timestamp: '8 hours ago',
    },
    pullRequests: [
      {
        id: 156,
        title: 'Implement role-based permissions',
        status: 'pending' as const,
        author: 'Alex Thompson',
        reviewCount: 0,
      },
      {
        id: 157,
        title: 'Add audit logging',
        status: 'approved' as const,
        author: 'Alex Thompson',
        reviewCount: 1,
      },
    ],
    buildStatus: {
      status: 'queued' as const,
      timestamp: 'Just now',
    },
    currentTask: 'Building comprehensive user management system',
    isPrivate: true,
  },
];

const mockNetlifyAccounts = [
  {
    name: 'Production',
    usedMinutes: 180,
    totalMinutes: 300,
    percentage: 60,
  },
  {
    name: 'Development',
    usedMinutes: 45,
    totalMinutes: 200,
    percentage: 22.5,
  },
];

export const useDashboardData = () => {
  const [repositories, setRepositories] = useState(mockRepositories);
  const [netlifyAccounts, setNetlifyAccounts] = useState(mockNetlifyAccounts);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulate API data fetching
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setRepositories(mockRepositories);
      setNetlifyAccounts(mockNetlifyAccounts);
      setLastUpdated(new Date());
      setIsLoading(false);
    };

    fetchData();

    // Set up auto-refresh every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const stats = {
    totalRepos: repositories.length,
    totalPRs: repositories.reduce((sum, repo) => sum + repo.pullRequests.length, 0),
    successfulBuilds: repositories.filter((repo) => repo.buildStatus.status === 'success').length,
    failedBuilds: repositories.filter((repo) => repo.buildStatus.status === 'failed').length,
    activeBuilds: repositories.filter((repo) => repo.buildStatus.status === 'running').length,
  };

  return {
    repositories,
    netlifyAccounts,
    stats,
    isLoading,
    lastUpdated,
  };
};
