
import React from 'react';
import type { Language } from '../types';

interface LanguagePanelProps {
  language: Language;
  text: string;
  onTextChange?: (newText: string) => void;
  isReadOnly: boolean;
  isLoading: boolean;
  placeholder: string;
}

const languageNames: Record<Language, string> = {
  id: 'Indonesian',
  en: 'English',
};

export const LanguagePanel: React.FC<LanguagePanelProps> = ({
  language,
  text,
  onTextChange,
  isReadOnly,
  isLoading,
  placeholder,
}) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onTextChange) {
      onTextChange(e.target.value);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-800 rounded-xl shadow-lg">
      <div className="px-4 py-2 border-b border-slate-700">
        <h2 className="text-sm font-semibold text-sky-400">{languageNames[language]}</h2>
      </div>
      <div className="relative flex-grow">
        <textarea
          value={text}
          onChange={handleTextChange}
          readOnly={isReadOnly}
          placeholder={placeholder}
          className="w-full h-full p-4 bg-transparent text-slate-200 resize-none focus:outline-none placeholder-slate-500 disabled:opacity-50"
          disabled={isReadOnly}
        />
        {isLoading && (
            <div className="absolute inset-0 bg-slate-800 bg-opacity-75 flex items-center justify-center animate-pulse">
                <span className="text-slate-400">Translating...</span>
            </div>
        )}
      </div>
       <div className="px-4 py-1 border-t border-slate-700 text-right">
        <span className="text-xs text-slate-500">{text.length} characters</span>
      </div>
    </div>
  );
};
