/*************************** Navbar functions ******************************/

// Set click event listener for nav elements
$("#nav-logo").on("click", function () {
  if (!$(this).hasClass("active"))
    homePageChage();

  navItemActive($(this));
})
$("#nav-home").on("click", function () {
  if (!$(this).hasClass("active"))
    homePageChage();

  navItemActive($(this));
})
$("#nav-recyclable").on("click", function () {
  if (!$(this).hasClass("active"))
    recyclablePageChage();

  navItemActive($(this));
})

// Set class .active to nav element that is selected
function navItemActive(navItem) {
  $(".active").removeClass("active");

  if (navItem.attr("id") == "nav-logo") {
    $("#nav-home").addClass("active");
  } else {
    navItem.addClass("active");
  }
};

/*************************** mysteryItem functions ******************************/

// Set listener for mystery-item
mysteryItemHoverListener();

// Listener for revealing mystery-item when mouse over, backout again when mouse out
function mysteryItemHoverListener() {
  $("#mystery-item").hover(function () {
    revealMysteryItem();
  }, function () {
    hideMysteryItem();
  });
};

function revealMysteryItem() {
  $("#mystery-item").css("animation", "reveal-item 1s");
  $("#mystery-item").css("animation-fill-mode", "forwards");
  $("#question-mark").hide();
};

function hideMysteryItem() {
  $("#mystery-item").css("filter", "brightness(0)");
  $("#mystery-item").css("animation", "none");
  $("#question-mark").show();
};

/******************** Home and Recyclable page switching functions *******************/

// Change the layout to recyclable page
function recyclablePageChage() {
  $("#mystery-item").off("mouseenter mouseleave");
  revealMysteryItem();
  moveMysteryItem_recyclable();
  moveSearchBar_recyclable();
  moveBins_recyclable();
};

// Change the layout to home page
function homePageChage() {
  mysteryItemHoverListener();
  hideMysteryItem();
  moveSearchBar_home();
  moveMysteryItem_home();
  moveBins_home()
};

/**************** Home and Recyclable page switching functions animations ****************/

function moveSearchBar_home() {
  var searchBar = $("#search-container");
  var offset = searchBar.offset();

  searchBar.animate({
    top: "0",
    left: "0",
    zoom: "1",
    width: "50%",
  }, 600)
};

function moveSearchBar_recyclable() {
  var searchBar = $("#search-container");
  var offset = searchBar.offset();

  searchBar.animate({
    top: "+=" + ($("nav").height() * 0.6 - offset.top),
    left: "+=" + (($(window).width() - $("#page-wrapper").width()) / 2 - offset.left - searchBar.width() / 1.8),
    zoom: "0.7",
    width: "20%",
  }, 600)
};

function moveMysteryItem_home() {
  var mysteryItem = $("#mystery-item-container");
  var offset = mysteryItem.offset();

  mysteryItem.animate({
    left: "0"
  }, 600)
};

function moveMysteryItem_recyclable() {
  var mysteryItem = $("#mystery-item-container");
  var offset = mysteryItem.offset();

  mysteryItem.animate({
    left: "+=" + $("#page-wrapper").width() * 0.1
  }, 600)
};

function moveBins_home() {
  var bins = $("#bins-container");
  var offset = bins.offset();

  bins.animate({
    left: "0",
    top: "0"
  }, 600)
}

function moveBins_recyclable() {
  var bins = $("#bins-container");
  var offset = bins.offset();

  bins.animate({
    left: "+=" + $("#page-wrapper").width() * 0.1,
    top: "+=" + ($("#page-wrapper").height() - offset.top - bins.height() - 70)
  }, 600)
}
