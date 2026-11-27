// Shared site behaviour: renders the bottom dock nav on every page.
// Edit NAV to add/rename pages; the active item is matched by filename.

const RESUME_URL = "https://drive.google.com/file/d/1XJGR00j4oUuAVtvAtGVRbLwLVszcom9n/view?usp=sharing";

const ICONS = {
  home: "M217.47,105.24l-80-75.5-.09-.08a13.94,13.94,0,0,0-18.83,0l-.09.08-80,75.5A14,14,0,0,0,34,115.55V208a14,14,0,0,0,14,14H96a14,14,0,0,0,14-14V160a2,2,0,0,1,2-2h32a2,2,0,0,1,2,2v48a14,14,0,0,0,14,14h48a14,14,0,0,0,14-14V115.55A14,14,0,0,0,217.47,105.24ZM210,208a2,2,0,0,1-2,2H160a2,2,0,0,1-2-2V160a14,14,0,0,0-14-14H112a14,14,0,0,0-14,14v48a2,2,0,0,1-2,2H48a2,2,0,0,1-2-2V115.55a2,2,0,0,1,.65-1.48l.09-.08,79.94-75.48a2,2,0,0,1,2.63,0L209.26,114l.08.08a2,2,0,0,1,.66,1.48Z",
  about: "M229.19,213c-15.81-27.32-40.63-46.49-69.47-54.62a70,70,0,1,0-63.44,0C67.44,166.5,42.62,185.67,26.81,213a6,6,0,1,0,10.38,6C56.4,185.81,90.34,166,128,166s71.6,19.81,90.81,53a6,6,0,1,0,10.38-6ZM70,96a58,58,0,1,1,58,58A58.07,58.07,0,0,1,70,96Z",
  work: "M229.18,173a6,6,0,0,1-2.16,8.2l-96,56a6,6,0,0,1-6,0l-96-56a6,6,0,0,1,6-10.36l93,54.23,93-54.23A6,6,0,0,1,229.18,173ZM221,122.82l-93,54.23L35,122.82a6,6,0,0,0-6,10.36l96,56a6,6,0,0,0,6,0l96-56a6,6,0,0,0-6-10.36ZM26,80a6,6,0,0,1,3-5.18l96-56a6,6,0,0,1,6,0l96,56a6,6,0,0,1,0,10.36l-96,56a6,6,0,0,1-6,0l-96-56A6,6,0,0,1,26,80Zm17.91,0L128,129.05,212.09,80,128,31Z",
  resume: "M90,96a6,6,0,0,1,6-6h64a6,6,0,0,1,0,12H96A6,6,0,0,1,90,96Zm6,38h64a6,6,0,0,0,0-12H96a6,6,0,0,0,0,12Zm32,20H96a6,6,0,0,0,0,12h32a6,6,0,0,0,0-12ZM222,48V156.69a13.94,13.94,0,0,1-4.1,9.9L166.59,217.9a13.94,13.94,0,0,1-9.9,4.1H48a14,14,0,0,1-14-14V48A14,14,0,0,1,48,34H208A14,14,0,0,1,222,48ZM48,210H154V160a6,6,0,0,1,6-6h50V48a2,2,0,0,0-2-2H48a2,2,0,0,0-2,2V208A2,2,0,0,0,48,210Zm153.52-44H166v35.52Z",
  // Playground: a paintbrush (drawn with stroke, see .stroke in CSS)
  playground: '<g class="stroke"><path d="M205 33a17 17 0 0 1 24 24l-82 86-28-28z"/><path d="M119 115l28 28"/><path d="M119 115c-26-6-50 6-58 32-6 20-10 38-31 49 34 14 86 6 108-24 9-13 10-29 0-29"/></g>',
  contact: "M154.2,38.45a6,6,0,0,1,7.35-4.25A84.24,84.24,0,0,1,221.8,94.45a6,6,0,0,1-4.25,7.35,5.94,5.94,0,0,1-1.55.2,6,6,0,0,1-5.8-4.45A72.34,72.34,0,0,0,158.45,45.8,6,6,0,0,1,154.2,38.45ZM150.45,77.8C165,81.68,174.32,91,178.2,105.55A6,6,0,0,0,184,110a5.94,5.94,0,0,0,1.55-.2,6,6,0,0,0,4.25-7.35c-5-18.71-17.54-31.25-36.25-36.25a6,6,0,1,0-3.1,11.6Zm79.44,97A54.25,54.25,0,0,1,176,222C97.7,222,34,158.3,34,80A54.25,54.25,0,0,1,81.17,26.11,14,14,0,0,1,95.73,34.5l21.1,47.1a14,14,0,0,1-1.12,13.28,6,6,0,0,1-.42.57L94.22,120.51a1.89,1.89,0,0,0,0,1.67c7.66,15.68,24.1,32,40,39.65a1.88,1.88,0,0,0,1.68-.06l24.69-21a4.81,4.81,0,0,1,.56-.42,14,14,0,0,1,13.28-1.22l47.24,21.17A14,14,0,0,1,229.89,174.83ZM218,173.32a2,2,0,0,0-1.21-2l-47.25-21.17a1.92,1.92,0,0,0-1.6.1l-24.68,21c-.18.15-.37.29-.56.42a14,14,0,0,1-13.77,1c-18.36-8.87-36.66-27-45.53-45.19a14,14,0,0,1,.91-13.73,4.73,4.73,0,0,1,.43-.57l21.06-25.06a2,2,0,0,0,0-1.67L84.74,39.31A2,2,0,0,0,82.9,38h-.23A42.24,42.24,0,0,0,46,80c0,71.68,58.32,130,130,130A42.24,42.24,0,0,0,218,173.32Z",
};

const NAV = [
  { label: "Home",    href: "index.html",   icon: "home" },
  { label: "Work",    href: "work.html",    icon: "work" },
  { label: "Playground", href: "playground.html", icon: "playground" },
];

(function renderDock() {
  const here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const nav = document.createElement("nav");
  nav.className = "dock";
  nav.setAttribute("aria-label", "Main");
  nav.innerHTML = NAV.map((item) => {
    const current = !item.external && item.href === here ? ' aria-current="page"' : "";
    const ext = item.external ? ' target="_blank" rel="noopener"' : "";
    return `<a href="${item.href}" data-label="${item.label}" aria-label="${item.label}"${current}${ext}>` +
      `<svg viewBox="0 0 256 256" aria-hidden="true">${ICONS[item.icon].startsWith("<") ? ICONS[item.icon] : `<path d="${ICONS[item.icon]}"/>`}</svg></a>`;
  }).join("");
  document.body.appendChild(nav);
})();

const REDUCED_MOTION = matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------------------------------------------------------------------------
// "Line boil" glitch on hand-drawn art (home: the cat and the dotted illustrations).
// Same technique as the Framer site: an SVG turbulence + displacement filter
// whose seed and strength are re-randomised every 100ms.
//   data-boil="coarse" → soft wobble (cat)   "fine" → grainy jitter (floral)   "dots" → subtle (dot art)
// ---------------------------------------------------------------------------
(function lineBoil() {
  const targets = document.querySelectorAll("[data-boil]");
  if (!targets.length || REDUCED_MOTION) return;
  // name: [noise frequency, max displacement px]
  const FREQ = { coarse: [0.04, 2], fine: [0.617, 2], dots: [0.617, 0.7] };
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("aria-hidden", "true");
  svg.style.cssText = "position:absolute;width:0;height:0";
  const filters = Object.entries(FREQ).map(([name, [freq, max]]) => {
    svg.insertAdjacentHTML("beforeend",
      `<filter id="boil-${name}" color-interpolation-filters="sRGB">` +
      `<feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="4" seed="1" stitchTiles="stitch"/>` +
      `<feDisplacementMap in="SourceGraphic" scale="1" xChannelSelector="R" yChannelSelector="G"/></filter>`);
    const f = svg.lastElementChild;
    return { turb: f.firstElementChild, disp: f.lastElementChild, max };
  });
  document.body.appendChild(svg);
  targets.forEach((el) => (el.style.filter = `url(#boil-${el.dataset.boil})`));
  setInterval(() => {
    filters.forEach(({ turb, disp, max }) => {
      turb.setAttribute("seed", String(Math.floor(Math.random() * 1000)));
      disp.setAttribute("scale", (Math.random() * max).toFixed(2));
    });
  }, 100);
})();

// ---------------------------------------------------------------------------
// Home: dotted illustrations (Work + Playground cards).
// Each drawing is painted in greyscale onto an offscreen canvas, then turned into a
// grid of navy dots with ordered (Bayer) dithering — the same look as the floral
// pattern in the top-right corner. Hovering the card "blooms" the drawing (b: 0 → 1).
// Text and the arrow are masked out so dots never sit under them.
// ---------------------------------------------------------------------------
const DOT = { pitch: 3.4, radius: 1.2, dark: "#3b4062", light: "#5a6089" };
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

