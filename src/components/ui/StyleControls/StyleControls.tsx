import React, { useState, useContext } from 'react';
import { CSSStyleObject, LogType, LogBadge } from '@/types/index';
import { Palette, Type, Layout, Box, Folder, FileType, Smile, Pipette, Eraser } from '@components/icons/Icons';
import { SketchPicker, ColorResult } from 'react-color';
import { Input, Select, Slider, Switch, InputNumber, ConfigProvider, theme as antTheme } from 'antd';
import { ThemeContext } from '@/context/Context';
import GITHUB_EMOJIS from '@/utils/emojis';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';

interface StyleControlsProps {
  logType: LogType;
  styles: CSSStyleObject;
  badge?: LogBadge;
  gradientData?: { colors: string[]; direction: string };
  asciiData?: { art: string; color: string };
  emojiData?: { emoji: string; size: number };
  group?: { enabled: boolean; label: string; collapsed: boolean };

  onStyleChange: (newStyles: CSSStyleObject) => void;
  onBadgeChange: (newBadge: LogBadge) => void;
  onGradientChange: (data: { colors: string[]; direction: string }) => void;
  onAsciiChange: (data: { art: string; color: string }) => void;
  onEmojiChange: (data: { emoji: string; size: number }) => void;
  onGroupChange: (data: { enabled: boolean; label: string; collapsed: boolean }) => void;

  t: TFunction; // Translation function for controls
}

const SectionHeader: React.FC<{ icon: React.ElementType; title: string }> = ({ icon: Icon, title }) => (
  <div className='group mt-6 mb-4 flex items-center gap-2 opacity-90 select-none first:mt-0'>
    <div className='rounded-md bg-indigo-50 p-1.5 text-indigo-600 transition-colors group-hover:bg-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-400 dark:group-hover:bg-indigo-500/20'>
      <Icon size={14} />
    </div>
    <h3 className='text-[11px] font-bold tracking-widest text-gray-500 uppercase dark:text-gray-400'>{title}</h3>
    <div className='ml-2 h-px flex-1 bg-gray-100 dark:bg-white/5'></div>
  </div>
);

const InputGroup: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className='mb-3'>
    <label className='mb-1.5 block pl-0.5 text-[10px] font-bold tracking-wide text-gray-400 uppercase dark:text-gray-500'>
      {label}
    </label>
    {children}
  </div>
);

