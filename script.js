(function () {
  "use strict";
  const cfg = window.SITE_CONFIG || {};
  const phone = String(cfg.phone || "").trim().replace(/[\s()\-]/g, "");
  const valid = /^\+995\d{9}$/.test(phone);
  const displayPhone = String(cfg.displayPhone || "").trim() || (
    valid && phone.slice(4, 5) === "5"
      ? `${phone.slice(4, 7)} ${phone.slice(7, 9)} ${phone.slice(9, 11)} ${phone.slice(11)}`
      : phone
  );

  document.querySelectorAll("[data-call]").forEach((link) => {
    if (valid) {
      link.href = "tel:" + phone;
      link.setAttribute("aria-label", "დარეკვა ნომერზე " + displayPhone);
    } else {
      link.href = "#";
      link.addEventListener("click", (event) => {
        event.preventDefault();
        window.alert("საიტზე ჯერ არ არის მითითებული ხელოსნის ტელეფონის ნომერი. დაამატეთ ის config.js ფაილში.");
      });
    }
  });
  document.querySelectorAll("[data-phone-display]").forEach((node) => {
    node.textContent = valid ? displayPhone : "ტელეფონის ნომერი დასამატებელია";
  });
  document.getElementById("year").textContent = String(new Date().getFullYear());

})();
