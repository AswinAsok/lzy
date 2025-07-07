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
