import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getNetlifyUserBuildInformation, getNetlifyUserInformation } from '../apis/netlify/netlify';
import UsageStats from '../components/UsageStats';
import { UsageData } from '../types';

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
});

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

function PeriodInfo({ usageData }: { usageData: UsageData | null }) {
  if (!usageData?.minutes) return null;

  const getDaysLeft = () => {
    const endDate = new Date(usageData.minutes.period_end_date);
    const today = new Date();
    const timeDiff = endDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysLeft > 0 ? daysLeft : 0;
  };

  const daysLeft = getDaysLeft();

  return (
    <div className='bg-white backdrop-blur-sm rounded-xl border border-slate-200/50 p-4 mb-8'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-3'>
          <div>
            <h3 className='font-semibold text-slate-900'>Billing Period</h3>
            <p className='text-sm text-slate-600'>
              {formatIfDate(usageData.minutes.period_start_date)} -{' '}
              {formatIfDate(usageData.minutes.period_end_date)}
            </p>
          </div>
        </div>
        <div className='text-right'>
          <div className='text-xl font-bold text-slate-900'>
            {daysLeft === 0 ? 'Renews today' : `${daysLeft} days`}
          </div>
          <p className='text-sm font-light text-slate-500'>{daysLeft === 0 ? '' : 'remaining'}</p>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const { data: shaheenAccountID } = useQuery({
    initialData: null,
    queryKey: ['getShaheenUserInformation'],
    queryFn: () => getNetlifyUserInformation(import.meta.env.VITE_SHAHEEN_NETLIFY_ACCESS_TOKEN),
  });

  const { data: aswinAccountID } = useQuery({
    initialData: null,
    queryKey: ['getAswinUserInformation'],
    queryFn: () => getNetlifyUserInformation(import.meta.env.VITE_ASWIN_NETLIFY_ACCESS_TOKEN),
  });

  const { data: mmpAccountID } = useQuery({
    initialData: null,
    queryKey: ['getMmpUserInformation'],
    queryFn: () => getNetlifyUserInformation(import.meta.env.VITE_MMP_NETLIFY_ACCESS_TOKEN),
  });

  const {
    data: shaheenBuildInformation,
    refetch: refetchShaheenBuildInformation,
    isFetching: isShaheenFetching,
  } = useQuery({
    initialData: null,
    queryKey: ['getShaheenUserBuildInformation', shaheenAccountID],
    queryFn: () =>
      getNetlifyUserBuildInformation(
        shaheenAccountID,
        import.meta.env.VITE_SHAHEEN_NETLIFY_ACCESS_TOKEN,
      ),
    enabled: !!shaheenAccountID,
  });

  const {
    data: aswinBuildInformation,
    refetch: refetchAswinBuildInformation,
    isFetching: isAswinFetching,
  } = useQuery({
    initialData: null,
    queryKey: ['getAswinUserBuildInformation', aswinAccountID],
    queryFn: () =>
      getNetlifyUserBuildInformation(
        aswinAccountID,
        import.meta.env.VITE_ASWIN_NETLIFY_ACCESS_TOKEN,
      ),
    enabled: !!aswinAccountID,
  });

  const {
    data: mmpBuildInformation,
    refetch: refetchMmpBuildInformation,
    isFetching: isMmpFetching,
  } = useQuery({
    initialData: null,
    queryKey: ['getMmpUserBuildInformation', mmpAccountID],
    queryFn: () =>
      getNetlifyUserBuildInformation(mmpAccountID, import.meta.env.VITE_MMP_NETLIFY_ACCESS_TOKEN),
    enabled: !!mmpAccountID,
  });

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50'>
      {/* Header */}
      <div className='bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent'>
                Usage Dashboard
              </h1>
              <p className='text-sm text-slate-600'>
                Monitor your Netlify build usage across all accounts
              </p>
            </div>
            <div className='flex items-center space-x-3'>
              <div className='flex items-center space-x-2'>
                <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                <span className='text-sm font-medium text-slate-700'>Live</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Period Info - Show for the first available account */}
        {(shaheenBuildInformation || aswinBuildInformation || mmpBuildInformation) && (
          <PeriodInfo
            usageData={shaheenBuildInformation || aswinBuildInformation || mmpBuildInformation}
          />
        )}

        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
          {shaheenBuildInformation && (
            <UsageStats
              usageData={shaheenBuildInformation}
              onRefresh={() => {
                refetchShaheenBuildInformation();
              }}
              isRefreshing={isShaheenFetching}
              title='Shaheen Account'
            />
          )}
          {aswinBuildInformation && (
            <UsageStats
              usageData={aswinBuildInformation}
              onRefresh={() => {
                refetchAswinBuildInformation();
              }}
              isRefreshing={isAswinFetching}
              title='Aswin Account'
            />
          )}

          {mmpBuildInformation && (
            <UsageStats
              usageData={mmpBuildInformation}
              onRefresh={() => {
                refetchMmpBuildInformation();
              }}
              isRefreshing={isMmpFetching}
              title='MMP Account'
            />
          )}
        </div>
      </div>
    </div>
  );
}
