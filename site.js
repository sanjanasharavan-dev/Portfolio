// Shared site behaviour: renders the bottom dock nav on every page.
// Edit NAV to add/rename pages; the active item is matched by filename.

const RESUME_URL = "https://drive.google.com/file/d/1N1h_qbuxhkWV1I6xI8x-s8gGFqzLLvs1/view?usp=sharing";

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
