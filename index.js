// Set click event listener for all nav items
$("nav a").on("click", function () {
  navItemActive(this);

  switch (this.id) {
    case "nav-logo":
      homePageChage();
      break;
    case "nav-home":
      homePageChage();
      break;
    case "nav-recyclable":
      recyclablePageChage();
      break;
  }
});

// Set class .active to nav-item that is selected
function navItemActive(navItem) {
  $(".active").removeClass("active");

  if (navItem.id == "nav-logo") {
    $("#nav-home")[0].setAttribute("class", "active");
  } else {
    navItem.setAttribute("class", "active");
  }
};

mysteryItemHoverListener()

function recyclablePageChage() {
  $("#mystery-item").off("mouseenter mouseleave");
  revealMysteryItem();
};

function homePageChage() {
  mysteryItemHoverListener()
  hideMysteryItem();
};

// Reveal mystery-item when mouse over, backout again when mouse out
function mysteryItemHoverListener() {
  $("#mystery-item").hover(function () {
    revealMysteryItem();
  }, function () {
    hideMysteryItem();
  });
};

function revealMysteryItem() {
  $("#mystery-item").css("animation", "reveal-item 2s");
  $("#mystery-item").css("animation-fill-mode", "forwards");
  $("#question-mark").hide();
};

function hideMysteryItem() {
  $("#mystery-item").css("filter", "brightness(0)");
  $("#mystery-item").css("animation", "none");
  $("#question-mark").show();
};
