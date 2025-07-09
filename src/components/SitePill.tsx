import type { NetlifySite } from '../types';

interface SitePillProps {
  site: NetlifySite;
  selected: boolean;
  onClick: () => void;
}

export default function SitePill({ site, selected, onClick }: SitePillProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`px-3 py-1 rounded-full border text-xs font-medium shadow-sm transition-all
                ${
                  selected
                    ? 'bg-gray-800 text-white border-gray-800 scale-105'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:scale-105 hover:shadow-md'
                }
            `}
      style={{ outline: 'none' }}
    >
      {site.name}
    </button>
  );
}
