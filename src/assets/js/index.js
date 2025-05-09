const portfolioArr = [
  {
    title: "Gazetteer",
    text: "An application for presenting demographic, climate, geographical and other data.",
    src: "assets/img/portfolio/gazetteer_demo_1-600x800.png",
  },
  {
    title: "Company Directory",
    text: "An application for managing company personnel.",
    src: "assets/img/portfolio/gazetteer_demo_1-600x800.png", // TODO: Fix this
  },
];

function populatePortfolio(portfolioArr) {
  const containerEl = document.querySelector(".portfolio .row");

  /** @type{DocumentFragment} */
  const templateContent = document.getElementById(
    "portfolio-col-template",
  ).content;

  const frag = document.createDocumentFragment();
  console.assert(frag instanceof DocumentFragment, "not DocumentFragment"); // TODO: Remove this

  portfolioArr.forEach((obj, i) => {
    /** @type{DocumentFragment} */
    let tmp = templateContent.cloneNode(true);
    tmp.querySelector(".card").dataset.index = i;
    tmp.querySelector(".card-title").textContent = obj.title;
    tmp.querySelector(".card-text").textContent = obj.text;
    tmp.querySelector("img").src = obj.src;
    tmp.querySelector("img").alt = obj.title;

    frag.append(tmp);
  });

  containerEl.replaceChildren(frag);
}

populatePortfolio(portfolioArr);
