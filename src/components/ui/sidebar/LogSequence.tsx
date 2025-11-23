import React from 'react';
import type { LogItem } from '@/types/index';
import { useTranslation } from 'react-i18next';
import { Layers, Plus, Trash2 } from '@components/icons/Icons';

interface LogSequenceProps {
  logs: LogItem[];
  activeLogId: string;
  onSelectLog: (id: string) => void;
  onAddLog: () => void;
  onRemoveLog: (id: string, e: React.MouseEvent) => void;
}

const LogSequence: React.FC<LogSequenceProps> = ({ logs, activeLogId, onSelectLog, onAddLog, onRemoveLog }) => {
  const { t } = useTranslation();

  return (
    <div>
      <div className='mt-2 mb-4 flex items-center justify-between'>
        <h3 className='flex items-center gap-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase dark:text-neutral-500'>
          <Layers size={12} /> {t('sequence.title')}
        </h3>
        <button
          onClick={onAddLog}
          className='flex items-center gap-1 rounded-md border border-gray-200 bg-white px-2.5 py-1 text-[10px] font-medium text-indigo-600 shadow-sm transition-all hover:border-indigo-200 hover:bg-indigo-50 dark:border-white/10 dark:bg-white/5 dark:text-indigo-400 dark:hover:border-indigo-500/30 dark:hover:bg-indigo-500/20'
        >
          <Plus size={10} /> {t('sequence.add')}
        </button>
      </div>
      <div className='relative space-y-2.5'>
        {logs.length > 1 && (
          <div className='absolute top-3 bottom-3 left-[15px] -z-10 w-px bg-gray-100 dark:bg-white/5'></div>
        )}
        {logs.map((log, idx) => (
          <div
            key={log.id}
            onClick={() => onSelectLog(log.id)}
            className={`group relative flex cursor-pointer items-center gap-3 overflow-hidden rounded-xl border p-3 transition-all duration-200 ${
              activeLogId === log.id
                ? 'border-indigo-500/30 bg-white shadow-lg ring-1 shadow-indigo-500/5 ring-indigo-500/10 dark:border-indigo-400/30 dark:bg-[#161616]'
                : 'border-transparent bg-white/50 hover:border-gray-200 hover:bg-white dark:bg-white/5 dark:hover:border-white/10 dark:hover:bg-white/10'
            }`}
          >
            {activeLogId === log.id && (
              <div className='absolute top-3 bottom-3 left-0 w-1 rounded-r-full bg-indigo-500'></div>
            )}

            <div
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg font-mono text-[10px] font-bold transition-colors ${
                activeLogId === log.id
                  ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300'
                  : 'bg-gray-100 text-gray-400 dark:bg-white/10 dark:text-neutral-500'
              } `}
            >
              {idx + 1}
            </div>

            <div className='min-w-0 flex-1'>
              <div className='mb-0.5 flex items-center justify-between'>
                <span className='truncate text-xs font-semibold text-gray-700 dark:text-gray-200'>
                  {log.config.type}
                </span>
                {log.config.group?.enabled && (
                  <span className='rounded-full bg-indigo-50 px-1.5 py-0.5 text-[9px] font-medium text-indigo-500 dark:bg-indigo-500/10 dark:text-indigo-300'>
                    GRP
                  </span>
                )}
              </div>
              <p className='truncate font-mono text-[10px] text-gray-400 dark:text-gray-500'>
                {log.config.message || '...'}
              </p>
            </div>

            <button
              onClick={(e) => onRemoveLog(log.id, e)}
              className={`rounded-md p-1.5 text-gray-400 opacity-0 transition-colors group-hover:opacity-100 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 ${logs.length === 1 ? 'hidden' : ''} `}
            >
              <Trash2 size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogSequence;
