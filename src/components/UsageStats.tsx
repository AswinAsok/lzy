import { UsageData } from '../types';

const LoadingSkeleton = () => (
  <div className='bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 animate-pulse'>
    <div className='flex items-center justify-between mb-6'>
      <div className='h-5 bg-slate-200 rounded w-24'></div>
      <div className='h-4 bg-slate-200 rounded w-8'></div>
    </div>
    <div className='space-y-4'>
      <div className='h-12 bg-slate-200 rounded-lg'></div>
      <div className='grid grid-cols-3 gap-3'>
        {[...Array(3)].map((_, i) => (
          <div key={i} className='h-8 bg-slate-200 rounded'></div>
        ))}
      </div>
      <div className='h-3 bg-slate-200 rounded-full'></div>
    </div>
  </div>
);

const UsageDashboard = ({
  usageData,
  onRefresh,
  isRefreshing = false,
  title = 'Account',
}: {
  usageData: UsageData;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  title?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
}) => {
  if (!usageData) {
    return <LoadingSkeleton />;
  }

  const percentUsed = Math.round(
    (usageData.minutes.current / usageData.minutes.included_minutes) * 100,
  );

  const getProgressColor = (percent: number) => {
    if (percent >= 90) return 'from-red-500 to-red-600';
    if (percent >= 70) return 'from-amber-500 to-orange-500';
    return 'from-green-500 to-emerald-500';
  };

  return (
    <div
      className={`bg-white backdrop-blur-sm p-6 rounded-xl border shadow-sm hover:shadow-md transition-all duration-200  border-slate-200/50`}
    >
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h3 className='text-lg font-semibold text-slate-900'>{title}</h3>
          <p className='text-sm text-slate-500 mt-1'>
            {usageData.minutes.previous} mins last cycle
          </p>
        </div>
        {onRefresh && (
          <button
            className='p-2 rounded-lg hover:bg-white/50 transition-colors disabled:opacity-50'
            onClick={onRefresh}
            disabled={isRefreshing}
            aria-label='Refresh'
          >
            {isRefreshing ? (
              <div className='w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin'></div>
            ) : (
              <svg
                className='w-5 h-5 text-slate-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Usage Progress */}
      <div className='mb-6'>
        <div className='flex items-end justify-between mb-2'>
          <span className='text-2xl font-bold text-slate-900'>
            {usageData.minutes.current} mins
          </span>
        </div>
        <div className='relative w-full bg-slate-200 rounded-full h-2'>
          <div
            className={`h-2 rounded-full bg-gradient-to-r ${getProgressColor(percentUsed)} transition-all duration-700 ease-out`}
            style={{ width: `${Math.min(percentUsed, 100)}%` }}
          />
        </div>
        <div className='flex justify-between items-center mt-1'>
          <span className='text-xs text-slate-500'>{percentUsed}% used</span>
          <span className='text-xs text-slate-500'>
            {usageData.minutes.included_minutes_with_packs} with packs
          </span>
        </div>
      </div>

      {/* Status Pills */}
      <div className='grid grid-cols-3 gap-3'>
        <div className='text-center'>
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              usageData.active > 0 ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-500'
            }`}
          >
            {usageData.active}
          </div>
          <p className='text-xs text-slate-500 mt-1'>Active</p>
        </div>
        <div className='text-center'>
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              usageData.pending_concurrency > 0
                ? 'bg-amber-100 text-amber-800'
                : 'bg-slate-100 text-slate-500'
            }`}
          >
            {usageData.pending_concurrency}
          </div>
          <p className='text-xs text-slate-500 mt-1'>Pending</p>
        </div>
        <div className='text-center'>
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              usageData.enqueued > 0 ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-500'
            }`}
          >
            {usageData.enqueued}
          </div>
          <p className='text-xs text-slate-500 mt-1'>Queued</p>
        </div>
      </div>
    </div>
  );
};

export default UsageDashboard;
