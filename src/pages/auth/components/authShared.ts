import type React from 'react';

export const inputBase =
  'w-full px-4 py-3 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none transition-all text-right';

export const inputStyle = { backgroundColor: '#f8f9fb', border: '1.5px solid #e2e6ef' };

export const focusBorder = (e: React.FocusEvent<HTMLInputElement>) =>
  (e.currentTarget.style.border = '1.5px solid var(--scondary)');

export const blurBorder = (e: React.FocusEvent<HTMLInputElement>) =>
  (e.currentTarget.style.border = '1.5px solid #e2e6ef');
