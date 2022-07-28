// полифил для метода forEach для NodeList в IE
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (let i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelectorAll(".dropdown--js")
    .forEach(function (dorpDownWrapper) {
      const dropDownBtn = dorpDownWrapper.querySelector(".dropdown__btn");
      const dropDownList = dorpDownWrapper.querySelector(".dropdown__list");
      const dropDownListItems =
        dropDownList.querySelectorAll(".dropdown__item");
      const dropDownInput = dorpDownWrapper.querySelector(
        ".dropdown__hidden-input"
      );

      dropDownBtn.addEventListener("click", function () {
        dropDownList.classList.toggle("dropdown__list--visible");
      });

      dropDownListItems.forEach(function (listItem) {
        listItem.addEventListener("click", function (e) {
          e.stopPropagation();
          dropDownBtn.innerText = this.innerText;
          dropDownBtn.focus();
          dropDownInput.value = this.dataset.value;
          dropDownList.classList.remove("dropdown__list--visible");
        });
      });

      document.addEventListener("click", function (e) {
        if (e.target !== dropDownBtn) {
          dropDownList.classList.remove("dropdown__list--visible");
        }
      });

      document.addEventListener("keydown", function (e) {
        if (e.key === "Tab" || e.key === "Escape") {
          dropDownList.classList.remove("dropdown__list--visible");
        }
      });
    });
});
