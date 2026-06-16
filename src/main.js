const filterButtons = document.querySelectorAll(".filter-chip");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");

    productCards.forEach((card) => {
      const categories = card.dataset.category.split(" ");
      const isVisible = selectedFilter === "all" || categories.includes(selectedFilter);
      card.hidden = !isVisible;
    });
  });
});
