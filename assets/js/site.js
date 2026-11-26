// Renders news and publications from data/*.json. Edit those files, not this one.
(function () {
  document.getElementById("year").textContent = new Date().getFullYear();

  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));

  fetch("data/news.json").then((r) => r.json()).then((items) => {
    const ul = document.getElementById("news-list");
    ul.innerHTML = items.map((n) => `<li><time>${esc(n.date)}</time><span>${n.text}</span></li>`).join("");
  }).catch(() => {});

  fetch("data/publications.json").then((r) => r.json()).then((cfg) => {
    const me = cfg.highlight_author || "";
    const root = document.getElementById("pub-list");
    const byYear = {};
    for (const p of cfg.publications) (byYear[p.year] = byYear[p.year] || []).push(p);
    const years = Object.keys(byYear).sort((a, b) => b - a);

    root.innerHTML = years.map((y) => `
      <div class="pub-year">${esc(y)}</div>
      ${byYear[y].map((p) => {
        const authors = p.authors.map((a) => a === me ? `<span class="me">${esc(a)}</span>` : esc(a)).join(", ");
        const links = Object.entries(p.links || {}).map(([k, v]) => `<a href="${esc(v)}" target="_blank" rel="noopener">${esc(k)}</a>`).join("");
        const badge = p.badge ? `<span class="badge">${esc(p.badge)}</span>` : "";
        const thumb = p.thumb ? `<img class="pub-thumb" src="${esc(p.thumb)}" alt="">` : `<div class="pub-thumb"></div>`;
        return `
          <article class="pub">
            ${thumb}
            <div>
              <p class="pub-title">${esc(p.title)}${badge}</p>
              <p class="pub-authors">${authors}</p>
              <p class="pub-venue">${esc(p.venue)}</p>
              <div class="pub-links">${links}</div>
            </div>
          </article>`;
      }).join("")}
    `).join("");
  }).catch(() => {
    document.getElementById("pub-list").innerHTML = '<p class="muted">Could not load publications.</p>';
  });
})();
