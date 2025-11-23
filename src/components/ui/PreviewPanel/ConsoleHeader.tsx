import React from 'react';

const ConsoleHeader: React.FC = () => {
  return (
    <>
      {/* Fake   Console Chrome */}
      {/* 模拟 Chrome 控制台  */}
      <div className='flex shrink-0 items-center justify-between border-b border-gray-200 bg-gray-100 px-4 py-2 dark:border-[#3c4043] dark:bg-[#292a2d]'>
        <div className='flex gap-2 opacity-80 hover:opacity-100'>
          <div className='h-3 w-3 rounded-full bg-[#ff5f56] shadow-sm'></div>
          <div className='h-3 w-3 rounded-full bg-[#ffbd2e] shadow-sm'></div>
          <div className='h-3 w-3 rounded-full bg-[#27c93f] shadow-sm'></div>
        </div>

        <div className='absolute left-1/2 flex -translate-x-1/2 transform items-center gap-2 text-xs font-medium text-gray-500 opacity-60 dark:text-gray-400'>
          <span>Console</span>
        </div>

        <div className='w-10'></div>
      </div>
      {/* Filter Bar Simulation */}
      {/* 模拟过滤栏等样式 */}
      <div className='flex shrink-0 gap-1 border-b border-gray-200 bg-white px-2 py-1 text-[11px] font-medium text-gray-500 dark:border-[#3c4043] dark:bg-[#202124] dark:text-[#9aa0a6]'>
        <span className='cursor-not-allowed px-2 py-0.5'>🚫</span>
        <div className='mx-1 my-auto h-4 w-px bg-gray-200 dark:bg-[#3c4043]'></div>
        <span className='cursor-pointer rounded px-2 py-0.5 text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-[#35363a]'>
          top
        </span>
        <div className='mx-1 my-auto h-4 w-px bg-gray-200 dark:bg-[#3c4043]'></div>
        <span className='cursor-pointer rounded px-2 py-0.5 hover:bg-gray-100 dark:hover:bg-[#35363a]'>Filter</span>
        <span className='cursor-pointer rounded px-2 py-0.5 hover:bg-gray-100 dark:hover:bg-[#35363a]'>
          Default levels ▼
        </span>
      </div>{' '}
    </>
  );
};

export default ConsoleHeader;
