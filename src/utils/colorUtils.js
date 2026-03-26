export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : { r: 0, g: 0, b: 0 };
};

export const rgbToHex = (r, g, b) =>
  '#' + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');

export const rgbToHsl = (r, g, b) => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

export const hslToRgb = (h, s, l) => {
  h /= 360; s /= 100; l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
};

export const hexToHsl = (hex) => {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHsl(r, g, b);
};

export const hslToHex = (h, s, l) => {
  const { r, g, b } = hslToRgb(h, s, l);
  return rgbToHex(r, g, b);
};

export const extractColorsFromImage = (imageFile, numColors = 5) => {
  return new Promise((resolve) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onload = (e) => {
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const size = 50;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, size, size);
        const data = ctx.getImageData(0, 0, size, size).data;

        const pixels = [];
        for (let i = 0; i < data.length; i += 4) {
          pixels.push([data[i], data[i + 1], data[i + 2]]);
        }

        const colors = kMeansColors(pixels, numColors);
        resolve(colors.map(c => rgbToHex(c[0], c[1], c[2])));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(imageFile);
  });
};

const kMeansColors = (pixels, k, iterations = 10) => {
  let centroids = pixels
    .sort(() => Math.random() - 0.5)
    .slice(0, k)
    .map(p => [...p]);

  for (let iter = 0; iter < iterations; iter++) {
    const clusters = Array.from({ length: k }, () => []);
    for (const pixel of pixels) {
      let minDist = Infinity, minIdx = 0;
      for (let i = 0; i < k; i++) {
        const dist = Math.pow(pixel[0] - centroids[i][0], 2) +
                     Math.pow(pixel[1] - centroids[i][1], 2) +
                     Math.pow(pixel[2] - centroids[i][2], 2);
        if (dist < minDist) { minDist = dist; minIdx = i; }
      }
      clusters[minIdx].push(pixel);
    }
    for (let i = 0; i < k; i++) {
      if (clusters[i].length === 0) continue;
      centroids[i] = clusters[i]
        .reduce((acc, p) => [acc[0] + p[0], acc[1] + p[1], acc[2] + p[2]], [0, 0, 0])
        .map(v => Math.round(v / clusters[i].length));
    }
  }

  return centroids.sort((a, b) => (a[0] + a[1] + a[2]) - (b[0] + b[1] + b[2]));
};
