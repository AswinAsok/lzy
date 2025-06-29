import { useState, useEffect } from 'react';
import { Task, User } from '../types';

// Mock task data
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Implement Stripe payment integration',
    description: 'Add Stripe checkout flow to the ecommerce frontend',
    status: 'in_progress',
    priority: 'high',
    assignee: 'Sarah Chen',
    repositoryName: 'ecommerce-frontend',
    estimatedHours: 16,
    actualHours: 12,
    dueDate: '2025-01-20',
    createdAt: '2025-01-15',
    updatedAt: '2025-01-18',
    tags: ['frontend', 'payment', 'stripe'],
  },
  {
    id: '2',
    title: 'Fix mobile responsive issues',
    description: 'Resolve layout problems on mobile devices',
    status: 'review',
    priority: 'medium',
    assignee: 'Sarah Chen',
    repositoryName: 'ecommerce-frontend',
    estimatedHours: 8,
    actualHours: 6,
    dueDate: '2025-01-22',
    createdAt: '2025-01-16',
    updatedAt: '2025-01-18',
    tags: ['frontend', 'mobile', 'css'],
  },
  {
    id: '3',
    title: 'Optimize checkout flow performance',
    description: 'Improve loading times and user experience',
    status: 'completed',
    priority: 'high',
    assignee: 'Sarah Chen',
    repositoryName: 'ecommerce-frontend',
    estimatedHours: 12,
    actualHours: 10,
    dueDate: '2025-01-18',
    createdAt: '2025-01-14',
    updatedAt: '2025-01-18',
    tags: ['frontend', 'performance', 'optimization'],
  },
  {
    id: '4',
    title: 'Implement JWT token refresh',
    description: 'Add automatic token refresh mechanism',
    status: 'in_progress',
    priority: 'urgent',
    assignee: 'Marcus Rodriguez',
    repositoryName: 'api-backend',
    estimatedHours: 10,
    actualHours: 8,
    dueDate: '2025-01-19',
    createdAt: '2025-01-15',
    updatedAt: '2025-01-18',
    tags: ['backend', 'auth', 'security'],
  },
  {
    id: '5',
    title: 'Fix authentication middleware bug',
    description: 'Resolve token expiration handling issues',
    status: 'todo',
    priority: 'high',
    assignee: 'Marcus Rodriguez',
    repositoryName: 'api-backend',
    estimatedHours: 6,
    actualHours: 0,
    dueDate: '2025-01-21',
    createdAt: '2025-01-17',
    updatedAt: '2025-01-17',
    tags: ['backend', 'auth', 'bugfix'],
  },
  {
    id: '6',
    title: 'Add real-time chart updates',
    description: 'Implement WebSocket connection for live data',
    status: 'in_progress',
    priority: 'medium',
    assignee: 'Emily Watson',
    repositoryName: 'dashboard-analytics',
    estimatedHours: 14,
    actualHours: 8,
    dueDate: '2025-01-25',
    createdAt: '2025-01-16',
    updatedAt: '2025-01-18',
    tags: ['frontend', 'websocket', 'charts'],
  },
  {
    id: '7',
    title: 'Implement dark mode',
    description: 'Add dark theme support across the dashboard',
    status: 'todo',
    priority: 'low',
    assignee: 'Emily Watson',
    repositoryName: 'dashboard-analytics',
    estimatedHours: 8,
    actualHours: 0,
    dueDate: '2025-01-30',
    createdAt: '2025-01-17',
    updatedAt: '2025-01-17',
    tags: ['frontend', 'ui', 'theme'],
  },
  {
    id: '8',
    title: 'Add export functionality',
    description: 'Allow users to export charts and data',
    status: 'completed',
    priority: 'medium',
    assignee: 'Emily Watson',
    repositoryName: 'dashboard-analytics',
    estimatedHours: 10,
    actualHours: 9,
    dueDate: '2025-01-17',
    createdAt: '2025-01-14',
    updatedAt: '2025-01-17',
    tags: ['frontend', 'export', 'data'],
  },
  {
    id: '9',
    title: 'Implement push notification service',
    description: 'Set up Firebase push notifications',
    status: 'review',
    priority: 'high',
    assignee: 'David Kim',
    repositoryName: 'mobile-app',
    estimatedHours: 12,
    actualHours: 11,
    dueDate: '2025-01-23',
    createdAt: '2025-01-15',
    updatedAt: '2025-01-18',
    tags: ['mobile', 'firebase', 'notifications'],
  },
  {
    id: '10',
    title: 'Add code examples to API docs',
    description: 'Include practical examples for all endpoints',
    status: 'in_progress',
    priority: 'medium',
    assignee: 'Lisa Park',
    repositoryName: 'documentation-site',
    estimatedHours: 16,
    actualHours: 10,
    dueDate: '2025-01-26',
    createdAt: '2025-01-16',
    updatedAt: '2025-01-18',
    tags: ['documentation', 'api', 'examples'],
  },
  {
    id: '11',
    title: 'Update API documentation',
    description: 'Refresh docs with latest API changes',
    status: 'completed',
    priority: 'medium',
    assignee: 'Lisa Park',
    repositoryName: 'documentation-site',
    estimatedHours: 6,
    actualHours: 5,
    dueDate: '2025-01-18',
    createdAt: '2025-01-15',
    updatedAt: '2025-01-18',
    tags: ['documentation', 'api'],
  },
  {
    id: '12',
    title: 'Implement role-based permissions',
    description: 'Add granular permission system',
    status: 'todo',
    priority: 'high',
    assignee: 'Alex Thompson',
    repositoryName: 'admin-panel',
    estimatedHours: 20,
    actualHours: 0,
    dueDate: '2025-01-28',
    createdAt: '2025-01-17',
    updatedAt: '2025-01-17',
    tags: ['backend', 'permissions', 'security'],
  },
  {
    id: '13',
    title: 'Add audit logging',
    description: 'Track all admin actions for compliance',
    status: 'todo',
    priority: 'medium',
    assignee: 'Alex Thompson',
    repositoryName: 'admin-panel',
    estimatedHours: 12,
    actualHours: 0,
    dueDate: '2025-01-29',
    createdAt: '2025-01-17',
    updatedAt: '2025-01-17',
    tags: ['backend', 'logging', 'compliance'],
  },
];

