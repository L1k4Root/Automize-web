export const initServiceCards = () => {
  document.querySelectorAll<HTMLElement>(".service-grid").forEach((grid) => {
    const cards = Array.from(grid.querySelectorAll<HTMLDetailsElement>(".home-service-card"));

    cards.forEach((card) => {
      card.addEventListener("toggle", () => {
        if (!card.open) return;

        cards.forEach((sibling) => {
          if (sibling !== card) {
            sibling.open = false;
          }
        });
      });
    });
  });
};
