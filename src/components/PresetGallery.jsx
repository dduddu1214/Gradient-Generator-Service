import React from 'react';
import { Shuffle, RotateCcw } from 'lucide-react';
import { gradientPresets } from '../data/presets';
import { generateGradientCSS } from '../utils/gradientUtils';

const PresetGallery = ({
  onPresetApply,
  onRandomGenerate,
  history,
  onHistoryApply
}) => {
  return (
    <div className="space-y-6">
      {/* 프리셋과 랜덤 생성 */}
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">프리셋</h3>
          <button
            onClick={onRandomGenerate}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 px-3 py-2 rounded-lg transition-colors"
          >
            <Shuffle className="w-4 h-4" />
            랜덤
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {gradientPresets.slice(0, 12).map((preset) => (
            <PresetItem
              key={preset.id}
              preset={preset}
              onApply={onPresetApply}
            />
          ))}
        </div>
      </div>

      {/* 히스토리 */}
      {history.length > 0 && (
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <RotateCcw className="w-5 h-5" />
            최근 그라디언트
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {history.slice(0, 6).map((item) => (
              <HistoryItem
                key={item.id}
                item={item}
                onApply={onHistoryApply}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const PresetItem = ({ preset, onApply }) => {
  const previewCSS = generateGradientCSS({
    type: preset.type || 'linear',
    angle: preset.angle || 90,
    radialShape: 'circle',
    conicCenter: { x: 50, y: 50 },
    colorStops: preset.colors
  });

  return (
    <button
      onClick={() => onApply(preset)}
      className="p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-sm relative overflow-hidden"
      style={{ background: previewCSS }}
      title={`${preset.name} 프리셋 적용`}
    >
      <span className="text-white drop-shadow-lg font-medium relative z-10">
        {preset.name}
      </span>
      <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-10 transition-all" />
    </button>
  );
};

const HistoryItem = ({ item, onApply }) => {
  return (
    <button
      onClick={() => onApply(item)}
      className="h-12 rounded-lg border-2 border-gray-700 hover:border-gray-500 transition-colors relative overflow-hidden"
      style={{ background: item.css }}
      title="클릭해서 적용"
    >
      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all" />
    </button>
  );
};

export default PresetGallery;