import React from 'react';
import { gradientTypes, radialShapes } from '../utils/gradientUtils';
import AngleDial from './AngleDial';

const GradientControls = ({
  gradientType, angle, radialShape, conicCenter,
  onTypeChange, onAngleChange, onRadialShapeChange, onConicCenterChange,
  onCommit,
}) => {
  const showAngleControl = ['linear', 'repeating-linear', 'conic'].includes(gradientType);
  const showRadialShape = ['radial', 'repeating-radial'].includes(gradientType);
  const showConicCenter = gradientType === 'conic';

  return (
    <div className="space-y-6">
      {/* 그라디언트 타입 */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">그라디언트 타입</h3>
        <div className="grid grid-cols-2 gap-3">
          {gradientTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => onTypeChange(type.id)}
              className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                gradientType === type.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
              title={type.description}
            >
              {type.name}
            </button>
          ))}
        </div>
      </div>

      {/* 각도 조절 */}
      {showAngleControl && (
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">
            {gradientType === 'conic' ? '시작 각도' : '각도'}: {angle}°
          </h3>

          <div className="flex items-center gap-4">
            {/* 다이얼 */}
            <AngleDial angle={angle} onChange={onAngleChange} onCommit={onCommit} />

            {/* 슬라이더 + 입력 */}
            <div className="flex-1 space-y-2">
              <div className="relative">
                <div className="relative h-6 flex items-center">
                  <div className="absolute w-full h-2 bg-gray-700 rounded-full"></div>
                  <div
                    className="absolute h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                    style={{ width: `${(angle / 360) * 100}%` }}
                  ></div>
                  <input
                    type="range" min="0" max="360" value={angle}
                    onMouseDown={onCommit}
                    onTouchStart={onCommit}
                    onChange={(e) => onAngleChange(parseInt(e.target.value))}
                    className="absolute w-full h-6 appearance-none bg-transparent cursor-pointer z-10"
                    title="각도 조절"
                  />
                </div>
              </div>
              <div className="flex items-center gap-1 justify-end">
                <input
                  type="number" min="0" max="360" value={angle}
                  onFocus={onCommit}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value) && value >= 0 && value <= 360) onAngleChange(value);
                  }}
                  className="w-16 h-8 bg-gray-700 border border-gray-600 rounded text-center text-sm font-mono focus:border-orange-500 focus:outline-none"
                />
                <span className="text-sm text-gray-400">°</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 방사형 모양 */}
      {showRadialShape && (
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">방사형 모양</h3>
          <div className="flex gap-4">
            {radialShapes.map((shape) => (
              <button
                key={shape.id}
                onClick={() => onRadialShapeChange(shape.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  radialShape === shape.id ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {shape.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 원뿔형 중심점 */}
      {showConicCenter && (
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">중심점 위치</h3>
          <div className="space-y-4">
            {[
              { key: 'x', label: 'X 위치', color: 'cyan' },
              { key: 'y', label: 'Y 위치', color: 'pink' },
            ].map(({ key, label, color }) => (
              <div key={key}>
                <label className="text-sm text-gray-400 mb-2 block">
                  {label}: {conicCenter[key]}%
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex-1 relative">
                    <div className="relative h-6 flex items-center">
                      <div className="absolute w-full h-2 bg-gray-700 rounded-full"></div>
                      <div
                        className={`absolute h-2 bg-gradient-to-r ${color === 'cyan' ? 'from-cyan-500 to-blue-500' : 'from-pink-500 to-purple-500'} rounded-full`}
                        style={{ width: `${conicCenter[key]}%` }}
                      ></div>
                      <input
                        type="range" min="0" max="100" value={conicCenter[key]}
                        onMouseDown={onCommit}
                        onTouchStart={onCommit}
                        onChange={(e) => onConicCenterChange({ ...conicCenter, [key]: parseInt(e.target.value) })}
                        className="absolute w-full h-6 appearance-none bg-transparent cursor-pointer z-10"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      type="number" min="0" max="100" value={conicCenter[key]}
                      onFocus={onCommit}
                      onChange={(e) => {
                        const v = parseInt(e.target.value);
                        if (!isNaN(v) && v >= 0 && v <= 100) onConicCenterChange({ ...conicCenter, [key]: v });
                      }}
                      className={`w-12 h-8 bg-gray-700 border border-gray-600 rounded text-center text-sm font-mono focus:border-${color}-500 focus:outline-none`}
                    />
                    <span className="text-sm text-gray-400">%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GradientControls;
