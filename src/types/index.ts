export interface CSSStyleObject {
  color?: string;
  background?: string;
  fontSize?: string;
  fontWeight?: string;
  padding?: string;
  borderRadius?: string;
  border?: string;
  textDecoration?: string;
  boxShadow?: string;
  marginTop?: string;
  marginBottom?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundRepeat?: string;
  backgroundPosition?: string;
  lineHeight?: string;
}

export interface LogBadge {
  label: string;
  value: string;
  labelColor?: string;
  labelBg?: string;
  valueColor?: string;
  valueBg?: string;
}

export enum LogType {
  TEXT = 'TEXT',
  RAW = 'RAW',
  EMOJI = 'EMOJI',
  BADGE = 'BADGE',
  JSON = 'JSON',
  TABLE = 'TABLE',
  GRADIENT = 'GRADIENT',
  ASCII = 'ASCII',
}

export interface ConsoleConfig {
  type: LogType;
  message: string;
  styles: CSSStyleObject;
  badge?: LogBadge;
  jsonData?: any;
  emojiData?: {
    emoji: string;
    size: number;
  };
  gradientData?: {
    colors: string[];
    direction: string;
  };
  asciiData?: {
    art: string;
    color: string;
  };
  group?: {
    enabled: boolean;
    label: string;
    collapsed: boolean;
  };
}

export interface LogItem {
  id: string;
  config: ConsoleConfig;
}

export interface SavedPreset {
  id: string;
  name: string;
  createdAt: number;
  logs: LogItem[];
}
