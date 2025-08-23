import React from 'react';
import useGradient from '../hooks/useGradient';
import useClipboard from '../hooks/useClipboard';
import GradientPreview from './GradientPreview';
import CodeOutput from './CodeOutput';
import GradientControls from './GradientControls';
import ColorStopsEditor from './ColorStopsEditor';
import PresetGallery from './PresetGallery';
import Footer from './Footer';

const GradientGenerator = () => {
  const {
    gradientType,
    angle,
    radialShape,
    conicCenter,
    colorStops,
    history,
    setGradientType,
    setAngle,
    setRadialShape,
    setConicCenter,
    addColorStop,
    removeColorStop,
    updateColorStop,
    generateRandomGradient,
    applyPreset,
    applyFromHistory,
    addToHistory,
    generateCSS
  } = useGradient();

  const { message, copyToClipboard } = useClipboard();

  const currentCSS = generateCSS();

  return (
    <div 
      className="min-h-screen bg-gray-900 text-white" 
      style={{ 
        fontFamily: "'Chiron Sung HK', 'Malgun Gothic', '맑은 고딕', sans-serif" 
      }}
    >
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            그라디언트 생성기
          </h1>
          <p className="text-gray-400">아름다운 CSS 그라디언트를 쉽게 만들어보세요</p>
        </header>

        <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-6">
          {/* 미리보기 영역 - 넓게 */}
          <div className="xl:col-span-2">
            <GradientPreview gradientCSS={currentCSS} />
          </div>

          {/* CSS 코드 출력 - 컴팩트하게 */}
          <div>
            <CodeOutput 
              gradientCSS={currentCSS}
              onCopy={copyToClipboard}
              onSave={addToHistory}
              message={message}
            />
          </div>

          {/* 컨트롤 영역 - 2열 또는 3열로 */}
          <div className="xl:col-span-2 lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <GradientControls
                  gradientType={gradientType}
                  angle={angle}
                  radialShape={radialShape}
                  conicCenter={conicCenter}
                  onTypeChange={setGradientType}
                  onAngleChange={setAngle}
                  onRadialShapeChange={setRadialShape}
                  onConicCenterChange={setConicCenter}
                />

                <ColorStopsEditor
                  colorStops={colorStops}
                  onAdd={addColorStop}
                  onRemove={removeColorStop}
                  onUpdate={updateColorStop}
                />
              </div>

              <div>
                <PresetGallery
                  onPresetApply={applyPreset}
                  onRandomGenerate={generateRandomGradient}
                  history={history}
                  onHistoryApply={applyFromHistory}
                />
              </div>
            </div>
          </div>

          {/* 빈 공간 또는 추가 정보 */}
          <div className="xl:block hidden">
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">💡 팁</h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>슬라이더를 드래그하거나 숫자를 직접 입력하세요</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span>저장 버튼으로 마음에 드는 그라디언트를 보관하세요</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>다양한 미리보기 모드로 실제 사용 모습을 확인하세요</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-orange-400">•</span>
                  <span>원뿔형 그라디언트는 로고나 아이콘에 효과적입니다</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default GradientGenerator;