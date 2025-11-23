import React, { useState, useCallback, useMemo, useRef } from 'react';
import {
  Presets,
  prettyLog,
  logBadge,
  logJson,
  logTable,
  logGradient,
  logAscii,
  logEmoji,
  objectToCssString,
} from '@lib/index';
import { ConsoleConfig, LogType, LogItem, SavedPreset } from './types';
import PreviewPanel from '@/components/ui/PreviewPanel/index';
import StyleControls from '@components/ui/StyleControls/StyleControls';
import CodeViewer from '@/components/ui/CodeViewer/index';
import { PanelLeftOpen, LayoutGrid } from '@components/icons/Icons';
import SidebarContainer from '@components/ui/sidebar/SidebarContainer';
import SidebarHeader from '@components/ui/sidebar/SidebarHeader';
import LogSequence from '@components/ui/sidebar/LogSequence';
import PresetLibrary from '@components/ui/sidebar/PresetLibrary';
import LogTypeSelector from '@components/ui/editor/LogTypeSelector';
import MessageInput from '@components/ui/editor/MessageInput';
import { getDefaultConfig } from '@components/data/config';
import SHOWCASE_LOGS from '@components/data/showcase';
import { useTranslation } from 'react-i18next';
import '@styles/scrollbar.css';
import coreSource from '@lib/core/index.ts?raw';
import typeSource from '@lib/core/type.ts?raw';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(380);
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const [logs, setLogs] = useState<LogItem[]>([{ id: 'init-1', config: getDefaultConfig() }]);
  const [activeLogId, setActiveLogId] = useState<string>('init-1');

  const activeLog = useMemo(() => logs.find((l) => l.id === activeLogId) || logs[0], [logs, activeLogId]);
  const activeConfig = activeLog.config;

  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const addLog = () => {
    const newId = crypto.randomUUID();
    const newLog: LogItem = { id: newId, config: getDefaultConfig() };
    setLogs((prev) => [...prev, newLog]);
    setActiveLogId(newId);
  };

  const updateActiveLog = (patch: Partial<ConsoleConfig>) => {
    setLogs((prev) => prev.map((l) => (l.id === activeLogId ? { ...l, config: { ...l.config, ...patch } } : l)));
  };

  const handleRun = useCallback(() => {
    logs.forEach((log) => {
      const { config } = log;
      if (config.group?.enabled) {
        config.group.collapsed ? console.groupCollapsed(config.group.label) : console.group(config.group.label);
      }

      switch (config.type) {
        case LogType.TEXT:
          prettyLog(config.message, config.styles);
          break;
        case LogType.RAW:
          if (config.styles.color || config.styles.fontSize || config.styles.fontWeight) {
            const rawCss = objectToCssString({
              color: config.styles.color,
              fontSize: config.styles.fontSize,
              fontWeight: config.styles.fontWeight,
            });
            console.log(`%c${config.message}`, rawCss);
          } else {
            console.log(config.message);
          }
          break;
        case LogType.EMOJI:
          if (config.emojiData) logEmoji(config.emojiData.emoji, config.emojiData.size);
          break;
        case LogType.BADGE:
          if (config.badge) logBadge(config.badge);
          break;
        case LogType.JSON:
          logJson(config.message, config.jsonData, config.styles);
          break;
        case LogType.TABLE:
          if (Array.isArray(config.jsonData)) {
            logTable(config.message, config.jsonData, config.styles);
          } else if (config.jsonData && typeof config.jsonData === 'object') {
            logTable(config.message, [config.jsonData], config.styles);
          } else {
            prettyLog('Table data must be an array or object', Presets.ERROR);
          }
          break;
        case LogType.GRADIENT:
          logGradient(config.message, config.gradientData?.colors || [], config.gradientData?.direction, config.styles);
          break;
        case LogType.ASCII:
          if (config.asciiData) logAscii(config.asciiData.art, config.asciiData.color);
          break;
      }

      if (config.group?.enabled) {
        console.groupEnd();
      }
    });
  }, [logs]);

  const [savedPresets, setSavedPresets] = useState<SavedPreset[]>([]);
  const [saveName, setSaveName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);

  const { t } = useTranslation();

  const removeLog = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (logs.length <= 1) return;
    const newLogs = logs.filter((l) => l.id !== id);
    setLogs(newLogs);
    if (id === activeLogId) {
      setActiveLogId(newLogs[newLogs.length - 1].id);
    }
  };

  const handleSavePreset = () => {
    if (!saveName.trim()) {
      setSaveError(true);
      return;
    }
    const newPreset: SavedPreset = {
      id: crypto.randomUUID(),
      name: saveName,
      createdAt: Date.now(),
      logs: logs,
    };
    const updated = [newPreset, ...savedPresets];
    setSavedPresets(updated);
    localStorage.setItem('console_artisan_presets', JSON.stringify(updated));
    setSaveName('');
    setIsSaving(false);
    setSaveError(false);
  };

  const handleDeletePreset = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedPresets.filter((p) => p.id !== id);
    setSavedPresets(updated);
    localStorage.setItem('console_artisan_presets', JSON.stringify(updated));
  };

  const handleLoadPreset = (preset: SavedPreset) => {
    if ((preset as any).config) {
      const legacy = preset as any;
      setLogs([{ id: crypto.randomUUID(), config: legacy.config }]);
      setActiveLogId(legacy.logs?.[0]?.id || 'new-id');
    } else {
      const freshLogs = preset.logs.map((l) => ({ ...l, id: crypto.randomUUID() }));
      setLogs(freshLogs);
      if (freshLogs.length > 0) setActiveLogId(freshLogs[0].id);
    }
  };

  const loadShowcase = () => {
    const fresh = SHOWCASE_LOGS.map((l) => ({ ...l, id: crypto.randomUUID() }));
    setLogs(fresh);
    if (fresh.length > 0) setActiveLogId(fresh[0].id);
  };

  const generateCodeForLog = (config: ConsoleConfig, type: 'usage' | 'inline') => {
    const cleanJson = (obj: any) => JSON.stringify(obj, null, 2);
    let code = '';
    if (config.group?.enabled) {
      code += `${config.group.collapsed ? 'console.groupCollapsed' : 'console.group'}('${config.group.label}');\n`;
    }

    if (type === 'usage') {
      if (config.type === LogType.TEXT) {
        code += `prettyLog('${config.message}', ${cleanJson(config.styles)});`;
      } else if (config.type === LogType.RAW) {
        if (config.styles.color || config.styles.fontSize || config.styles.fontWeight) {
          const css = objectToCssString({
            color: config.styles.color,
            fontSize: config.styles.fontSize,
            fontWeight: config.styles.fontWeight,
          });
          code += `console.log('%c${config.message}', '${css}');`;
        } else {
          code += `console.log(` + '`' + `${config.message}` + '`' + `);`;
        }
      } else if (config.type === LogType.EMOJI) {
        code += `logEmoji('${config.emojiData?.emoji}', ${config.emojiData?.size});`;
      } else if (config.type === LogType.BADGE) {
        code += `logBadge(${cleanJson(config.badge)});`;
      } else if (config.type === LogType.GRADIENT) {
        code += `logGradient(\n  '${config.message}',\n  ${JSON.stringify(config.gradientData?.colors)},\n  '${config.gradientData?.direction}',\n  ${cleanJson(config.styles)}\n);`;
      } else if (config.type === LogType.JSON) {
        code += `logJson('${config.message}', ${cleanJson(config.jsonData)}, ${cleanJson(config.styles)});`;
      } else if (config.type === LogType.TABLE) {
        const tableData = Array.isArray(config.jsonData)
          ? config.jsonData
          : config.jsonData && typeof config.jsonData === 'object'
            ? [config.jsonData]
            : config.jsonData;
        code += `logTable('${config.message}', ${cleanJson(tableData)}, ${cleanJson(config.styles)});`;
      } else if (config.type === LogType.ASCII) {
        code += `logAscii(` + '`' + `${config.asciiData?.art}` + '`' + `, '${config.asciiData?.color}');`;
      }
    } else {
      if (config.type === LogType.TEXT) {
        const css = objectToCssString(config.styles);
        code += `console.log('%c${config.message}', '${css}');`;
      } else if (config.type === LogType.RAW) {
        if (config.styles.color || config.styles.fontSize || config.styles.fontWeight) {
          const css = objectToCssString({
            color: config.styles.color,
            fontSize: config.styles.fontSize,
            fontWeight: config.styles.fontWeight,
          });
          code += `console.log('%c${config.message}', '${css}');`;
        } else {
          code += `console.log(` + '`' + `${config.message}` + '`' + `);`;
        }
      } else if (config.type === LogType.EMOJI) {
        code += `console.log('%c${config.emojiData?.emoji}', 'font-size: ${config.emojiData?.size}px; line-height: 1.2; font-family: \\'Segoe UI Emoji\\', \\\'Apple Color Emoji\\', sans-serif;');`;
      } else if (config.type === LogType.BADGE) {
        const labelStyle = objectToCssString({
          background: config.badge?.labelBg || '#555',
          color: config.badge?.labelColor || '#fff',
          padding: '2px 6px',
          borderRadius: '3px 0 0 3px',
          fontWeight: 'bold',
        });
        const valueStyle = objectToCssString({
          background: config.badge?.valueBg || '#333',
          color: config.badge?.valueColor || '#fff',
          padding: '2px 6px',
          borderRadius: '0 3px 3px 0',
        });
        code += `console.log('%c ${config.badge?.label} %c ${config.badge?.value} ', '${labelStyle}', '${valueStyle}');`;
      } else if (config.type === LogType.GRADIENT) {
        const css = objectToCssString({
          background: `linear-gradient(${config.gradientData?.direction}, ${config.gradientData?.colors.join(', ')})`,
          color: '#ffffff',
          padding: '4px 8px',
          borderRadius: '4px',
          fontWeight: 'bold',
          ...config.styles,
        });
        code += `console.log('%c${config.message}', '${css}');`;
      } else if (config.type === LogType.JSON) {
        const css = objectToCssString({
          fontWeight: 'bold',
          fontSize: '12px',
          color: '#4ade80',
          marginBottom: '4px',
          ...config.styles,
        });
        code += `console.group('%c📦 ${config.message}', '${css}');\nconsole.log(${cleanJson(config.jsonData)});\nconsole.groupEnd();`;
      } else if (config.type === LogType.TABLE) {
        const css = objectToCssString({
          fontWeight: 'bold',
          fontSize: '12px',
          color: '#60a5fa',
          marginBottom: '4px',
          ...config.styles,
        });
        code += `console.log('%c📊 ${config.message}', '${css}');\nconsole.table(${cleanJson(config.jsonData)});`;
      } else if (config.type === LogType.ASCII) {
        code +=
          `const art = ` +
          '`' +
          `${config.asciiData?.art}` +
          '`' +
          `;\nconsole.log('%c' + art, 'color: ${config.asciiData?.color}; font-family: monospace; font-weight: bold; white-space: pre;');`;
      }
    }

    if (config.group?.enabled) {
      code += `\nconsole.groupEnd();`;
    }
    return code;
  };

  const usageCode = useMemo(() => {
    let imports = new Set<string>();
    logs.forEach((l) => {
      if (l.config.type === LogType.TEXT) imports.add('prettyLog');
      if (l.config.type === LogType.BADGE) imports.add('logBadge');
      if (l.config.type === LogType.GRADIENT) imports.add('logGradient');
      if (l.config.type === LogType.JSON) imports.add('logJson');
      if (l.config.type === LogType.TABLE) imports.add('logTable');
      if (l.config.type === LogType.ASCII) imports.add('logAscii');
      if (l.config.type === LogType.EMOJI) imports.add('logEmoji');
    });
    let code = `import { ${Array.from(imports).join(', ')} } from './utils/consoleLib';\n\n`;
    logs.forEach((log) => {
      code += generateCodeForLog(log.config, 'usage') + '\n\n';
    });
    return code.trim();
  }, [logs]);

  const inlineCode = useMemo(() => {
    let code = '';
    logs.forEach((log) => {
      code += generateCodeForLog(log.config, 'inline') + '\n\n';
    });
    return code.trim();
  }, [logs]);

  const LIBRARY_SOURCE = useMemo(() => {
    const combined = `${coreSource}\n${typeSource}`.replace(/\r\n/g, '\n');
    const lines = combined.split('\n');
    return lines.slice(2).join('\n');
  }, [coreSource, typeSource]);

  return (
    <>
      <div className='flex h-screen overflow-hidden bg-gray-50 font-sans text-gray-900 dark:bg-[#0a0a0a] dark:text-neutral-200'>
        <SidebarContainer
          ref={sidebarRef}
          width={sidebarWidth}
          isOpen={isSidebarOpen}
          isResizing={isResizing}
          onResizeStart={startResizing}
        >
          <SidebarHeader onCloseSidebar={() => setIsSidebarOpen(false)} />

          <div className='custom-scrollbar flex-1 space-y-8 overflow-x-hidden overflow-y-auto px-5 pb-8'>
            <LogSequence
              logs={logs}
              activeLogId={activeLogId}
              onSelectLog={setActiveLogId}
              onAddLog={addLog}
              onRemoveLog={removeLog}
            />

            <PresetLibrary
              presets={savedPresets}
              onLoad={handleLoadPreset}
              onDelete={handleDeletePreset}
              isSaving={isSaving}
              setIsSaving={setIsSaving}
              saveName={saveName}
              setSaveName={setSaveName}
              onSave={handleSavePreset}
              saveError={saveError}
              onShowcase={loadShowcase}
            />
          </div>
        </SidebarContainer>

        <main className='relative flex h-full flex-1 flex-col overflow-hidden'>
          {!isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className='absolute top-4 left-4 z-50 rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-lg hover:text-indigo-600 dark:border-white/10 dark:bg-[#1f1f1f]'
            >
              <PanelLeftOpen size={18} />
            </button>
          )}

          <div className='custom-scrollbar flex-1 overflow-y-auto p-4 md:p-8'>
            <div className='mx-auto max-w-5xl space-y-8 pb-20'>
              <div className='grid grid-cols-1 items-start gap-8 lg:grid-cols-12'>
                <div className='space-y-6 lg:col-span-7'>
                  <LogTypeSelector activeType={activeConfig.type} onTypeChange={(type) => updateActiveLog({ type })} />
                  <MessageInput config={activeConfig} onChange={updateActiveLog} />

                  <div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/5 dark:bg-[#161616]'>
                    <StyleControls
                      logType={activeConfig.type}
                      styles={activeConfig.styles}
                      badge={activeConfig.badge}
                      gradientData={activeConfig.gradientData}
                      asciiData={activeConfig.asciiData}
                      emojiData={activeConfig.emojiData}
                      group={activeConfig.group}
                      onStyleChange={(s) => updateActiveLog({ styles: s })}
                      onBadgeChange={(b) => updateActiveLog({ badge: b })}
                      onGradientChange={(g) => updateActiveLog({ gradientData: g })}
                      onAsciiChange={(a) => updateActiveLog({ asciiData: a })}
                      onEmojiChange={(e) => updateActiveLog({ emojiData: e })}
                      onGroupChange={(g) => updateActiveLog({ group: g })}
                    />
                  </div>
                </div>

                <div className='space-y-6 lg:sticky lg:top-4 lg:col-span-5'>
                  <div className='mb-2 flex items-center gap-2'>
                    <div className='rounded-md bg-indigo-100 p-1.5 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400'>
                      <LayoutGrid size={14} />
                    </div>
                    <h2 className='text-xs font-bold tracking-widest text-gray-500 uppercase dark:text-gray-400'>
                      {t('preview.title')}
                    </h2>
                  </div>
                  <div className='h-[400px] md:h-[500px]'>
                    <PreviewPanel logs={logs} onRun={handleRun} />
                  </div>

                  <CodeViewer usageCode={usageCode} inlineCode={inlineCode} libraryCode={LIBRARY_SOURCE} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
