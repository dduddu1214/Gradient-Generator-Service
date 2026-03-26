import React, { useState, useEffect } from 'react';
import { hexToRgb, rgbToHex, hexToHsl, hslToHex } from '../utils/colorUtils';

const ColorPickerPanel = ({ color, onChange }) => {
  const [mode, setMode] = useState('hex');
  const [hexInput, setHexInput] = useState(color);
  const [rgb, setRgb] = useState(hexToRgb(color));
  const [hsl, setHsl] = useState(hexToHsl(color));

  useEffect(() => {
    setHexInput(color);
    setRgb(hexToRgb(color));
    setHsl(hexToHsl(color));
  }, [color]);

  const handleHexChange = (value) => {
    setHexInput(value);
    if (/^#[0-9a-fA-F]{6}$/.test(value)) {
      onChange(value);
    }
  };

  const handleRgbChange = (channel, value) => {
    const v = Math.max(0, Math.min(255, parseInt(value) || 0));
    const newRgb = { ...rgb, [channel]: v };
    setRgb(newRgb);
    const hex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setHexInput(hex);
    onChange(hex);
  };

  const handleHslChange = (channel, value) => {
    const max = channel === 'h' ? 360 : 100;
    const v = Math.max(0, Math.min(max, parseInt(value) || 0));
    const newHsl = { ...hsl, [channel]: v };
    setHsl(newHsl);
    const hex = hslToHex(newHsl.h, newHsl.s, newHsl.l);
    setHexInput(hex);
    onChange(hex);
  };

  return (
    <div className="bg-gray-750 rounded-lg p-3 space-y-2 border border-gray-600">
      {/* 모드 탭 */}
      <div className="flex bg-gray-700 rounded p-0.5">
        {['hex', 'rgb', 'hsl'].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 text-xs py-1 rounded transition-colors uppercase ${
              mode === m ? 'bg-gray-600 text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {mode === 'hex' && (
        <input
          type="text"
          value={hexInput}
          onChange={(e) => handleHexChange(e.target.value)}
          className="w-full h-7 bg-gray-700 border border-gray-600 rounded text-center text-xs font-mono focus:border-purple-500 focus:outline-none"
          placeholder="#000000"
        />
      )}

      {mode === 'rgb' && (
        <div className="grid grid-cols-3 gap-1">
          {[
            { key: 'r', label: 'R', color: 'red' },
            { key: 'g', label: 'G', color: 'green' },
            { key: 'b', label: 'B', color: 'blue' },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="text-[10px] text-gray-500 block text-center">{label}</label>
              <input
                type="number"
                min="0"
                max="255"
                value={rgb[key]}
                onChange={(e) => handleRgbChange(key, e.target.value)}
                className="w-full h-6 bg-gray-700 border border-gray-600 rounded text-center text-xs font-mono focus:border-purple-500 focus:outline-none"
              />
            </div>
          ))}
        </div>
      )}

      {mode === 'hsl' && (
        <div className="grid grid-cols-3 gap-1">
          {[
            { key: 'h', label: 'H', max: 360 },
            { key: 's', label: 'S', max: 100 },
            { key: 'l', label: 'L', max: 100 },
          ].map(({ key, label, max }) => (
            <div key={key}>
              <label className="text-[10px] text-gray-500 block text-center">{label}</label>
              <input
                type="number"
                min="0"
                max={max}
                value={hsl[key]}
                onChange={(e) => handleHslChange(key, e.target.value)}
                className="w-full h-6 bg-gray-700 border border-gray-600 rounded text-center text-xs font-mono focus:border-purple-500 focus:outline-none"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPickerPanel;
