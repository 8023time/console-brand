import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Tooltip, message } from 'antd';
import { Braces } from '@components/icons/Icons';
import SegmentedControl from './SegmentedControl';
import { CopyOutlined, CheckOutlined } from '@ant-design/icons';

interface CodeViewerProps {
  usageCode: string;
  inlineCode: string;
  libraryCode: string;
}

type ViewMode = 'usage' | 'inline' | 'library';

const CodeViewer: React.FC<CodeViewerProps> = ({ usageCode, inlineCode, libraryCode }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<ViewMode>('usage');
  const [messageApi, contextHolder] = message.useMessage();

  const getCode = () => {
    switch (mode) {
      case 'inline':
        return inlineCode;
      case 'library':
        return libraryCode;
      default:
        return usageCode;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCode());
    setCopied(true);
    messageApi.success(t('code.copied'));
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <>
      {contextHolder}
      <div className='flex w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-white/5 dark:bg-[#161616]'>
        <div className='flex items-center justify-between border-b border-gray-100 bg-gray-50/50 p-3 dark:border-white/5 dark:bg-white/2'>
          <SegmentedControl mode={mode} setMode={setMode} />

          <Tooltip title={copied ? t('code.copied') : t('code.copy')}>
            <Button
              size='small'
              disabled={copied}
              onClick={handleCopy}
              icon={copied ? <CheckOutlined /> : <CopyOutlined />}
              className='rounded-md px-3 py-1.5 text-[10px] font-medium'
            >
              <span>{copied ? t('code.copied') : t('code.copy')}</span>
            </Button>
          </Tooltip>
        </div>

        <div className='relative'>
          <div className='custom-scrollbar max-h-[350px] overflow-y-auto bg-gray-50 p-4 dark:bg-[#0d0d0d]'>
            <pre
              className={`font-mono text-xs leading-relaxed whitespace-pre-wrap ${
                mode === 'library' ? 'text-gray-600 dark:text-neutral-400' : 'text-indigo-600 dark:text-indigo-300'
              }`}
            >
              <code>{getCode()}</code>
            </pre>
          </div>

          <div className='flex items-center gap-2 border-t border-gray-100 bg-white px-4 py-2 text-[10px] text-gray-400 dark:border-white/5 dark:bg-[#161616] dark:text-neutral-500'>
            <Braces size={12} className='opacity-70' />
            <span>
              {mode === 'usage' && t('code.hintLib')}
              {mode === 'inline' && t('code.hintRaw')}
              {mode === 'library' && t('code.hintSource')}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeViewer;
