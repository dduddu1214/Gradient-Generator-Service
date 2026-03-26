export const formatStandardCSS = (gradientCSS) =>
  `background: ${gradientCSS};`;

export const formatWithPrefixes = (gradientCSS) => {
  const prefixed = ['-webkit-', '-moz-', '-o-', ''].map(
    (prefix) => `background: ${gradientCSS.replace(/(linear-gradient|radial-gradient|conic-gradient|repeating-linear-gradient|repeating-radial-gradient)/, `${prefix}$1`)};`
  );
  return prefixed.join('\n');
};

export const formatTailwind = (config) => {
  const { type, angle, colorStops } = config;
  const sorted = [...colorStops].sort((a, b) => a.position - b.position);

  if (type === 'linear' && sorted.length >= 2) {
    const dirMap = {
      0: 'to-t', 45: 'to-tr', 90: 'to-r', 135: 'to-br',
      180: 'to-b', 225: 'to-bl', 270: 'to-l', 315: 'to-tl'
    };
    const dir = dirMap[angle];

    if (dir && sorted.length <= 3) {
      const from = `from-[${sorted[0].color}]`;
      const to = `to-[${sorted[sorted.length - 1].color}]`;
      const via = sorted.length === 3 ? ` via-[${sorted[1].color}]` : '';
      return `bg-gradient-${dir} ${from}${via} ${to}`;
    }
  }

  const cssValue = buildGradientString(config);
  return `bg-[${cssValue.replace(/ /g, '_')}]`;
};

export const formatCSSInJS = (gradientCSS) =>
  `{\n  background: '${gradientCSS}'\n}`;

export const formatCSSVariables = (gradientCSS) =>
  `:root {\n  --gradient: ${gradientCSS};\n}\n\n.element {\n  background: var(--gradient);\n}`;

const buildGradientString = ({ type, angle, radialShape, conicCenter, colorStops }) => {
  const stops = [...colorStops]
    .sort((a, b) => a.position - b.position)
    .map(s => `${s.color}_${s.position}%`)
    .join(',');

  switch (type) {
    case 'linear': return `linear-gradient(${angle}deg,${stops})`;
    case 'radial': return `radial-gradient(${radialShape},${stops})`;
    case 'conic': return `conic-gradient(from_${angle}deg_at_${conicCenter.x}%_${conicCenter.y}%,${stops})`;
    case 'repeating-linear': return `repeating-linear-gradient(${angle}deg,${stops})`;
    case 'repeating-radial': return `repeating-radial-gradient(${radialShape},${stops})`;
    default: return `linear-gradient(${angle}deg,${stops})`;
  }
};

export const CODE_FORMATS = [
  { id: 'css', name: 'CSS' },
  { id: 'prefixed', name: 'Prefixed' },
  { id: 'tailwind', name: 'Tailwind' },
  { id: 'cssinjs', name: 'CSS-in-JS' },
  { id: 'variables', name: 'Variables' },
];

export const getFormattedCode = (format, gradientCSS, config) => {
  switch (format) {
    case 'css': return formatStandardCSS(gradientCSS);
    case 'prefixed': return formatWithPrefixes(gradientCSS);
    case 'tailwind': return formatTailwind(config);
    case 'cssinjs': return formatCSSInJS(gradientCSS);
    case 'variables': return formatCSSVariables(gradientCSS);
    default: return formatStandardCSS(gradientCSS);
  }
};
