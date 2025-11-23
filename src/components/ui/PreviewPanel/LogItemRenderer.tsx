import React from 'react';
import { ConsoleConfig, LogType } from '@/types/index';
import { ChevronRight, ChevronDown } from '@components/icons/Icons';

const LogItemRenderer: React.FC<{ config: ConsoleConfig }> = ({ config }) => {
  const renderLogContent = () => {
    switch (config.type) {
      case LogType.BADGE:
        return (
          <div className='flex items-center font-mono text-sm opacity-95 shadow-sm'>
            <span
              style={{
                backgroundColor: config.badge?.labelBg || '#555',
                color: config.badge?.labelColor || '#fff',
                padding: '2px 8px',
                borderRadius: '4px 0 0 4px',
                fontWeight: 'bold',
              }}
            >
              {config.badge?.label || 'Label'}
            </span>
            <span
              style={{
                backgroundColor: config.badge?.valueBg || '#333',
                color: config.badge?.valueColor || '#fff',
                padding: '2px 8px',
                borderRadius: '0 4px 4px 0',
              }}
            >
              {config.badge?.value || 'Value'}
            </span>
          </div>
        );

      case LogType.JSON:
      case LogType.TABLE:
        return (
          <div className='w-full font-mono text-xs'>
            <div
              style={{
                ...config.styles,
                display: 'inline-block',
                marginBottom: '6px',
              }}
            >
              {config.type === LogType.TABLE ? '📊 ' : '📦 '} {config.message}
            </div>
            <div className='mt-1 overflow-x-auto rounded border border-gray-200 bg-white p-3 text-gray-800 dark:border-white/5 dark:bg-[#202124] dark:text-[#a5d6ff]'>
              <pre>{JSON.stringify(config.jsonData, null, 2)}</pre>
            </div>
          </div>
        );

      case LogType.GRADIENT:
        return (
          <span
            className='shadow-md'
            style={{
              ...config.styles,
              background: `linear-gradient(${config.gradientData?.direction || 'to right'}, ${config.gradientData?.colors.join(', ') || '#fff, #000'})`,
              display: 'inline-block',
            }}
          >
            {config.message}
          </span>
        );

      case LogType.ASCII:
        return (
          <pre
            style={{
              color: config.asciiData?.color || '#fff',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              whiteSpace: 'pre',
              lineHeight: '1.2',
            }}
          >
            {config.asciiData?.art || 'ASCII ART HERE'}
          </pre>
        );

      case LogType.RAW:
        return (
          <span
            className={`font-mono wrap-break-word whitespace-pre-wrap ${!config.styles.color ? 'text-gray-700 dark:text-gray-300' : ''}`}
            style={{
              color: config.styles.color,
              fontSize: config.styles.fontSize,
              fontWeight: config.styles.fontWeight,
            }}
          >
            {config.message}
          </span>
        );

      case LogType.EMOJI:
        return (
          <span
            style={{
              fontSize: (config.emojiData?.size || 50) + 'px',
              lineHeight: '1.2',
              fontFamily: "'Segoe UI Emoji', 'Apple Color Emoji', sans-serif",
            }}
          >
            {config.emojiData?.emoji || '😎'}
          </span>
        );

      case LogType.TEXT:
      default:
        return <span style={{ display: 'inline-block', ...config.styles }}>{config.message}</span>;
    }
  };

  if (config.group?.enabled) {
    return (
      <div className='mb-2 w-full'>
        <div className='mb-1 flex cursor-pointer items-center gap-1 font-mono text-[11px] font-bold text-gray-700 select-none dark:text-gray-300'>
          {config.group.collapsed ? <ChevronRight size={12} /> : <ChevronDown size={12} />}
          <span>{config.group.label || 'Group'}</span>
        </div>
        {!config.group.collapsed && (
          <div className='mt-1 ml-[5px] border-l border-gray-300 pl-4 dark:border-gray-600'>{renderLogContent()}</div>
        )}
      </div>
    );
  }

  return <div className='mb-2'>{renderLogContent()}</div>;
};

export default LogItemRenderer;
