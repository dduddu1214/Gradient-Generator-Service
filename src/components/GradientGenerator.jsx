import React from 'react';
import { Undo2, Redo2 } from 'lucide-react';
import useGradient from '../hooks/useGradient';
import useClipboard from '../hooks/useClipboard';
import GradientPreview from './GradientPreview';
import CodeOutput from './CodeOutput';
import GradientControls from './GradientControls';
import ColorStopsEditor from './ColorStopsEditor';
import PresetGallery from './PresetGallery';
import ImageColorExtractor from './ImageColorExtractor';
import AnimationGenerator from './AnimationGenerator';
import FavoritesManager from './FavoritesManager';
import Footer from './Footer';

const GradientGenerator = () => {
  const {
    gradientType, angle, radialShape, conicCenter, colorStops, history,
    setGradientType, setAngle, setRadialShape, setConicCenter,
    addColorStop, removeColorStop, updateColorStop,
    reorderColorStops, applyColorStopsFromImage,
    generateRandomGradient, applyPreset, applyFromHistory, applyFromFavorite,
    addToHistory, generateCSS, saveSnapshot,
    undo, redo, canUndo, canRedo,
    getShareUrl, gradientConfig,
  } = useGradient();

  const { message, copyToClipboard } = useClipboard();
  const currentCSS = generateCSS();

  const currentGradientData = {
    type: gradientType, angle, radialShape,
    conicCenter: { ...conicCenter },
    colorStops: [...colorStops],
    css: currentCSS,
  };

  return (
    <div
      className="min-h-screen bg-gray-900 text-white"
      style={{ fontFamily: "'Noto Sans KR', 'Malgun Gothic', '맑은 고딕', sans-serif" }}
    >
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            그라디언트 생성기
          </h1>
          <p className="text-gray-400">아름다운 CSS 그라디언트를 쉽게 만들어보세요</p>

          {/* Undo / Redo */}
          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={undo}
              disabled={!canUndo}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors bg-gray-800 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
              title="실행 취소 (Ctrl+Z)"
            >
              <Undo2 className="w-4 h-4" /> 실행 취소
            </button>
            <button
              onClick={redo}
              disabled={!canRedo}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors bg-gray-800 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
              title="다시 실행 (Ctrl+Shift+Z)"
            >
              <Redo2 className="w-4 h-4" /> 다시 실행
            </button>
          </div>
        </header>

        <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-6">
          {/* 미리보기 */}
          <div className="xl:col-span-2">
            <GradientPreview gradientCSS={currentCSS} />
          </div>

          {/* CSS 코드 출력 */}
          <div>
            <CodeOutput
              gradientCSS={currentCSS}
              gradientConfig={gradientConfig}
              onCopy={copyToClipboard}
              onSave={addToHistory}
              getShareUrl={getShareUrl}
              message={message}
            />
          </div>

          {/* 컨트롤 영역 */}
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
                  onCommit={saveSnapshot}
                />

                <ColorStopsEditor
                  colorStops={colorStops}
                  onAdd={addColorStop}
                  onRemove={removeColorStop}
                  onUpdate={updateColorStop}
                  onReorder={reorderColorStops}
                  onCommit={saveSnapshot}
                />
              </div>

              <div className="space-y-6">
                <PresetGallery
                  onPresetApply={applyPreset}
                  onRandomGenerate={generateRandomGradient}
                  history={history}
                  onHistoryApply={applyFromHistory}
                />

                <FavoritesManager
                  currentGradient={currentGradientData}
                  onApply={applyFromFavorite}
                />
              </div>
            </div>
          </div>

          {/* 이미지 색상 추출 & 애니메이션 */}
          <div className="space-y-6">
            <ImageColorExtractor onExtract={applyColorStopsFromImage} />
            <AnimationGenerator
              gradientCSS={currentCSS}
              gradientConfig={gradientConfig}
            />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default GradientGenerator;
