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

/**
 *
 * @typedef {Object} ProjectData
 * @property {string} title - Title
 * @property {string} dataBsTarget - `id` of modal
 * @property {string} src - Card image `src`
 * @property {string} excerpt - Short text on card
 * @property {string} description - Long text on modal
 * @property {{category: string, date: string}} information - Information
 * @property {Object} links - Information
 * @property {string=} links.github - Github Repo URL
 * @property {string=} links.live - Live site URL
 * @property {(Array<string|Array<string>>)} stack - Technology stack
 */

/** @type {ProjectData[]} */
const projectData = [
  {
    title: "Gazetteer",
    dataBsTarget: "#proj-gazetteer-modal",
    src: "assets/img/portfolio/gazetteer_demo_1-600x800.png",
    excerpt:
      "An application for presenting demographic, climate, geographical and other data.",
    description:
      "A web application where users can select different countries and view their demographic, climate, geographical and other data.",
    information: {
      category: "Full stack web application",
      date: "October, 2024",
    },
    links: {
      live: "https://pkljack-gazetteer.onrender.com",
      // github: "#",
    },
    stack: [
      // prettier-ignore
      "JavaScript",
      ["Leaflet", "jQuery"],
      "CSS",
      ["Bootstrap 5"],
      "PHP",
    ],
  },
  {
    title: "Company Directory",
    dataBsTarget: "#proj-companydirectory-modal",
    src: "assets/img/portfolio/companydirectory_demo_1-600x800.png",
    excerpt: "An application for managing company personnel.",
    description:
      "A desktop website that can also run on a mobile that allows for the maintenance of a company personnel database to see who’s who, which department they are in and where they are.",
    information: {
      category: "Full stack web application",
      date: "January, 2025",
    },
    links: {
      live: "https://pkljack-companydirectory.onrender.com",
      // github: "#",
    },
    stack: [
      // prettier-ignore
      "JavaScript",
      ["jQuery"],
      "CSS",
      ["Bootstrap 5"],
      "PHP",
      "MariaDB",
    ],
  },
];

function generatePortfolioCards(arr) {
  /**
   * Create (col) card for portfolio
   * @param {ProjectData} data
   * @param {DocumentFragment} frag
   * @returns {DocumentFragment} A card element, wrapped in a `<div class="col"></div>`
   */
  function createCard(data, frag) {
    const { title, excerpt, src, dataBsTarget } = data;

    frag.querySelector(".card-title").textContent = title;
    frag.querySelector(".card-text").textContent = excerpt;

    const imgEl = frag.querySelector(".card-img");
    imgEl.src = src;
    imgEl.alt = title;

    frag
      .querySelector("[data-bs-target]")
      .setAttribute("data-bs-target", dataBsTarget);

    return frag;
  }

  /** @type{DocumentFragment} */
  const templateContent = document.querySelector(
    "#portfolio-col-template",
  ).content;

  const tmp = document.createDocumentFragment();

  arr.forEach((item) => {
    /** @type{DocumentFragment} */
    const clone = templateContent.cloneNode(true);
    const card = createCard(item, clone);
    tmp.append(card);
  });

  // Transfer children from fragment to DOM
  document.querySelector(".portfolio .row").replaceChildren(tmp);
}

function generatePortfolioModals(arr) {
  /**
   * Create a simple `<li>` element with `textContent`
   * @param {string} textContent
   */
  function plainLiEl(textContent) {
    const liEl = document.createElement("li");
    liEl.textContent = textContent;
    return liEl;
  }

  /**
   * @param {ProjectData} data
   * @param {DocumentFragment} frag
   * @returns {HTMLElement} A modal
   */
  function createModal(data, frag) {
    const { dataBsTarget, title, src, description, information, links, stack } =
      data;

    const modelEl = frag.querySelector(".modal");
    modelEl.id = dataBsTarget.substring(1); // Remove '#' sign
    modelEl.setAttribute("aria-labelledby", `${modelEl.id}-label`);

    const titleEl = modelEl.querySelector(".modal-title");
    titleEl.id = `${modelEl.id}-label`;
    titleEl.textContent = title;

    modelEl.querySelector("img").src = src;
    modelEl.querySelector(".project-description").textContent = description;

    // Information
    modelEl.querySelector(".project-category").textContent =
      information.category;
    modelEl.querySelector(".project-date").textContent = information.date;

    if (links.live) {
      const liveLiEl = document.createElement("li");
      liveLiEl.innerHTML = `<a href="${links.live}">Visit Website</a>`;
      modelEl.querySelector(".project-information").append(liveLiEl);
    }

    if (links.github) {
      const githubLiEl = document.createElement("li");
      githubLiEl.innerHTML = `<a href="${links.github}">Source Code</a>`;
      modelEl.querySelector(".project-information").append(githubLiEl);
    }

    // Stack
    const ulChildren = stack.map((strOrArr) => {
      if (typeof strOrArr === "string") {
        return plainLiEl(strOrArr);
      }

      if (Array.isArray(strOrArr)) {
        const ulEl = document.createElement("ul");
        for (const item of strOrArr) {
          ulEl.append(plainLiEl(item));
        }
        return ulEl;
      }

      throw new Error("Unknown type");
    });

    // Transfer children from fragment to DOM
    modelEl.querySelector(".project-stack").replaceChildren(...ulChildren);

    return frag;
  }

  /** @type{DocumentFragment} */
  const templateContent = document.querySelector(
    "#proj-model-template",
  ).content;

  const tmp = document.createDocumentFragment();

  arr.forEach((item) => {
    /** @type{DocumentFragment} */
    const clone = templateContent.cloneNode(true);
    const modal = createModal(item, clone);
    tmp.append(modal);
  });

  // Transfer children from fragment to DOM
  document.body.append(document.createComment(" MODALS START "));
  document.body.append(tmp);
  document.body.append(document.createComment(" MODALS END "));
}

// TODO:
// Consider put in `setTimeOut(..., 0)`?
generatePortfolioCards(projectData);
generatePortfolioModals(projectData);

/* ======================================== */
/* Contact Form                             */
/* ======================================== */

/** @type{HTMLFormElement} */
const contactFormEl = document.querySelector(".contact form");

contactFormEl
  ?.querySelector('[type="submit"]')
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
