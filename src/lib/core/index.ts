import type { CSSStyleObject, LogBadge } from './type';

/**
 * Converts a style object to a CSS string
 * 将样式对象转换为 CSS 字符串
 * example: { color: 'red', fontSize: '12px' } => 'color: red; font-size: 12px;'
 *
 * @param style - The style object to convert
 * @returns A CSS string
 */
export const objectToCssString = (style: CSSStyleObject): string => {
  return Object.entries(style)
    .map(([key, value]) => {
      // Convert camelCase to kebab-case
      //（将 camelCase 转换为 kebab-case 形式）
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${cssKey}: ${value}`;
    })
    .join('; ');
};

/**
 * Log a message with a custom style
 * 使用自定义样式打印消息
 *
 * @param message - The message to log
 * @param style - The style object to apply to the message
 * @returns void
 */
export const prettyLog = (message: string, style: CSSStyleObject = {}) => {
  const css = objectToCssString(style);
  console.log(`%c${message}`, css);
};

/**
 * Log a "Badge" style (Label | Value) typically seen in frameworks like Vite/Next
 * 以 Badge 样式打印（标签 | 值），常见于 Vite/Next 的控制台输出
 *
 * @param badge - Object describing label/value and optional colors
 * @returns void
 */
export const logBadge = (badge: LogBadge) => {
  const {
    label,
    value,
    labelColor = '#ffffff',
    labelBg = '#555555',
    valueColor = '#ffffff',
    valueBg = '#333333',
  } = badge;

  const labelStyle = `
    background: ${labelBg};
    color: ${labelColor};
    padding: 2px 6px;
    border-radius: 3px 0 0 3px;
    font-weight: bold;
  `;

  const valueStyle = `
    background: ${valueBg};
    color: ${valueColor};
    padding: 2px 6px;
    border-radius: 0 3px 3px 0;
  `;

  console.log(`%c ${label} %c ${value} `, labelStyle, valueStyle);
};

/**
 * Log text with a gradient background
 * 使用渐变背景打印文本
 *
 * @param message - The text message to log
 * @param colors - Array of color strings used in the gradient
 * @param direction - Gradient direction (default: 'to right')
 * @param style - Additional CSS style overrides
 * @returns void
 */
export const logGradient = (
  message: string,
  colors: string[],
  direction: string = 'to right',
  style: CSSStyleObject = {},
) => {
  const css = objectToCssString({
    background: `linear-gradient(${direction}, ${colors.join(', ')})`,
    color: '#ffffff',
    padding: '4px 8px',
    borderRadius: '4px',
    fontWeight: 'bold',
    ...style,
  });
  console.log(`%c${message}`, css);
};

/**
 * Log an image to the console (removed)
 * The image helper has been removed from the library.
 */

/**
 * Log a styled object/JSON
 * 以分组形式打印带样式的对象/JSON
 *
 * @param label - Group label shown in console
 * @param data - The object or data to log
 * @param style - Additional CSS style overrides for the group header
 * @returns void
 */
export const logJson = (label: string, data: any, style: CSSStyleObject = {}) => {
  const css = objectToCssString({
    fontWeight: 'bold',
    fontSize: '12px',
    color: '#4ade80',
    marginBottom: '4px',
    ...style,
  });

  console.group(`%c📦 ${label}`, css);
  console.log(data);
  console.groupEnd();
};

/**
 * Log a table with a styled header
 * 打印带样式表头的数据表（console.table）
 *
 * @param label - Label shown before the table
 * @param data - Array of row objects for the table
 * @param style - Additional CSS style overrides for the header
 * @returns void
 */
export const logTable = (label: string, data: any[], style: CSSStyleObject = {}) => {
  const css = objectToCssString({
    fontWeight: 'bold',
    fontSize: '12px',
    color: '#60a5fa',
    marginBottom: '4px',
    ...style,
  });

  // Safe stringify to handle nested objects/arrays and circular references
  const safeStringify = (obj: any) => {
    const seen = new WeakSet();
    return JSON.stringify(
      obj,
      function (key, value) {
        if (value && typeof value === 'object') {
          if (seen.has(value)) return '[Circular]';
          seen.add(value);
        }
        return value;
      },
      2,
    );
  };

  // Convert nested objects/arrays to JSON strings so console.table shows their contents
  const normalized = (Array.isArray(data) ? data : [data]).map((row) => {
    if (row && typeof row === 'object') {
      const out: Record<string, any> = {};
      Object.keys(row).forEach((k) => {
        const v = (row as any)[k];
        if (v === null || v === undefined) {
          out[k] = v;
        } else if (typeof v === 'object') {
          out[k] = safeStringify(v);
        } else {
          out[k] = v;
        }
      });
      return out;
    }
    return row;
  });

  console.log(`%c📊 ${label}`, css);
  console.table(normalized);
};

/**
 * Log ASCII Art
 * 打印 ASCII 艺术文本，保留原始空格/换行
 * 使用等宽字体确保在所有控制台中正确显示
 *
 * @param art - The ASCII art string (should include newlines)
 * @param color - Text color (default: '#ffffff')
 * @returns void
 */
export const logAscii = (art: string, color: string = '#ffffff') => {
  const style = `
    color: ${color};
    font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', monospace;
    font-size: 12px;
    font-weight: bold;
    white-space: pre;
    line-height: 1;
    letter-spacing: 0;
  `;
  console.log(`%c${art}`, style);
};

/**
 * Log a large Emoji
 * 打印大尺寸表情符号
 *
 * @param emoji - Emoji character/string to display
 * @param size - Font size in px (default: 50)
 * @returns void
 */
export const logEmoji = (emoji: string, size: number = 50) => {
  console.log(
    `%c${emoji}`,
    `font-size: ${size}px; line-height: 1.2; font-family: 'Segoe UI Emoji', 'Apple Color Emoji', sans-serif;`,
  );
};

/**
 * Default presets for quick usage
 * 预设样式，方便快速使用
 */
export const Presets = {
  SUCCESS: {
    background: '#ecfdf5',
    color: '#059669',
    padding: '4px 8px',
    borderRadius: '4px',
    border: '1px solid #34d399',
    fontWeight: 'bold',
  } as CSSStyleObject,
  ERROR: {
    background: '#fef2f2',
    color: '#dc2626',
    padding: '4px 8px',
    borderRadius: '4px',
    border: '1px solid #f87171',
    fontWeight: 'bold',
  } as CSSStyleObject,
  WARNING: {
    background: '#fffbeb',
    color: '#d97706',
    padding: '4px 8px',
    borderRadius: '4px',
    border: '1px solid #fbbf24',
    fontWeight: 'bold',
  } as CSSStyleObject,
  NEON: {
    background: '#000000',
    color: '#00ff00',
    padding: '6px 12px',
    border: '1px solid #00ff00',
    boxShadow: '0 0 10px #00ff00',
    fontFamily: 'monospace',
    fontSize: '14px',
  } as CSSStyleObject,
};
