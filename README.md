# Sid Zhang

Minimal artist portfolio. Three categories: Painting, Sculpture, and Video/Photography. The viewer shows one work at a time with small previous/next arrows, keyboard navigation, and horizontal touch swipes. Paintings (13) and sculptures (8) are ordered by year from early to late. Videos retain the supplied portfolio order because dates were not supplied. No statement or promotional copy.

## Run

Requires Node.js 24 and Python 3.12. No external dependencies or credentials.

```sh
cd /workspace/artist-web
npm ci --offline --no-audit --no-fund
npm run dev
```

Development port: 3000. `npm run build` produces the static `dist/` folder. `npm run preview` serves it on port 4173.

## Content and design

Real images and captions are extracted from the artist's two portfolio PDFs. Original photographs remain in assets/artworks. Missing metadata is omitted; duplicate and artist-excluded works are omitted from the site. The interface uses a white background, small locally bundled Open Sans typography, and no museum branding or colored panels. The Open Sans license is in assets/fonts/OpenSans-LICENSE.txt.

Footer contact: sidzhang0218@gmail.com.

The categories remember the current work during browsing. Navigation stops at the first and last item rather than wrapping. A hidden live region announces the current work for assistive technology. Four YouTube links open externally and require Internet access; the artwork photographs and interface work offline.

## Interactive preview

/workspace/Sid-Zhang-Preview.html is a self-contained preview with embedded, optimized copies of the artwork photographs, fonts, styles, and script. Download and open it in a browser; no server is required. /workspace/Sid-Zhang-Preview.zip contains the HTML, brief instructions, and font license. /workspace/artist-web-preview.html is the same self-contained preview under its earlier filename. Rebuild these files after source changes; no public deployment has been made.

## Hosting

The site uses relative asset paths so it works at the GitHub Pages project path /artist-web/. Publish the main branch root with GitHub Pages (Deploy from a branch). The .nojekyll marker serves the static files directly. Only artwork images referenced by index.html are intended for publication.

The last four paintings in chronological order (Town painting #2, #3, #4, and Studio 506) are temporarily excluded at the artist’s request.

The portfolio is labeled Selected work. Two 2023 paintings (Untitled, 63 × 77 inches; Untitled (Noir), 63 × 80 inches) and the 2026 sculpture using Diet cokes and red hats are excluded at the artist’s request.

Video slides show each video’s YouTube thumbnail from i.ytimg.com, with a high-quality fallback if max-resolution artwork is unavailable. If both images fail, the title and video link remain usable. Thumbnails require Internet access; titles and existing timestamped video URLs are preserved.
