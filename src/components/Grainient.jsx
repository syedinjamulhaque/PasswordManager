import React, { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

const hexToRgb = hex => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 1, 1];
  return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];
};

const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;

out vec4 fragColor;

#define S(a,b,t) smoothstep(a,b,t)

mat2 Rot(float a){ float s=sin(a), c=cos(a); return mat2(c,-s,s,c); } 

vec2 hash(vec2 p){
  p = vec2(dot(p, vec2(2127.1, 81.17)), dot(p, vec2(1269.5, 283.37)));
  return fract(sin(p) * 43758.5453);
} 

float noise(vec2 p){
  vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
  float n = mix(
    mix(dot(-1.0 + 2.0 * hash(i + vec2(0.0,0.0)), f - vec2(0.0,0.0)),
        dot(-1.0 + 2.0 * hash(i + vec2(1.0,0.0)), f - vec2(1.0,0.0)), u.x),
    mix(dot(-1.0 + 2.0 * hash(i + vec2(0.0,1.0)), f - vec2(0.0,1.0)),
        dot(-1.0 + 2.0 * hash(i + vec2(1.0,1.0)), f - vec2(1.0,1.0)), u.x), u.y
  );
  return 0.5 + 0.5 * n;
}

void main(){
  float t = iTime * 0.8;
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  float ratio = iResolution.x / iResolution.y;
  vec2 tuv = (uv - 0.5) / 0.85;

  float degree = noise(vec2(t * 0.1, tuv.x * tuv.y) * 2.0);
  tuv.y *= 1.0 / ratio;
  tuv *= Rot(radians((degree - 0.5) * 1250.0 + 180.0));
  tuv.y *= ratio;

  float warpTime = t * 4.8;
  tuv.x += sin(tuv.y * 9.7 + warpTime) / 14.70588;
  tuv.y += sin(tuv.x * 14.55 + warpTime) / 7.35294;

  vec3 colLav = vec3(${hexToRgb('#97bb61').join(', ')});
  vec3 colOrg = vec3(${hexToRgb('#ccf789').join(', ')});
  vec3 colDark = vec3(${hexToRgb('#cce1ad').join(', ')});

  mat2 blendRot = Rot(radians(132.0));
  float blendX = (tuv * blendRot).x;

  vec3 layer1 = mix(colDark, colOrg, S(-1.73, -0.23, blendX));
  vec3 layer2 = mix(colOrg, colLav, S(-1.73, -0.23, blendX));
  vec3 col = mix(layer1, layer2, S(-0.07, -1.73, tuv.y));

  float grain = fract(sin(dot(uv * 2.0, vec2(12.9898, 78.233))) * 43758.5453);
  col += (grain - 0.5) * 0.1;

  col = (col - 0.5) * 1.5 + 0.5;
  float luma = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col = mix(vec3(luma), col, 0.7);
  col = clamp(col, 0.0, 1.0);

  fragColor = vec4(col, 1.0);
}
`;

const Grainient = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      webgl: 2,
      alpha: true,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio || 1, 2)
    });

    const gl = renderer.gl;
    const canvas = gl.canvas;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      renderer.setSize(w, h);
      program.uniforms.iResolution.value[0] = gl.drawingBufferWidth;
      program.uniforms.iResolution.value[1] = gl.drawingBufferHeight;
      renderer.render({ scene: mesh });
    };

    const ro = new ResizeObserver(setSize);
    ro.observe(container);
    setSize();

    let raf = 0;
    let isVisible = true;
    let isPageVisible = !document.hidden;
    const t0 = performance.now();

    const loop = t => {
      program.uniforms.iTime.value = (t - t0) * 0.001;
      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(loop);
    };

    const tryStart = () => {
      if (isVisible && isPageVisible && raf === 0) raf = requestAnimationFrame(loop);
    };
    const tryStop = () => {
      if (raf !== 0) { cancelAnimationFrame(raf); raf = 0; }
    };

    const io = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; isVisible ? tryStart() : tryStop(); },
      { threshold: 0 }
    );
    io.observe(container);

    const onVisibility = () => {
      isPageVisible = !document.hidden;
      isPageVisible ? tryStart() : tryStop();
    };
    document.addEventListener('visibilitychange', onVisibility);

    tryStart();

    return () => {
      tryStop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      try { container.removeChild(canvas); } catch {}
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100%', overflow: 'hidden' }} />;
};

export default Grainient;