import { useState, useCallback, useEffect, useRef } from 'react';
import { generateGradientCSS } from '../utils/gradientUtils';

let nextStopId = 1;
const createStop = (color, position) => ({ id: nextStopId++, color, position });

let nextHistoryId = 1;

const loadHistory = () => {
  try {
    const saved = localStorage.getItem('gradient-history');
    if (saved) {
      const parsed = JSON.parse(saved);
      parsed.forEach(item => {
        if (item.id >= nextHistoryId) nextHistoryId = item.id + 1;
      });
      return parsed;
    }
  } catch {
    // ignore
  }
  return [];
};

const encodeToUrl = (config) => {
  try {
    const data = {
      t: config.gradientType,
      a: config.angle,
      rs: config.radialShape,
      cx: config.conicCenter.x,
      cy: config.conicCenter.y,
      cs: config.colorStops.map(s => ({ c: s.color, p: s.position })),
    };
    return btoa(JSON.stringify(data));
  } catch {
    return '';
  }
};

const decodeFromUrl = () => {
  try {
    const hash = window.location.hash.slice(1);
    if (!hash) return null;
    const data = JSON.parse(atob(hash));
    return {
      gradientType: data.t,
      angle: data.a,
      radialShape: data.rs,
      conicCenter: { x: data.cx, y: data.cy },
      colorStops: data.cs.map(s => createStop(s.c, s.p)),
    };
  } catch {
    return null;
  }
};

