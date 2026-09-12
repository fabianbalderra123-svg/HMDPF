import * as THREE from 'three';
import { games, type Game } from './games';

const COLS = 28;
const ROWS = 16;

const VERT = /* glsl */ `
in vec3 position;
in vec2 uv;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform float uTime;
uniform vec2 uMouse;
out vec2 vUv;

void main() {
  vUv = uv;
  vec3 p = position;
  vec2 m = uv - 0.5 - uMouse * 0.35;
  float r = length(m);
  p.z += 0.55 * exp(-r * r * 3.2);
  p.x += 0.12 * sin(uv.y * 10.0 + uTime * 0.35);
  p.y += 0.08 * cos(uv.x * 9.0 + uTime * 0.28);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}`;

const FRAG = /* glsl */ `
precision highp float;
in vec2 vUv;
uniform sampler2D uAtlas;
uniform vec2 uMouse;
uniform float uTime;
uniform vec2 uGrid;
uniform float uCount;
out vec4 outColor;

vec2 hash22(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453);
}

vec2 warp(vec2 uv) {
  vec2 p = uv - 0.5 - uMouse * 0.42;
  float r = length(p);
  float k = 1.0 + 1.65 * r * r;
  vec2 w = 0.5 + p * k;
  w.x += 0.018 * sin(w.y * 22.0 + uTime * 0.4);
  w.y += 0.014 * cos(w.x * 18.0 + uTime * 0.3);
  return w;
}

void main() {
  vec2 uv = warp(vUv);
  vec2 n = uv * uGrid;
  vec2 gv = floor(n);
  float d1 = 8.0;
  float d2 = 8.0;
  vec2 mr = vec2(0.0);
  vec2 mg = vec2(0.0);

  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 g = gv + vec2(float(i), float(j));
      vec2 o = hash22(g) * 0.78;
      vec2 r = g + o - n;
      float d = length(r);
      if (d < d1) {
        d2 = d1;
        d1 = d;
        mr = r;
        mg = g;
      } else if (d < d2) {
        d2 = d;
      }
    }
  }

  float id = mod(abs(mg.x + mg.y * 17.0) + 8.0, uCount);
  float cols = 8.0;
  vec2 tile = vec2(mod(id, cols), floor(id / cols));
  vec2 local = clamp(0.5 + mr * 0.85, 0.05, 0.95);
  vec4 poster = texture(uAtlas, (tile + local) / cols);

  float fill = smoothstep(0.0, 0.07, d2 - d1);
  // Vibrant Xbox green cell outline and deep dark backing
  vec3 edgeColor = vec3(0.063, 0.486, 0.063); // #107C10
  vec3 color = mix(edgeColor * 0.25, poster.rgb, fill);

  outColor = vec4(color, 1.0);
}`;

function drawXboxLogo(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
	// Circular Xbox emblem
	ctx.save();
	ctx.beginPath();
	ctx.arc(cx, cy, r, 0, Math.PI * 2);
	ctx.fillStyle = '#107c10';
	ctx.fill();

	// White/silver bevel
	ctx.lineWidth = 1.5;
	ctx.strokeStyle = '#e0f8d0';
	ctx.stroke();

	// Iconic curved "X"
	ctx.fillStyle = '#ffffff';
	ctx.beginPath();
	// Curved X cuts
	ctx.ellipse(cx, cy - r * 0.15, r * 0.7, r * 0.2, 0, 0, Math.PI);
	ctx.ellipse(cx, cy + r * 0.15, r * 0.7, r * 0.2, 0, Math.PI, Math.PI * 2);
	ctx.fill();
	ctx.restore();
}

