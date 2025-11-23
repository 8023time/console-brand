import { ConsoleConfig, LogType } from '../../types';

export const getDefaultConfig = (): ConsoleConfig => ({
  type: LogType.TEXT,
  message: 'Hello World',
  styles: {
    color: '#ffffff',
    background: '#4f46e5',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: 'bold',
  },
  badge: {
    label: 'Status',
    value: 'Operational',
    labelBg: '#374151',
    labelColor: '#f9fafb',
    valueBg: '#10b981',
    valueColor: '#ffffff',
  },
  jsonData: { id: 101, status: 'active', meta: { attempts: 3 } },
  emojiData: { emoji: '🚀', size: 50 },
  gradientData: {
    colors: ['#6366f1', '#a855f7'],
    direction: 'to right',
  },
  asciiData: {
    art: '  /\\_/\\\n ( o.o )\n  > ^ <',
    color: '#ff5f56',
  },
  group: {
    enabled: false,
    label: 'Debug Group',
    collapsed: false,
  },
});
