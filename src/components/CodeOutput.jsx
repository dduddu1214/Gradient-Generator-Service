import React, { useState } from 'react';
import { Copy, Save, Share2, Download, Image, FileCode } from 'lucide-react';
import { CODE_FORMATS, getFormattedCode } from '../utils/codeFormatUtils';
import { exportAsPNG, exportAsSVG } from '../utils/exportUtils';

const CodeOutput = ({ gradientCSS, gradientConfig, onCopy, onSave, getShareUrl, message }) => {
  const [format, setFormat] = useState('css');
  const [showExport, setShowExport] = useState(false);

  const code = getFormattedCode(format, gradientCSS, gradientConfig);

  const handleCopy = () => onCopy(code);

  const handleShare = async () => {
    const url = getShareUrl();
    await onCopy(url);
  };

  return (
    <div className="bg-gray-800 rounded-xl p-4 space-y-3">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">코드</h3>
        <div className="flex gap-1.5">
          {onSave && (
            <button onClick={onSave} className="flex items-center gap-1 bg-green-600 hover:bg-green-700 px-2 py-1.5 rounded text-xs transition-colors" title="히스토리에 저장">
              <Save className="w-3 h-3" /> 저장
            </button>
          )}
          <button onClick={handleCopy} className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 px-2 py-1.5 rounded text-xs transition-colors" title="코드 복사">
            <Copy className="w-3 h-3" /> 복사
          </button>
          <button onClick={handleShare} className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700 px-2 py-1.5 rounded text-xs transition-colors" title="URL 복사">
            <Share2 className="w-3 h-3" /> 공유
          </button>
        </div>
      </div>

      {/* 포맷 탭 */}
      <div className="flex gap-1 bg-gray-700 rounded-lg p-1 overflow-x-auto scrollbar-hide">
        {CODE_FORMATS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFormat(f.id)}
            className={`px-2.5 py-1 rounded-md text-xs whitespace-nowrap transition-colors ${
              format === f.id ? 'bg-purple-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-600'
            }`}
          >
            {f.name}
          </button>
        ))}
      </div>

      {/* 코드 */}
      <div className="bg-gray-900 rounded p-3 font-mono text-xs overflow-x-auto max-h-48 overflow-y-auto">
        <pre className="text-green-400 whitespace-pre-wrap break-all">{code}</pre>
      </div>

      {message && <p className="text-green-400 text-xs">{message}</p>}

      {/* 내보내기 */}
      <div>
        <button
          onClick={() => setShowExport(!showExport)}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-200 transition-colors"
        >
          <Download className="w-3 h-3" />
          이미지로 내보내기 {showExport ? '▲' : '▼'}
        </button>

        {showExport && (
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => exportAsPNG(gradientCSS)}
              className="flex items-center gap-1 flex-1 justify-center bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg text-xs transition-colors"
            >
              <Image className="w-3 h-3" /> PNG
            </button>
            <button
              onClick={() => exportAsSVG(gradientCSS)}
              className="flex items-center gap-1 flex-1 justify-center bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg text-xs transition-colors"
            >
              <FileCode className="w-3 h-3" /> SVG
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeOutput;
