# Jason Xi — minimal edition

A quiet, bilingual personal site and blog for **Jason Xi (Xiaobocm)**.

The starting point was the layout language of [nathanchen.me](https://nathanchen.me/), but this is now its own thing:

- 650px serif reading column with a small portrait at the top
- a sea-blue particle field
- **Now**, **Working principles**, **Selected notes**, and **Off the clock** sections
- centred `About` / `Blog` navigation with X, GitHub, SinoFlare, and RSS
- a sparse blog index with four categories, hover previews, and coloured titles
- a plain, centred article reader with category labels
- **English / 繁體中文** switching, with full Chinese translations of all six essays
- light / dark theme toggle, with the system preference as the default
- build-version checking and a network-first service worker

Personal motto: **一躍蒼穹 破曉而生** — *Leap to sky, born of dawn.*

## Pages

| Path | What it is |
| --- | --- |
| `/` | English home / About. |
| `/blog/` | English blog index: Models / Machines / Building / Field. |
| `/blog/<slug>/` | Six English notes. |
| `/zh/` | Traditional Chinese home / About. |
| `/zh/blog/` | Chinese blog index: 模型 / 機器 / 建造 / 隨筆. |
| `/zh/blog/<slug>/` | Six Chinese notes. |
| `/about/` | Redirects to `/`. |
| `/zh/about/` | Redirects to `/zh/`. |
| `/404.html`, `/zh/404.html` | Not-found pages. |
| `/offline.html`, `/zh/offline.html` | Offline fallbacks, chosen by the service worker. |
| `/feed.xml`, `/zh/feed.xml` | English and Chinese RSS. |

## Language switching

The `EN / 繁` control in the header switches between the English and Chinese versions of the current page:

- `/` ↔ `/zh/`
- `/blog/` ↔ `/zh/blog/`
- `/blog/<slug>/` ↔ `/zh/blog/<slug>/`

Each page includes `hreflang` alternate links and a matching `lang` attribute. There is no client-side content swapping, so the Chinese pages are fully static and indexable too.

## Theme switching

The moon/sun button in the header switches between light and dark mode.

- The first visit follows `prefers-color-scheme`.
- A choice is stored in `localStorage` under `xb-theme`, so it carries across pages and languages.
- The tiny inline script in each `<head>` applies the saved theme before paint, avoiding a flash.
- Without JavaScript, the CSS `prefers-color-scheme` rules still work.

## Preview locally

From this folder:

```powershell
python -m http.server 8000
```

Open <http://127.0.0.1:8000/> or <http://127.0.0.1:8000/zh/>.

## Deploy to GitHub Pages

1. Create a repository. For clean root paths, use `Xiaobocm.github.io`. A repo called `blog` also works with the custom domain.
2. Put the **contents of this folder** at the repository root.
3. Push to `main`.
4. **Settings → Pages**
   - Source: **Deploy from a branch**
   - Branch: `main`
   - Folder: `/ (root)`
5. `CNAME` already contains `blog.xiaobocm.com`.
6. DNS: add a `CNAME` record for `blog` pointing to `Xiaobocm.github.io`. Use DNS-only mode first (not proxied).
7. In Pages, set the custom domain to `blog.xiaobocm.com` and enable **Enforce HTTPS**.

`.nojekyll` is included, so GitHub Pages serves the files as-is.

## Fresh HTML

GitHub Pages cannot set custom cache headers, so the site uses:

1. `no-cache` meta tags in every page;
2. a `build.json` version check that reloads once when the deployed build changes;
3. a service worker that serves page navigations network-first.

Before publishing any change:

```powershell
python tools/bump-version.py 2026.11.16.1
```

That updates `data-build` in every HTML file (English and Chinese), the `?v=` asset query, `build.json`, and `BUILD` in `sw.js`.

## Adding a note

1. Create `blog/your-slug/index.html` from an existing post.
2. Create `zh/blog/your-slug/index.html` from the matching Chinese post.
3. Update both titles, descriptions, canonical URLs, dates, category labels, and bodies.
4. Add a `<a class="blog-entry ...">` row to `blog/index.html` and `zh/blog/index.html`. Use one of:
   - `models` (blue)
   - `machines` (sea green)
   - `building` (violet)
   - `field` (amber)
5. Add `data-subtitle` for the hover preview in both indexes.
6. Add both URLs to `sitemap.xml`; add the item to `feed.xml` and `zh/feed.xml`.
7. Bump the version.

## Type and colour

- **English body:** Spectral, 17px on the home page / 12.5pt in articles.
- **Chinese body:** system Traditional Chinese serif stack (Noto Serif TC / Songti TC / STSong / MingLiU / SimSun).
- **Code and labels:** Space Mono.
- **Light:** warm paper `#fbfaf6`, ink `#162126`, sea-blue accent `#1f6b8a`, `#4d91ad` particles.
- **Dark:** deep sea `#0d151a`, soft text `#dfe9ed`, brighter sea-blue accent.

## Credits

- Layout starting point: [nathanchen.me](https://nathanchen.me/).
- Avatar: supplied by Jason Xi.
- Spectral and Space Mono are licensed under the SIL Open Font License. Licence files are in `assets/fonts/`.
- Writing and images: © Jason Xi. The code is free to learn from.
