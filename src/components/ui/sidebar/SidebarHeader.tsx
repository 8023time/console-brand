import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import type { LanguageType } from '@i18n/index';
import { ThemeContext } from '@/context/Context';
import { Terminal, Moon, Sun, PanelLeftClose } from '@components/icons/Icons';

interface SidebarHeaderProps {
  onToggleLang: () => void;
  onCloseSidebar: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ onCloseSidebar }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();

  const switchLang = () => {
    const lng: LanguageType = i18n.language === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(lng);
  };

  return (
    <div className='flex h-14 shrink-0 items-center justify-between px-5'>
      <div className='flex items-center gap-2.5'>
        <div className='flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 shadow-lg shadow-indigo-500/30'>
          <Terminal size={14} className='text-white' />
        </div>
        <h1 className='truncate text-sm font-bold tracking-tight text-gray-900 dark:text-white'>{t('app.title')}</h1>
      </div>

      <div className='flex shrink-0 items-center gap-1'>
        <button
          onClick={toggleTheme}
          className='rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-indigo-600 dark:text-neutral-500 dark:hover:bg-white/5 dark:hover:text-indigo-400'
        >
          {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
        </button>
        <button
          onClick={switchLang}
          className='flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold text-gray-400 uppercase transition-colors hover:bg-gray-100 hover:text-indigo-600 dark:text-neutral-500 dark:hover:bg-white/5 dark:hover:text-indigo-400'
        >
          {i18n.language}
        </button>
        <button
          onClick={onCloseSidebar}
          className='ml-1 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-red-500 dark:text-neutral-500 dark:hover:bg-white/5 dark:hover:text-red-400'
          title='Collapse Sidebar'
        >
          <PanelLeftClose size={16} />
        </button>
      </div>
    </div>
  );
};

export default SidebarHeader;
