const backTopButton = document.querySelector(".back-top");
const navLinks = [...document.querySelectorAll(".site-nav a[href^='#']")];

const updateBackTopButton = () => {
  if (!backTopButton) {
    return;
  }

  backTopButton.classList.toggle("is-visible", window.scrollY > 360);
};

window.addEventListener("scroll", updateBackTopButton, { passive: true });
updateBackTopButton();

backTopButton?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href) {
      return;
    }

    const target = document.querySelector(href);
    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const sections = navLinks
  .map((link) => {
    const href = link.getAttribute("href");
    return href ? document.querySelector(href) : null;
  })
  .filter(Boolean);

const activateLink = (id) => {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("is-active", isActive);
  });
};

if ("IntersectionObserver" in window && sections.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visibleEntry?.target?.id) {
        return;
      }

      activateLink(visibleEntry.target.id);
    },
    {
      rootMargin: "-20% 0px -60% 0px",
      threshold: [0.2, 0.45, 0.7],
    }
  );

  sections.forEach((section) => observer.observe(section));
}
