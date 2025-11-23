import React from 'react';

interface IconProps {
  size?: number | string;
  className?: string;
  fill?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}

const IconBase: React.FC<IconProps & { children: React.ReactNode }> = ({
  size = 24,
  className = '',
  fill = 'none',
  children,
  onClick,
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill={fill}
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
    onClick={onClick}
  >
    {children}
  </svg>
);

export const Terminal: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <polyline points='4 17 10 11 4 5' />
    <line x1='12' y1='19' x2='20' y2='19' />
  </IconBase>
);

export const Moon: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
  </IconBase>
);

export const Sun: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <circle cx='12' cy='12' r='5' />
    <line x1='12' y1='1' x2='12' y2='3' />
    <line x1='12' y1='21' x2='12' y2='23' />
    <line x1='4.22' y1='4.22' x2='5.64' y2='5.64' />
    <line x1='18.36' y1='18.36' x2='19.78' y2='19.78' />
    <line x1='1' y1='12' x2='3' y2='12' />
    <line x1='21' y1='12' x2='23' y2='12' />
    <line x1='4.22' y1='19.78' x2='5.64' y2='18.36' />
    <line x1='18.36' y1='5.64' x2='19.78' y2='4.22' />
  </IconBase>
);

export const PanelLeftClose: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <rect width='18' height='18' x='3' y='3' rx='2' ry='2' />
    <path d='M9 3v18' />
    <path d='m16 15-3-3 3-3' />
  </IconBase>
);

export const PanelLeftOpen: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <rect width='18' height='18' x='3' y='3' rx='2' ry='2' />
    <path d='M9 3v18' />
    <path d='m14 9 3 3-3 3' />
  </IconBase>
);

export const Layers: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <polygon points='12 2 2 7 12 12 22 7 12 2' />
    <polyline points='2 17 12 22 22 17' />
    <polyline points='2 12 12 17 22 12' />
  </IconBase>
);

export const Plus: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <line x1='12' y1='5' x2='12' y2='19' />
    <line x1='5' y1='12' x2='19' y2='12' />
  </IconBase>
);

export const Trash2: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <polyline points='3 6 5 6 21 6' />
    <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' />
    <line x1='10' y1='11' x2='10' y2='17' />
    <line x1='14' y1='11' x2='14' y2='17' />
  </IconBase>
);

export const Sparkles: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d='m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z' />
  </IconBase>
);

export const Wand2: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d='m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z' />
    <path d='m14 7 3 3' />
    <path d='M5 6v4' />
    <path d='M19 14v4' />
    <path d='M10 2v2' />
    <path d='M7 8H3' />
    <path d='M21 16h-4' />
    <path d='M11 3H9' />
  </IconBase>
);

export const Loader2: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d='M21 12a9 9 0 1 1-6.219-8.56' />
  </IconBase>
);

export const Book: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d='M4 19.5A2.5 2.5 0 0 1 6.5 17H20' />
    <path d='M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z' />
  </IconBase>
);

export const Save: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d='M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z' />
    <polyline points='17 21 17 13 7 13 7 21' />
    <polyline points='7 3 7 8 15 8' />
  </IconBase>
);

export const Check: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <polyline points='20 6 9 17 4 12' />
  </IconBase>
);

export const X: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <line x1='18' y1='6' x2='6' y2='18' />
    <line x1='6' y1='6' x2='18' y2='18' />
  </IconBase>
);

export const FileText: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d='M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z' />
    <polyline points='14 2 14 8 20 8' />
    <line x1='16' y1='13' x2='8' y2='13' />
    <line x1='16' y1='17' x2='8' y2='17' />
    <line x1='10' y1='9' x2='8' y2='9' />
  </IconBase>
);

export const LayoutGrid: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <rect width='7' height='7' x='3' y='3' rx='1' />
    <rect width='7' height='7' x='14' y='3' rx='1' />
    <rect width='7' height='7' x='14' y='14' rx='1' />
    <rect width='7' height='7' x='3' y='14' rx='1' />
  </IconBase>
);

export const Palette: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />
  </IconBase>
);

export const Type: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <polyline points='4 7 4 4 20 4 20 7' />
    <line x1='9' y1='20' x2='15' y2='20' />
    <line x1='12' y1='4' x2='12' y2='20' />
  </IconBase>
);

export const Layout: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <rect width='18' height='18' x='3' y='3' rx='2' ry='2' />
    <line x1='3' y1='9' x2='21' y2='9' />
    <line x1='9' y1='21' x2='9' y2='9' />
  </IconBase>
);

export const Box: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d='M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z' />
    <polyline points='3.27 6.96 12 12.01 20.73 6.96' />
    <line x1='12' y1='22.08' x2='12' y2='12' />
  </IconBase>
);

export const ImageIcon: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <rect width='18' height='18' x='3' y='3' rx='2' ry='2' />
    <circle cx='9' cy='9' r='2' />
    <path d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21' />
  </IconBase>
);

export const ChevronDown: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <polyline points='6 9 12 15 18 9' />
  </IconBase>
);

export const ChevronRight: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <polyline points='9 18 15 12 9 6' />
  </IconBase>
);

export const Folder: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d='M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 2H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z' />
  </IconBase>
);

export const FileType: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d='M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z' />
    <polyline points='14 2 14 8 20 8' />
  </IconBase>
);

export const Smile: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <circle cx='12' cy='12' r='10' />
    <path d='M8 14s1.5 2 4 2 4-2 4-2' />
    <line x1='9' y1='9' x2='9.01' y2='9' />
    <line x1='15' y1='9' x2='15.01' y2='9' />
  </IconBase>
);

export const Pipette: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d='m2 22 1-1h3l9-9' />
    <path d='M3 21v-3l9-9' />
    <path d='m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.9.9 1.2-1.2' />
    <path d='m14 8-2.8-2.8' />
  </IconBase>
);

export const Eraser: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d='m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21' />
    <path d='M22 21H7' />
    <path d='m5 11 9 9' />
  </IconBase>
);

export const Info: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <circle cx='12' cy='12' r='10' />
    <line x1='12' y1='16' x2='12' y2='12' />
    <line x1='12' y1='8' x2='12.01' y2='8' />
  </IconBase>
);

export const Play: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <polygon points='5 3 19 12 5 21 5 3' />
  </IconBase>
);

export const Copy: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <rect width='13' height='13' x='9' y='9' rx='2' ry='2' />
    <path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' />
  </IconBase>
);

export const FileCode: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d='M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z' />
    <polyline points='14 2 14 8 20 8' />
    <path d='m9 13-2 2 2 2' />
    <path d='m15 13 2 2-2 2' />
  </IconBase>
);

export const Code2: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <polyline points='16 18 22 12 16 6' />
    <polyline points='8 6 2 12 8 18' />
  </IconBase>
);

export const Braces: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d='M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1' />
    <path d='M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1' />
  </IconBase>
);
