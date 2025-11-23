import React from 'react';
import { useTranslation } from 'react-i18next';

type ViewMode = 'usage' | 'inline' | 'library';

interface SegmentedControlProps {
  mode: ViewMode;
  setMode: (m: ViewMode) => void;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({ mode, setMode }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className='inline-flex rounded-lg bg-gray-200/60 p-1 dark:bg-neutral-800'>
        {[
          { key: 'usage' as ViewMode, label: t('code.tabLib') },
          { key: 'inline' as ViewMode, label: t('code.tabRaw') },
          { key: 'library' as ViewMode, label: t('code.tabSource') },
        ].map((opt) => {
          const isActive = mode === opt.key;
          const base = 'flex items-center gap-2 rounded-md px-3 py-1.5 text-[10px] font-bold transition-all';
          const active = 'bg-white text-gray-900 shadow-sm dark:bg-neutral-600 dark:text-white';
          const inactive = 'text-gray-500 hover:text-gray-700 dark:text-neutral-400 dark:hover:text-neutral-200';

          return (
            <button
              key={opt.key}
              onClick={() => setMode(opt.key)}
              className={`${base} ${isActive ? active : inactive}`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default SegmentedControl;