// Mock user data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah@company.com',
    avatar:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    role: 'Frontend Developer',
    totalTasks: 3,
    completedTasks: 1,
    activeTasks: 2,
    overdueTasks: 0,
    totalHoursThisWeek: 32,
    efficiency: 85,
    lastActive: '2 hours ago',
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    email: 'marcus@company.com',
    avatar:
      'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    role: 'Backend Developer',
    totalTasks: 2,
    completedTasks: 0,
    activeTasks: 2,
    overdueTasks: 1,
    totalHoursThisWeek: 28,
    efficiency: 72,
    lastActive: '4 hours ago',
  },
  {
    id: '3',
    name: 'Emily Watson',
    email: 'emily@company.com',
    avatar:
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    role: 'Full Stack Developer',
    totalTasks: 3,
    completedTasks: 1,
    activeTasks: 2,
    overdueTasks: 0,
    totalHoursThisWeek: 35,
    efficiency: 92,
    lastActive: '30 minutes ago',
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david@company.com',
    avatar:
      'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    role: 'Mobile Developer',
    totalTasks: 1,
    completedTasks: 0,
    activeTasks: 1,
    overdueTasks: 0,
    totalHoursThisWeek: 25,
    efficiency: 78,
    lastActive: '6 hours ago',
  },
  {
    id: '5',
    name: 'Lisa Park',
    email: 'lisa@company.com',
    avatar:
      'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    role: 'Technical Writer',
    totalTasks: 2,
    completedTasks: 1,
    activeTasks: 1,
    overdueTasks: 0,
    totalHoursThisWeek: 30,
    efficiency: 88,
    lastActive: '1 day ago',
  },
  {
    id: '6',
    name: 'Alex Thompson',
    email: 'alex@company.com',
    avatar:
      'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    role: 'DevOps Engineer',
    totalTasks: 2,
    completedTasks: 0,
    activeTasks: 2,
    overdueTasks: 0,
    totalHoursThisWeek: 22,
    efficiency: 65,
    lastActive: '8 hours ago',
  },
  {
    id: '7',
    name: 'Jordan Smith',
    email: 'jordan@company.com',
    avatar:
      'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    role: 'UI/UX Designer',
    totalTasks: 0,
    completedTasks: 0,
    activeTasks: 0,
    overdueTasks: 0,
    totalHoursThisWeek: 0,
    efficiency: 0,
    lastActive: '3 days ago',
  },
];

export const useTaskManagement = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setTasks(mockTasks);
      setUsers(mockUsers);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const updateTaskStatus = (taskId: string, status: Task['status']) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status, updatedAt: new Date().toISOString() } : task,
      ),
    );
  };

  const updateTaskTime = (taskId: string, hours: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, actualHours: hours, updatedAt: new Date().toISOString() }
          : task,
      ),
    );
  };

  const getTasksForUser = (userName: string) => {
    return tasks.filter((task) => task.assignee === userName);
  };

  const getTaskStats = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === 'completed').length;
    const overdueTasks = tasks.filter((t) => {
      if (!t.dueDate) return false;
      return new Date(t.dueDate) < new Date() && t.status !== 'completed';
    }).length;
    const unassignedUsers = users.filter((u) => u.activeTasks === 0).length;

    return {
      totalTasks,
      completedTasks,
      overdueTasks,
      unassignedUsers,
    };
  };

  return {
    tasks,
    users,
    isLoading,
    updateTaskStatus,
    updateTaskTime,
    getTasksForUser,
    getTaskStats,
  };
};
