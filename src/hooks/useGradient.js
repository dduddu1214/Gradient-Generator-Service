import { useState, useCallback } from 'react';
import { generateGradientCSS } from '../utils/gradientUtils';

const useGradient = () => {
  const [gradientType, setGradientType] = useState('linear');
  const [angle, setAngle] = useState(90);
  const [radialShape, setRadialShape] = useState('circle');
  const [conicCenter, setConicCenter] = useState({ x: 50, y: 50 });
  const [colorStops, setColorStops] = useState([
    { color: '#ff6b6b', position: 0 },
    { color: '#4ecdc4', position: 100 }
  ]);
  const [history, setHistory] = useState([]);

  const generateCSS = useCallback(() => {
    return generateGradientCSS({
      type: gradientType,
      angle,
      radialShape,
      conicCenter,
      colorStops
    });
  }, [gradientType, angle, radialShape, conicCenter, colorStops]);

  const addColorStop = useCallback(() => {
    const newPosition = colorStops.length > 0 
      ? Math.min(100, Math.max(...colorStops.map(s => s.position)) + 20)
      : 50;
    
    setColorStops(prev => [...prev, { 
      color: '#' + Math.floor(Math.random()*16777215).toString(16), 
      position: newPosition 
    }]);
  }, [colorStops]);

  const removeColorStop = useCallback((index) => {
    if (colorStops.length > 2) {
      setColorStops(prev => prev.filter((_, i) => i !== index));
    }
  }, [colorStops.length]);

  const updateColorStop = useCallback((index, field, value) => {
    setColorStops(prev => {
      const newStops = [...prev];
      newStops[index][field] = value;
      return newStops;
    });
  }, []);

  // 히스토리에 추가하는 함수
  const addToHistory = useCallback(() => {
    const currentCSS = generateGradientCSS({
      type: gradientType,
      angle,
      radialShape,
      conicCenter,
      colorStops
    });

    const currentGradient = {
      type: gradientType,
      angle,
      radialShape,
      conicCenter: { ...conicCenter },
      colorStops: [...colorStops],
      css: currentCSS
    };
    
    setHistory(prev => {
      // 중복 방지: 같은 CSS인지 확인
      if (prev.length > 0 && prev[0].css === currentGradient.css) {
        return prev;
      }
      return [currentGradient, ...prev.slice(0, 9)];
    });
  }, [gradientType, angle, radialShape, conicCenter, colorStops]);

  const generateRandomGradient = useCallback(() => {
    const numColors = Math.floor(Math.random() * 3) + 2; // 2-4 colors
    const newStops = [];
    
    for (let i = 0; i < numColors; i++) {
      newStops.push({
        color: '#' + Math.floor(Math.random()*16777215).toString(16),
        position: (100 / (numColors - 1)) * i
      });
    }
    
    const newAngle = Math.floor(Math.random() * 360);
    
    setColorStops(newStops);
    setAngle(newAngle);
    
    // 상태 업데이트 후 히스토리 추가
    setTimeout(() => {
      const css = generateGradientCSS({
        type: gradientType,
        angle: newAngle,
        radialShape,
        conicCenter,
        colorStops: newStops
      });

      const gradient = {
        type: gradientType,
        angle: newAngle,
        radialShape,
        conicCenter: { ...conicCenter },
        colorStops: [...newStops],
        css
      };

      setHistory(prev => {
        if (prev.length > 0 && prev[0].css === gradient.css) {
          return prev;
        }
        return [gradient, ...prev.slice(0, 9)];
      });
    }, 100);
  }, [gradientType, radialShape, conicCenter]);

  const applyPreset = useCallback((preset) => {
    const newType = preset.type || 'linear';
    const newAngle = preset.angle || 90;
    const newColors = [...preset.colors];
    
    setColorStops(newColors);
    setGradientType(newType);
    setAngle(newAngle);
    
    // 상태 업데이트 후 히스토리 추가
    setTimeout(() => {
      const css = generateGradientCSS({
        type: newType,
        angle: newAngle,
        radialShape,
        conicCenter,
        colorStops: newColors
      });

      const gradient = {
        type: newType,
        angle: newAngle,
        radialShape,
        conicCenter: { ...conicCenter },
        colorStops: newColors,
        css
      };

      setHistory(prev => {
        if (prev.length > 0 && prev[0].css === gradient.css) {
          return prev;
        }
        return [gradient, ...prev.slice(0, 9)];
      });
    }, 100);
  }, [radialShape, conicCenter]);

  const applyFromHistory = useCallback((item) => {
    setGradientType(item.type);
    setAngle(item.angle);
    setRadialShape(item.radialShape);
    setConicCenter(item.conicCenter);
    setColorStops([...item.colorStops]);
  }, []);

  return {
    // State
    gradientType,
    angle,
    radialShape,
    conicCenter,
    colorStops,
    history,
    
    // Actions
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
    
    // Computed
    generateCSS
  };
};

export default useGradient;