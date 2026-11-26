# Research profile site

Plain HTML/CSS/JS, no build step. Hosted on GitHub Pages.

## Edit
- `index.html` — bio, research interests, teaching, sidebar links.
- `data/publications.json` — one object per paper. `highlight_author` is underlined in author lists.
- `data/news.json` — short dated items, newest first.
- `assets/img/profile.jpg` — your photo (square, about 400x400). Falls back to a placeholder if missing.
- `assets/cv.pdf` — your CV.
- `assets/css/style.css` — colors live in the `:root` block at the top.

## Preview locally
```
python -m http.server 8000
```
then open http://localhost:8000.

## Deploy
Push to the `main` branch of a repository named `<username>.github.io`.
GitHub Pages serves it at `https://<username>.github.io`.
