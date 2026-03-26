import React, { useState, useRef } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import ColorPickerPanel from './ColorPickerPanel';

const ColorStopsEditor = ({ colorStops, onAdd, onRemove, onUpdate, onReorder, onCommit }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleDragStart = (index) => {
    dragItem.current = index;
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    dragOverItem.current = index;
  };

  const handleDrop = () => {
    if (dragItem.current !== null && dragOverItem.current !== null && dragItem.current !== dragOverItem.current) {
      onReorder(dragItem.current, dragOverItem.current);
    }
    dragItem.current = null;
    dragOverItem.current = null;
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">색상</h3>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" /> 추가
        </button>
      </div>
      <div className="space-y-3">
        {colorStops.map((stop, index) => (
          <div key={stop.id} onDragOver={(e) => handleDragOver(e, index)} onDrop={handleDrop}>
            <ColorStopItem
              index={index}
              stop={stop}
              canDelete={colorStops.length > 2}
              isExpanded={expandedIndex === index}
              onToggleExpand={() => setExpandedIndex(expandedIndex === index ? null : index)}
              onUpdate={onUpdate}
              onRemove={onRemove}
              onDragStart={handleDragStart}
              onCommit={onCommit}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const ColorStopItem = ({ index, stop, canDelete, isExpanded, onToggleExpand, onUpdate, onRemove, onDragStart, onCommit }) => {
  return (
    <div className="space-y-2">
      <div
        className="flex items-center gap-3"
        draggable
        onDragStart={() => onDragStart(index)}
      >
        {/* 드래그 핸들 */}
        <div className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-gray-300">
          <GripVertical className="w-4 h-4" />
        </div>

        {/* 색상 피커 */}
        <div className="relative">
          <input
            type="color"
            value={stop.color}
            onFocus={onCommit}
            onChange={(e) => onUpdate(index, 'color', e.target.value)}
            className="w-10 h-9 rounded-lg cursor-pointer border-2 border-gray-600"
            title="색상 선택"
          />
          <button
            onClick={onToggleExpand}
            className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-600 hover:bg-gray-500 rounded-full text-[8px] flex items-center justify-center"
            title="상세 색상 편집"
          >
            ▼
          </button>
        </div>

        {/* 슬라이더 */}
        <div className="flex-1 relative">
          <div className="relative h-6 flex items-center">
            <div className="absolute w-full h-2 bg-gray-700 rounded-full"></div>
            <div
              className="absolute h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              style={{ width: `${stop.position}%` }}
            ></div>
            <input
              type="range" min="0" max="100" value={stop.position}
              onMouseDown={onCommit}
              onTouchStart={onCommit}
              onChange={(e) => onUpdate(index, 'position', parseInt(e.target.value))}
              className="absolute w-full h-6 appearance-none bg-transparent cursor-pointer z-10"
              title="위치 조절"
            />
          </div>
        </div>

        {/* 퍼센트 입력 */}
        <div className="flex items-center gap-1">
          <input
            type="number" min="0" max="100" value={stop.position}
            onFocus={onCommit}
            onChange={(e) => {
              const v = parseInt(e.target.value);
              if (!isNaN(v) && v >= 0 && v <= 100) onUpdate(index, 'position', v);
            }}
            className="w-12 h-8 bg-gray-700 border border-gray-600 rounded text-center text-sm font-mono focus:border-blue-500 focus:outline-none"
          />
          <span className="text-sm text-gray-400">%</span>
        </div>

        {canDelete && (
          <button
            onClick={() => onRemove(index)}
            className="text-red-400 hover:text-red-300 p-1 transition-colors"
            title="색상 삭제"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 확장된 색상 입력 패널 */}
      {isExpanded && (
        <div className="ml-7">
          <ColorPickerPanel
            color={stop.color}
            onChange={(color) => onUpdate(index, 'color', color)}
          />
        </div>
      )}
    </div>
  );
};

export default ColorStopsEditor;