function makeAtlas(): THREE.CanvasTexture {
	const cols = 8;
	const size = 256;
	const canvas = document.createElement('canvas');
	canvas.width = cols * size;
	canvas.height = cols * size;
	const ctx = canvas.getContext('2d')!;

	for (let i = 0; i < cols * cols; i++) {
		const game = games[i % games.length];
		const x = (i % cols) * size;
		const y = Math.floor(i / cols) * size;

		// --- Background Box Art with Gradient ---
		const bg = ctx.createLinearGradient(x, y, x + size, y + size);
		bg.addColorStop(0, `hsl(${game.hue} 42% 16%)`);
		bg.addColorStop(0.5, `hsl(${(game.hue + 25) % 360} 35% 9%)`);
		bg.addColorStop(1, '#050706');
		ctx.fillStyle = bg;
		ctx.fillRect(x, y, size, size);

		// Subtle diagonal cyber-grid pattern
		ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
		ctx.lineWidth = 1;
		ctx.beginPath();
		for (let line = 0; line < size; line += 16) {
			ctx.moveTo(x + line, y);
			ctx.lineTo(x, y + line);
			ctx.moveTo(x + size, y + line);
			ctx.lineTo(x + line, y + size);
		}
		ctx.stroke();

		// --- Xbox 360 Header Bar (Iconic White/Silver curved band) ---
		const headerHeight = 40;
		const headerGrad = ctx.createLinearGradient(x, y, x, y + headerHeight);
		headerGrad.addColorStop(0, '#ffffff');
		headerGrad.addColorStop(0.6, '#efefef');
		headerGrad.addColorStop(1, '#c8ccd0');
		ctx.fillStyle = headerGrad;
		ctx.fillRect(x, y, size, headerHeight);

		// Xbox green accent line below header
		const lineGrad = ctx.createLinearGradient(x, y + headerHeight, x + size, y + headerHeight);
		lineGrad.addColorStop(0, '#107c10');
		lineGrad.addColorStop(0.5, '#52c41a');
		lineGrad.addColorStop(1, '#107c10');
		ctx.fillStyle = lineGrad;
		ctx.fillRect(x, y + headerHeight, size, 4);

		// Header logo & text
		drawXboxLogo(ctx, x + 24, y + 20, 11);

		ctx.fillStyle = '#1c1e21';
		ctx.font = '800 16px "Segoe UI", system-ui, -apple-system, sans-serif';
		ctx.letterSpacing = '2px';
		ctx.fillText('XBOX 360', x + 44, y + 25);

		// LIVE badge on top-right
		ctx.fillStyle = '#107c10';
		ctx.font = '700 9px system-ui, sans-serif';
		ctx.fillText('LIVE', x + size - 32, y + 24);

		// --- Badge Pill (e.g. "Exclusivo Legendario") ---
		ctx.fillStyle = 'rgba(16, 124, 16, 0.35)';
		ctx.beginPath();
		ctx.roundRect(x + 14, y + 54, size - 28, 20, 4);
		ctx.fill();
		ctx.strokeStyle = 'rgba(82, 196, 26, 0.5)';
		ctx.stroke();

		ctx.fillStyle = '#a9f88d';
		ctx.font = '700 10px system-ui, sans-serif';
		ctx.letterSpacing = '0.5px';
		ctx.fillText(game.badge.toUpperCase(), x + 20, y + 68);

		// --- Game Title ---
		ctx.fillStyle = '#ffffff';
		ctx.font = '700 21px "Segoe UI", system-ui, sans-serif';
		ctx.letterSpacing = '0px';
		wrap(ctx, game.title, x + 16, y + 106, size - 32, 24);

		// Developer & Genre
		ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
		ctx.font = '500 12px system-ui, sans-serif';
		ctx.fillText(`${game.year} • ${game.genre}`, x + 16, y + 172);

		ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
		ctx.font = '400 11px system-ui, sans-serif';
		ctx.fillText(game.developer, x + 16, y + 190);

		// --- Bottom Footer: Gamerscore & Rating ---
		ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
		ctx.fillRect(x, y + size - 42, size, 42);

		ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
		ctx.beginPath();
		ctx.moveTo(x, y + size - 42);
		ctx.lineTo(x + size, y + size - 42);
		ctx.stroke();

		// Gamerscore badge
		ctx.fillStyle = '#52c41a';
		ctx.beginPath();
		ctx.arc(x + 24, y + size - 22, 9, 0, Math.PI * 2);
		ctx.fill();

		ctx.fillStyle = '#0a2307';
		ctx.font = '900 10px system-ui, sans-serif';
		ctx.fillText('G', x + 20.5, y + size - 18.5);

		ctx.fillStyle = '#ffffff';
		ctx.font = '700 12px system-ui, sans-serif';
		ctx.fillText(`${game.gamerscore} G`, x + 38, y + size - 18);

		// Metacritic rating
		ctx.fillStyle = '#107c10';
		ctx.fillRect(x + size - 64, y + size - 32, 48, 20);
		ctx.fillStyle = '#ffffff';
		ctx.font = '800 11px system-ui, sans-serif';
		ctx.fillText(game.rating.replace('/100', ''), x + size - 48, y + size - 18);

		// Subtle outer border of cell
		ctx.strokeStyle = 'rgba(16, 124, 16, 0.4)';
		ctx.lineWidth = 1;
		ctx.strokeRect(x + 0.5, y + 0.5, size - 1, size - 1);
	}

	const tex = new THREE.CanvasTexture(canvas);
	tex.colorSpace = THREE.SRGBColorSpace;
	tex.minFilter = THREE.LinearMipmapLinearFilter;
	return tex;
}

function wrap(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, max: number, lh: number) {
	const words = text.split(' ');
	let line = '';
	let yy = y;
	for (const w of words) {
		const t = line ? `${line} ${w}` : w;
		if (ctx.measureText(t).width > max) {
			ctx.fillText(line, x, yy);
			line = w;
			yy += lh;
		} else line = t;
	}
	ctx.fillText(line, x, yy);
}

