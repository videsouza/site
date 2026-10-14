document.addEventListener("DOMContentLoaded", () => {

  /* Ano no rodapé e no hero */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  /* Destaque da seção atual nas bolinhas laterais */
  const sections = document.querySelectorAll("section[id], header#inicio");
  const dots = document.querySelectorAll(".side-nav .dot");

  if (sections.length && dots.length && "IntersectionObserver" in window) {
    const setActive = (id) => {
      dots.forEach((d) => {
        d.classList.toggle("active", d.getAttribute("href") === "#" + id);
      });
    };

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => obs.observe(s));
  }
});
