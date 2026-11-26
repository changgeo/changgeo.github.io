// Renders the news list from data/news.json. Edit that file, not this one.
(function () {
  document.getElementById("year").textContent = new Date().getFullYear();

  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));

  const newsList = document.getElementById("news-list");
  if (newsList) {
    fetch("data/news.json").then((r) => r.json()).then((items) => {
      // An item of the form { "separator": true } draws a "⋯" row, marking skipped time between entries.
      newsList.innerHTML = items.map((n) => n.separator
        ? `<li class="news-sep" aria-label="earlier items omitted"><time>&#8943;</time><span></span></li>`
        : `<li><time>${esc(n.date)}</time><span>${n.text}</span></li>`).join("");
    }).catch(() => {});
  }
})();
