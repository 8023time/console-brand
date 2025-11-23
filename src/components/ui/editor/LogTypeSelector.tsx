import React from 'react';
import { LogType } from '@/types/index';

interface LogTypeSelectorProps {
  activeType: LogType;
  onTypeChange: (type: LogType) => void;
}

const LogTypeSelector: React.FC<LogTypeSelectorProps> = ({ activeType, onTypeChange }) => {
  return (
    <div className='overflow-x-auto rounded-xl border border-gray-200 bg-white p-1.5 shadow-sm dark:border-white/5 dark:bg-[#161616]'>
      <div className='flex min-w-max items-center gap-1'>
        {Object.values(LogType).map((type) => (
          <button
            key={type}
            onClick={() => onTypeChange(type)}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              activeType === type
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'text-gray-500 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-white/5'
            } `}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LogTypeSelector;