const useGradient = () => {
  const urlState = useRef(decodeFromUrl());

  const [gradientType, setGradientType] = useState(urlState.current?.gradientType || 'linear');
  const [angle, setAngle] = useState(urlState.current?.angle || 90);
  const [radialShape, setRadialShape] = useState(urlState.current?.radialShape || 'circle');
  const [conicCenter, setConicCenter] = useState(urlState.current?.conicCenter || { x: 50, y: 50 });
  const [colorStops, setColorStops] = useState(
    urlState.current?.colorStops || [createStop('#ff6b6b', 0), createStop('#4ecdc4', 100)]
  );
  const [history, setHistory] = useState(loadHistory);

  // Undo / Redo
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const getSnapshot = useCallback(() => ({
    gradientType, angle, radialShape,
    conicCenter: { ...conicCenter },
    colorStops: colorStops.map(s => ({ ...s })),
  }), [gradientType, angle, radialShape, conicCenter, colorStops]);

  const saveSnapshot = useCallback(() => {
    const snap = getSnapshot();
    setUndoStack(prev => [...prev.slice(-49), snap]);
    setRedoStack([]);
  }, [getSnapshot]);

  const undo = useCallback(() => {
    setUndoStack(prev => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      setRedoStack(r => [...r, getSnapshot()]);
      setGradientType(last.gradientType);
      setAngle(last.angle);
      setRadialShape(last.radialShape);
      setConicCenter(last.conicCenter);
      setColorStops(last.colorStops);
      return prev.slice(0, -1);
    });
  }, [getSnapshot]);

  const redo = useCallback(() => {
    setRedoStack(prev => {
      if (prev.length === 0) return prev;
      const next = prev[prev.length - 1];
      setUndoStack(u => [...u, getSnapshot()]);
      setGradientType(next.gradientType);
      setAngle(next.angle);
      setRadialShape(next.radialShape);
      setConicCenter(next.conicCenter);
      setColorStops(next.colorStops);
      return prev.slice(0, -1);
    });
  }, [getSnapshot]);

  const canUndo = undoStack.length > 0;
  const canRedo = redoStack.length > 0;

  // Persist history
  useEffect(() => {
    localStorage.setItem('gradient-history', JSON.stringify(history));
  }, [history]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [undo, redo]);

  const generateCSS = useCallback(() => {
    return generateGradientCSS({ type: gradientType, angle, radialShape, conicCenter, colorStops });
  }, [gradientType, angle, radialShape, conicCenter, colorStops]);

  const addColorStop = useCallback(() => {
    saveSnapshot();
    const newPosition = colorStops.length > 0
      ? Math.min(100, Math.max(...colorStops.map(s => s.position)) + 20)
      : 50;
    setColorStops(prev => [...prev,
      createStop('#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'), newPosition)
    ]);
  }, [colorStops, saveSnapshot]);

  const removeColorStop = useCallback((index) => {
    if (colorStops.length > 2) {
      saveSnapshot();
      setColorStops(prev => prev.filter((_, i) => i !== index));
    }
  }, [colorStops.length, saveSnapshot]);

  const updateColorStop = useCallback((index, field, value) => {
    setColorStops(prev =>
      prev.map((stop, i) =>
        i === index ? { ...stop, [field]: value } : stop
      )
    );
  }, []);

  const reorderColorStops = useCallback((fromIndex, toIndex) => {
    saveSnapshot();
    setColorStops(prev => {
      const result = [...prev];
      const [moved] = result.splice(fromIndex, 1);
      result.splice(toIndex, 0, moved);
      return result;
    });
  }, [saveSnapshot]);

  const applyColorStopsFromImage = useCallback((stops) => {
    saveSnapshot();
    setColorStops(stops.map(s => createStop(s.color, s.position)));
  }, [saveSnapshot]);

  const addToHistory = useCallback(() => {
    const currentCSS = generateGradientCSS({ type: gradientType, angle, radialShape, conicCenter, colorStops });
    const currentGradient = {
      id: nextHistoryId++,
      type: gradientType, angle, radialShape,
      conicCenter: { ...conicCenter },
      colorStops: [...colorStops],
      css: currentCSS
    };
    setHistory(prev => {
      if (prev.length > 0 && prev[0].css === currentGradient.css) return prev;
      return [currentGradient, ...prev.slice(0, 9)];
    });
  }, [gradientType, angle, radialShape, conicCenter, colorStops]);

  const generateRandomGradient = useCallback(() => {
    saveSnapshot();
    const numColors = Math.floor(Math.random() * 3) + 2;
    const newStops = [];
    for (let i = 0; i < numColors; i++) {
      newStops.push(
        createStop('#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'), (100 / (numColors - 1)) * i)
      );
    }
    const newAngle = Math.floor(Math.random() * 360);
    setColorStops(newStops);
    setAngle(newAngle);

    const css = generateGradientCSS({ type: gradientType, angle: newAngle, radialShape, conicCenter, colorStops: newStops });
    const gradient = { id: nextHistoryId++, type: gradientType, angle: newAngle, radialShape, conicCenter: { ...conicCenter }, colorStops: [...newStops], css };
    setHistory(prev => {
      if (prev.length > 0 && prev[0].css === gradient.css) return prev;
      return [gradient, ...prev.slice(0, 9)];
    });
  }, [gradientType, radialShape, conicCenter, saveSnapshot]);

  const applyPreset = useCallback((preset) => {
    saveSnapshot();
    const newType = preset.type || 'linear';
    const newAngle = preset.angle || 90;
    const newColors = preset.colors.map(c => createStop(c.color, c.position));
    setColorStops(newColors);
    setGradientType(newType);
    setAngle(newAngle);

    const css = generateGradientCSS({ type: newType, angle: newAngle, radialShape, conicCenter, colorStops: newColors });
    const gradient = { id: nextHistoryId++, type: newType, angle: newAngle, radialShape, conicCenter: { ...conicCenter }, colorStops: newColors, css };
    setHistory(prev => {
      if (prev.length > 0 && prev[0].css === gradient.css) return prev;
      return [gradient, ...prev.slice(0, 9)];
    });
  }, [radialShape, conicCenter, saveSnapshot]);

  const applyFromHistory = useCallback((item) => {
    saveSnapshot();
    setGradientType(item.type);
    setAngle(item.angle);
    setRadialShape(item.radialShape);
    setConicCenter(item.conicCenter);
    setColorStops(item.colorStops.map(s => createStop(s.color, s.position)));
  }, [saveSnapshot]);

  const applyFromFavorite = useCallback((fav) => {
    saveSnapshot();
    setGradientType(fav.type);
    setAngle(fav.angle);
    setRadialShape(fav.radialShape);
    setConicCenter(fav.conicCenter);
    setColorStops(fav.colorStops.map(s => createStop(s.color, s.position)));
  }, [saveSnapshot]);

  // URL sharing
  const getShareUrl = useCallback(() => {
    const hash = encodeToUrl({ gradientType, angle, radialShape, conicCenter, colorStops });
    return `${window.location.origin}${window.location.pathname}#${hash}`;
  }, [gradientType, angle, radialShape, conicCenter, colorStops]);

  // Gradient config object for code formatters
  const gradientConfig = { type: gradientType, angle, radialShape, conicCenter, colorStops };

  return {
    gradientType, angle, radialShape, conicCenter, colorStops, history,
    setGradientType: (v) => { saveSnapshot(); setGradientType(v); },
    setAngle,
    setRadialShape: (v) => { saveSnapshot(); setRadialShape(v); },
    setConicCenter,
    addColorStop, removeColorStop, updateColorStop,
    reorderColorStops, applyColorStopsFromImage,
    generateRandomGradient, applyPreset,
    applyFromHistory, applyFromFavorite,
    addToHistory, generateCSS,
    saveSnapshot,
    undo, redo, canUndo, canRedo,
    getShareUrl, gradientConfig,
  };
};

export default useGradient;
