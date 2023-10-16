$(function () {
  $(".popup-modal").magnificPopup({
    type: "inline",
    preloader: false,
    focus: "#username",
    modal: true,
  });
  $(document).on("click", ".popup-modal-dismiss", function (e) {
    e.preventDefault();
    $.magnificPopup.close();
  });
});

// Initialization for ES Users
import { Lightbox, initTE } from "tw-elements";

initTE({ Lightbox });