// small helpers for the drawings (all draw in black; alpha = dot density)
const A = (a) => `rgba(0,0,0,${a})`;
function bez(p0, p1, p2, p3, t) {
  const u = 1 - t;
  return [u*u*u*p0[0] + 3*u*u*t*p1[0] + 3*u*t*t*p2[0] + t*t*t*p3[0],
          u*u*u*p0[1] + 3*u*u*t*p1[1] + 3*u*t*t*p2[1] + t*t*t*p3[1]];
}
function vine(ctx, pts, grow, width = 4.5) { // cubic bezier drawn up to `grow` (0..1)
  ctx.beginPath();
  const steps = 60, n = Math.max(1, Math.round(steps * grow));
  for (let i = 0; i <= n; i++) {
    const [x, y] = bez(...pts, i / steps);
    i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
  }
  ctx.lineWidth = width; ctx.lineCap = "round"; ctx.strokeStyle = A(1); ctx.stroke();
}
function leaf(ctx, x, y, ang, len) { // outlined leaf with half-tone fill
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
  ctx.beginPath(); ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(len * 0.5, -len * 0.42, len, 0); ctx.quadraticCurveTo(len * 0.5, len * 0.42, 0, 0);
  ctx.fillStyle = A(0.4); ctx.fill();
  ctx.lineWidth = 3.5; ctx.strokeStyle = A(1); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(len * 0.8, 0); ctx.lineWidth = 2.5; ctx.stroke();
  ctx.restore();
}
function petal(ctx, cx, cy, ang, dist, len, wid, fill = 0.38) { // outlined petal
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(ang);
  ctx.beginPath(); ctx.ellipse(dist, 0, len / 2, wid / 2, 0, 0, Math.PI * 2);
  ctx.fillStyle = A(fill); ctx.fill(); ctx.lineWidth = 3.5; ctx.strokeStyle = A(1); ctx.stroke();
  ctx.restore();
}
function curl(ctx, x, y, r, dir = 1, turns = 1.3) { // spiral tendril
  ctx.beginPath();
  for (let i = 0; i <= 40; i++) {
    const p = i / 40, a = dir * p * turns * Math.PI * 2, rr = r * (1 - p * 0.8);
    const px = x + Math.cos(a) * rr, py = y + Math.sin(a) * rr;
    i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
  }
  ctx.lineWidth = 3.5; ctx.strokeStyle = A(1); ctx.stroke();
}
function halo(ctx, x, y, r, a = 0.14) {
  const g = ctx.createRadialGradient(x, y, r * 0.3, x, y, r);
  g.addColorStop(0, A(a)); g.addColorStop(1, A(0));
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
}
function sparkle(ctx, x, y, s, a = 1) { // 4-point star
  ctx.fillStyle = A(a); ctx.beginPath();
  ctx.moveTo(x, y - s); ctx.quadraticCurveTo(x, y, x + s, y); ctx.quadraticCurveTo(x, y, x, y + s);
  ctx.quadraticCurveTo(x, y, x - s, y); ctx.quadraticCurveTo(x, y, x, y - s); ctx.fill();
}
const rand = (i) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

// Sanjana's flower (from her pixel drawing), one character per dot: 1 = dot.
const FLOWER = [
    "0000000110000000000000000000111000000000000000000",
    "0000000110000000000000000011100000000000000000000",
    "0000000110000000000000000111000000000000000000000",
    "0000000010000000000000001110000000000000000000000",
    "0000000010000000000000001100000000001000000000000",
    "0000000001000000000000011000000000001100000000000",
    "0000000001000000000010011000000000001100000000000",
    "0000000000100000000100110000111000000100001000000",
    "0111000000100000001100110011100000000100001100001",
    "0011000000011000001100110111000000000100001100001",
    "0011000000000100011100110110000000000100000100011",
    "0000100000010010011100110100011111001000001100001",
    "0000100001110001001100111000111000001001001000001",
    "0000010011000000101100110001110000101001101000001",
    "0000001111000011011100110011100000010001111000010",
    "0000000110000011001110010011000000010001111110010",
    "1100000110110001001110110111000000110011011110100",
    "1110000110001000101011111111000000110001000010100",
    "0111000111000110011101101111000001110000100011000",
    "0000110011100000110100111111100010110001000110000",
    "0000001111110001111111111111100001110110001110000",
    "0000000001111011010011111111100011101000011100000",
    "0000000000011111000011111111101111110001111000000",
    "0000000000000011111111111111111111111111111100000",
    "0000000000000000011111100111111111110001100000000",
    "0000011000011110111000001011111001110000000000000",
    "0000011111110001110000011011101110111000000000110",
    "0000000000000001100000111011111110011111111111110",
    "0000000000000001100000111011111111011100000000000",
    "0000000000000011100000110011011011001110000000000",
    "0000000000000001110010110010001111010110000000000",
    "0000000000000000011100110010000011000011000100000",
    "0000000000000000000000110010100011000000111100000",
    "0000000000000000000000011111000111000000000000000",
    "0000000000000000000000000100001110000000000000000",
    "0000000000000000000000000100011110000000000000000",
    "0000000000000000000000000100000000000000000000000",
    "0000000000000000000000000100000000000000000000000",
    "0000000000000000000000001000000000000000000000000",
    "0000000000000000000000001000000000000000000000000",
    "0000000000000000000000010000000000000000000000000",
    "0000000000000000000000010000000000000000000000000",
    "0000000000000000000000100000000000000000000000000",
    "0000000000000000000001100000000000000000000000000",
    "0000000000000000000001000000000001100000000000000",
    "0000000000000000000011000000001111110000000000000",
    "0000000000000000000010000000111100000000000000000",
    "0000000000000000000100000011100000000000000000000",
    "0000000000000000000100001100000000000000000000000",
    "0000000000000000001000011000000000000000000000000",
    "0000000000000000001001100000000000000000000000000",
    "0000000000000000010011000000000000000000000000000",
    "0000000000000000010110000000000000000000000000000",
    "0000000000000000010100000000000000000000000000000",
    "0000000000000000101000000000000000000000000000000",
    "0000000000000000110000000000000000000000000000000",
    "0000000000000000100000000000000000000000000000000",
    "0000000000000000100000000000000000000000000000000",
    "0000000000000001100000000000000000000000000000000",
    "0000000000000001000000000000000000000000000000000",
    "0000000000000001000000000000000000000000000000000",
    "0000000000000001000000000000000000000000000000000",
    "0000000000000001000000000000000000000000000000000",
    "0000000000000001000000000000000000000000000000000",
    "0000000000000001000000000000000000000000000000000",
    "0000000000000000100000000000000000000000000000000",
    "0000000000000000100000000000000000000000000000000",
    "0000000000000000100000000000000000000000000000000",
    "0000000000000000100000000000000000000000000000000",
    "0000000000000000100000000000000000000000000000000",
    "0000000000000000010000000000000000000000000000000",
    "0000000000000000010000000000000000000000000000000",
    "0000000000000000010000000000000000000000000000000"
];
const FLOWER_BLOOM_ROWS = 36; // rows above this are the bloom, below is the stem + leaf
const LEAF_ROWS = [44, 54];   // rows holding the leaf; it joins the stem just below row 54

// outline + half-tone fill for a set of shapes drawn by `shape(ctx)`
function inked(ctx, shape, fill = 0.38, line = 3.5) {
  ctx.save();
  ctx.lineWidth = line * 2; ctx.strokeStyle = A(1); ctx.lineJoin = "round"; ctx.lineCap = "round";
  ctx.beginPath(); shape(ctx); ctx.stroke();
  ctx.globalCompositeOperation = "destination-out"; ctx.fillStyle = A(1);
  ctx.beginPath(); shape(ctx); ctx.fill();
  ctx.globalCompositeOperation = "source-over"; ctx.fillStyle = A(fill);
  ctx.beginPath(); shape(ctx); ctx.fill();
  ctx.restore();
}

function leanFor(vx, vy, want) {
  let best = 0, err = Infinity;
  for (let a = -0.8; a <= 0.8; a += 0.005) {
    const e = Math.abs(vx * Math.cos(a) - vy * Math.sin(a) - want);
    if (e < err) { err = e; best = a; }
  }
  return best;
}

