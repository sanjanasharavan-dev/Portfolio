# Sanjana Sharavan — Portfolio

Hand-coded recreation of https://sanjanasharavan.framer.website/ — plain HTML, CSS and a little JS. No build step, no dependencies: open `index.html` in a browser, or serve the folder with any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages).

## Files
- `index.html` — Home: script name + cat doodle, intro, bento grid. Hierarchy: Work (largest) → Playground (tall but visually quiet) → Contact / About / Resume (equal small cards). Page content is centred, max 1241px wide. On desktop the home page fits one screen (see "HOME: FIT TO SCREEN" in styles.css). Sub-copy is regular weight, no bold.
- `about.html` — Photo + bio, "now playing" vinyl card, infinite photo gallery marquee (edit the `GALLERY` array)
- `work.html` — Selected case studies (cards that stack on scroll), Older work (list rows)
- `playground.html` — Two projects side by side (`.projects`: Documenting Indian Textiles, Bunkr → bunkr.in; images `playground-*.jpg`, resized from the originals in `playground/`), then a "Gallery" heading over the masonry grid of visuals (copy a `<figure class="play-item">` to add one)
- `contact.html` — "Let's Talk!", email + social pill buttons, café doodle
- `styles.css` — all styling; design tokens live in `:root` at the top
- `site.js` — renders the bottom dock nav on every page (edit `NAV` / `RESUME_URL`; Home, Work, Playground) and runs the line-boil glitch, music player, and stacking case cards
- `assets/cat.svg` — the cat doodle (also used as favicon)
- `images/` — all photos, screenshots and the Visuals video (`images/gallery/` = About-page photos, `images/fonts/` = Satoshi woff2). Home hero: name on the left, intro on the right ending at the bento edge (intro line breaks set with <br> in index.html; hidden below 1200px). Bento capped at 420px tall on desktop.

## Design system
- Background `--bg #F5F4EB`, cards `--card #EDECE1`, case cards `--card-soft #F2F1E6`, text `--ink #303030`
- Accents: `--red #961818` (name, section titles), `--green #5B8275` (Gallery), `--blue #0A0794` (Let's Talk)
- Fonts: **Italianno** (script headings, class `.script`), **Satoshi** (body/UI, from Fontshare), **Bricolage Grotesque** (song title)
- Cards: 16px radius (bento), 26px (case studies). Buttons: `.btn` pill, 32px radius, 1px hairline border, arrow icon
- Section headers: `.section-head` = big script title + small two-line caption beside it
- Breakpoints: 1200px (bento → 2 cols, case cards stack), 720px (single column)

## Conventions
- Keep it dependency-free; reuse existing classes and CSS variables before adding new ones.
- Bento CTAs are bare arrows (`.btn-icon`, bottom-right; bottom-left on Work + Playground, label in aria-label) whose hit area covers the whole card. Sub-copy ends with a full stop. The cat walks along the bottom of the home page (starts 3s after load, crosses left→right, waits 3s, walks back, repeats); clicking it shows "ouch". The walking cat is inline SVG in index.html: the doodle path is reused for a body plus four clipped legs that swing from the hip in a 4-beat gait (`@keyframes catleg`); site.js sets `--step` from the walk speed so planted feet don't slide. Home Work card: dotted laptop anchored bottom-right with stars on screen; on hover a big cursor swoops in from the left and shrinks onto the screen (`ART.work` in site.js). Playground card: Sanjana's own flower in yellow, bloom centred with the stem in a tan-θ S-curve to the bottom-right corner (drawn left-handed, then mirrored) (`stemCurve`), leaf swung out at its join, stored dot-for-dot in `FLOWER` (site.js), whimsical on hover (sway, pollen, butterfly, sparkles). Dock Playground icon is a paintbrush. Whole bento cards are clickable.
- Add a case study by copying an `<article class="case">` block in `work.html`.
- All images and fonts are local (`images/`); nothing loads from Framer. Put new images in `images/` and reference them by relative path.
