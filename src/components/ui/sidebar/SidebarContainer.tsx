import React, { forwardRef } from 'react';

interface SidebarContainerProps {
  width: number;
  isOpen: boolean;
  isResizing: boolean;
  onResizeStart: (e: React.MouseEvent) => void;
  children: React.ReactNode;
}

const SidebarContainer = forwardRef<HTMLDivElement, SidebarContainerProps>(
  ({ width, isOpen, isResizing, onResizeStart, children }, ref) => {
    return (
      <aside
        ref={ref}
        style={{ width: isOpen ? width : 0 }}
        className={`relative z-20 flex shrink-0 flex-col overflow-hidden border-r border-gray-200 bg-white shadow-2xl ease-in-out dark:border-white/5 dark:bg-[#0a0a0a] ${isOpen ? '' : 'border-none'} ${isResizing ? 'select-none' : 'transition-[width] duration-300'} `}
      >
        {/* Drag Handle（可拖动的手柄） */}
        {isOpen && (
          <div
            onMouseDown={onResizeStart}
            className={`absolute top-0 right-0 bottom-0 z-50 w-1 cursor-col-resize transition-colors hover:bg-indigo-500 dark:hover:bg-indigo-400 ${isResizing ? 'bg-indigo-500 dark:bg-indigo-400' : 'bg-transparent'} `}
          />
        )}

        <div className='flex h-full w-full flex-col'>{children}</div>
      </aside>
    );
  },
);

SidebarContainer.displayName = 'SidebarContainer';

export default SidebarContainer;