const ART = {
  // Work: a laptop anchored bottom-right (partly cropped) — web page and stars on screen,
  // keyboard and trackpad. On hover a cursor swoops in from the left, stars twinkle, keys get "typed"
  // and the page's text lines fill in.
  work(ctx, S, b, t) {
    // anchored bottom-right: a little cropped off the right edge, keyboard runs off the bottom
    const sw = Math.min(S.w * 0.66, (S.h * 0.98) / (0.705 + 0.36 * 0.72));
    const sh = sw * 0.625, bez = sw * 0.04;
    const lw = sw + bez * 2, lh = sh + bez * 2;
    const lx = S.x + S.w - lw * 0.95, ly = S.y + S.h - (lh + sw * 0.36 * 0.72);
    const cx = lx + lw / 2;
    const sx = lx + bez, sy = ly + bez;
    // lid + screen
    ctx.strokeStyle = A(1); ctx.lineWidth = 4.5;
    ctx.beginPath(); ctx.roundRect(lx, ly, lw, lh, 12); ctx.stroke();
    ctx.lineWidth = 3; ctx.strokeStyle = A(0.7);
    ctx.beginPath(); ctx.roundRect(sx, sy, sw, sh, 4); ctx.stroke();
    ctx.fillStyle = A(1); ctx.beginPath(); ctx.arc(cx, ly + bez * 0.5, 2.2, 0, 7); ctx.fill(); // camera
    // web page on screen
    ctx.strokeStyle = A(1); ctx.lineWidth = 3.5;
    ctx.beginPath(); ctx.moveTo(sx, sy + sh * 0.1); ctx.lineTo(sx + sw, sy + sh * 0.1); ctx.stroke();
    for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(sx + 10 + i * 10, sy + sh * 0.05, 2.6, 0, 7); ctx.fill(); }
    ctx.fillStyle = A(0.3); ctx.fillRect(sx + sw * 0.3, sy + sh * 0.035, sw * 0.4, sh * 0.035);
    const g = ctx.createLinearGradient(sx, sy, sx + sw * 0.45, sy + sh * 0.6);
    g.addColorStop(0, A(0.55)); g.addColorStop(1, A(0.2));
    ctx.fillStyle = g; ctx.fillRect(sx + sw * 0.06, sy + sh * 0.18, sw * 0.42, sh * 0.38);
    ctx.lineWidth = 3.4;
    [0.9, 0.7, 0.85, 0.5].forEach((l, i) => {
      const x0 = sx + sw * 0.54, len = sw * 0.38 * l * (0.6 + 0.4 * b);
      const y = sy + sh * (0.22 + i * 0.085);
      ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x0 + len, y); ctx.stroke();
    });
    ctx.fillStyle = A(1); ctx.fillRect(sx + sw * 0.54, sy + sh * 0.5, sw * 0.16, sh * 0.06); // button
    // a few stars on the screen (they twinkle on hover)
    [[0.16, 0.78, 10], [0.36, 0.88, 6], [0.52, 0.74, 8], [0.72, 0.86, 11], [0.9, 0.72, 6], [0.88, 0.3, 7], [0.06, 0.6, 5]].forEach(([fx, fy, r], i) => {
      const tw = b ? 0.65 + 0.35 * Math.sin(t * 3 + i * 1.9) : 1;
      sparkle(ctx, sx + sw * fx, sy + sh * fy, r * (sw / 300) * tw * 2.2);
    });
    // base (keyboard deck) in slight perspective
    const by = ly + lh, bh = sw * 0.36;
    const topW = lw * 1.02, botW = lw * 1.24;
    const deck = (c) => {
      c.moveTo(cx - topW / 2, by); c.lineTo(cx + topW / 2, by);
      c.lineTo(cx + botW / 2, by + bh); c.lineTo(cx - botW / 2, by + bh); c.closePath();
    };
    inked(ctx, deck, 0, 2.25);
    ctx.lineWidth = 6; ctx.strokeStyle = A(1);
    ctx.beginPath(); ctx.moveTo(cx - topW / 2, by); ctx.lineTo(cx + topW / 2, by); ctx.stroke(); // hinge
    // keys: 4 rows + space bar, widening toward the front; some get "pressed" on hover
    const rowW = (y) => topW + (botW - topW) * ((y - by) / bh);
    let k = 0;
    const step = Math.max(10.5, bh * 0.14); // keep a dot-sized gap between key rows
    for (let r = 0; r < 5; r++) {
      const y = by + bh * 0.08 + r * step, h = Math.max(6.8, step - 4.5), w = rowW(y) * 0.86;
      const n = r === 4 ? 3 : 12;
      const widths = r === 4 ? [0.2, 0.6, 0.2] : Array(n).fill(1 / n);
      let x = cx - w / 2;
      widths.forEach((f) => {
        const kw = w * f;
        const pressed = b > 0.05 && rand(k + Math.floor(t * 7) * 31) > 0.88;
        ctx.fillStyle = A(pressed ? 1 : 0.5);
        ctx.beginPath(); ctx.roundRect(x + 2, y, kw - 4.5, h, 2); ctx.fill();
        x += kw; k++;
      });
    }
    // trackpad
    const tpw = topW * 0.3, tph = bh * 0.17, tpy = by + bh * 0.08 + 5 * step + 2, tpx = cx - tpw / 2;
    ctx.lineWidth = 3; ctx.strokeStyle = A(0.9);
    ctx.beginPath(); ctx.roundRect(tpx, tpy, tpw, tph, 4); ctx.stroke();
    // cursor: on hover it swoops in from the left edge, big, and shrinks as it lands on the
    // screen; once there it glides gently around the page
    if (b > 0.01) {
      const p = b * b * (3 - 2 * b); // smoothstep
      const land = Math.min(1, b * 1.2);
      const gx = Math.cos(t * 1.4) * 0.22 * land, gy = Math.sin(t * 2.1) * 0.2 * land;
      const tx = sx + sw * (0.55 + gx), ty = sy + sh * (0.42 + gy);                 // on the screen
      const fx0 = S.x - 40, fy0 = S.y + S.h * 0.32;                                 // off the left edge
      const c1x = S.x + S.w * 0.1, c1y = S.y - S.h * 0.05;                          // swoop arc
      const u = 1 - p;
      const cux = u * u * fx0 + 2 * u * p * c1x + p * p * tx;
      const cuy = u * u * fy0 + 2 * u * p * c1y + p * p * ty;
      const k = 1 + 1.8 * (1 - p);                                                  // big → normal
      ctx.save(); ctx.translate(cux, cuy); ctx.scale(-k, k); // mirrored: tip points up-right
      ctx.fillStyle = A(1); ctx.beginPath();
      ctx.moveTo(0, 0); ctx.lineTo(0, 18); ctx.lineTo(5, 13); ctx.lineTo(9, 21);
      ctx.lineTo(12, 19); ctx.lineTo(8, 11); ctx.lineTo(14, 11); ctx.closePath(); ctx.fill();
      ctx.restore();
    }
  },

  // Playground: Sanjana's flower, drawn dot-for-dot. On hover it turns whimsical:
  // the stem sways, the bloom breathes, pollen floats up, a little butterfly
  // flutters around it and sparkles twinkle.
  playground: { colors: { dark: "#b98309", light: "#d9a92c" }, direct(dotRaw, S, b, t) {
    // drawn as if the stem foot were bottom-left, then mirrored so it sits in the bottom-right corner
    const dot = (x, y, d) => dotRaw(2 * S.x + S.w - x, y, d);
    const rows = FLOWER.length, cols = FLOWER[0].length;
    const q = Math.max(2.8, Math.min(4.2, (S.h * 0.78) / rows, (S.w * 0.88) / cols)); // dot pitch (short enough to leave a clear gap under the text)
    // bloom stays centred; the stem curves down to the bottom-left corner of the card
    const STEM_COL = 17, STEM_TOP = FLOWER_BLOOM_ROWS - 2;
    const bloomX = S.x + S.w * 0.47;
    const ox = bloomX - cols * 0.5 * q, baseY = S.y + S.h + 8, oy = baseY - rows * q;
    const bcx = bloomX, bcy = oy + FLOWER_BLOOM_ROWS * 0.55 * q;                     // bloom centre
    const cornerX = S.x + S.w * 0.1;                                                 // stem foot, a little in from the corner
    const shift = cornerX - (ox + (STEM_COL + 0.5) * q);                             // how far the foot moves left
    const baseX = cornerX;
    const lean = 0;
    const stemCurve = (row) => {                       // 1 at the foot → 0 at the bloom, shaped like arctan
      const sUp = (rows - 1 - row) / (rows - 1 - STEM_TOP);
      const K = 7, H = (Math.atan(K * (sUp - 0.5)) + Math.atan(K / 2)) / (2 * Math.atan(K / 2));
      return 1 - H;
    };
    const sway = b * (0.04 * Math.sin(t * 1.3) + 0.015);
    const breathe = 1 + b * (0.035 + 0.025 * Math.sin(t * 2.2));
    for (let r = 0; r < rows; r++) {
      const line = FLOWER[r];
      for (let c = 0; c < cols; c++) {
        if (line[c] !== "1") continue;
        let x = ox + (c + 0.5) * q, y = oy + (r + 0.5) * q;
        if (r > STEM_TOP) { // tan-θ S-curve: steep at the foot, sweeps across the middle, steep into the bloom
          // the leaf (dots right of the stem's first run) moves as one piece, with the row where it joins the stem
          const isLeaf = r >= LEAF_ROWS[0] && r <= LEAF_ROWS[1] && c > line.indexOf("1") + 1;
          if (isLeaf) { // swing the leaf out around where it joins the stem so it doesn't run along it
            const jx = ox + 17.5 * q, jy = oy + (LEAF_ROWS[1] + 1.5) * q, a = 0.55;
            const dx = x - jx, dy = y - jy;
            x = jx + dx * Math.cos(a) - dy * Math.sin(a); y = jy + dx * Math.sin(a) + dy * Math.cos(a);
          }
          x += shift * stemCurve(isLeaf ? LEAF_ROWS[1] + 1 : r);
        }
        if (r < FLOWER_BLOOM_ROWS) { // petals breathe out from the centre, with a little flutter
          x = bcx + (x - bcx) * breathe + b * Math.sin(t * 4 + r * 0.7 + c) * 0.6;
          y = bcy + (y - bcy) * breathe + b * Math.cos(t * 3.5 + c * 0.5) * 0.6;
        }
        const k = lean + (sway - lean) * (1 - (y - oy) / (rows * q)); // lean + sway, bending more toward the top
        const dx = x - baseX, dy = y - baseY, ca = Math.cos(k), sa = Math.sin(k);
        dot(baseX + dx * ca - dy * sa, baseY + dx * sa + dy * ca, true);
      }
    }
    if (b < 0.02) return;
    { const ca = Math.cos(lean), sa = Math.sin(lean), dx = bcx - baseX, dy = bcy - baseY;
      var rbx = baseX + dx * ca - dy * sa, rby = baseY + dx * sa + dy * ca; }
    // pollen drifting up from the bloom
    for (let i = 0; i < 16; i++) {
      const life = (t * 0.35 + rand(i)) % 1;
      const px = rbx + (rand(i + 7) - 0.5) * cols * q * 0.7 + Math.sin(t * 1.5 + i) * 10;
      const py = rby - FLOWER_BLOOM_ROWS * q * 0.3 - life * S.h * 0.35;
      if (life < 0.85 * b) dot(px, py, life < 0.5);
    }
    // butterfly fluttering on a loop around the bloom
    const BF = ["1100000011", "1110000111", "1111001111", "0111111110", "0011111100", "0111001110", "0110000110"];
    const bx = rbx + Math.cos(t * 0.9) * cols * q * 0.42 + (1 - b) * S.w * 0.6;
    const byy = rby - FLOWER_BLOOM_ROWS * q * 0.5 + Math.sin(t * 1.7) * 18;
    const flap = 0.35 + 0.65 * Math.abs(Math.cos(t * 9));
    const bq = 3.6;
    BF.forEach((line, r) => [...line].forEach((v, c) => {
      if (v === "1") dot(bx + (c - 4.5) * bq * flap, byy + (r - 3) * bq, true);
    }));
    // twinkling sparkles
    for (let i = 0; i < 5; i++) {
      if (Math.sin(t * 3 + i * 2.3) < 0.2) continue;
      const x = S.x + S.w * (0.12 + rand(i + 50) * 0.76), y = S.y + S.h * (0.05 + rand(i + 60) * 0.5);
      dot(x, y, true); dot(x - 3.4, y, false); dot(x + 3.4, y, false); dot(x, y - 3.4, false); dot(x, y + 3.4, false);
    }
  } },
};

