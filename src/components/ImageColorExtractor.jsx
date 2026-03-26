import React, { useRef, useState } from 'react';
import { ImagePlus, Loader2 } from 'lucide-react';
import { extractColorsFromImage } from '../utils/colorUtils';

const ImageColorExtractor = ({ onExtract }) => {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [colors, setColors] = useState([]);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setPreview(URL.createObjectURL(file));

    const extracted = await extractColorsFromImage(file, 5);
    setColors(extracted);
    setLoading(false);
  };

  const handleApply = () => {
    if (colors.length >= 2) {
      const stops = colors.map((color, i) => ({
        color,
        position: Math.round((i / (colors.length - 1)) * 100)
      }));
      onExtract(stops);
      setPreview(null);
      setColors([]);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleClose = () => {
    setPreview(null);
    setColors([]);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <ImagePlus className="w-5 h-5" />
        이미지에서 색상 추출
      </h3>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />

      {!preview ? (
        <button
          onClick={() => inputRef.current?.click()}
          className="w-full border-2 border-dashed border-gray-600 hover:border-gray-400 rounded-lg p-6 text-gray-400 hover:text-gray-200 transition-colors text-sm"
        >
          클릭하여 이미지 선택
        </button>
      ) : (
        <div className="space-y-3">
          <img
            src={preview}
            alt="미리보기"
            className="w-full h-24 object-cover rounded-lg"
          />

          {loading ? (
            <div className="flex items-center justify-center gap-2 text-gray-400 py-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              색상 추출 중...
            </div>
          ) : (
            <>
              <div className="flex gap-1">
                {colors.map((color, i) => (
                  <div
                    key={i}
                    className="flex-1 h-8 first:rounded-l-lg last:rounded-r-lg"
                    style={{ background: color }}
                    title={color}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleApply}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded-lg text-sm transition-colors"
                >
                  적용
                </button>
                <button
                  onClick={handleClose}
                  className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
                >
                  취소
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageColorExtractor;
