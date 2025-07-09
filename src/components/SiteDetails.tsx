import type { NetlifySite } from '../types';

interface SiteDetailsProps {
  site: NetlifySite;
}

export default function SiteDetails({ site }: SiteDetailsProps) {
  const getSiteStatus = () => {
    if (site.error_message) return { status: 'error', color: 'red' };
    if (site.published_deploy) return { status: 'published', color: 'green' };
    return { status: 'building', color: 'yellow' };
  };

  const siteStatus = getSiteStatus();

  return (
    <div className='mt-6 p-4 rounded-lg bg-white border border-slate-200 shadow-sm'>
      {/* Header Section */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 pb-3 border-b border-slate-100'>
        <div className='flex items-center gap-2 mb-2 sm:mb-0'>
          <div
            className={`w-2 h-2 rounded-full ${
              siteStatus.color === 'green'
                ? 'bg-green-500'
                : siteStatus.color === 'red'
                  ? 'bg-red-500'
                  : 'bg-yellow-500'
            }`}
          ></div>
          <h2 className='text-lg font-semibold text-slate-800'>{site.name}</h2>
          {site.published_deploy?.branch && (
            <span className='px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-medium'>
              {site.published_deploy.branch}
            </span>
          )}
        </div>
        <div className='flex gap-1'>
          <a
            href={site.url}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 transition-colors'
          >
            <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
              />
            </svg>
            Visit
          </a>
          <a
            href={site.admin_url}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-1 px-3 py-1 bg-slate-600 text-white rounded text-xs font-medium hover:bg-slate-700 transition-colors'
          >
            <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
              />
            </svg>
            Admin
          </a>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* Site Information */}
        <div className='bg-slate-50 rounded-md p-4 border border-slate-100'>
          <h3 className='text-base font-medium text-slate-700 mb-3 flex items-center gap-1'>
            <svg
              className='w-4 h-4 text-slate-500'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            Site Info
          </h3>
          <div className='space-y-2 text-sm'>
            <div>
              <span className='text-slate-500'>ID:</span>
              <span className='ml-1 font-mono text-slate-700'>{site.id}</span>
            </div>
            <div>
              <span className='text-slate-500'>Name:</span>
              <span className='ml-1 text-slate-700'>{site.name}</span>
            </div>
            {site.custom_domain && (
              <div>
                <span className='text-slate-500'>Domain:</span>
                <span className='ml-1 text-slate-700'>{site.custom_domain}</span>
              </div>
            )}
            <div>
              <span className='text-slate-500'>URL:</span>
              <a
                href={site.url}
                target='_blank'
                rel='noopener noreferrer'
                className='ml-1 text-blue-600 hover:text-blue-700 underline'
              >
                {site.url.replace(/^https?:\/\//, '')}
              </a>
            </div>
            <div>
              <span className='text-slate-500'>Admin URL:</span>
              <a
                href={site.admin_url}
                target='_blank'
                rel='noopener noreferrer'
                className='ml-1 text-blue-600 hover:text-blue-700 underline'
              >
                {site.admin_url.replace(/^https?:\/\//, '')}
              </a>
            </div>
            <div>
              <span className='text-slate-500'>Created:</span>
              <span className='ml-1 text-slate-700'>
                {new Date(site.created_at).toLocaleDateString()}
              </span>
            </div>
            <div>
              <span className='text-slate-500'>Updated:</span>
              <span className='ml-1 text-slate-700'>
                {new Date(site.updated_at).toLocaleDateString()}
              </span>
            </div>
          </div>
          {site.error_message && (
            <div className='mt-3 p-2 bg-red-50 border border-red-200 rounded text-sm'>
              <span className='text-red-600 font-medium'>Error:</span>
              <span className='ml-1 text-red-700'>{site.error_message}</span>
            </div>
          )}
        </div>

        {/* Deploy Information */}
        {site.published_deploy && (
          <div className='bg-slate-50 rounded-md p-4 border border-slate-100'>
            <h3 className='text-base font-medium text-slate-700 mb-3 flex items-center gap-1'>
              <svg
                className='w-4 h-4 text-slate-500'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10'
                />
              </svg>
              Deploy
            </h3>
            <div className='space-y-2 text-sm'>
              <div>
                <span className='text-slate-500'>Branch:</span>
                <span className='ml-1 text-slate-700'>{site.published_deploy.branch}</span>
              </div>
              {site.published_deploy.commit_ref && (
                <div>
                  <span className='text-slate-500'>Commit:</span>
                  <a
                    href={site.published_deploy.commit_url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='ml-1 text-blue-600 hover:text-blue-700 underline font-mono'
                  >
                    {site.published_deploy.commit_ref.slice(0, 7)}
                  </a>
                </div>
              )}
              {site.published_deploy.title && (
                <div>
                  <span className='text-slate-500'>Title:</span>
                  <span className='ml-1 text-slate-700'>{site.published_deploy.title}</span>
                </div>
              )}
              {site.published_deploy.commit_message && (
                <div>
                  <span className='text-slate-500'>Message:</span>
                  <span className='ml-1 text-slate-700 italic'>
                    {site.published_deploy.commit_message.slice(0, 50)}
                    {site.published_deploy.commit_message.length > 50 ? '...' : ''}
                  </span>
                </div>
              )}
              <div>
                <span className='text-slate-500'>Published:</span>
                <span className='ml-1 text-slate-700'>
                  {site.published_deploy.published_at
                    ? new Date(site.published_deploy.published_at).toLocaleDateString()
                    : '-'}
                </span>
              </div>
              <div>
                <span className='text-slate-500'>Deploy Time:</span>
                <span className='ml-1 text-slate-700'>
                  {site.published_deploy.deploy_time
                    ? `${site.published_deploy.deploy_time}s`
                    : '-'}
                </span>
              </div>
              <div>
                <span className='text-slate-500'>Committer:</span>
                <span className='ml-1 text-slate-700'>
                  {site.published_deploy.committer || '-'}
                </span>
              </div>
              {site.published_deploy.screenshot_url && (
                <div>
                  <span className='text-slate-500'>Screenshot:</span>
                  <a
                    href={site.published_deploy.screenshot_url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='ml-1 text-blue-600 hover:text-blue-700 underline'
                  >
                    View
                  </a>
                </div>
              )}
            </div>
            {site.published_deploy.error_message && (
              <div className='mt-3 p-2 bg-red-50 border border-red-200 rounded text-sm'>
                <span className='text-red-600 font-medium'>Deploy Error:</span>
                <span className='ml-1 text-red-700'>{site.published_deploy.error_message}</span>
              </div>
            )}
          </div>
        )}

        {/* Screenshot Section */}
        {site.screenshot_url && (
          <div className='bg-slate-50 rounded-md p-4 border border-slate-100'>
            <h3 className='text-base font-medium text-slate-700 mb-3 flex items-center gap-1'>
              <svg
                className='w-4 h-4 text-slate-500'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                />
              </svg>
              Preview
            </h3>
            <div className='rounded border border-slate-200 overflow-hidden'>
              <img
                src={site.screenshot_url}
                alt={`Screenshot of ${site.name}`}
                className='w-full h-40 object-cover'
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
