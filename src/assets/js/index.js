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
    dataBsTarget: "#proj-gazetteer-modal",
  },
  {
    title: "Company Directory",
    text: "An application for managing company personnel.",
    src: "assets/img/portfolio/companydirectory_demo_1-600x800.png",
    dataBsTarget: "#proj-companydirectory-modal",
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
    tmp.querySelector("a").setAttribute("data-bs-target", obj.dataBsTarget);
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

/* ======================================== */
/* Portfolio Modal                          */
/* ======================================== */
// TODO: Put to portfolio section
//

const portfolioModalArr = [
  {
    id: "proj-gazetteer-modal",
    title: "Gazetteer",
    imgSrc: "assets/img/portfolio/gazetteer_demo_1-600x800.png",
    description:
      "A web application where users can select different countries and view their demographic, climate, geographical and other data.",
    information: {
      category: "Full stack web application",
      date: "October, 2024",
    },
    links: {
      live: "#",
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
    id: "proj-companydirectory-modal",
    title: "Company Directory",
    imgSrc: "assets/img/portfolio/companydirectory_demo_1-600x800.png",
    description:
      "A desktop website that can also run on a mobile that allows for the maintenance of a company personnel database to see who’s who, which department they are in and where they are.",
    information: {
      category: "Full stack web application",
      date: "January, 2025",
    },
    links: {
      live: "#",
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

function generateModal(obj) {
  // TODO:

  /** @type{DocumentFragment} */
  const templateContent = document.querySelector(
    "#proj-model-template",
  ).content;

  // const frag = document.createDocumentFragment()

  /** @type{DocumentFragment} */
  const tmpEl = templateContent.cloneNode(true);

  // Update id
  tmpEl.querySelector(".modal").id = obj.id;

  // Update aria-labelled-by
  tmpEl
    .querySelector(".modal")
    .setAttribute("aria-labelledby", `${obj.id}-label`);

  // Update h1, h1 id
  tmpEl.querySelector(".modal-title").id = `${obj.id}-label`;
  tmpEl.querySelector(".modal-title").textContent = obj.title;

  // Update image
  tmpEl.querySelector("img").src = obj.imgSrc;

  // Update description
  tmpEl.querySelector(".project-description").textContent = obj.description;

  // Update information ul
  tmpEl.querySelector(".project-category").textContent =
    obj.information.category;
  tmpEl.querySelector(".project-date").textContent = obj.information.date;

  // Add website if exists
  if (obj.links.live) {
    const liveLiEl = document.createElement("li");
    liveLiEl.innerHTML = `<a href="${obj.links.live}">Visit Website</a>`;
    tmpEl.querySelector(".project-information").append(liveLiEl);
  }

  // Add Github Repo if exists
  if (obj.links.github) {
    const githubLiEl = document.createElement("li");
    githubLiEl.innerHTML = `<a href="${obj.links.github}">Visit Website</a>`;
    tmpEl.querySelector(".project-information").append(githubLiEl);
  }

  // Generate stack ul
  const createLiEl = (textContent) => {
    const liEl = document.createElement("li");
    liEl.textContent = textContent;
    return liEl;
  };

  const ulChildren = obj.stack.map((item) => {
    if (typeof item === "string") {
      return createLiEl(item);
    }

    if (Array.isArray(item)) {
      const ulElement = document.createElement("ul");
      for (x of item) {
        ulElement.append(createLiEl(x));
      }
      return ulElement;
    }

    throw new Error("Unknown type");
  });

  tmpEl.querySelector(".project-stack").replaceChildren(...ulChildren);

  return tmpEl;
}

document.body.append(generateModal(portfolioModalArr[0]));
document.body.append(generateModal(portfolioModalArr[1]));

function generateAllModals(arr) {
  //
}
