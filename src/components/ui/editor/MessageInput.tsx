import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ConsoleConfig, LogType } from '@/types/index';
import { FileText, Smile } from '@components/icons/Icons';

interface MessageInputProps {
  config: ConsoleConfig;
  onChange: (updates: Partial<ConsoleConfig>) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ config, onChange }) => {
  const { t } = useTranslation();

  const [jsonText, setJsonText] = useState(() => JSON.stringify(config.jsonData, null, 2));

  useEffect(() => {
    setJsonText(JSON.stringify(config.jsonData, null, 2));
  }, [config.jsonData]);

  return (
    <div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/5 dark:bg-[#161616]'>
      <div className='mb-4'>
        <label className='mb-2 block text-xs font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400'>
          {t('inputs.messageLabel')}
        </label>

        {config.type === LogType.JSON || config.type === LogType.TABLE ? (
          <div className='space-y-3'>
            <input
              value={config.message}
              onChange={(e) => onChange({ message: e.target.value })}
              className='w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm transition-all outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-white/10 dark:bg-[#0a0a0a]'
              placeholder={t('inputs.jsonLabel')}
            />
            <textarea
              value={jsonText}
              onChange={(e) => {
                const val = e.target.value;
                setJsonText(val);
                const parsed = JSON.parse(val);
                onChange({ jsonData: parsed });
              }}
              onBlur={() => {
                const parsed = JSON.parse(jsonText);
                onChange({ jsonData: parsed });
              }}
              className='h-32 w-full rounded-lg border border-gray-200 bg-gray-50 p-3 font-mono text-xs transition-all outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-white/10 dark:bg-[#0a0a0a]'
              placeholder={t('inputs.jsonPayload')}
            />
          </div>
        ) : config.type === LogType.ASCII ? (
          <textarea
            value={config.asciiData?.art}
            onChange={(e) => onChange({ asciiData: { ...config.asciiData!, art: e.target.value } })}
            className='h-32 w-full rounded-lg border border-gray-200 bg-gray-50 p-3 font-mono text-xs whitespace-pre transition-all outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-white/10 dark:bg-[#0a0a0a]'
            placeholder={t('inputs.asciiPlaceholder')}
          />
        ) : config.type === LogType.EMOJI ? (
          <div className='relative'>
            <input
              value={config.emojiData?.emoji || ''}
              onChange={(e) => onChange({ emojiData: { ...config.emojiData!, emoji: e.target.value } })}
              className='font-emoji w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 text-center text-2xl transition-all outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-white/10 dark:bg-[#0a0a0a]'
              placeholder={t('inputs.emojiLabel')}
            />
            <div className='pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400'>
              <Smile size={16} />
            </div>
          </div>
        ) : (
          <div className='relative'>
            <input
              value={config.message}
              onChange={(e) => onChange({ message: e.target.value })}
              className='w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pr-10 pl-3 text-sm transition-all outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-white/10 dark:bg-[#0a0a0a]'
              placeholder={t('inputs.messagePlaceholder')}
            />
            <div className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-400'>
              <FileText size={16} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageInput;
