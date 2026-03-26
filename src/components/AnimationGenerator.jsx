import React, { useState, useMemo } from 'react';
import { Play, Pause, Copy } from 'lucide-react';
import useClipboard from '../hooks/useClipboard';

const ANIMATION_TYPES = [
  { id: 'rotate', name: '회전' },
  { id: 'shift', name: '이동' },
  { id: 'pulse', name: '펄스' },
];

const EASING_OPTIONS = [
  { id: 'linear', name: '선형' },
  { id: 'ease', name: 'Ease' },
  { id: 'ease-in-out', name: 'Ease In Out' },
];

const AnimationGenerator = ({ gradientCSS, gradientConfig }) => {
  const [animType, setAnimType] = useState('rotate');
  const [duration, setDuration] = useState(3);
  const [easing, setEasing] = useState('ease');
  const [playing, setPlaying] = useState(false);
  const { message, copyToClipboard } = useClipboard();

  // 회전용: @property 기반 그라디언트 문자열 (var(--gradient-angle) 사용)
  const rotateGradient = useMemo(() => {
    const { type, conicCenter, colorStops } = gradientConfig;
    const sorted = [...colorStops].sort((a, b) => a.position - b.position);
    const stopsStr = sorted.map(s => `${s.color} ${s.position}%`).join(', ');
    switch (type) {
      case 'conic': return `conic-gradient(from var(--gradient-angle) at ${conicCenter.x}% ${conicCenter.y}%, ${stopsStr})`;
      case 'repeating-linear': return `repeating-linear-gradient(var(--gradient-angle), ${stopsStr})`;
      default: return `linear-gradient(var(--gradient-angle), ${stopsStr})`;
    }
  }, [gradientConfig]);

  const animationCSS = useMemo(() => {
    const { type, angle, radialShape, conicCenter, colorStops } = gradientConfig;
    const sorted = [...colorStops].sort((a, b) => a.position - b.position);
    const stopsStr = sorted.map(s => `${s.color} ${s.position}%`).join(', ');

    if (animType === 'rotate') {
      let gradTemplate;
      switch (type) {
        case 'conic': gradTemplate = `conic-gradient(from var(--gradient-angle) at ${conicCenter.x}% ${conicCenter.y}%, ${stopsStr})`; break;
        case 'repeating-linear': gradTemplate = `repeating-linear-gradient(var(--gradient-angle), ${stopsStr})`; break;
        default: gradTemplate = `linear-gradient(var(--gradient-angle), ${stopsStr})`; break;
      }
      return `@property --gradient-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

@keyframes gradient-rotate {
  0% { --gradient-angle: 0deg; }
  100% { --gradient-angle: 360deg; }
}

.animated-gradient {
  background: ${gradTemplate};
  animation: gradient-rotate ${duration}s ${easing} infinite;
}`;
    }

    if (animType === 'shift') {
      const doubled = sorted.map(s => `${s.color} ${s.position}%`).join(', ') +
        ', ' + sorted.map(s => `${s.color} ${s.position + 100}%`).join(', ');
      let bg;
      switch (type) {
        case 'radial': bg = `radial-gradient(${radialShape}, ${doubled})`; break;
        case 'conic': bg = `conic-gradient(from ${angle}deg at ${conicCenter.x}% ${conicCenter.y}%, ${doubled})`; break;
        default: bg = `linear-gradient(${angle}deg, ${doubled})`; break;
      }
      return `@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animated-gradient {
  background: ${bg};
  background-size: 200% 200%;
  animation: gradient-shift ${duration}s ${easing} infinite;
}`;
    }

    if (animType === 'pulse') {
      return `@keyframes gradient-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.02); }
}

.animated-gradient {
  background: ${gradientCSS};
  animation: gradient-pulse ${duration}s ${easing} infinite;
}`;
    }

    return '';
  }, [animType, duration, easing, gradientCSS, gradientConfig]);

  const previewStyle = useMemo(() => {
    if (!playing) return { background: gradientCSS };

    if (animType === 'rotate') {
      return {
        background: rotateGradient,
        animation: `gradient-rotate ${duration}s ${easing} infinite`,
      };
    }
    if (animType === 'shift') {
      const { type, angle, radialShape, colorStops } = gradientConfig;
      const sorted = [...colorStops].sort((a, b) => a.position - b.position);
      const doubled = sorted.map(s => `${s.color} ${s.position}%`).join(', ') +
        ', ' + sorted.map(s => `${s.color} ${s.position + 100}%`).join(', ');
      let bg;
      switch (type) {
        case 'radial': bg = `radial-gradient(${radialShape}, ${doubled})`; break;
        default: bg = `linear-gradient(${angle}deg, ${doubled})`; break;
      }
      return {
        background: bg,
        backgroundSize: '200% 200%',
        animation: `gradient-shift ${duration}s ${easing} infinite`,
      };
    }
    if (animType === 'pulse') {
      return {
        background: gradientCSS,
        animation: `gradient-pulse ${duration}s ${easing} infinite`,
      };
    }
    return { background: gradientCSS };
  }, [playing, animType, duration, easing, gradientCSS, gradientConfig, rotateGradient]);

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">애니메이션 생성기</h3>

      <div className="space-y-4">
        {/* 프리뷰 */}
        <div
          className="w-full h-24 rounded-lg border-2 border-gray-700"
          style={previewStyle}
        />

        {/* 타입 선택 */}
        <div className="flex gap-2">
          {ANIMATION_TYPES.map((t) => (
            <button
              key={t.id}
              onClick={() => { setPlaying(false); setAnimType(t.id); }}
              className={`flex-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                animType === t.id ? 'bg-purple-600 text-white' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {animType === 'rotate' && (
          <p className="text-xs text-gray-500">
            CSS @property 사용 (Chrome, Edge 지원)
          </p>
        )}

        {/* 설정 */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-400 block mb-1">시간 (초)</label>
            <input
              type="number"
              min="0.5"
              max="20"
              step="0.5"
              value={duration}
              onChange={(e) => setDuration(parseFloat(e.target.value) || 1)}
              className="w-full h-8 bg-gray-700 border border-gray-600 rounded text-center text-sm font-mono focus:border-purple-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">이징</label>
            <select
              value={easing}
              onChange={(e) => setEasing(e.target.value)}
              className="w-full h-8 bg-gray-700 border border-gray-600 rounded text-sm px-2 focus:border-purple-500 focus:outline-none"
            >
              {EASING_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>{opt.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex gap-2">
          <button
            onClick={() => setPlaying(!playing)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
              playing ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {playing ? '정지' : '재생'}
          </button>
          <button
            onClick={() => copyToClipboard(animationCSS)}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-colors"
          >
            <Copy className="w-4 h-4" />
            코드 복사
          </button>
        </div>

        {message && <p className="text-green-400 text-xs">{message}</p>}

        {/* 코드 미리보기 */}
        <div className="bg-gray-900 rounded p-3 font-mono text-xs overflow-x-auto max-h-40 overflow-y-auto">
          <pre className="text-green-400 whitespace-pre-wrap">{animationCSS}</pre>
        </div>
      </div>

      {/* 인라인 keyframes for preview */}
      <style>{`
        @property --gradient-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes gradient-rotate {
          0% { --gradient-angle: 0deg; }
          100% { --gradient-angle: 360deg; }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes gradient-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.02); }
        }
      `}</style>
    </div>
  );
};

export default AnimationGenerator;
