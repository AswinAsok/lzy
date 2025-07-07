import { UsageData } from '../types';

function formatIfDate(value: string) {
  const date = new Date(value);
  if (!isNaN(date.getTime()) && typeof value === 'string') {
    return date.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  return value;
}

const LoadingSkeleton = () => (
  <div className='bg-white p-4 rounded border border-gray-200 max-w-md mx-auto mt-8 animate-pulse'>
    <div className='flex items-center justify-between mb-4'>
      <div className='h-4 bg-gray-200 rounded w-20'></div>
      <div className='h-4 bg-gray-200 rounded w-12'></div>
    </div>
    <div className='space-y-2'>
      {[...Array(6)].map((_, i) => (
        <div key={i} className='flex justify-between items-center'>
          <div className='h-3 bg-gray-200 rounded w-16'></div>
          <div className='h-3 bg-gray-200 rounded w-12'></div>
        </div>
      ))}
    </div>
    <div className='mt-4'>
      <div className='w-full bg-gray-200 rounded-full h-2'></div>
      <div className='flex justify-between items-center mt-1'>
        <div className='h-2 bg-gray-200 rounded w-12'></div>
        <div className='h-2 bg-gray-200 rounded w-10'></div>
      </div>
    </div>
    <div className='mt-3 text-right'>
      <div className='h-2 bg-gray-200 rounded w-24 ml-auto'></div>
    </div>
  </div>
);

const UsageDashboard = ({
  usageData,
  onRefresh,
  isRefreshing = false,
}: {
  usageData: UsageData;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}) => {
  if (!usageData) {
    return <LoadingSkeleton />;
  }

  const percentUsed = Math.round(
    (usageData.minutes.current / usageData.minutes.included_minutes) * 100,
  );

  const getProgressColor = (percent: number) => {
    if (percent >= 90) return 'bg-red-500';
    if (percent >= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getDaysLeft = () => {
    const endDate = new Date(usageData.minutes.period_end_date);
    const today = new Date();
    const timeDiff = endDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysLeft > 0 ? daysLeft : 0;
  };

  const daysLeft = getDaysLeft();

  return (
    <div className='bg-white p-4 rounded border border-gray-200 mx-auto mt-8 max-w-md w-full'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-base font-medium text-gray-900'>API Usage</h2>
        <div className='row flex '>
          {onRefresh && (
            <button
              className='text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50'
              onClick={onRefresh}
              disabled={isRefreshing}
              aria-label='Refresh'
            >
              {isRefreshing ? (
                <svg className='w-4 h-4 animate-spin' fill='none' viewBox='0 0 24 24'>
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
              ) : (
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
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
          <span className='text-xs text-gray-400 ml-2'>
            {usageData.minutes.previous} mins last month
          </span>
        </div>
      </div>

      <div className='space-y-3'>
        <div className='grid grid-cols-2 gap-3'>
          <div>
            <div className='text-xs text-gray-500 mb-1'>Previous</div>
            <div className='text-lg font-medium text-gray-900'></div>
          </div>
        </div>

        <div className='space-y-1 text-sm'>
          <div className='flex gap-2 mb-2'>
            <span
              className={`flex-1 px-2 py-0.5 rounded-full text-xs font-medium text-center transition-colors duration-200 ${usageData.active === 0 ? 'bg-gray-50 text-gray-300' : 'bg-gray-200 text-gray-900 font-semibold'}`}
            >
              Active: {usageData.active}
            </span>
            <span
              className={`flex-1 px-2 py-0.5 rounded-full text-xs font-medium text-center transition-colors duration-200 ${usageData.pending_concurrency === 0 ? 'bg-gray-50 text-gray-300' : 'bg-gray-200 text-gray-900 font-semibold'}`}
            >
              Pending: {usageData.pending_concurrency}
            </span>
            <span
              className={`flex-1 px-2 py-0.5 rounded-full text-xs font-medium text-center transition-colors duration-200 ${usageData.enqueued === 0 ? 'bg-gray-50 text-gray-300' : 'bg-gray-200 text-gray-900 font-semibold'}`}
            >
              Enqueued: {usageData.enqueued}
            </span>
          </div>

          <div className='flex items-center justify-between py-1'>
            <span className='text-gray-600'>With packs</span>
            <span className='text-gray-900 font-medium'>
              {usageData.minutes.included_minutes_with_packs}
            </span>
          </div>
        </div>
      </div>

      <div className='mt-4'>
        <div className='flex justify-between items-center mb-2'>
          <span className='text-sm text-gray-600'>Progress</span>
          <span className='text-sm font-medium text-gray-900'>{percentUsed}%</span>
        </div>
        <div className='relative w-full bg-gray-200 rounded-full h-2'>
          <div
            className={`h-2 rounded-full transition-all duration-700 ease-out ${getProgressColor(percentUsed)}`}
            style={{ width: `${percentUsed}%` }}
          />
        </div>
        <div className='relative w-full mt-1 h-4'>
          <span
            className='absolute text-xs font-medium text-gray-900 transition-all duration-700 ease-out'
            style={{ left: `calc(${percentUsed}% - 18px)` }}
          >
            {usageData.minutes.current} mins
          </span>
          <span className='absolute right-0 text-xs text-gray-500'>
            {usageData.minutes.included_minutes} mins
          </span>
        </div>
      </div>

      <div className='mt-2 flex items-center justify-center gap-2 px-3 py-1.5 rounded-md bg-gray-50 text-xs text-gray-600'>
        <svg
          className='w-3 h-3 text-gray-400'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          viewBox='0 0 24 24'
        >
          <rect x='3' y='4' width='18' height='18' rx='2' stroke='currentColor' fill='none' />
          <path d='M16 2v4M8 2v4M3 10h18' stroke='currentColor' />
        </svg>
        <span className='font-medium text-gray-700'>
          {formatIfDate(usageData.minutes.period_start_date)} -{' '}
          {formatIfDate(usageData.minutes.period_end_date)}
        </span>
        <span className='mx-2 text-gray-400'>•</span>
        <span className='font-medium text-gray-700'>
          {daysLeft === 0 ? 'Renews today' : `${daysLeft} days left`}
        </span>
      </div>

      <div className='text-xs text-gray-400 mt-3 text-right border-t border-gray-100 pt-2'>
        {formatIfDate(usageData.minutes.last_updated_at)}
      </div>
    </div>
  );
};

export default UsageDashboard;
