export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee: string;
  repositoryName: string;
  estimatedHours: number;
  actualHours?: number;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  totalTasks: number;
  completedTasks: number;
  activeTasks: number;
  overdueTasks: number;
  totalHoursThisWeek: number;
  efficiency: number; // percentage
  lastActive: string;
}

export interface PullRequest {
  id: number;
  title: string;
  status: 'pending' | 'approved' | 'changes_requested' | 'merged';
  author: string;
  reviewCount: number;
}

export interface BuildStatus {
  status: 'success' | 'failed' | 'running' | 'queued';
  deployUrl?: string;
  timestamp: string;
  duration?: string;
}

export interface Repository {
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
  activeTasks: number;
  completedTasks: number;
}

export interface NetlifyAccount {
  name: string;
  usedMinutes: number;
  totalMinutes: number;
  percentage: number;
}

export interface DashboardStats {
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
