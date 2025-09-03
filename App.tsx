
import React, { useState, useCallback } from 'react';
import { LanguagePanel } from './components/LanguagePanel';
import { SwapIcon, TranslateIcon, LoadingSpinner } from './components/icons';
import { translateText } from './services/geminiService';
import type { Language } from './types';

function App() {
  const [sourceLang, setSourceLang] = useState<Language>('id');
  const [targetLang, setTargetLang] = useState<Language>('en');
  const [sourceText, setSourceText] = useState<string>('');
  const [translatedText, setTranslatedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSwapLanguages = useCallback(() => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  }, [sourceLang, targetLang, sourceText, translatedText]);

  const handleTranslate = useCallback(async () => {
    if (!sourceText.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setTranslatedText('');

    try {
      const result = await translateText(sourceText, sourceLang, targetLang);
      setTranslatedText(result);
    } catch (e) {
        if (e instanceof Error) {
            setError(e.message);
        } else {
            setError('An unknown error occurred.');
        }
    } finally {
      setIsLoading(false);
    }
  }, [sourceText, sourceLang, targetLang, isLoading]);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
      <header className="w-full max-w-6xl mb-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-100">
          Indonesian <span className="text-sky-400">⇔</span> English Translator
        </h1>
        <p className="text-slate-400 mt-2">Powered by Gemini AI</p>
      </header>

      <main className="w-full max-w-6xl flex-grow flex flex-col">
        <div className="flex-grow grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-4 items-center">
          {/* Source Language Panel */}
          <div className="h-full min-h-[300px]">
            <LanguagePanel
              language={sourceLang}
              text={sourceText}
              onTextChange={setSourceText}
              isReadOnly={false}
              isLoading={false}
              placeholder="Enter text to translate..."
            />
          </div>

          {/* Controls */}
          <div className="flex md:flex-col items-center justify-center gap-4 my-4 md:my-0">
            <button
              onClick={handleSwapLanguages}
              className="p-3 rounded-full bg-slate-700 hover:bg-sky-600 text-slate-300 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              aria-label="Swap languages"
              disabled={isLoading}
            >
              <SwapIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Target Language Panel */}
          <div className="h-full min-h-[300px]">
            <LanguagePanel
              language={targetLang}
              text={translatedText}
              isReadOnly={true}
              isLoading={isLoading}
              placeholder="Translation will appear here..."
            />
          </div>
        </div>
        
        {/* Translate Button and Error Message */}
        <div className="mt-6 flex flex-col items-center">
            <button
              onClick={handleTranslate}
              disabled={isLoading || !sourceText.trim()}
              className="w-full max-w-sm flex items-center justify-center gap-3 px-8 py-4 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner className="w-5 h-5"/>
                  <span>Translating...</span>
                </>
              ) : (
                <>
                  <TranslateIcon className="w-5 h-5"/>
                  <span>Translate</span>
                </>
              )}
            </button>
            {error && (
                <div className="mt-4 p-3 bg-red-900/50 text-red-300 border border-red-700 rounded-lg text-center text-sm">
                    <strong>Error:</strong> {error}
                </div>
            )}
        </div>
      </main>

      <footer className="w-full max-w-6xl mt-8 text-center text-xs text-slate-500">
        <p>&copy; 2024 AI Translator. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
