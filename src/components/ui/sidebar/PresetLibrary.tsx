import React from 'react';
import { SavedPreset } from '@/types/index';
import { useTranslation } from 'react-i18next';
import { Book, Save, Check, X, FileText, Trash2 } from '@components/icons/Icons';

interface PresetLibraryProps {
  presets: SavedPreset[];
  onLoad: (preset: SavedPreset) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
  isSaving: boolean;
  setIsSaving: (val: boolean) => void;
  saveName: string;
  setSaveName: (val: string) => void;
  onSave: () => void;
  saveError: boolean;
  onShowcase: () => void;
}

const PresetLibrary: React.FC<PresetLibraryProps> = ({
  presets,
  onLoad,
  onDelete,
  isSaving,
  setIsSaving,
  saveName,
  setSaveName,
  onSave,
  saveError,
  onShowcase,
}) => {
  const { t } = useTranslation();

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <h3 className='flex items-center gap-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase dark:text-neutral-500'>
          <Book size={12} /> {t('library.title')}
        </h3>
        <button onClick={onShowcase} className='text-[9px] text-indigo-500 hover:underline'>
          Showcase
        </button>
      </div>

      <div
        className={`rounded-xl border p-3 transition-all ${
          isSaving
            ? 'border-indigo-200 bg-white shadow-sm dark:border-indigo-500/30 dark:bg-white/5'
            : 'border-transparent'
        }`}
      >
        {!isSaving ? (
          <button
            onClick={() => setIsSaving(true)}
            className='flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 py-2 text-xs text-gray-500 transition-all hover:border-gray-400 hover:bg-gray-50 dark:border-white/20 dark:text-gray-400 dark:hover:border-white/30 dark:hover:bg-white/5'
          >
            <Save size={12} /> {t('library.save')}
          </button>
        ) : (
          <div className='animate-in fade-in zoom-in-95 flex items-center gap-2 duration-200'>
            <div className='relative flex-1'>
              <input
                autoFocus
                value={saveName}
                onChange={(e) => setSaveName(e.target.value)}
                placeholder={t('library.savePlaceholder')}
                className={`w-full border bg-gray-50 dark:bg-black/20 ${
                  saveError ? 'border-red-300' : 'border-gray-200 dark:border-white/10'
                } rounded-lg px-2 py-1.5 text-xs outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500`}
                onKeyDown={(e) => e.key === 'Enter' && onSave()}
              />
            </div>
            <button onClick={onSave} className='rounded-md bg-indigo-600 p-1.5 text-white hover:bg-indigo-500'>
              <Check size={12} />
            </button>
            <button
              onClick={() => setIsSaving(false)}
              className='p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
            >
              <X size={12} />
            </button>
          </div>
        )}
      </div>

      <div className='space-y-1.5'>
        {presets.length === 0 ? (
          <div className='py-4 text-center text-xs text-gray-400 italic dark:text-neutral-600'>
            {t('library.empty')}
          </div>
        ) : (
          presets.map((preset) => (
            <div
              key={preset.id}
              className='group flex cursor-pointer items-center justify-between rounded-lg border border-transparent bg-gray-50 p-2.5 transition-all hover:border-gray-200 hover:bg-white dark:bg-white/5 dark:hover:border-white/10 dark:hover:bg-white/10'
              onClick={() => onLoad(preset)}
            >
              <div className='flex items-center gap-3 overflow-hidden'>
                <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded border border-gray-100 bg-white text-indigo-500 dark:border-white/5 dark:bg-black/20'>
                  <FileText size={14} />
                </div>
                <div className='min-w-0'>
                  <div className='truncate text-xs font-medium text-gray-700 dark:text-gray-200'>{preset.name}</div>
                  <div className='flex items-center gap-1 text-[10px] text-gray-400 dark:text-gray-500'>
                    {new Date(preset.createdAt).toLocaleDateString()}
                    <span className='h-0.5 w-0.5 rounded-full bg-gray-300'></span>
                    {preset.logs?.length || 1} logs
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => onDelete(preset.id, e)}
                className='p-1.5 text-gray-300 opacity-0 transition-colors group-hover:opacity-100 hover:text-red-500 dark:text-neutral-600 dark:hover:text-red-400'
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PresetLibrary;
