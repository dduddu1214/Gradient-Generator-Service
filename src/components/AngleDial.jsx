import React, { useRef, useCallback } from 'react';

const AngleDial = ({ angle, onChange, onCommit }) => {
  const dialRef = useRef(null);
  const dragging = useRef(false);

  const getAngleFromEvent = useCallback((e) => {
    const rect = dialRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const rad = Math.atan2(clientY - cy, clientX - cx);
    let deg = Math.round((rad * 180) / Math.PI + 90);
    if (deg < 0) deg += 360;
    return deg;
  }, []);

  const handleStart = useCallback((e) => {
    e.preventDefault();
    dragging.current = true;
    if (onCommit) onCommit();
    onChange(getAngleFromEvent(e));

    const handleMove = (ev) => {
      if (dragging.current) onChange(getAngleFromEvent(ev));
    };
    const handleEnd = () => {
      dragging.current = false;
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleEnd);
  }, [onChange, onCommit, getAngleFromEvent]);

  const rad = ((angle - 90) * Math.PI) / 180;
  const indicatorX = 50 + 38 * Math.cos(rad);
  const indicatorY = 50 + 38 * Math.sin(rad);

  return (
    <div className="flex items-center gap-3">
      <div
        ref={dialRef}
        className="relative w-20 h-20 cursor-pointer select-none shrink-0"
        onMouseDown={handleStart}
        onTouchStart={handleStart}
        title="드래그하여 각도 조절"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="46" fill="none" stroke="#374151" strokeWidth="4" />
          <circle cx="50" cy="50" r="46" fill="none" stroke="#6366f1" strokeWidth="4"
            strokeDasharray={`${(angle / 360) * 289} 289`}
            transform="rotate(-90 50 50)"
          />
          <line x1="50" y1="50" x2={indicatorX} y2={indicatorY}
            stroke="#a78bfa" strokeWidth="3" strokeLinecap="round"
          />
          <circle cx={indicatorX} cy={indicatorY} r="5" fill="#7c3aed" />
          <circle cx="50" cy="50" r="3" fill="#9ca3af" />
          <text x="50" y="54" textAnchor="middle" fill="#e5e7eb" fontSize="12" fontWeight="600">
            {angle}°
          </text>
        </svg>
      </div>
    </div>
  );
};

export default AngleDial;
