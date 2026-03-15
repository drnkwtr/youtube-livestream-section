function expandSubscriptions() {
  const btn = document.querySelector("#expander-item");
  if (btn) btn.click();
}

function getSubscriptionsSection() {
  return [...document.querySelectorAll("ytd-guide-section-renderer")]
    .find(section => section.querySelector("#header-entry"));
}

function getLiveTitle() {
  const lang = document.documentElement.lang || "en";

  if (lang.startsWith("ru")) return "Прямые трансляции";
  return "Live Streams";
}

function getLiveChannels(section) {
  return [...section.querySelectorAll('ytd-guide-entry-renderer[line-end-style="badge"]')];
}

function createLiveSection(subsSection) {

  if (document.querySelector("#live-section")) return;

  const liveSection = document.createElement("ytd-guide-section-renderer");
  liveSection.id = "live-section";
  liveSection.className = subsSection.className;

  const header = document.createElement("ytd-guide-entry-renderer");
  header.setAttribute("is-header", "");

  header.innerHTML = `
    <div style="padding:8px 16px;font-size:14px;color:var(--yt-spec-text-secondary)">
      ${getLiveTitle()}
    </div>
  `;

  const items = document.createElement("div");
  items.id = "live-items";
  items.className = "style-scope ytd-guide-section-renderer";

  liveSection.appendChild(header);
  liveSection.appendChild(items);

  subsSection.parentElement.insertBefore(liveSection, subsSection);
}

function renderLiveChannels(subsSection) {

  const container = document.querySelector("#live-items");
  if (!container) return;

  container.innerHTML = "";

  const live = getLiveChannels(subsSection);

  live.forEach(e => {
    container.appendChild(e); // перемещаем настоящий элемент
  });
}

function init() {

  expandSubscriptions();

  setTimeout(() => {

    const subsSection = getSubscriptionsSection();
    if (!subsSection) return;

    createLiveSection(subsSection);
    renderLiveChannels(subsSection);

    const observer = new MutationObserver(() => {
      renderLiveChannels(subsSection);
    });

    observer.observe(subsSection, {
      childList: true,
      subtree: true
    });

  }, 1200);
}

setTimeout(init, 2500);