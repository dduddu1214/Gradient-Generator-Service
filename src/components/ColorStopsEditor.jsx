import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const ColorStopsEditor = ({
  colorStops,
  onAdd,
  onRemove,
  onUpdate
}) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">색상</h3>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          추가
        </button>
      </div>
      <div className="space-y-4">
        {colorStops.map((stop, index) => (
          <ColorStopItem
            key={index}
            index={index}
            stop={stop}
            canDelete={colorStops.length > 2}
            onUpdate={onUpdate}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
};

const ColorStopItem = ({ index, stop, canDelete, onUpdate, onRemove }) => {
  const handlePositionInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      onUpdate(index, 'position', value);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <input
        type="color"
        value={stop.color}
        onChange={(e) => onUpdate(index, 'color', e.target.value)}
        className="w-12 h-10 rounded-lg cursor-pointer border-2 border-gray-600"
        title="색상 선택"
      />
      
      {/* 커스텀 슬라이더 영역 */}
      <div className="flex-1 relative">
        <div className="relative h-6 flex items-center">
          {/* 슬라이더 트랙 (배경) */}
          <div className="absolute w-full h-2 bg-gray-700 rounded-full"></div>
          
          {/* 진행 바 */}
          <div 
            className="absolute h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-200"
            style={{ width: `${stop.position}%` }}
          ></div>
          
          {/* 실제 슬라이더 */}
          <input
            type="range"
            min="0"
            max="100"
            value={stop.position}
            onChange={(e) => onUpdate(index, 'position', parseInt(e.target.value))}
            className="absolute w-full h-6 appearance-none bg-transparent cursor-pointer z-10"
            title="위치 조절"
            style={{
              background: 'transparent',
            }}
          />
          
          {/* 슬라이더 핸들 커스텀 스타일 */}
          <style jsx>{`
            input[type="range"]::-webkit-slider-thumb {
              appearance: none;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: white;
              border: 3px solid #6366f1;
              cursor: pointer;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
              transition: all 0.2s ease;
            }
            input[type="range"]::-webkit-slider-thumb:hover {
              transform: scale(1.1);
              border-color: #7c3aed;
            }
            input[type="range"]::-moz-range-thumb {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: white;
              border: 3px solid #6366f1;
              cursor: pointer;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            }
          `}</style>
        </div>
      </div>
      
      {/* 퍼센트 입력 필드 */}
      <div className="flex items-center gap-1">
        <input
          type="number"
          min="0"
          max="100"
          value={stop.position}
          onChange={handlePositionInputChange}
          className="w-12 h-8 bg-gray-700 border border-gray-600 rounded text-center text-sm font-mono focus:border-blue-500 focus:outline-none"
          title="퍼센트 직접 입력"
        />
        <span className="text-sm text-gray-400">%</span>
      </div>
      
      {canDelete && (
        <button
          onClick={() => onRemove(index)}
          className="text-red-400 hover:text-red-300 p-1 transition-colors ml-2"
          title="색상 삭제"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default ColorStopsEditor;