import React from 'react';
import { useTranslation } from 'react-i18next';
import { Info, Play } from '@components/icons/Icons';

const ConsoleBottom: React.FC = ({ onRun }) => {
  const { t } = useTranslation();

  return (
    <>
      {/* 操作栏---可点击在控制台预览 */}
      <div className='flex shrink-0 items-center justify-between border-t border-gray-200 bg-gray-50 p-3 dark:border-[#3c4043] dark:bg-[#292a2d]'>
        <div className='flex items-center gap-1.5 text-[10px] text-gray-500 opacity-80 dark:text-[#9aa0a6]'>
          <Info size={12} />
          <span>{t('preview.info')}</span>
        </div>
        <button
          onClick={onRun}
          className='flex items-center gap-1.5 rounded bg-blue-600 px-4 py-1.5 text-xs font-medium tracking-wide text-white shadow-sm hover:bg-blue-500 hover:shadow-md'
        >
          <Play size={10} fill='currentColor' />
          <span>{t('preview.runBtn')}</span>
        </button>
      </div>
    </>
  );
};

export default ConsoleBottom;
