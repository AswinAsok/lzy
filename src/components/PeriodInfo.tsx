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

interface PeriodInfoProps {
  usageData: UsageData | null;
}

export default function PeriodInfo({ usageData }: PeriodInfoProps) {
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
