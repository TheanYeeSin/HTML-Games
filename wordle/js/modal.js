//DO AFTER PAGE LOADED
document.addEventListener("DOMContentLoaded", () => {
  init_modal("help-modal", "help", "close-help");
  init_modal("contact-modal", "contact", "close-contact");
});

//INITIALIZE THE MODAL (LIKE A DIALOGBOX)
function init_modal(modal_id, button_id, close_id) {
  const modal = document.getElementById(modal_id);

  const button = document.getElementById(button_id);

  const close = document.getElementById(close_id);

  button.addEventListener("click", function () {
    modal.style.display = "block";
  });

  close.addEventListener("click", function () {
    modal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
}
