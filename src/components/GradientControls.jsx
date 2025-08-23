import React from 'react';
import { gradientTypes, radialShapes } from '../utils/gradientUtils';

const GradientControls = ({
  gradientType,
  angle,
  radialShape,
  conicCenter,
  onTypeChange,
  onAngleChange,
  onRadialShapeChange,
  onConicCenterChange
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
          
          {/* 커스텀 각도 슬라이더 */}
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <div className="relative h-6 flex items-center">
                {/* 슬라이더 트랙 (배경) */}
                <div className="absolute w-full h-2 bg-gray-700 rounded-full"></div>
                
                {/* 진행 바 */}
                <div 
                  className="absolute h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-200"
                  style={{ width: `${(angle / 360) * 100}%` }}
                ></div>
                
                {/* 실제 슬라이더 */}
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={angle}
                  onChange={(e) => onAngleChange(parseInt(e.target.value))}
                  className="absolute w-full h-6 appearance-none bg-transparent cursor-pointer z-10"
                  title="각도 조절"
                />
              </div>
            </div>
            
            {/* 각도 직접 입력 */}
            <div className="flex items-center gap-1">
              <input
                type="number"
                min="0"
                max="360"
                value={angle}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value >= 0 && value <= 360) {
                    onAngleChange(value);
                  }
                }}
                className="w-16 h-8 bg-gray-700 border border-gray-600 rounded text-center text-sm font-mono focus:border-orange-500 focus:outline-none"
                title="각도 직접 입력 (0-360)"
              />
              <span className="text-sm text-gray-400">°</span>
            </div>
          </div>
        </div>
      )}

      {/* 방사형 모양 선택 */}
      {showRadialShape && (
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">방사형 모양</h3>
          <div className="flex gap-4">
            {radialShapes.map((shape) => (
              <button
                key={shape.id}
                onClick={() => onRadialShapeChange(shape.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  radialShape === shape.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {shape.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 원뿔형 중심점 조절 */}
      {showConicCenter && (
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">중심점 위치</h3>
          <div className="space-y-4">
            {/* X 위치 */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                X 위치: {conicCenter.x}%
              </label>
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <div className="relative h-6 flex items-center">
                    {/* 슬라이더 트랙 (배경) */}
                    <div className="absolute w-full h-2 bg-gray-700 rounded-full"></div>
                    
                    {/* 진행 바 */}
                    <div 
                      className="absolute h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-200"
                      style={{ width: `${conicCenter.x}%` }}
                    ></div>
                    
                    {/* 실제 슬라이더 */}
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={conicCenter.x}
                      onChange={(e) => 
                        onConicCenterChange({ 
                          ...conicCenter, 
                          x: parseInt(e.target.value) 
                        })
                      }
                      className="absolute w-full h-6 appearance-none bg-transparent cursor-pointer z-10"
                      title="X 위치 조절"
                    />
                  </div>
                </div>
                
                {/* X 직접 입력 */}
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={conicCenter.x}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (!isNaN(value) && value >= 0 && value <= 100) {
                        onConicCenterChange({ ...conicCenter, x: value });
                      }
                    }}
                    className="w-12 h-8 bg-gray-700 border border-gray-600 rounded text-center text-sm font-mono focus:border-cyan-500 focus:outline-none"
                    title="X 위치 직접 입력"
                  />
                  <span className="text-sm text-gray-400">%</span>
                </div>
              </div>
            </div>

            {/* Y 위치 */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                Y 위치: {conicCenter.y}%
              </label>
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <div className="relative h-6 flex items-center">
                    {/* 슬라이더 트랙 (배경) */}
                    <div className="absolute w-full h-2 bg-gray-700 rounded-full"></div>
                    
                    {/* 진행 바 */}
                    <div 
                      className="absolute h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-200"
                      style={{ width: `${conicCenter.y}%` }}
                    ></div>
                    
                    {/* 실제 슬라이더 */}
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={conicCenter.y}
                      onChange={(e) => 
                        onConicCenterChange({ 
                          ...conicCenter, 
                          y: parseInt(e.target.value) 
                        })
                      }
                      className="absolute w-full h-6 appearance-none bg-transparent cursor-pointer z-10"
                      title="Y 위치 조절"
                    />
                  </div>
                </div>
                
                {/* Y 직접 입력 */}
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={conicCenter.y}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (!isNaN(value) && value >= 0 && value <= 100) {
                        onConicCenterChange({ ...conicCenter, y: value });
                      }
                    }}
                    className="w-12 h-8 bg-gray-700 border border-gray-600 rounded text-center text-sm font-mono focus:border-pink-500 focus:outline-none"
                    title="Y 위치 직접 입력"
                  />
                  <span className="text-sm text-gray-400">%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GradientControls;