function hash22(p: THREE.Vector2) {
	const x = Math.sin(p.x * 127.1 + p.y * 311.7) * 43758.5453;
	const y = Math.sin(p.x * 269.5 + p.y * 183.3) * 43758.5453;
	return new THREE.Vector2(x - Math.floor(x), y - Math.floor(y));
}

function warp(uv: THREE.Vector2, mouse: THREE.Vector2, t: number) {
	const p = uv.clone().sub(new THREE.Vector2(0.5, 0.5)).sub(mouse.clone().multiplyScalar(0.42));
	const r = p.length();
	const w = new THREE.Vector2(0.5, 0.5).add(p.multiplyScalar(1 + 1.65 * r * r));
	w.x += 0.018 * Math.sin(w.y * 22 + t * 0.4);
	w.y += 0.014 * Math.cos(w.x * 18 + t * 0.3);
	return w;
}

function cellGame(uv: THREE.Vector2, mouse: THREE.Vector2, t: number): Game {
	const w = warp(uv, mouse, t);
	const n = new THREE.Vector2(w.x * COLS, w.y * ROWS);
	const gv = n.clone().floor();
	let md = 8;
	let mg = gv.clone();
	for (let j = -1; j <= 1; j++) {
		for (let i = -1; i <= 1; i++) {
			const g = new THREE.Vector2(gv.x + i, gv.y + j);
			const o = hash22(g).multiplyScalar(0.72);
			const d = g.clone().add(o).sub(n).length();
			if (d < md) {
				md = d;
				mg = g;
			}
		}
	}
	const id = Math.abs(Math.floor(mg.x + mg.y * 17.0 + 8.0)) % games.length;
	return games[id];
}

export function createGallery(
	canvas: HTMLCanvasElement,
	onSelect: (game: Game | null) => void,
	onHover?: (game: Game | null) => void
) {
	const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
	renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
	renderer.setClearColor(0x050705, 1);
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 20);
	camera.position.set(0, 0.08, 2.35);
	camera.lookAt(0, 0, 0);

	const atlas = makeAtlas();
	const uniforms = {
		uAtlas: { value: atlas },
		uMouse: { value: new THREE.Vector2(0, 0) },
		uTime: { value: 0 },
		uGrid: { value: new THREE.Vector2(COLS, ROWS) },
		uCount: { value: 32 }
	};

	// Use RawShaderMaterial with GLSL3 for modern WebGL2 rendering
	const material = new THREE.RawShaderMaterial({
		vertexShader: VERT,
		fragmentShader: FRAG,
		uniforms,
		glslVersion: THREE.GLSL3
	});

	const mesh = new THREE.Mesh(
		new THREE.PlaneGeometry(3.6, 2.05, 80, 50),
		material
	);
	mesh.rotation.x = -0.18;
	scene.add(mesh);

	const mouse = new THREE.Vector2();
	const target = new THREE.Vector2();
	let t = 0;
	let selected: Game | null = null;
	let hovered: Game | null = null;

	function resize() {
		const w = canvas.clientWidth;
		const h = canvas.clientHeight;
		renderer.setSize(w, h, false);
		camera.aspect = w / h;
		camera.updateProjectionMatrix();
	}

	function uvFromEvent(e: PointerEvent) {
		const r = canvas.getBoundingClientRect();
		return new THREE.Vector2((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height);
	}

	const onMove = (e: PointerEvent) => {
		const uv = uvFromEvent(e);
		target.set(uv.x * 2 - 1, uv.y * 2 - 1);
		mouse.copy(uv);

		if (onHover) {
			const g = cellGame(uv, uniforms.uMouse.value, t);
			if (g?.id !== hovered?.id) {
				hovered = g;
				onHover(g);
			}
		}
	};

	const onClick = (e: PointerEvent) => {
		const game = cellGame(uvFromEvent(e), uniforms.uMouse.value, t);
		selected = selected?.id === game.id ? null : game;
		onSelect(selected);
	};

	canvas.addEventListener('pointermove', onMove);
	canvas.addEventListener('pointerdown', onClick);
	const ro = new ResizeObserver(resize);
	ro.observe(canvas);
	resize();

	let raf = 0;
	const loop = () => {
		raf = requestAnimationFrame(loop);
		t += 0.016;
		uniforms.uTime.value = t;
		uniforms.uMouse.value.lerp(target, 0.06);
		renderer.render(scene, camera);
	};
	loop();

	return () => {
		cancelAnimationFrame(raf);
		ro.disconnect();
		canvas.removeEventListener('pointermove', onMove);
		canvas.removeEventListener('pointerdown', onClick);
		mesh.geometry.dispose();
		material.dispose();
		atlas.dispose();
		renderer.dispose();
	};
}
