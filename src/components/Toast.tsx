import { useState, useEffect, useCallback } from 'react';
import { useToastStore } from '../globalState/toast';

interface ToastProps {
  onClose: () => void;
}

const TYPE_COLORS = {
  success: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  error: 'bg-red-500/20 text-red-400 border-red-500/30',
  warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  info: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
};

const TYPE_ICONS = {
  success: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
    </svg>
  ),
  info: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
  )
};

export default function Toast({ onClose }: ToastProps) {
  const message = useToastStore(s => s.message)
  const type = useToastStore(s => s.type)
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 400);
  }, [onClose]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 6000);

    return () => clearTimeout(timer);
  }, [handleClose]);


  return (
    <div
      className={`
        fixed top-4 right-4 z-50
        flex items-center gap-3 px-4 py-3 rounded-xl
        glass-panel bg-slate-800/90 backdrop-blur-sm
        border shadow-lg shadow-black/20
        min-w-75 max-w-100
        ${TYPE_COLORS[type]}
        ${isExiting
          ? 'animate-[slideOutRight_0.4s_ease-in_forwards]'
          : 'animate-[slideInRight_0.4s_ease-out]'
        }
      `}
    >
      <div className="shrink-0">
        {TYPE_ICONS[type]}
      </div>

      <p className="flex-1 text-[13px] font-medium">
        {message}
      </p>

      <button
        onClick={handleClose}
        className="shrink-0 p-1 hover:bg-white/10 rounded transition-colors"
      >
        <svg className="w-4 h-4 opacity-60 hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  );
}