// Modified to support nested tools group for build tools
(function() {
  let currentItem;
  let currentNav;
  const stepHidden = document.getElementById("build-tools").getElementsByClassName("step-hidden");

  function hasClass(ele, cls) {
    return ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
  }
  function addClass(ele, cls) {
    if (!hasClass(ele, cls)) {
      ele.className += " " + cls;
    }
  }
  function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
      const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
      ele.className = ele.className.replace(reg, " ");
    }
  }

  function reset() {
    if (currentItem) {
      for (let i = 0; i < currentItem.length; i++) {
        $(currentItem[i]).hide();
      }
    }
    if (currentNav) {
      removeClass(currentNav, "active");
    }
    currentItem = currentNav = null;
    for (let i = 0; i < stepHidden.length; i++) {
      $(stepHidden[i]).hide();
    }
  }


  previouslyBuildActive = null;
  if (typeof(Storage) !== "undefined") {
    previouslyBuildActive = sessionStorage.getItem("previouslyBuildActive");
  }

  const buttons = document.querySelectorAll(".build-tools-group .build-tools-button");
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    button.onclick = function() {
      if (currentNav && currentNav === this) {
        return reset();
      } else {
        reset();
      }

      currentNav = this;
      const name = currentNav.attributes["data-title"].value;

      if (typeof(Storage) !== "undefined") {
        sessionStorage.setItem("previouslyBuildActive", name);
      }

      addClass(currentNav, "active");
      currentItem = document.querySelectorAll(
        "[data-title=" + name + "]:not(.build-tools-button)"
      );
      for (let i = 0; i < currentItem.length; i++) {
        $(currentItem[i]).show();
      }
      for (let i = 0; i < stepHidden.length; i++) {
        $(stepHidden[i]).show();
      }

    };

    const dataTitle = $(button).data("title");
    if (dataTitle) {
      if (dataTitle === previouslyBuildActive) {
        button.click();
      }
    }
  }
})();
