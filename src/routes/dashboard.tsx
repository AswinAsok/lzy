import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import {
  getNetlifyUserBuildInformation,
  getNetlifyUserInformation,
  getNetlifyAccountSites,
} from '../apis/netlify/netlify';
import UsageStats from '../components/UsageStats';
import PeriodInfo from '../components/PeriodInfo';
import SitePill from '../components/SitePill';
import SiteDetails from '../components/SiteDetails';
import type { NetlifySite } from '../types';

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
});

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

  const { data: shaheenSites } = useQuery({
    initialData: [],
    queryKey: ['getShaheenSites', shaheenAccountID],
    queryFn: () =>
      getNetlifyAccountSites(shaheenAccountID, import.meta.env.VITE_SHAHEEN_NETLIFY_ACCESS_TOKEN),
    enabled: !!shaheenAccountID,
  });

  const { data: aswinSites } = useQuery({
    initialData: [],
    queryKey: ['getAswinSites', aswinAccountID],
    queryFn: () =>
      getNetlifyAccountSites(aswinAccountID, import.meta.env.VITE_ASWIN_NETLIFY_ACCESS_TOKEN),
    enabled: !!aswinAccountID,
  });

  const { data: mmpSites } = useQuery({
    initialData: [],
    queryKey: ['getMmpSites', mmpAccountID],
    queryFn: () =>
      getNetlifyAccountSites(mmpAccountID, import.meta.env.VITE_MMP_NETLIFY_ACCESS_TOKEN),
    enabled: !!mmpAccountID,
  });

  const accountsConfig = [
    {
      title: 'Shaheen Account',
      usageData: shaheenBuildInformation,
      onRefresh: refetchShaheenBuildInformation,
      isRefreshing: isShaheenFetching,
      sites: shaheenSites,
    },
    {
      title: 'Aswin Account',
      usageData: aswinBuildInformation,
      onRefresh: refetchAswinBuildInformation,
      isRefreshing: isAswinFetching,
      sites: aswinSites,
    },
    {
      title: 'MMP Account',
      usageData: mmpBuildInformation,
      onRefresh: refetchMmpBuildInformation,
      isRefreshing: isMmpFetching,
      sites: mmpSites,
    },
  ];

  const [selectedSite, setSelectedSite] = useState<NetlifySite | null>(null);

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
          {accountsConfig.map(
            ({ title, usageData, onRefresh, isRefreshing, sites }) =>
              usageData && (
                <div
                  key={title}
                  className='flex flex-col gap-2 rounded-xl bg-white/70 border border-slate-200 shadow-sm p-4 min-h-[180px] transition-all hover:shadow-lg hover:-translate-y-1'
                >
                  <div className='flex items-center justify-between mb-2'>
                    <span className='font-semibold text-slate-800 text-base'>{title}</span>
                    <button
                      type='button'
                      onClick={(e) => {
                        e.preventDefault();
                        onRefresh();
                      }}
                      disabled={isRefreshing}
                      className='text-xs px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 transition-colors disabled:opacity-50'
                    >
                      {isRefreshing ? 'Refreshing...' : 'Refresh'}
                    </button>
                  </div>
                  <UsageStats
                    usageData={usageData}
                    onRefresh={onRefresh}
                    isRefreshing={isRefreshing}
                    title={title}
                  />
                  {sites && sites.length > 0 && (
                    <div className='flex flex-wrap gap-2 mt-2'>
                      {sites
                        .filter((site: NetlifySite) => !site.disabled)
                        .map((site: NetlifySite) => (
                          <SitePill
                            key={site.id}
                            site={site}
                            selected={selectedSite?.id === site.id}
                            onClick={() => setSelectedSite(site)}
                          />
                        ))}
                    </div>
                  )}
                </div>
              ),
          )}
        </div>

        {/* Selected Site Info - moved below cards */}
        {selectedSite && <SiteDetails site={selectedSite} />}
      </div>
    </div>
  );
}
