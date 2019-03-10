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

var scrollingWrapper = $("#scrolling-wrapper");
let itemWidth = $(".item").width();
var allItems = $(".mystery-item");
let middleOffset = 80;
var middleItemPosition = itemWidth * 2 + middleOffset;
var middleItemIndex = 3;

// Move items to the forth one as default
scrollingWrapper.scrollLeft(middleItemPosition);
itemsRevealAndHide();

// Set click listener on left and right arrow
$("#left-arrow").on("click", function () {
  moveToPerviousItem();
});

$("#right-arrow").on("click", function () {
  moveToNextItem();
});

function moveToPerviousItem() {
  middleItemIndex -= 1;
  if (middleItemIndex == -2) {
    middleItemIndex = allItems.length - 2;
  };
  itemsRevealAndHide();
  lastItemToFirst();
}

function moveToNextItem() {
  middleItemIndex += 1;
  if (middleItemIndex == allItems.length) {
    middleItemIndex = 0;
  };
  itemsRevealAndHide();
  firstItemToLast();
}

function itemsRevealAndHide() {
  var previousItemIndex = middleItemIndex - 1
  var nextItemIndex = middleItemIndex + 1

  if (previousItemIndex == -1) {
    previousItemIndex = allItems.length - 1;
  }
  if (nextItemIndex == allItems.length) {
    nextItemIndex = 0;
  }

  allItems.eq(previousItemIndex).css({
    "animation": "none",
    "filter": "brightness(15%)"
  }).animate({
    "width": "70%"
  }, 100);
  allItems.eq(middleItemIndex).css({
    "animation": "reveal-item 1s",
    "animation-fill-mode": "forwards"
  }).animate({
    "width": "100%"
  }, 100);
  allItems.eq(nextItemIndex).css({
    "animation": "none",
    "filter": "brightness(15%)"
  }).animate({
    "width": "70%"
  }, 100);
}

function lastItemToFirst() {
  var lastItem = $(".item").last().detach();
  lastItem.css("width", "0");
  scrollingWrapper.prepend(lastItem);
  lastItem.animate({
    width: "220"
  }, 250);
}

function firstItemToLast() {
  var firstItem = $(".item").first();

  firstItem.animate({
    width: "0"
  }, 250, function () {
    firstItem.detach();
    firstItem.css("width", "220");
    scrollingWrapper.append(firstItem);
  });
}

/******************** Home and Recyclable page switching functions *******************/

// Change the layout to recyclable page
function recyclablePageChage() {
  moveMysteryItem_recyclable();
  moveSearchBar_recyclable();
  moveBins_recyclable();
};

// Change the layout to home page
function homePageChage() {
  moveMysteryItem_home();
  moveSearchBar_home();
  moveBins_home()
};

/**************** Home and Recyclable page switching functions animations ****************/

function moveSearchBar_home() {
  var searchBar = $("#search-container");

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