document.querySelectorAll("canvas.dot-art").forEach((canvas) => {
  const card = canvas.closest(".card"), paint = ART[canvas.dataset.art];
  const radius = () => (paint.direct ? 1.55 : DOT.radius);
  if (!card || !paint) return;
  const ctx = canvas.getContext("2d");
  const off = document.createElement("canvas");
  const octx = off.getContext("2d", { willReadFrequently: true });
  let W = 0, H = 0, dpr = 1, b = 0, target = 0, hovering = false, raf = 0, last = 0;
  const t0 = performance.now();

  function render() {
    if (!W || !H) return;
    const cr = card.getBoundingClientRect();
    const rel = (el) => { const r = el.getBoundingClientRect(); return { x: r.left - cr.left, y: r.top - cr.top, w: r.width, h: r.height }; };
    const text = rel(card.querySelector("h2").parentElement);
    const arrow = rel(card.querySelector(".btn-icon"));
    const top = text.y + text.h + 14;
    const S = { x: 0, y: top, w: W, h: H - top };
    const pad = 10, near = (x, y, r) => x > r.x - pad && x < r.x + r.w + pad && y > r.y - pad && y < r.y + r.h + pad;
    const dark = [], light = [];
    const time = (performance.now() - t0) / 1000;
    if (paint.direct) { // drawing places its own dots
      paint.direct((x, y, isDark) => {
        if (x < -4 || y < -4 || x > W + 4 || y > H + 4 || near(x, y, text) || near(x, y, arrow)) return;
        (isDark ? dark : light).push(x, y);
      }, S, b, time);
    } else {
    octx.setTransform(1, 0, 0, 1, 0, 0); octx.clearRect(0, 0, W, H);
    paint(octx, S, b, time);
    const data = octx.getImageData(0, 0, W, H).data;
    for (let gy = 0, y = DOT.pitch / 2; y < H; gy++, y += DOT.pitch) {
      for (let gx = 0, x = DOT.pitch / 2; x < W; gx++, x += DOT.pitch) {
        const a = data[((y | 0) * W + (x | 0)) * 4 + 3] / 255;
        if (a < 0.03 || a <= (BAYER[(gy & 3) * 4 + (gx & 3)] + 0.5) / 16) continue;
        if (near(x, y, text) || near(x, y, arrow)) continue;
        (a > 0.8 ? dark : light).push(x, y);
      }
    }
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
    const C = paint.colors || DOT;
    for (const [pts, col] of [[light, C.light], [dark, C.dark]]) {
      ctx.fillStyle = col; ctx.beginPath();
      const rr = radius();
      for (let i = 0; i < pts.length; i += 2) { ctx.moveTo(pts[i] + rr, pts[i + 1]); ctx.arc(pts[i], pts[i + 1], rr, 0, 6.2832); }
      ctx.fill();
    }
  }
  function layout() {
    const r = card.getBoundingClientRect();
    W = Math.round(r.width); H = Math.round(r.height); dpr = Math.min(2, devicePixelRatio || 1);
    canvas.width = W * dpr; canvas.height = H * dpr; off.width = W; off.height = H;
    render();
  }
  function tick(now) {
    raf = 0;
    if (now - last >= 30) { // ~30fps is plenty for dots
      last = now;
      b += (target - b) * (REDUCED_MOTION ? 1 : 0.075); // ~1s ease, slow enough to watch the cursor swoop
      if (Math.abs(target - b) < 0.002) b = target;
      render();
    }
    if (b !== target || (hovering && !REDUCED_MOTION)) raf = requestAnimationFrame(tick);
  }
  const go = () => { if (!raf) raf = requestAnimationFrame(tick); };
  card.addEventListener("pointerenter", () => { hovering = true; target = 1; go(); });
  card.addEventListener("pointerleave", () => { hovering = false; target = 0; go(); });
  new ResizeObserver(layout).observe(card);
  document.fonts?.ready.then(layout); // text size changes once fonts load
});

// ---------------------------------------------------------------------------
// Home: the cat strolls along the bottom of the page. 3s after load it walks
// left → right and off-screen, waits 3s, walks back right → left, waits 3s, repeats.
// ---------------------------------------------------------------------------
(function walkingCat() {
  const cat = document.querySelector(".walk-cat");
  if (!cat) return;
  if (REDUCED_MOTION) { cat.style.transform = "translateX(16px)"; return; } // just sits in the corner
  const SPEED = 48, OFF = 140; // px per second; how far off-screen it waits
  // Match the leg cycle to the walk speed so planted feet don't slide: each stance (62% of a
  // cycle) sweeps a leg ±16° about its hip; the legs are ~65 units long in the 158-unit-tall drawing.
  const px = cat.querySelector(".cat-art").getBoundingClientRect().height / 158;
  const stride = 2 * 65 * Math.sin((16 * Math.PI) / 180) * px;
  cat.style.setProperty("--step", `${(stride / SPEED / 0.62).toFixed(3)}s`);
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  async function walk(from, to, right) {
    cat.classList.toggle("to-right", right);
    cat.classList.add("walking");
    const anim = cat.animate([{ transform: `translateX(${from}px)` }, { transform: `translateX(${to}px)` }],
      { duration: (Math.abs(to - from) / SPEED) * 1000, easing: "linear", fill: "forwards" });
    await anim.finished;
    cat.classList.remove("walking");
  }
  (async () => {
    await wait(3000);
    for (;;) {
      await walk(-OFF, innerWidth + 20, true);
      await wait(3000);
      await walk(innerWidth + 20, -OFF, false);
      await wait(3000);
    }
  })();
})();

// ---------------------------------------------------------------------------
// Home: poke the cat → a little "ouch" pops up around it.
// ---------------------------------------------------------------------------
document.querySelectorAll(".walk-cat").forEach((cat) => {
  const img = cat.querySelector(".cat-art");
  cat.addEventListener("click", () => {
    // squish + wiggle on every click, including trackpad taps (which are too quick for :active)
    if (!REDUCED_MOTION) img.animate([
      { transform: "scale(1) rotate(0deg)" },
      { transform: "scale(.9, .84) rotate(-6deg)", offset: .25 },
      { transform: "scale(1.04) rotate(4deg)", offset: .6 },
      { transform: "scale(1) rotate(0deg)" },
    ], { duration: 420, easing: "cubic-bezier(.2,.8,.2,1)" });
    const o = document.createElement("span");
    o.className = "ouch"; o.textContent = "ouch";
    o.setAttribute("aria-hidden", "true");
    const side = Math.random() < 0.5 ? -1 : 1;
    o.style.setProperty("--ox", `${side * (20 + Math.random() * 30)}px`);
    o.style.setProperty("--oy", `${-10 - Math.random() * 20}px`);
    o.style.setProperty("--or", `${side * (4 + Math.random() * 10)}deg`);
    cat.appendChild(o);
    o.addEventListener("animationend", () => o.remove());
  });
});

// ---------------------------------------------------------------------------
// Work page: the dotted floral from the old Framer site, pinned to the top-right
// corner of the window. Dot positions are traced from the original artwork
// (1200 × 852 frame), stored as base-36 pairs: 3 chars x, 3 chars y, in half-pixels.
// Load: dots bloom outward from the corner. Idle: gentle twinkle.
// Hover (like the bento illustrations): the vine glitches — horizontal slices jump
// sideways with red/blue ghosting and dots flicker out — while pollen drifts down and
// sparkles pop. Eased in/out with the same
// 0.075-per-frame tween as the bento art. Reduced motion: drawn once, still.
// ---------------------------------------------------------------------------
(function workFloral() {
  const cv = document.querySelector(".work-floral");
  if (!cv) return;
  const ENC = "0rb0050rs0050vk0050vz0050wg00410p00412k0051320051ee0041ev0051fb0051fr0041g90051gq0051j30051jj0051k00050qt00n0ra00n0rr00n0vj00n0vz00n11600m12k00n14y00m15e00n16d00n1dg00n1dx00n1k000n1ki00n1kz00n1cy0160ox0160qt0160ul0160wg0160zr01610801610q01611601614y01615w01616c01616t01617a0161ci0161ev0161fb0161g80161h80161hn0161i50161im0161kj0161kz0161lh0161lx0160pe01o0qc01n0qt01n0t601o0u401o0v201o0vj01n0wg01n0wy01n0xv01n0zr01n10801n10q01n11601o14001n17q01n1dg01n1dw01n1j301n1kz01n1lg01o1lw01n1me01n0ul01o0xf01o14g01o18701o1c001o1im01o1jj01o0pf0250qc0260tm0250yd0250zr0251090251880261c00251ci0250pu0260rb0260rs0260s80260sp0260t602613j02618q0261bk0261j30261jj0261k00261kz0261lh0261lx0261me0261mv0261nb0260nz02n0og02n0ow02n0pu02n0qc02n0qt02n0ra02n0rs02n0t602n0u302n0yt02n18p02n1b302n1j302n1k002n1ki02n1kz02n1lw02n1me02n1mu02n1nb02n1nt02n13202o1bk02o1jj02o0ny0360og0361lw0360mk0360n10360ni0360ox0360qc0360rs03613203615f03615w03616c0361960361am0361j20361jj0361k00361me0361nt0361oa0360ny03n1k003o0mk03o0oy03o0pf03o0ra03o0za03o10803o11703o13203o14y03o15e03o16s03o19703o1a403p1al03o1b303p1bk03o1c003o1ki03o1me03o1nc03o1nt03o1oa03o0m20460em0460oy0460pe0460qu0460za0460zs04610804610q04611704713204614004714y04615e0461960461a40471am0471b20471bk0461im0471j20471k00461me0461nt0471oa0461or0470ox04o0e404o0j904o0jq04o0k804o0ko04o0l604o0pe04o0qu04o0za04o10904o10q04o11604o14004o16t04o19o04o1a404o1am04o1b204o1im04o1j204o1ki04o1nt04o1oa04o1or04o1p704o0e40560hw0570ic0570it0570ja0570jq0560k80570kp0560l60560m20560n00570pe0570pw0560qc0570rs0570s90560sp0560vy0560wh0570wy0570za05613j05717r05718805719705719n0571am0561b20571bk0571im0561j20561k00561ns0571or0571p70571pp0570ek05p0f105p0fi05o0gh05p0gx05p0he05o0hw05p0ic05p0j905p0k805p0ko05o0nh05o0pv05o0qc05p0qt05o0ra05o0rs05p0wh05p0wy05p0ys05o14005p14h05p14y05o15e05p15w05p16c05p18805p19805o19o05o1a505p1am05o1b205o1nt05o1oa05p1or05p1p805o1pp05p1q605p1t005o0f10660yd0661870661or0650ek0660fi0660g00660gy0660he0660hv0660is0660ko0660l60660ln0660m40660mk0660nz0660of0660pe0660pw0660qc0660qs0660ra0660wy06615w06616d06617906619606619o0661cz0661fb0661nt0661pp0661q60661qn0661r30661sj0661t00660l606o0ox06o1nt06o1qn06n1rl06o1si06o0gh06p0he06o0ko06o0lm06o0nh06o0og06o0pw06o0qt06o0ra06o0xf06o14y06o15w06o16c06o16t06o17q06o18q06o19606o19o06o1a406o1ee06o1po06o1r406o1s206o0pw0760e40770ek0770f00760gx0760k70770l60770nz0770qc0770qs0770ra07715w07716c07716t07717a07718707718p07719607719o0771a40771dg0771ee0761nc0771ns0761p70771r40771rl0771s20770co07p0el07p0f007o0fz07o0pd07p0pv07p0qc07p0qs07p14y07p16u07p17a07p17r07p18707p18p07p19607p1oq07p1q507p0bs0870cp0870d40860e40860f10870fj0870k80870kp0860l60860qc0870qs0870s908716c08716t08617a08717q08718p0871960871am0861b20871dg0871dx0871ee0871j20871jj0871k00871or0871q60871qm0871r30870d508p0dm08p0e308p0g008p0pe08p0qc08p0rs08p0um08p0vj08p16t08p17a08p17q08p18708p18p08p1a408p1al08p1b208p1dg08o1dw08p1eu08p1il08p1k008p1ki08p1oq08p1pp08p1qn08p1r408p1rl08p0pw08q0v208q19n08q0e40970fj0970qc0980qt0980rr0970u40980vk0970w009716t09717q09818809718o09719o0981a40971al0971bj0971c00981dx0971i50981jj0971k00971o80981oq0971po0971qm0970bs0980g00980rb09816c0981b20981p60980ra09q0rs09q0vk09p16t09p17q09p18809p18o09q1a409p1am09q1b109p1c009q1dg09p1dw09q1o909q1p709p1qm09q0fj09q0qc09q0s809q0to09q0u409q0w009q15w09q16c09q17a09q19o09q1cz09q1eu09q0vk0a81o90a70fj0a80qc0a80qt0a80ra0a80rr0a80s80a80so0a80tn0a80u30a815e0a815v0a816t0a817a0a81880a81970a819o0a81a40a81am0a81c10a81ci0a81cz0a81dg0a81ee0a81i40a81nc0a81qm0a80ra0ap0tm0aq14x0ap17q0aq1880aq1am0ap1bk0aq1c00ap1ci0aq1dw0aq1ns0aq1qm0ap1t00aq0g00aq0jr0aq0qt0aq0rr0aq0s80aq0so0aq0t50aq0u30aq0uk0aq16t0aq1970aq19n0aq1cy0aq1o90aq1q40aq0t50b71880b81nc0b81sj0b80el0b80f20b90fi0b80gi0b80qu0b80rb0b80s80b80tn0b90u30b80uk0b816u0b817a0b81980b819o0b81a40b81h80b81ho0b81i40b81il0b81ns0b81q40b81qm0b81rl0b81s20b81t00b80f10bq0fi0br0gx0bq0ja0bq0qu0bq0ra0br0rs0br0s80br0tn0br0u40br0uk0bq15e0br15w0br16c0br16t0br17a0bq1880br1970bq19o0br1h70bq1ho0bq1i40bq1mv0bq1q40bq1rk0br1t00bq1j20bs0ek0c90f00c90he0c80hw0c90ir0c90rb0c90rs0c90s80c90tm0c90u30c915w0c916c0c916t0c91880c918q0c91960c919o0c91a40c91gq0c81jj0c91k00c91ki0c91kz0c91lg0c91lw0c91me0c91nc0c90rs0cq0s80cq0so0cr0u30cr0uk0cr13j0cr1400cr14g0cr14x0cr15e0cr15w0cr16c0cq1880cr18q0cr1960cq19o0cr1h80cq1ho0cq1mu0cr1nc0cr1nu0cr0sp0da0ul0d90v20d913j0d913z0d914g0d914x0d915e0d915w0d91880d918q0d91mv0d91nc0d91nt0d90he0da0hw0da19o0da1j20da1sk0da1t00da0he0dr0hw0dr0t60dr0vj0dr1230dr12k0dr1310dr13i0dr1400dr14g0dr14x0dr15e0dr1880dr18p0dr1960dr19o0dr1a40dr1im0dr1j20ds1jj0dr1md0dr1mu0dr1nc0dr1nt0dr0gy0ea0hw0e90to0e90vj0e90wg0ea12k0e91320e913i0e914g0ea1960e919o0e91a40e91am0e91i40e91im0ea1j20e91mu0e90he0er0uk0er0xf0er0xw0er0yc0er14h0er18p0er1960es1nc0er1nt0er0vj0es0w00es1al0es1i40es1im0es1mv0es0vj0fb0w00fb0wg0fb0wy0fb0zb0fb1090fb1160fb11n0fb1240fb12k0fb1310fb13i0fb19n0fb1am0fa1b20fa1im0fb1j20fb1jj0fb0xf0ft0xv0ft0yc0ft11n0ft1b20ft1bk0ft0wy0fu1bk0gb1c00gb1ch0gb1ci0gs1cz0gt1dg0hd1dw0hc1cz0hu1ed0hv1ev0hu1c00id1ci0id1cz0id1dg0id1dw0id1ee0id1fb0id1fs0id1bk0iv1c00iv1ci0iv1cy0iv1eu0iv1g90iv1bk0je1c00je1gp0jd1am0je1b30je1fa0je1h60je1am0jw1b30jw1bk0jw1fs0jw1h70jw1hn0jw1a40ke1b20ke1bk0ke1cy0kf1dg0kf1dw0kf1ee0kf1fr0ke1ho0ke1i40ke1im0kf19o0kx1a40kx1bk0kw1ci0kw1dx0kx1ee0kx1fr0kx1j30kx19n0lf1a40lf1b20lf1c00le1fs0lf1i40lf1jk0lf1a40ly19n0ly1am0ly1cy0ly1fb0ly1i40ly1j30ly1k20ly19n0mf1a40mf1am0mf1bj0mf1cy0mf1dg0mf1eu0mg1i40mf1k10mg1ee0mg1960my1a40mx1dw0mx1ed0my1kj0my1eu0my1960ng19o0ng1am0ng1eu0ng1im0ng1jj0nh1kz0nh1960nz19o0nz1eu0ny1i40ny1kz0ny1960oh19o0oh1ee0oh1i40oh1k20oh1kz0oh1lg0oh18q0oz1970oz1i40oy1ky0p01lg0oz18p0ph1kz0pi1lg0ph19o0pi1ho0pi1880q018q0pz1gp0pz1h60q01ky0pz1lg0q017a0qi17r0qi1880qi18p0qi1dw0qi1ee0qi1eu0qi1fs0qj1gp0qi1kh0qi1ly0qi1dg0r01dw0r01fs0r01kh0r01ly0r01fb0ri1fs0rj1kh0ri1ly0ri1fb0s01kh0s11ly0s11h60sk1k10sj1ly0sj1hn0t11jk0t21lg0t21gq0t21h70t21im0t21j20t21k00t21kh0t21gq0tk1h60tk1im0tl1j30tk1jj0tk1k00tk1lg0tk1g80u31im0u31j30u31jk0u31k00u31kz0u31lg0u31gq0ul1h60ul1hn0ul1i40ul1im0ul1jj0ul1ki0ul1kz0ul1lg0ul1jj0v31k00v31ki0v31ky0v31lg0v31jk0vm1k00vm1ki0vm1ky0vm1j30w41jj0w41ki0w41kz0w41j30wm1jk0wn1k00wn1ki0wn1i40x51il0x41k00x51ki0x41hn0xn1jj0xn1k00xn1j30xo1im0y51j30y51hn0y61jk0y61k00y61fa0yn1fr0yn1h70yo1ho0yo1im0yn1jk0yn1gq0yo1i40yo1g90z61gp0z61h70z61ho0z61i40z71im0z71j20z71gp0zp1ho0zp1i50zp1im0zp1j30zp1jj0zp1gp1071ho1071i51071h61081df10p1ho10p1de1181dw1181ec1181gq1181h61181k11181ki1181h611q1dv11r1ed11r1eu11r1fa11r1fq11r1gq11r1k111r1bj1291bz1291cg1291cy1291ec1291eu1291g81291gp12a1i51291im1291l01291dv12a1bz12r1ch12r1cy12r1de12r1dv12r1eu12r1fr12r1g812r1gp12s1im12r1jj12r1ec13a1fr13a1g913a1gq13a1im13a1j313a1jj13a1k01391kh1391et13a1bh13s1by13t1ec13s1et13s1fr13s1g813s1gp13t1j313t1jk13s1k013s1ki13s1by14a1gp14a1h614b1i414b1bz14t1g814t1h714t1hn14t1g915c1gp15c1am15c1ci15c1im15c1j315c1jj15c1bi15u1ci15u1g815u1gq15v1j315v1jk15u1k015v1b116d1bi16d1fr16d1g816d1gp16d1h616d1im16d1j316d1jk16d1k016d1g816v1gp16v1h616v1hn16v1j316v1jk16v1k016v1fq17e1h617d1im17d1j217d1k017d1lx17d1nt17d1hn17w1i417w1jj17v1fq17w1h717w1im17w1j217w1i518e1il18e1l018e1oa18e1g818w1j218w1gp19f1j219f1l019f1gq19x1j219x1hm1ag1i41ag1le1ag1oa1ag1md1az";
  const W0 = 1200, H0 = 852, R0 = 3; // frame size, dot radius (frame units)
  const INK = "#3b405e", GOLD = "#d9a92c";
  const pts = [];
  for (let i = 0; i < ENC.length; i += 6) {
    const x = parseInt(ENC.slice(i, i + 3), 36) / 2, y = parseInt(ENC.slice(i + 3, i + 6), 36) / 2;
    pts.push({ x, y, d: Math.hypot(W0 - x, y), tw: Math.random() * 6.28 });
  }
  const maxD = Math.max(...pts.map((p) => p.d));
  pts.forEach((p) => (p.d /= maxD)); // 0 at the corner → 1 at the far tips
  // a few fixed spots for sparkles and pollen, picked from the vine itself
  const pick = (n) => Array.from({ length: n }, () => pts[(Math.random() * pts.length) | 0]);
  const SPARK = pick(9).map((p) => ({ p, ph: Math.random() * 6.28, sz: 10 + Math.random() * 10 }));
  const POLLEN = pick(14).map((p) => ({ p, ph: Math.random(), sp: 0.12 + Math.random() * 0.12, sw: Math.random() * 6.28 }));
  const ctx = cv.getContext("2d");
  let k = 1, mouse = null, start = null, last = 0, visible = true, b = 0;
  function resize() {
    const r = cv.getBoundingClientRect(), dpr = devicePixelRatio || 1;
    cv.width = Math.round(r.width * dpr); cv.height = Math.round(r.height * dpr);
    k = (r.width / W0) * dpr;
  }
  addEventListener("pointermove", (e) => {
    const r = cv.getBoundingClientRect();
    mouse = { x: ((e.clientX - r.left) / r.width) * W0, y: ((e.clientY - r.top) / r.height) * H0 };
  }, { passive: true });
  document.addEventListener("pointerleave", () => (mouse = null));
  const hovering = () => mouse && mouse.x > 0 && mouse.y > 0 && mouse.x < W0 && mouse.y < H0 &&
    pts.some((p) => Math.abs(p.x - mouse.x) < 70 && Math.abs(p.y - mouse.y) < 70); // near the vine, not empty corners
  const easeBack = (u) => 1 + 2.2 * Math.pow(u - 1, 3) + 1.2 * Math.pow(u - 1, 2); // slight overshoot
  const smooth = (u) => u * u * (3 - 2 * u);
  function sparkle(x, y, r) {
    ctx.beginPath();
    ctx.moveTo(x, y - r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.quadraticCurveTo(x, y, x, y + r);
    ctx.quadraticCurveTo(x, y, x - r, y); ctx.quadraticCurveTo(x, y, x, y - r); ctx.fill();
  }
  function draw(s) {
    ctx.clearRect(0, 0, cv.width, cv.height);
    const h = smooth(b);
    // glitch: a new random state ~12 times a second; some ticks are calm, some burst
    const tick = s === null ? 0 : Math.floor(s * 12);
    const rnd = (n) => { const v = Math.sin(tick * 127.1 + n * 311.7) * 43758.5453; return v - Math.floor(v); };
    const burst = h > 0.01 && rnd(0) < 0.5;
    const slices = burst ? Array.from({ length: 1 + Math.floor(rnd(1) * 3) }, (_, i) => {
      const y0 = rnd(i + 2) * H0, ht = 20 + rnd(i + 9) * 90;
      return { y0, y1: y0 + ht, dx: (rnd(i + 17) - 0.5) * 70 };
    }) : [];
    const shift = (p) => { for (const sl of slices) if (p.y >= sl.y0 && p.y < sl.y1) return sl.dx * h; return 0; };
    const pos = (p) => [p.x + shift(p), p.y];
    for (const p of pts) {
      let g = 1, tw = 1;
      if (s !== null) {
        const u = Math.min(1, Math.max(0, (s - p.d * 1.5) / 0.45)); // bloom in, corner first
        g = u === 0 ? 0 : easeBack(u);
        tw = 0.85 + 0.15 * Math.sin(s * 1.6 + p.tw);
      }
      if (g <= 0) continue;
      const dx = shift(p), x = p.x + dx, y = p.y, r = R0 * k * g;
      if (burst && rnd(p.x * 0.37 + p.y * 0.71) < 0.04 * h) continue; // dropout flicker
      if (dx) { // red / blue ghosts on the slipped slices
        ctx.globalAlpha = 0.4 * h; ctx.fillStyle = "#e0453a";
        ctx.beginPath(); ctx.arc((x + 5) * k, y * k, r, 0, 6.2832); ctx.fill();
        ctx.fillStyle = "#3a6fe0";
        ctx.beginPath(); ctx.arc((x - 5) * k, y * k, r, 0, 6.2832); ctx.fill();
      }
      ctx.globalAlpha = tw;
      ctx.fillStyle = INK;
      ctx.beginPath();
      ctx.arc(x * k, y * k, r, 0, 6.2832);
      ctx.fill();
    }
    if (h > 0.01) {
      ctx.fillStyle = GOLD;
      for (const q of POLLEN) { // pollen drifts down and fades
        const t = (s * q.sp + q.ph) % 1, [x, y] = pos(q.p);
        ctx.globalAlpha = h * Math.sin(t * Math.PI) * 0.9;
        ctx.beginPath();
        ctx.arc((x + Math.sin(s * 2 + q.sw) * 14) * k, (y + t * 120) * k, 3.4 * k, 0, 6.2832);
        ctx.fill();
      }
      for (const q of SPARK) { // sparkles pop in and out
        const tw = Math.max(0, Math.sin(s * 2.4 + q.ph)), [x, y] = pos(q.p);
        ctx.globalAlpha = h * tw;
        sparkle(x * k, (y - 14) * k, q.sz * tw * k);
      }
    }
    ctx.globalAlpha = 1;
  }
  new ResizeObserver(() => { resize(); if (REDUCED_MOTION) draw(null); }).observe(cv);
  if (REDUCED_MOTION) return;
  new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(cv);
  (function loop(t) {
    requestAnimationFrame(loop);
    if (!visible || t - last < 30) return; // ~30fps, like the bento art
    last = t;
    if (start === null) start = t;
    b = Math.min(1, Math.max(0, b + (hovering() ? 0.075 : -0.075)));
    draw((t - start) / 1000);
  })(0);
})();

// ---------------------------------------------------------------------------
// Contact: the café doodle (table, vase of flowers, two chairs) in the same dotted
// style as the home illustrations. The original strokes (160 × 95 frame) are drawn
// thick onto an offscreen canvas (with headroom above for the hearts), then sampled on a dot grid with the same Bayer
// dithering as the bento art. Hover: the flower nods and little hearts rise from beside the petals.
// ---------------------------------------------------------------------------
(function cafeDots() {
  const cv = document.querySelector("canvas.contact-art");
  if (!cv) return;
  const PATHS = [["M129.043 42.951c0-.154-.022-2.876-.126-8.618-.12-6.576-.319-10.649.188-12.825 1.071-4.595 2.971-9.258 4.279-12.156 1.16-2.57 5.662-5.577 8.577-7.695 1.41-1.024 5.536-.82 8.561-.284 3.805.675 5.178 3.55 6.844 6.818 1.33 2.607 1.532 8.284 1.564 14.469.014 2.856-1.201 5.817-2.923 9.944-1.877 4.496-5.473 9.01-7.785 12.244a57 57 0 0 1-1.839 1.965c-.34.356-.757.803-1.36 1.455", 1.859, 0], ["M144.94 54.593c.243-.143.924-.858 1.491-2.508.592-1.729.044-3.215-.351-3.747-.91-1.226-3.966-2.345-7.423-3.338-1.19-.342-3.066-.433-5.911-.566s-6.632-.157-9.173-.025c-5.592.29-8.011 1.63-10.517 3.404-.825.583-1.162 1.201-1.445 1.665-.264.436-.25 1.33-.222 2.371.036 1.397 1.618 2.575 3.971 4.092.986.635 2.908 1.095 6.782 1.694 2.443.378 5.927.344 8.654.379 6.822.085 7.857-.263 9.068-.517 1.89-.755 4.279-2.056 4.889-2.828.137-.235.264-.508.504-1.332m-32.425 1.808-.011 1.404c-.012 1.28-.035 3.775-.621 8.871-.585 5.097-1.732 12.72-2.981 20.988m20.475-27.561v4.892c0 4.856 0 14.551-.029 19.78-.028 5.23-.085 5.7-.197 6.837", 1.859, 0], ["M144.48 54.453c0 .9.563 4.664 2.391 9.97 1.156 3.357 3.216 7.9 4.576 11.78s2.068 6.92 2.456 9.07.431 3.323.477 4.53m-2.371-86.677c0 .158-.02 1.339-1.32 9.249-1.125 6.837-3.822 19.297-5.157 26.046s-1.385 7.38-1.416 8.02c-.032.64-.041 1.27-.052 1.868M8.366 24.632c0 .12.01 3.828.455 10.715.211 3.265 1.299 5.97 2.118 8.13 1.571 3.67 2.569 5.546 2.973 6.153.18.286.308.528.496 1.029m.929-28.815c0 .02.038 3.377.502 10.959.26 4.246 1.242 9.254 1.674 12.275.431 3.02.454 3.891.488 4.47.034.58.079.841.125 1.11m3.253-28.349v28.815m10.947.049-2.85-.014c-2.83-.013-8.48-.04-11.518-.035-4.351.009-6.484 1.206-7.553 2.077-.995.81-1.11 2.528-1.11 4.127 0 .628.545 1.067 1.174 1.454 1.489.914 5.9 1.032 11.766 1.166 6.478.148 9.015-2.332 11.166-3.53.442-.246.837-.54 1.08-.95.5-.848.394-1.757.285-2.3-.332-.484-.832-.898-1.37-1.225-.265-.146-.516-.251-1.321-.507m-16.273 8.983v2.598c0 2.464 0 7.323.19 10.974.574 5.947 1.186 9.02 1.648 10.385.242.66.501 1.248.95 2.07m15.338-29.28.067 2.443c.067 2.423.2 7.261.419 10.591s.516 5.006.74 6.037c.225 1.031.367 1.367.633 1.843m-19.52-14.872c.056 0 2.042-.017 6.654-.407 2.656-.374 5.952-1.105 7.77-1.522s2.057-.498 2.772-.86m-10.69 3.253v12.549M81.894 25.71l-3.747.01m-15.142.092c-7.12.106-10.957 2.527-12.997 4.223-2.04 1.694-3.267 5.55-3.729 8.495-.623 3.982-.03 7.13.472 8.224 1.802 3.925 6.633 7.145 12.38 9.13 3.156 1.09 8.901 1.624 13.454 2.095 4.552.471 7.855.437 10.906.088 9.004-1.03 11.198-3.028 13.393-5.02 3.093-2.808 2.682-5.294 2.832-10.914.115-4.288-2.952-7.945-5.088-10.09-4.785-4.805-7.355-5.161-11.71-6.006-1.193-.17-1.896-.205-3.298-.222-1.027-.017-2.694-.05-4.412-.085M53.559 53.874l-.01 4.778c-.01 4.76-.028 14.27-.054 19.455-.027 5.186-.06 5.76-.096 6.352m12.886-25.852v5.706c0 5.619 0 16.813.038 22.788.04 5.975.117 6.39.23 6.915m19.952-36.082v19.582m10.562-23.843.02 4.107c.02 4.087.062 12.252.236 17.734s.48 8.034.648 10.004c.167 1.969.186 3.279.206 4.629", 1.859, 0], ["M63.533 18.368c0 .019-.045 3.665-.233 10.116-.138 4.71-.624 8.346-.51 11.16.065 1.573.755 2.32 1.264 2.936 1.089 1.312 4.385 2.014 8.4 2.284 2.177.147 6.4-2.406 8.889-4.075.574-.384.69-1.162.811-2.006.34-2.362-1.006-3.758-3.197-6.456-1.385-1.705-3.562-4.986-5.053-7.246-3.169-4.804-3.09-6.237-3.304-7.391-.1-.535-2.42-.62-5.28-.487-1.01.047-1.088.4-.985.593 1.268.411 2.907.273 4.133-.01.384-.098.847-.233 1.979-.628", 1.394, 0], ["M76.172 7.817c0 .036 0 .339.109.869.054.262.326.439.563.539.238.1.49.1.679-.018.189-.117.306-.353.305-.601 0-.249-.122-.502-.298-.7s-.403-.33-.6-.295-.357.24-.37.455c-.013.214.125.43.999.518", 1.859, 1], ["M78.168 5.633c0-.653-.702-2.214.156-3.132.494-.53 1.22-.653 1.83-.64.583.01 1.106.322 1.554.659.424.318.596.883.743 1.523.367 1.588-.602 2.723-1.137 3.414-.52.672 1.876-.274 2.761-.08 1.933.425 1.989 3.077 1.963 4.203-.014.625-.59 1.055-1.022 1.407-.93.76-2.81.578-4.18.41-.27-.033-.478-.335-.627-.315-.912.122-.064 1.888-.198 2.39-.138.517-1.047.611-1.843.788a2.67 2.67 0 0 1-2.11-.42c-.887-.627-.67-2.118-.783-2.963-.151-1.128-2.503 1.068-3.706.91-.779-.103-.915-1.175-1.053-1.76-.182-.77.077-1.526.37-2.044.28-.498.868-.68 1.255-.87", 1.859, 1], ["M72.334 9.025a.7.7 0 0 1-.14.001c-.081-.004-.414-.412-.925-1.097a3 3 0 0 1-.452-.862 7.4 7.4 0 0 1-.31-1.17 4.2 4.2 0 0 1 .07-1.699c.104-.453.229-.708.32-.85.391-.608.803-.875 1.288-1.075.377-.155.9-.166 1.51-.11.334.032.7.197 1.113.388s.858.436 1.244.699.7.536 1.049.89c.347.353.72.777.93 1.032.209.255.246.328.27.39.023.064.033.115.052.237M67.057 17.22c-.105 0-.459-.034-1.047-.316-.21-.1-.441-.302-.736-.596-.294-.294-.632-.7-1.031-1.313-.4-.614-.851-1.423-1.138-2.064s-.394-1.09-.455-1.472c-.109-.68-.075-1.118-.023-1.474.15-1.02.37-1.3.79-1.835.442-.563.916-.72 1.871-.975.349-.093.806-.063 1.245-.037.861.052 1.642.261 2.238.433.616.177 1.088.365 1.338.495.454.268 1.123.65 1.23.708.05.03.094.063.199.143", 1.859, 1], ["M66.281 19.1c0 .01 0 .018-.435.894-.436.877-1.307 2.62-2.215 4.467m6.956-4.598c0 .145-.056.588-1.147 2.873a1050 1050 0 0 1-4.202 8.466c-1.154 2.292-1.388 2.695-1.694 3.317m10.588-7.948c-.115.092-.379.351-.685.777-.256.354-.733.978-2.021 2.866s-3.379 5.018-4.663 7.056c-1.284 2.037-1.698 2.887-1.947 3.438s-.321.777-.377.935a2.5 2.5 0 0 1-.18.403m12.923-11.513c-.018.1-.084.373-1.21 2.516a1400 1400 0 0 1-4.45 8.274c-1.192 2.19-1.347 2.42-1.52 2.69m9.428-9.373c0 .005-.035.245-.385 1.19-.27.727-.908 1.883-1.362 2.708s-.753 1.266-1.14 1.935c-.388.669-.856 1.553-1.129 2.052-.272.498-.336.584-.437.737", 0.93, 0], ["M63.901 20.734c.006 0 .145.062 2 1.187 1.729 1.048 5.02 3.125 6.844 4.243 2.07 1.228 2.4 1.395 2.55 1.505.072.057.137.118.214.153m-9.864-9.491c.097 0 1.079.413 2.802 1.385.902.558 1.861 1.25 2.425 1.645.564.396.702.476.927.571m-8.007 3.821c.018 0 .13.004 1.256.433 1.022.425 2.96 1.27 5.78 2.866s6.461 3.918 10.41 6.337m-17.52-5.129c.012 0 .444.257 1.36.843 1.057.677 1.768 1.232 2.535 1.735.59.386 1.564 1.07 2.5 1.63.937.562 1.8.987 3.347 1.892s3.748 2.278 5.026 3.108 1.564 1.076 1.803 1.264.42.31.619.323m-17.662-7.132c.002 0 .005 0 .63.512.624.513 1.869 1.538 2.818 2.27s1.565 1.141 2.6 1.959c1.034.818 2.467 2.032 3.436 2.813 1.998 1.482 2.397 1.764 2.83 2.061.092.063.158.104.358.2m-12.743-5.431c.062.097.687.602 1.793 1.421.64.475 1.381 1.15 1.96 1.7 1.615 1.627 2.313 2.216 2.505 2.407.01-.018-.02-.119-.053-.223", 0.93, 0], ["M64.49 19.188c0 .06.037.267.097.335.035-.236.002-.544-.125-.768a1.5 1.5 0 0 1-.155-.294m.975.416h.214", 2.324, 0], ["M70.918 22.513c0-.005 0 .214-.073.466-.07.246-.4-.366-.467-.496-.076-.148-.1-.308-.058-.407.07-.17.368-.014.489.046.26.13.458.404.664.744.352.578.573.952.837 1.228.288.301.618.581.89 1.008.125.196.27.307.387.393.132.096-.278-.199-1.172-.822-1.225-.852-1.776-1.11-2.34-1.302-.127-.044-.2-.077-.112-.033.774.39 1.227.771 1.891 1.3.703.463.992.677 1.517.971.131.075.237.147.458.284m-8.379-3.532c0 .078-.269.937-.555 1.556-.213.462-.453.628-.522 1.177-.075.601 1.312.364 2.234.628.33.094.417-.04.517-.218.412-.731.512-1.047.68-1.35.057-.101.166-.228.076-.334-.648-.759-1.496-.648-1.623-.669-.444-.073-.727.948-.818 1.29a.3.3 0 0 0 .024.226c.167.26.78-.045 1.074-.21.114.304.191 1.025.299 1.47.025.071.053.147.142.346m1.839-7.203c-.186.01-.705-.05-1.112-.39-.535-.444 2.3-.087 2.65-.243.056-.025.02-.13-.004-.195-.102-.276-.41-.38-.513-.384-.166-.005-.074.756-.04 1.489.012.258.104.277.182.267a.32.32 0 0 0 .208-.112c.048-.139.028-.303-.013-.464-.017-.078-.028-.148-.04-.22m-2.598 9.08c0 .092-.072.4-.269.677-.281.397-1.077 1.588-1.328 2.21-.11.273 1.266.816 2.34 1.495.424.267.616.36.787.355.34-.009.657-.748.89-1.18.247-.46.464-.831.697-1.234.092-.16.079-.255-.044-.361-.7-.6-1.555-.82-1.997-1.088-.123-.074-.273-.222-.377-.255-.349-.11-.568.876-.909 1.333-.108.144-.287.327-.353.459s-.022.2.039.252c.552.472 1.737.58 1.957.61.102.014.183.017.3-.154.328-.481.46-.945.47-1.056.035-.387-.899-.117-1.258-.169-.092-.013-.195-.015-.249.034s-.057.153-.038.178.062-.031.1-.09c.04-.06.074-.12.152-.306m4.239-.253c.122 0 .522.033.83.16.702.286 1.521.919 1.85 1.133.2.13.392.22.504.248.277.071.257-.68.3-.973.075-.523-.963-1.26-1.737-1.914-.153-.13-.235-.175-.307-.168-.46.046-.5.854-.452.946.226.443.76.177 1.172.48.638.469.908.922 1 1.277q.068.219.167.469c.037.076.08.136.214.259m.419 2.097c-.064.081-.317.392-1.259 1.97-.335.563-.531.776-.549.855-.106.472 1.012.376 2.512.934.319.118.377.149.377.19.002.278-.518.187-.628.209-.47.094-.534-1.11-.814-1.433-.413-.477-.249-1.744-.13-2.166.058-.203.239-.333.348-.437.112-.107.315-.07.477-.057.275.023.529.36 1.104.81.188.148.322.242.413.374.248.36.01 1.014-.175 1.383-.107.213-.39.46-.702.671-.114.077-.188-.002-.252-.144-.294-.654-.23-1.086-.316-1.68-.029-.196-.06-.373-.028-.455.06.022.21.173.353.336.144.164.276.336.533.642m-14-4.369c.016.1.113.42.045.882-.196.505-.344.882-.38 1.014-.019.07-.036.143-.053.285m5.64 1.454c0 .092-.033.401-.4 1.173-.161.34-.54.595-.779.917-.166.225.743.716 1.6 1.303.901.617 1.242.697 1.482.847.255.16.455.306.633.32.672.047.623-1.389.787-1.637.087-.13.189-.247.263-.358s.046-.262.022-.393c-.056-.303-.725-.5-1.849-.933a12 12 0 0 1-1.338-.621c-.588-.313-.521 1.03-.652 1.423-.028.084-.003.157.04.197.303.282.972.108 1.634.454.508.266.797.463 1.108.482.177.011.315-.107.402-.208.095-.112.08-.287.05-.424-.076-.34-1.017-.332-1.68-.523-.23-.066-.55-.258-.69-.255-.684.019 1.028 1.891 1.423 2.382.104.113.208.244.291.391.032.074.04.146.066.294m6.328.397c-.003.08-.181.786-.385 1.334-.17.455-.681.868-.931 1.15-.18.201-.231.435-.314.468-.093.036-.085-.246-.068-.43.06-.654 1.148-1.53 1.535-1.812.195-.142.535-.14.844-.131.395.01.691.501.862.734.25.34-.988.48-1.361.789-.313.333-.556.574-.744.67-.131.06-.336.146-.563.234m-4.619-1.102c-.058.13-.437.75-.851 1.428-.12.195-.3.315-.382.464-.056.102.737.12 1.76.119 1.174-.001 1.899-.318 2.29-.523.37-.195-1.772-.74-2.508-.847-.034.043-.034.128-.031.241.002.114.008.253.013.396m-8.751-8.274c-.013.104-.107.711-.22 1.193-.05.22-.044.764-.02 1.435.019.547.85.966 1.554 1.27.162.071.405-.232.678-.53.311-.341.25-1.114.177-1.502-.067-.36-.535-.517-1.01-.808-.09-.056-.16.024-.211.115-.256.45-.224 1.188-.041 2.074.034.166.08.224.15.119a2.8 2.8 0 0 0 .236-.555c.054-.177.049-.25.016-.434m-.115 5.433c.002-.452.137-1.627.368-1.932.038-.05.129.029.182.089.29.327.506.822.812 1.12.81.788 1.216 1.168 1.653 1.454.094.061.165.09.235.128.607.318-2.595-.658-2.803-.706-.088-.02-.094-.145-.096-.244-.002-.1.012-.2.06-.228.547-.318 1.808.99 2.435 1.231.167.056.333.123.55.221l.417.193", 1.394, 0], ["M9.799 54.842c-.017 0-.276-.053-1.531-1.13-3.108-2.666-5.112-6.037-6.061-7.863-.44-.844-.644-1.594-.856-3.822s-.388-5.93-.42-8.132c-.057-3.948 1.64-6.304 3.831-9.074 1.166-1.475 2.5-2.152 3.63-2.684 1.778-.838 4.764-1.209 8.358-1.527 3.662-.325 5.929-.08 6.639.082.714.165 2.75 1.383 5.481 3.065 3.158 1.944 5.814 5.715 6.986 8.13.46.947.787 2.465 1.058 4.424.272 1.959.362 4.359.147 6.581-.738 4.195-1.472 6.642-2.067 7.662-.399.607-.996 1.394-1.698 2.344M8.366 25.097V22.31", 1.859, 0], ["M15.337 20.915v.93m6.042 1.393v-2.323", 0.93, 0], ["M132.746 10.993c.034.14.392 1.137 1.096 3.678.493 1.78.948 4.634 1.227 6.771.278 2.137.286 3.488-.274 6.69-.56 3.201-1.688 8.211-2.381 11.083-.693 2.873-.916 3.456-1.196 4.172M141.52 2.666l.012.888c.011.863.034 2.575-.035 7.368s-.23 12.616-.518 17.761c-.287 5.146-.697 7.379-1.006 8.815-.437 2.026-.883 2.955-1.201 3.61-.263.533-.553 1.303-.84 2.167-.118.335-.177.462-.252.637M9.092 55.994l-.005 1.312c-.004 1.3-.014 3.894-.315 8.198s-.894 10.24-1.528 16.53", 1.859, 0]].map(([d, w, flower]) => ({ p: new Path2D(d), w, flower }));
  const DARK = "#b72c15", LIGHT = "#d25a3f", PITCH = 2.85, R = 1.05, TOP = 30; // TOP: headroom above the flower for the hearts
  const HEART = new Path2D("M0 2C-1-1-5-1-5 2c0 3 5 6 5 6s5-3 5-6c0-3-4-3-5 0z");
  const ctx = cv.getContext("2d"), off = document.createElement("canvas");
  const octx = off.getContext("2d", { willReadFrequently: true });
  let W = 0, H = 0, dpr = 1, b = 0, target = 0, raf = 0, last = 0;
  const t0 = performance.now();
  function render() {
    if (!W || !H) return;
    const s = W / 160, t = (performance.now() - t0) / 1000;
    octx.setTransform(1, 0, 0, 1, 0, 0); octx.clearRect(0, 0, W, H);
    octx.lineCap = "round"; octx.lineJoin = "round"; octx.strokeStyle = "#000"; octx.fillStyle = "#000";
    for (const { p, w, flower } of PATHS) {
      octx.setTransform(s, 0, 0, s, 0, TOP * s);
      if (flower && b > 0.001) { // nod around the top of the vase
        octx.translate(72, 18); octx.rotate(Math.sin(t * 3.2) * 0.22 * b); octx.translate(-72, -18);
      }
      octx.lineWidth = Math.max(w * 1.2, 4.8 / s);
      octx.stroke(p);
    }
    if (b > 0.01) for (let i = 0; i < 3; i++) { // hearts rising from the table
      const u = (t * 0.32 + i / 3) % 1; // start just right of the petals, drift up and fade
      octx.setTransform(s, 0, 0, s, 0, TOP * s);
      octx.globalAlpha = b * Math.min(1, Math.sin(u * Math.PI) * 1.6);
      octx.translate(93 + Math.sin(t * 2.2 + i * 2) * 4 + u * 6, 10 - u * 38);
      octx.scale(0.75 + u * 0.35, 0.75 + u * 0.35); octx.fill(HEART);
      octx.globalAlpha = 1;
    }
    const data = octx.getImageData(0, 0, W, H).data, dark = [], light = [];
    for (let gy = 0, y = PITCH / 2; y < H; gy++, y += PITCH) {
      for (let gx = 0, x = PITCH / 2; x < W; gx++, x += PITCH) {
        const a = data[((y | 0) * W + (x | 0)) * 4 + 3] / 255;
        if (a < 0.03 || a <= (BAYER[(gy & 3) * 4 + (gx & 3)] + 0.5) / 16) continue;
        (a > 0.8 ? dark : light).push(x, y);
      }
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
    for (const [pts, col] of [[light, LIGHT], [dark, DARK]]) {
      ctx.fillStyle = col; ctx.beginPath();
      for (let i = 0; i < pts.length; i += 2) { ctx.moveTo(pts[i] + R, pts[i + 1]); ctx.arc(pts[i], pts[i + 1], R, 0, 6.2832); }
      ctx.fill();
    }
  }
  function layout() {
    const r = cv.getBoundingClientRect();
    W = Math.round(r.width); H = Math.round(r.height); dpr = Math.min(2, devicePixelRatio || 1);
    cv.width = W * dpr; cv.height = H * dpr; off.width = W; off.height = H;
    render();
  }
  function tick(now) {
    raf = 0;
    if (now - last >= 30) {
      last = now;
      b += (target - b) * (REDUCED_MOTION ? 1 : 0.075);
      if (Math.abs(target - b) < 0.002) b = target;
      render();
    }
    if (b !== target || (target && !REDUCED_MOTION)) raf = requestAnimationFrame(tick);
  }
  const go = () => { if (!raf) raf = requestAnimationFrame(tick); };
  cv.addEventListener("pointerenter", () => { target = 1; go(); });
  cv.addEventListener("pointerleave", () => { target = 0; go(); });
  new ResizeObserver(layout).observe(cv);
})();

// ---------------------------------------------------------------------------
// Playground gallery: masonry. On desktop each item sits in its data-col column; on smaller
// screens items are dealt in order, each into the currently shortest column (heights from data-ratio, so no waiting
// for images). 3 columns on desktop, 2 on tablets, 1 on phones.
// ---------------------------------------------------------------------------
document.querySelectorAll(".play-grid").forEach((grid) => {
  const items = [...grid.querySelectorAll(".play-item")];
  let current = 0;
  function layout() {
    const n = innerWidth >= 900 ? 3 : innerWidth >= 560 ? 2 : 1;
    if (n === current) return;
    current = n;
    const cols = Array.from({ length: n }, () => Object.assign(document.createElement("div"), { className: "play-col" }));
    const heights = new Array(n).fill(0);
    items.forEach((item) => {
      const pinned = n === 3 && item.dataset.col ? +item.dataset.col - 1 : -1; // desktop: fixed column
      const c = pinned >= 0 ? pinned : heights.indexOf(Math.min(...heights));
      cols[c].appendChild(item);
      heights[c] += parseFloat(item.dataset.ratio || 0.7) + 0.06; // + gap
    });
    grid.replaceChildren(...cols);
    grid.querySelectorAll("video").forEach((v) => v.play && v.play().catch(() => {})); // moving a video pauses it
  }
  layout();
  addEventListener("resize", layout);
});

// ---------------------------------------------------------------------------
// About: music player. Playing by default; click (or Enter/Space) toggles.
// ---------------------------------------------------------------------------
document.querySelectorAll(".player").forEach((player) => {
  const spin = player.querySelector(".cd-spin");
  const audio = player.dataset.audio ? new Audio(player.dataset.audio) : null;
  if (audio) audio.loop = true;
  const DEG_PER_SEC = 120; // one turn every 3s
  let playing = true, angle = 0, last = performance.now(), settle = null;

  function frame(now) {
    const dt = (now - last) / 1000; last = now;
    if (playing && !REDUCED_MOTION) {
      angle = (angle + DEG_PER_SEC * dt) % 360;
    } else if (settle) { // ease back to rest when stopping
      const t = Math.min(1, (now - settle.start) / 900);
      const ease = 1 - Math.pow(1 - t, 3);
      angle = settle.from + (settle.to - settle.from) * ease;
      if (t === 1) { settle = null; angle = 0; }
    }
    spin.style.transform = `rotate(${angle}deg)`;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  function toggle() {
    playing = !playing;
    player.classList.toggle("is-stopped", !playing);
    player.setAttribute("aria-pressed", String(playing));
    if (!playing) settle = { from: angle, to: angle > 180 ? 360 : 0, start: performance.now() };
    else settle = null;
    if (audio) playing ? audio.play().catch(() => {}) : audio.pause();
  }
  player.addEventListener("click", toggle);
  player.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
  });
});

// ---------------------------------------------------------------------------
// Work: case-study cards stack on scroll. Each card is position:sticky (CSS);
// here we shrink a card to 95% as the next one slides over it.
// ---------------------------------------------------------------------------
(function stackCards() {
  const cards = [...document.querySelectorAll(".cases .case")];
  if (cards.length < 2) return;
  let ticking = false;
  function update() {
    ticking = false;
    cards.forEach((card, i) => {
      const next = cards[i + 1];
      if (!next) return;
      const a = card.getBoundingClientRect(), b = next.getBoundingClientRect();
      const full = a.height / (parseFloat(card.style.getPropertyValue("--stack-scale")) || 1) + 32;
      const progress = Math.min(1, Math.max(0, 1 - (b.top - a.top - 20) / (full - 20)));
      card.style.setProperty("--stack-scale", (1 - 0.05 * progress).toFixed(4));
    });
  }
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  update();
})();
