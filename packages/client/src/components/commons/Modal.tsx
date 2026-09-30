import React from 'react';
import { createPortal } from 'react-dom';

export interface ModalProps {
  isOpen: boolean;
  title?: string;
  content: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  content,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-80 max-w-[90%] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {title && (
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          </div>
        )}
        <div className="px-6 py-6">
          <div className="text-gray-600 text-sm whitespace-pre-wrap">{content}</div>
        </div>
        <div className="px-6 py-4 bg-gray-50 flex justify-end gap-2 border-t border-gray-100">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              {cancelText}
            </button>
          )}
          {onConfirm && (
            <button
              type="button"
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded hover:bg-gray-800 transition-colors"
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
