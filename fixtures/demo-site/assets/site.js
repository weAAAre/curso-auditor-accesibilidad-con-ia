const menuButton = document.querySelector("#menu-toggle");
const menu = document.querySelector("#extra-navigation");

menuButton?.addEventListener("click", () => {
  const open = menu.hasAttribute("hidden");
  menu.toggleAttribute("hidden");
  menuButton.setAttribute("aria-expanded", String(open));
});

const dialog = document.querySelector("#product-dialog");
document
  .querySelector("#open-dialog")
  ?.addEventListener("click", () => dialog.showModal());
document.querySelector("#close-dialog")?.addEventListener("click", () => dialog.close());

const deliveryForm = document.querySelector("#delivery-form");
deliveryForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("#delivery-errors").removeAttribute("hidden");
  document.querySelector("#address").setAttribute("aria-invalid", "true");
});
