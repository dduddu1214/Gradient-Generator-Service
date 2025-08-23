/**
 * 그라디언트 CSS 생성 유틸리티
 */

export const generateGradientCSS = ({
    type,
    angle,
    radialShape,
    conicCenter,
    colorStops
  }) => {
    const colorStopsString = colorStops
      .sort((a, b) => a.position - b.position)
      .map(stop => `${stop.color} ${stop.position}%`)
      .join(', ');
  
    switch (type) {
      case 'linear':
        return `linear-gradient(${angle}deg, ${colorStopsString})`;
      
      case 'radial':
        return `radial-gradient(${radialShape}, ${colorStopsString})`;
      
      case 'conic':
        return `conic-gradient(from ${angle}deg at ${conicCenter.x}% ${conicCenter.y}%, ${colorStopsString})`;
      
      case 'repeating-linear':
        return `repeating-linear-gradient(${angle}deg, ${colorStopsString})`;
      
      case 'repeating-radial':
        return `repeating-radial-gradient(${radialShape}, ${colorStopsString})`;
      
      default:
        return `linear-gradient(${angle}deg, ${colorStopsString})`;
    }
  };
  
  /**
   * 색상 유틸리티 함수들
   */
  export const generateRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };
  
  export const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };
  
  export const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };
  
  /**
   * 그라디언트 타입 정보
   */
  export const gradientTypes = [
    { id: 'linear', name: '선형', description: '직선 방향의 그라디언트' },
    { id: 'radial', name: '방사형', description: '중심에서 바깥으로 퍼지는 그라디언트' },
    { id: 'conic', name: '원뿔형', description: '회전하는 원뿔 모양의 그라디언트' },
    { id: 'repeating-linear', name: '반복 선형', description: '패턴이 반복되는 선형 그라디언트' },
    { id: 'repeating-radial', name: '반복 방사형', description: '패턴이 반복되는 방사형 그라디언트' }
  ];
  
  /**
   * 방사형 모양 옵션
   */
  export const radialShapes = [
    { id: 'circle', name: '원형' },
    { id: 'ellipse', name: '타원형' }
  ];