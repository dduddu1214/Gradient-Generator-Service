import React from 'react';
import { Copy, Save } from 'lucide-react';

const CodeOutput = ({ gradientCSS, onCopy, onSave, message }) => {
  const handleCopy = () => {
    const cssCode = `background: ${gradientCSS};`;
    onCopy(cssCode);
  };

  return (
    <div className="bg-gray-800 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold">CSS 코드</h3>
        <div className="flex gap-2">
          {onSave && (
            <button
              onClick={onSave}
              className="flex items-center gap-1 bg-green-600 hover:bg-green-700 px-2 py-1.5 rounded text-xs transition-colors"
              title="현재 그라디언트를 히스토리에 저장"
            >
              <Save className="w-3 h-3" />
              저장
            </button>
          )}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 px-2 py-1.5 rounded text-xs transition-colors"
          >
            <Copy className="w-3 h-3" />
            복사
          </button>
        </div>
      </div>
      <div className="bg-gray-900 rounded p-3 font-mono text-xs overflow-x-auto">
        <code className="text-green-400 break-all">
          background: {gradientCSS};
        </code>
      </div>
      {message && (
        <p className="text-green-400 text-xs mt-2">{message}</p>
      )}
    </div>
  );
};

export default CodeOutput;