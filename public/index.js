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
$("#nav-play").on("click", function () {
  if (!$(this).hasClass("active"))
    homePageChage();

  navItemActive($(this));
})

// Set class .active to nav element that is selected
function navItemActive($navItem) {
  $(".active").removeClass("active");

  if ($navItem.attr("id") == "nav-logo") {
    $("#nav-home").addClass("active");
  } else {
    $navItem.addClass("active");
  }
};

/******************** Home and Recyclable page switching functions *******************/

// Change the layout to recyclable page
function recyclablePageChage() {
  moveMysteryItem_recyclable();
  moveSearchBar_recyclable(revealItemList);
  moveBins_recyclable();
};

// Change the layout to home page
function homePageChage() {
  moveMysteryItem_home();
  moveBins_home();
  hideItemList(moveSearchBar_home);
};

/**************** Home and Recyclable page switching functions animations ****************/

var $searchBar = $("#search-container");
var $mysteryItemsWrapper = $("#mystery-item-wrapper");
var $bins = $("#bins-container");
var $itemList = $("#item-list-container");
var $midItemOffset;

function moveSearchBar_home() {
  $searchBar.animate({
    top: "0",
    left: "0",
    zoom: "1",
    width: "50%",
  }, 400)
};

function moveSearchBar_recyclable(event) {
  var offset = $searchBar.offset();

  $searchBar.animate({
    top: "+=" + ($("nav").height() * 0.6 - offset.top),
    left: "+=" + (($(window).width() - $("#page-wrapper").width()) / 2 - offset.left - $searchBar.width() / 1.8),
    zoom: "0.7",
    width: "20%",
  }, 400, () => {
    event();
  })
};


function moveMysteryItem_home() {
  var $item = $("#item").fadeOut(400, function () {
    $item.remove();
    $mysteryItemsWrapper.fadeIn(300);
  });

};

function moveMysteryItem_recyclable() {
  $midItemOffset = $allMysteryItems.eq(midItemIndex).offset();
  var $item = $allMysteryItems.eq(midItemIndex).clone();
  $item.attr("id", "item");
  $item.css({
    "position": "absolute",
    "width": "220px",
    "animation": "none",
    "filter": "none",
    "left": $midItemOffset.left - ($(window).width() - $("#page-wrapper").width()) / 2
  })
  $("#content-wrapper").prepend($item);

  $mysteryItemsWrapper.fadeOut("100", function () {
    $item.css({
      "position": "relative",
      "left": "0"
    });
    $item.animate({
      left: "+=" + $("#page-wrapper").width() * 0.1
    }, 400)
  });
};

function moveBins_home() {
  $bins.animate({
    left: "0",
    top: "0"
  }, 400)
}

function moveBins_recyclable() {
  var offset = $bins.offset();

  $bins.animate({
    left: "+=" + $("#page-wrapper").width() * 0.1,
    // top: "+=" + ($("#page-wrapper").height() - offset.top - $bins.height())
  }, 400)
}

function revealItemList() {
  $itemList.slideDown(500);
}

function hideItemList(event) {
  $itemList.slideUp(500, () => { event() });
}

/*************************** itemList functions **********************************/
var fullItemList;

retrieveItems();

function retrieveItems() {
  var dbRef = firebase.database().ref("recyclables");
  var promise = dbRef.once("value", snap => {
    fullItemList = snap.val();
  })

  promise.then(() => {
    creatItemList()
  })
}

function creatItemList() {
  $itemList.hide();
  $itemList.html("<ul></ul>");
  var $unorderList = $("#item-list-container ul");

  console.log(fullItemList);

  for (var item in fullItemList) {
    $unorderList.append(`<li id='${item}'>${item.split("_").join(" ")}</li>`);
  }

  let middleItemName = $allMysteryItems.eq(midItemIndex).attr("src").split("/")[1];
  $("#" + middleItemName).addClass("currentItem");

  setItemListListener();
}

function setItemListListener() {
  $("#item-list-container li").on("click", function () {
    $(".currentItem").removeClass("currentItem");
    $(this).addClass("currentItem");
  })
}


/*************************** mysteryItem functions ******************************/

var $scrollingWrapper = $("#scrolling-wrapper");
var $allMysteryItems = $(".mystery-item");
const itemWidth = $(".item").width();
const middleOffset = 58;
var midItemIndex = 3;

// Move items to the forth one as default
$scrollingWrapper.scrollLeft(itemWidth * 2 + middleOffset);
itemsRevealAndHide();

// Set click listener on left and right arrow
$("#left-arrow").on("click", function () {
  moveToPerviousItem();
});

$("#right-arrow").on("click", function () {
  moveToNextItem();
});

function moveToPerviousItem() {
  midItemIndex -= 1;
  if (midItemIndex == -2) {
    midItemIndex = $allMysteryItems.length - 2;
  };
  itemsRevealAndHide();
  lastItemToFirst();
}

function moveToNextItem() {
  midItemIndex += 1;
  if (midItemIndex == $allMysteryItems.length) {
    midItemIndex = 0;
  };
  itemsRevealAndHide();
  firstItemToLast();
}

function itemsRevealAndHide() {
  var previousItemIndex = midItemIndex - 1
  var nextItemIndex = midItemIndex + 1

  if (previousItemIndex == -1) {
    previousItemIndex = $allMysteryItems.length - 1;
  }
  if (nextItemIndex == $allMysteryItems.length) {
    nextItemIndex = 0;
  }

  $allMysteryItems.eq(previousItemIndex).css({
    "animation": "none",
    "filter": "brightness(12%)"
  }).animate({
    "width": "60%"
  }, 250);
  $allMysteryItems.eq(midItemIndex).css({
    "animation": "reveal-item 1s",
    "animation-fill-mode": "forwards"
  }).animate({
    "width": "100%"
  }, 250);
  $allMysteryItems.eq(nextItemIndex).css({
    "animation": "none",
    "filter": "brightness(12%)"
  }).animate({
    "width": "60%"
  }, 250);
}

function lastItemToFirst() {
  var $lastItem = $(".item").last().detach();

  $lastItem.css("width", "0");
  $scrollingWrapper.prepend($lastItem);
  $lastItem.animate({
    width: "220"
  }, 250);
}

function firstItemToLast() {
  var $firstItem = $(".item").first();

  $firstItem.animate({
    width: "0"
  }, 250, function () {
    $firstItem.detach();
    $firstItem.css("width", "220");
    $scrollingWrapper.append($firstItem);
  });
}
