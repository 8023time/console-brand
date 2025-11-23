import { LogItem, ConsoleConfig, LogType } from '../../types';
import { getDefaultConfig } from './config';

const asciiArt = `
██████ ██████ ██████ ██████ ████████ ██ ███   ███ ███████
██  ██ ██  ██     ██     ██    ██    ██ ████ ████ ██
██████ ██  ██ ██████ ██████    ██    ██ ██ ███ ██ █████
██  ██ ██  ██ ██         ██    ██    ██ ██  █  ██ ██
██████ ██████ ██████ ██████    ██    ██ ██     ██ ███████
`;

export const SHOWCASE_LOGS: LogItem[] = [
  {
    id: 'showcase-1',
    config: {
      ...getDefaultConfig(),
      type: LogType.ASCII,
      asciiData: {
        art: asciiArt,
        color: '#3b82f6',
      },
    } as ConsoleConfig,
  },
  {
    id: 'showcase-2',
    config: {
      ...getDefaultConfig(),
      type: LogType.RAW,
      message: '✨ 欢迎来到 8023TIME',
      styles: { color: '#3b82f6', fontSize: '14px', fontWeight: 'bold' },
    } as ConsoleConfig,
  },
  {
    id: 'showcase-3',
    config: {
      ...getDefaultConfig(),
      type: LogType.BADGE,
      badge: {
        label: '💝 贴心提示',
        value: '这是一个温柔的日志打印工具，让你的控制台充满温度。',
        labelBg: '#ec4899',
        labelColor: '#fff',
        valueBg: '#fff',
        valueColor: '#333',
      },
    } as ConsoleConfig,
  },
  {
    id: 'showcase-4',
    config: {
      ...getDefaultConfig(),
      type: LogType.RAW,
      message: '🌸 支持多种日志类型：文本、徽章、emoji、JSON 等',
    } as ConsoleConfig,
  },
  {
    id: 'showcase-5',
    config: {
      ...getDefaultConfig(),
      type: LogType.EMOJI,
      emojiData: { emoji: '🎨 🌈 ✨', size: 80 },
    } as ConsoleConfig,
  },
  {
    id: 'showcase-6',
    config: {
      ...getDefaultConfig(),
      type: LogType.BADGE,
      badge: {
        label: '🎉 开始使用',
        value: '自定义你的日志，让代码充满温暖的力量。',
        labelBg: '#10b981',
        labelColor: '#fff',
        valueBg: '#fff',
        valueColor: '#333',
      },
    } as ConsoleConfig,
  },
];

export default SHOWCASE_LOGS;