const ColorPicker: React.FC<{ value: string; onChange: (val: string) => void }> = ({ value, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);

  const displayValue = value || 'transparent';

  const handleChange = (color: ColorResult) => {
    if (color.rgb.a === 1) {
      onChange(color.hex);
    } else {
      onChange(`rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`);
    }
  };

  const hasEyeDropper = typeof window !== 'undefined' && 'EyeDropper' in window;

  const handleEyeDropper = async () => {
    if (!hasEyeDropper) return;
    try {
      const eyeDropper = new (window as any).EyeDropper();
      const result = await eyeDropper.open();
      onChange(result.sRGBHex);
    } catch (e) {
      console.log('EyeDropper failed/cancelled');
    }
  };

  return (
    <div className='relative'>
      <div className='flex gap-2'>
        <div
          onClick={() => setShowPicker(!showPicker)}
          className='group relative h-8 w-[34px] shrink-0 cursor-pointer overflow-hidden rounded-lg shadow-sm ring-1 ring-black/5 transition-all hover:ring-indigo-500/50 dark:ring-white/10'
        >
          <div
            className='absolute inset-0'
            style={{
              backgroundImage:
                'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
              backgroundSize: '6px 6px',
              opacity: 0.4,
            }}
          ></div>

          <div
            className='absolute inset-0 transition-colors duration-200'
            style={{ backgroundColor: value || 'transparent' }}
          />
        </div>

        <div className='flex-1'>
          <Input
            value={displayValue}
            onChange={(e) => onChange(e.target.value)}
            placeholder='transparent'
            size='middle'
            suffix={
              <div className='flex items-center gap-1'>
                {hasEyeDropper && (
                  <Pipette
                    size={14}
                    className='cursor-pointer text-gray-400 transition-colors hover:text-indigo-500'
                    onClick={handleEyeDropper}
                  />
                )}
                <Eraser
                  size={14}
                  className='cursor-pointer text-gray-400 transition-colors hover:text-red-500'
                  onClick={() => onChange('transparent')}
                />
              </div>
            }
          />
        </div>
      </div>

      {showPicker && (
        <div className='animate-in fade-in zoom-in-95 absolute left-0 z-50 mt-2 overflow-hidden rounded-xl shadow-2xl duration-200'>
          <div className='fixed inset-0 z-40' onClick={() => setShowPicker(false)} />
          <div className='relative z-50'>
            <SketchPicker
              color={value || '#fff'}
              onChange={handleChange}
              presetColors={[
                '#000000',
                '#ffffff',
                '#ef4444',
                '#f97316',
                '#f59e0b',
                '#84cc16',
                '#22c55e',
                '#06b6d4',
                '#3b82f6',
                '#6366f1',
                '#a855f7',
                '#ec4899',
                'transparent',
              ]}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const StyleControls: React.FC<StyleControlsProps> = ({
  logType,
  styles,
  badge,
  gradientData,
  asciiData,
  emojiData,
  group,
  onStyleChange,
  onBadgeChange,
  onGradientChange,
  onAsciiChange,
  onEmojiChange,
  onGroupChange,
}) => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const handleStyleChange = (key: keyof CSSStyleObject, value: string) => {
    onStyleChange({ ...styles, [key]: value });
  };

  const handleBadgeChange = (key: keyof LogBadge, value: string) => {
    if (badge) {
      onBadgeChange({ ...badge, [key]: value });
    }
  };

  const handleGradientChange = (index: number, value: string) => {
    if (gradientData) {
      const newColors = [...gradientData.colors];
      newColors[index] = value;
      onGradientChange({ ...gradientData, colors: newColors });
    }
  };

  const GroupControls = () =>
    group ? (
      <div className='mt-8 rounded-xl border border-gray-100 bg-gray-50/50 p-4 dark:border-white/5 dark:bg-white/5'>
        <div className='mb-4 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Folder size={14} className='text-gray-400' />
            <span className='text-[11px] font-bold tracking-widest text-gray-500 uppercase dark:text-gray-400'>
              {t('controls.groupSettings')}
            </span>
          </div>

          <Switch
            checked={group.enabled}
            onChange={(checked) => onGroupChange({ ...group, enabled: checked })}
            size='small'
          />
        </div>

        {group.enabled && (
          <div className='animate-in fade-in slide-in-from-top-2 space-y-3 duration-200'>
            <InputGroup label={t('controls.labels.groupLabel')}>
              <Input
                value={group.label}
                onChange={(e) => onGroupChange({ ...group, label: e.target.value })}
                size='middle'
              />
            </InputGroup>
            <div className='flex items-center justify-between py-1'>
              <span className='text-[11px] text-gray-600 select-none dark:text-gray-300'>
                {t('controls.labels.collapsed')}
              </span>
              <Switch
                checked={group.collapsed}
                onChange={(checked) => onGroupChange({ ...group, collapsed: checked })}
                size='small'
              />
            </div>
          </div>
        )}
      </div>
    ) : null;

  const CommonTypographyControls = () => (
    <div>
      <SectionHeader icon={Type} title={t('controls.typography')} />
      <div className='grid grid-cols-2 gap-3'>
        <InputGroup label={t('controls.labels.fontSize')}>
          <Input
            value={styles.fontSize || ''}
            onChange={(e) => handleStyleChange('fontSize', e.target.value)}
            placeholder='12px'
          />
        </InputGroup>
        <InputGroup label={t('controls.labels.fontWeight')}>
          <Select
            value={styles.fontWeight || 'normal'}
            onChange={(val) => handleStyleChange('fontWeight', val)}
            options={[
              { value: 'normal', label: t('controls.options.normal') },
              { value: 'bold', label: t('controls.options.bold') },
              { value: 'lighter', label: t('controls.options.light') },
              { value: 'bolder', label: t('controls.options.extraBold') },
            ]}
            style={{ width: '100%' }}
          />
        </InputGroup>
      </div>
    </div>
  );

  // Wrap everything in ConfigProvider for theming
  return (
    <ConfigProvider
      theme={{
        algorithm: theme === 'dark' ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
        token: {
          colorPrimary: '#4f46e5',
          borderRadius: 6,
          colorBgContainer: theme === 'dark' ? '#1f1f1f' : '#ffffff',
          colorBorder: theme === 'dark' ? '#424242' : '#d9d9d9',
        },
      }}
    >
      <div className='space-y-8'>
        {logType === LogType.RAW && (
          <div className='space-y-6'>
            <div>
              <SectionHeader icon={Palette} title={t('controls.appearance')} />
              <div className='grid grid-cols-1 gap-3'>
                <InputGroup label={t('controls.labels.textColor')}>
                  <ColorPicker value={styles.color || ''} onChange={(val) => handleStyleChange('color', val)} />
                </InputGroup>
              </div>
            </div>

            <CommonTypographyControls />
            <GroupControls />
          </div>
        )}

        {logType === LogType.EMOJI && emojiData && (
          <div className='space-y-4'>
            <SectionHeader icon={Smile} title={t('controls.emojiSettings')} />

            <InputGroup label={t('controls.labels.emojiSize')}>
              <div className='px-2'>
                <Slider
                  min={12}
                  max={150}
                  value={emojiData.size}
                  onChange={(val) => onEmojiChange({ ...emojiData, size: val })}
                />
              </div>
            </InputGroup>

            <div className='rounded-lg border border-gray-200 bg-white p-3 dark:border-white/10 dark:bg-neutral-900'>
              <label className='mb-2 block text-[10px] font-bold tracking-wide text-gray-400 uppercase dark:text-gray-500'>
                GitHub Cheat Sheet Picks
              </label>
              <div className='custom-scrollbar grid max-h-[200px] grid-cols-6 gap-2 overflow-y-auto pr-1'>
                {GITHUB_EMOJIS.map((emoji, index) => (
                  <button
                    key={`emoji-${index}`}
                    onClick={() => onEmojiChange({ ...emojiData, emoji: emoji })}
                    className={`flex h-8 items-center justify-center rounded border text-lg transition-colors ${
                      emojiData.emoji === emoji
                        ? 'border-indigo-500/50 bg-indigo-100 ring-1 ring-indigo-500/50 dark:bg-indigo-500/30'
                        : 'border-transparent bg-gray-50 hover:border-indigo-200 hover:bg-indigo-50 dark:bg-white/5 dark:hover:border-indigo-500/30 dark:hover:bg-indigo-500/20'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
            <GroupControls />
          </div>
        )}

        {logType === LogType.ASCII && asciiData && (
          <div className='space-y-2'>
            <SectionHeader icon={FileType} title={t('controls.asciiSettings')} />
            <InputGroup label={t('controls.labels.artColor')}>
              <ColorPicker value={asciiData.color} onChange={(val) => onAsciiChange({ ...asciiData, color: val })} />
            </InputGroup>
            <GroupControls />
          </div>
        )}

        {/* Image controls removed */}

        {logType === LogType.BADGE && badge && (
          <div className='space-y-6'>
            <SectionHeader icon={Layout} title={t('controls.badgeConfig')} />

            <div className='space-y-6'>
              <div className='rounded-xl border border-gray-200 bg-white p-3 dark:border-white/10 dark:bg-neutral-900'>
                <div className='mb-3 flex items-center gap-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500'>
                  <span className='h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-gray-600'></span>
                  {t('controls.labels.leftSide')}
                </div>
                <div className='space-y-3'>
                  <InputGroup label={t('controls.labels.label')}>
                    <Input value={badge.label} onChange={(e) => handleBadgeChange('label', e.target.value)} />
                  </InputGroup>
                  <InputGroup label={t('controls.labels.background')}>
                    <ColorPicker value={badge.labelBg || ''} onChange={(val) => handleBadgeChange('labelBg', val)} />
                  </InputGroup>
                  <InputGroup label={t('controls.labels.textColor')}>
                    <ColorPicker
                      value={badge.labelColor || ''}
                      onChange={(val) => handleBadgeChange('labelColor', val)}
                    />
                  </InputGroup>
                </div>
              </div>

              <div className='rounded-xl border border-gray-200 bg-white p-3 dark:border-white/10 dark:bg-neutral-900'>
                <div className='mb-3 flex items-center gap-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500'>
                  <span className='h-1.5 w-1.5 rounded-full bg-indigo-500'></span>
                  {t('controls.labels.rightSide')}
                </div>
                <div className='space-y-3'>
                  <InputGroup label={t('controls.labels.label')}>
                    <Input value={badge.value} onChange={(e) => handleBadgeChange('value', e.target.value)} />
                  </InputGroup>
                  <InputGroup label={t('controls.labels.background')}>
                    <ColorPicker value={badge.valueBg || ''} onChange={(val) => handleBadgeChange('valueBg', val)} />
                  </InputGroup>
                  <InputGroup label={t('controls.labels.textColor')}>
                    <ColorPicker
                      value={badge.valueColor || ''}
                      onChange={(val) => handleBadgeChange('valueColor', val)}
                    />
                  </InputGroup>
                </div>
              </div>
            </div>
            <GroupControls />
          </div>
        )}

        {/* Standard Text & Gradient Controls */}
        {![LogType.RAW, LogType.EMOJI, LogType.ASCII, LogType.BADGE].includes(logType) && (
          <div className='space-y-8'>
            {logType === LogType.GRADIENT && gradientData && (
              <div>
                <SectionHeader icon={Layout} title={t('controls.gradientSetup')} />
                <div className='mb-3 grid grid-cols-2 gap-3'>
                  <InputGroup label={t('controls.labels.startColor')}>
                    <ColorPicker value={gradientData.colors[0]} onChange={(val) => handleGradientChange(0, val)} />
                  </InputGroup>
                  <InputGroup label={t('controls.labels.endColor')}>
                    <ColorPicker value={gradientData.colors[1]} onChange={(val) => handleGradientChange(1, val)} />
                  </InputGroup>
                </div>
                <InputGroup label={t('controls.labels.direction')}>
                  <Select
                    value={gradientData.direction}
                    onChange={(val) => onGradientChange({ ...gradientData, direction: val })}
                    options={[
                      { value: 'to right', label: t('controls.options.toRight') },
                      { value: 'to left', label: t('controls.options.toLeft') },
                      { value: 'to bottom', label: t('controls.options.toBottom') },
                      { value: 'to top', label: t('controls.options.toTop') },
                      { value: 'to bottom right', label: t('controls.options.toBottomRight') },
                    ]}
                    style={{ width: '100%' }}
                  />
                </InputGroup>
              </div>
            )}

            {/* Colors */}
            {logType !== LogType.GRADIENT && (
              <div>
                <SectionHeader icon={Palette} title={t('controls.appearance')} />
                <div className='grid grid-cols-2 gap-3'>
                  <InputGroup label={t('controls.labels.textColor')}>
                    <ColorPicker
                      value={styles.color || '#ffffff'}
                      onChange={(val) => handleStyleChange('color', val)}
                    />
                  </InputGroup>
                  <InputGroup label={t('controls.labels.background')}>
                    <ColorPicker
                      value={styles.background || 'transparent'}
                      onChange={(val) => handleStyleChange('background', val)}
                    />
                  </InputGroup>
                </div>
              </div>
            )}

            {/* Typography */}
            <CommonTypographyControls />

            {/* Box Model */}
            <div>
              <SectionHeader icon={Box} title={t('controls.boxModel')} />
              <div className='grid grid-cols-2 gap-3'>
                <InputGroup label={t('controls.labels.padding')}>
                  <Input
                    value={styles.padding || ''}
                    onChange={(e) => handleStyleChange('padding', e.target.value)}
                    placeholder='4px 8px'
                  />
                </InputGroup>
                <InputGroup label={t('controls.labels.radius')}>
                  <Input
                    value={styles.borderRadius || ''}
                    onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
                    placeholder='4px'
                  />
                </InputGroup>
                {/* border control removed per request */}
              </div>
            </div>

            <GroupControls />
          </div>
        )}
      </div>
    </ConfigProvider>
  );
};

export default StyleControls;
