import React from 'react';
import { LogItem } from '@/types/index';
import ConsoleHeader from './ConsoleHeader';
import ConsoleBottom from './ConsoleBottom';
import { useTranslation } from 'react-i18next';
import LogItemRenderer from './LogItemRenderer';

interface PreviewPanelProps {
  logs: LogItem[];
  onRun: () => void;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ logs, onRun }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className='mx-auto flex h-full w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg ring-1 ring-black/5 dark:border-white/10 dark:bg-[#202124] dark:ring-black/50'>
        {/* top */}
        <ConsoleHeader />

        {/* Console Content Area */}
        {/* 控制台内容区域 */}
        <div className='relative flex-1 overflow-auto bg-white p-3 font-mono text-sm text-gray-800 dark:bg-[#202124] dark:text-[#e8eaed]'>
          <div className='mb-3 border-b border-gray-100 pb-2 text-[11px] italic opacity-40 select-none dark:border-[#3c4043]'>
            {t('preview.cleared')}
          </div>

          {logs.map((log, index) => (
            <div
              key={log.id}
              className='group -mx-2 flex items-start gap-1.5 rounded border-b border-transparent px-2 py-1.5 hover:border-gray-100 hover:bg-gray-50 dark:hover:border-white/5 dark:hover:bg-[#28292c]'
            >
              <span className='mt-[3px] text-[10px] text-gray-400 select-none dark:text-[#9aa0a6]'>›</span>
              <div className='flex-1 overflow-hidden'>
                <LogItemRenderer config={log.config} />
                <div className='mt-0 text-right font-sans text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 dark:text-[#5f6368]'>
                  app.js:{12 + index}
                </div>
              </div>
            </div>
          ))}

          <div className='mt-1 flex items-center gap-1.5 opacity-60'>
            <span className='text-[10px] font-bold text-blue-500 select-none dark:text-[#8ab4f8]'>›</span>
            <div className='h-3.5 w-1.5 bg-gray-400 dark:bg-[#9aa0a6]'></div>
          </div>
        </div>

        {/* bottom */}
        <ConsoleBottom onRun={onRun} />
      </div>
    </>
  );
};

export default PreviewPanel;
