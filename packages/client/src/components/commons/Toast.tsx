import React, { useEffect } from 'react';

export interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-[9999] transition-all duration-300">
      <div className="bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg text-[14px] flex items-center gap-3">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
