export interface UsageData {
  active: number;
  pending_concurrency: number;
  enqueued: number;
  minutes: {
    current: number;
    previous: number;
    period_start_date: string;
    period_end_date: string;
    last_updated_at: string;
    included_minutes: number;
    included_minutes_with_packs: number;
  };
}

export interface NetlifyDeploy {
  error_message?: string | null;
  commit_ref?: string;
  branch?: string;
  commit_url?: string;
  title?: string;
  commit_message?: string | null;
  published_at?: string;
  deploy_time?: number;
  screenshot_url?: string | null;
  committer?: string;
}

export interface NetlifySite {
  id: string;
  name: string;
  custom_domain?: string;
  url: string;
  admin_url: string;
  screenshot_url?: string | null;
  created_at: string;
  updated_at: string;
  disabled: boolean;
  error_message?: string | null;
  published_deploy?: NetlifyDeploy;
}
