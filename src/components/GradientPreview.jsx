import React, { useState } from 'react';
import { Palette, Monitor, Smartphone, CreditCard } from 'lucide-react';

const previewModes = [
  { key: 'basic', name: '기본', icon: Monitor },
  { key: 'elements', name: '요소', icon: CreditCard },
  { key: 'mobile', name: '모바일', icon: Smartphone },
];

const bgOptions = [
  { key: 'dark', label: '어두운', style: { background: '#111827' } },
  { key: 'light', label: '밝은', style: { background: '#f3f4f6' } },
  { key: 'checker', label: '체크', style: {
    backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
  }},
  { key: 'black', label: '검정', style: { background: '#000000' } },
  { key: 'white', label: '흰색', style: { background: '#ffffff' } },
];

const GradientPreview = ({ gradientCSS }) => {
  const [previewMode, setPreviewMode] = useState('basic');
  const [bgKey, setBgKey] = useState('dark');

  const bgStyle = bgOptions.find(o => o.key === bgKey)?.style || {};

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Palette className="w-5 h-5" />
          미리보기
        </h2>

        <div className="flex items-center gap-3">
          {/* 배경 선택 */}
          <div className="flex gap-1">
            {bgOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setBgKey(opt.key)}
                className={`w-6 h-6 rounded border-2 transition-colors ${
                  bgKey === opt.key ? 'border-purple-500' : 'border-gray-600 hover:border-gray-400'
                }`}
                style={opt.style}
                title={opt.label}
              />
            ))}
          </div>

          {/* 프리뷰 모드 */}
          <div className="flex bg-gray-700 rounded-lg p-1">
            {previewModes.map((mode) => {
              const IconComponent = mode.icon;
              return (
                <button
                  key={mode.key}
                  onClick={() => setPreviewMode(mode.key)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
                    previewMode === mode.key
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-600'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {mode.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="min-h-[200px] rounded-lg overflow-hidden" style={bgStyle}>
        {previewMode === 'basic' && <BasicPreview gradientCSS={gradientCSS} />}
        {previewMode === 'elements' && <ElementsPreview gradientCSS={gradientCSS} />}
        {previewMode === 'mobile' && <MobilePreview gradientCSS={gradientCSS} />}
      </div>
    </div>
  );
};

const BasicPreview = ({ gradientCSS }) => (
  <div
    className="w-full h-48 transition-all duration-300"
    style={{ background: gradientCSS }}
  />
);

const ElementsPreview = ({ gradientCSS }) => (
  <div className="space-y-4 p-4">
    <div className="flex gap-3 flex-wrap">
      <button className="px-4 py-2 rounded-lg text-white font-semibold shadow-lg" style={{ background: gradientCSS }}>
        버튼
      </button>
      <button className="px-4 py-2 rounded-full text-white font-semibold shadow-lg" style={{ background: gradientCSS }}>
        라운드 버튼
      </button>
      <button className="px-6 py-3 rounded-lg text-white font-bold shadow-lg" style={{ background: gradientCSS }}>
        대형 버튼
      </button>
    </div>
    <div className="p-4 rounded-xl text-white shadow-xl" style={{ background: gradientCSS }}>
      <h3 className="font-bold text-lg mb-2">카드 제목</h3>
      <p className="text-white/90 text-sm">
        이것은 그라디언트가 적용된 카드 컴포넌트입니다. 텍스트 가독성을 확인해보세요.
      </p>
    </div>
    <div className="space-y-2">
      <h1 className="text-2xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: gradientCSS }}>
        그라디언트 제목
      </h1>
      <div className="h-1 w-full rounded-full" style={{ background: gradientCSS }} />
      <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: gradientCSS }}>
        태그
      </div>
    </div>
  </div>
);

const MobilePreview = ({ gradientCSS }) => (
  <div className="flex justify-center py-2">
    <div className="w-48 h-96 bg-gray-900 rounded-[2rem] p-2 shadow-2xl">
      <div className="w-full h-full bg-black rounded-[1.5rem] p-4 overflow-hidden">
        <div className="flex justify-between items-center text-white text-xs mb-4">
          <span>9:41</span>
          <div className="flex gap-1">
            <div className="w-4 h-2 bg-white rounded-sm"></div>
            <div className="w-6 h-2 bg-white rounded-sm"></div>
          </div>
        </div>
        <div className="p-4 rounded-xl text-white mb-4" style={{ background: gradientCSS }}>
          <h2 className="font-bold text-lg">앱 헤더</h2>
          <p className="text-sm opacity-90">그라디언트 배경</p>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
            <div className="w-10 h-10 rounded-full" style={{ background: gradientCSS }} />
            <div className="flex-1">
              <div className="text-white text-sm font-semibold">사용자</div>
              <div className="text-gray-400 text-xs">온라인</div>
            </div>
          </div>
          <button className="w-full py-3 rounded-lg text-white font-semibold" style={{ background: gradientCSS }}>
            액션 버튼
          </button>
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex-1 h-16 rounded-lg"
                style={{ background: gradientCSS, opacity: 0.8 - i * 0.2 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default GradientPreview;
