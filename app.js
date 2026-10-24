(function () {
  var cfg = window.SITE_CONFIG || {};
  var products = window.PRODUCTS || [];
  var tag = encodeURIComponent(cfg.affiliateTag || "");
  var domain = cfg.amazonDomain || "www.amazon.com";

  function linkFor(p) {
    if (p.asin) return "https://" + domain + "/dp/" + p.asin + "/?tag=" + tag;
    return "https://" + domain + "/s?k=" + encodeURIComponent(p.search || p.name) + "&tag=" + tag;
  }

  document.getElementById("siteName").textContent = cfg.siteName || "PickPocket Deals";
  document.getElementById("tagline").textContent = cfg.tagline || "";
  document.getElementById("year").textContent = new Date().getFullYear();

  var grid = document.getElementById("grid");
  var filters = document.getElementById("filters");
  var empty = document.getElementById("empty");
  var search = document.getElementById("search");
  var active = "All";

  var cats = ["All"];
  products.forEach(function (p) { if (cats.indexOf(p.cat) === -1) cats.push(p.cat); });

  cats.forEach(function (c) {
    var b = document.createElement("button");
    b.className = "chip" + (c === active ? " on" : "");
    b.textContent = c;
    b.setAttribute("role", "tab");
    b.onclick = function () {
      active = c;
      Array.prototype.forEach.call(filters.children, function (x) { x.classList.toggle("on", x.textContent === c); });
      render();
    };
    filters.appendChild(b);
  });

  function esc(s) { var d = document.createElement("div"); d.textContent = s || ""; return d.innerHTML; }

  function render() {
    var q = search.value.trim().toLowerCase();
    var list = products.filter(function (p) {
      var inCat = active === "All" || p.cat === active;
      var hay = (p.name + " " + p.why + " " + p.cat + " " + (p.search || "")).toLowerCase();
      return inCat && (!q || hay.indexOf(q) !== -1);
    });
    grid.innerHTML = list.map(function (p) {
      return '<article class="card">' +
        (p.badge ? '<span class="badge">' + esc(p.badge) + '</span>' : '') +
        '<div class="icon" aria-hidden="true">' + p.icon + '</div>' +
        '<p class="cat">' + esc(p.cat) + '</p>' +
        '<h3>' + esc(p.name) + '</h3>' +
        '<p class="why">' + esc(p.why) + '</p>' +
        '<a class="btn" href="' + linkFor(p) + '" target="_blank" rel="nofollow sponsored noopener">Check price on Amazon →</a>' +
        '</article>';
    }).join("");
    empty.hidden = list.length > 0;
  }

  search.addEventListener("input", render);
  render();
})();
