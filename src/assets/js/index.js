/* ======================================== */
/* Hero                                     */
/* ======================================== */

const heroTyped = new Typed("#heroTyped", {
  strings: ["Developer"],
  loop: true,
  typeSpeed: 100,
  backSpeed: 75,
  backDelay: 2000,
  startDelay: 200,
});

/* ======================================== */
/* Portfolio                                */
/* ======================================== */

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

/* ======================================== */
/* Contact Form                             */
/* ======================================== */

/** @type{HTMLFormElement} */
const contactFormEl = document.querySelector(".contact form");

contactFormEl
  .querySelector('[type="submit"]')
  .addEventListener("click", (ev) => {
    ev.preventDefault();

    const fd = new FormData(contactFormEl);
    const fdo = Object.fromEntries(fd.entries());

    console.log("Sending Message", fdo);

    // TODO:
    // - POST message to server
    // - Take 200 or OK and show user success
    //
  });
