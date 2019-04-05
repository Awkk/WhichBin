/*************************** Navbar functions ******************************/
var pageChanging = false;
const pageChangingDelay = 800;

// Set click event listener for nav elements
$("#nav-logo").on("click", function () {
  if (!$(this).hasClass("active") && !pageChanging) {
    pageChanging = true
    homePageChage();
    navItemActive($(this));
    setTimeout(() => {
      pageChanging = false;
    }, pageChangingDelay);
  }
})
$("#nav-home").on("click", function () {
  if (!$(this).hasClass("active") && !pageChanging) {
    pageChanging = true
    homePageChage();
    navItemActive($(this));
    setTimeout(() => {
      pageChanging = false;
    }, pageChangingDelay);
  }
})
$("#nav-recyclable").on("click", function () {
  if (!$(this).hasClass("active") && !pageChanging) {
    pageChanging = true
    recyclablePageChage();
    navItemActive($(this));
    setTimeout(() => {
      pageChanging = false;
    }, pageChangingDelay);
  }
})
$("#nav-play").on("click", function () {
  if (!$(this).hasClass("active") && !pageChanging) {
    pageChanging = true
    homePageChage();
    navItemActive($(this));
    setTimeout(() => {
      pageChanging = false;
    }, pageChangingDelay);
  }
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

// Change the layout to home page
function homePageChage() {
  moveItemShowcase_home();
  hideItemList(moveSearchBar_home);
  moveBins_home();
};

// Change the layout to recyclable page
function recyclablePageChage() {
  moveItemShowcase_recyclable();
  moveSearchBar_recyclable(revealItemList);
  moveBins_recyclable();
  setTimeout(() => {
    assignBinAnimation();
  }, 800);
};

/**************** Home and Recyclable page switching functions animations ****************/

var $searchBar = $("#search-container");
var $mysteryItemsWrapper = $("#mystery-item-wrapper");
var $bins = $("#bins-container");
var $itemList = $("#item-list-container");
var $pageWrapper = $("#page-wrapper");
var $midItemPosition;

// Move search bar to home page position
function moveSearchBar_home() {
  let horizontalMargin = ($pageWrapper.width()) / 4

  $searchBar.animate({
    top: "0",
    left: "0",
    zoom: "1",
    width: "50%",
    margin: "0 " + horizontalMargin
  }, 400)
};

// Move search bar to recyclable page position
function moveSearchBar_recyclable(callback) {
  var offset = $searchBar.offset();

  $searchBar.animate({
    top: "+=" + ($("nav").height() * 0.6 - offset.top),
    left: "+=20",
    zoom: "0.7",
    width: "300px",
    margin: "0"
  }, 400, () => {
    callback();
  })
};

// Move item showcase to home page position
function moveItemShowcase_home() {
  $(".currentItem").fadeOut(400, function () {
    $(this).remove();
  });
  $mysteryItemsWrapper.children().not('.currentItem').fadeIn(400);
};

// Move item showcase to recyclable page position
function moveItemShowcase_recyclable() {
  $midItemPosition = $allMysteryItems.eq(midItemIndex).position();

  var $item = createCurrentItem();
  $mysteryItemsWrapper.prepend($item);

  // Hide the item showcase and move the cloned item
  $mysteryItemsWrapper.children().not('.currentItem').hide();

  $item.animate({
    left: "+=" + $pageWrapper.width() * 0.1,
    top: "+=50px",
    width: "180px"
  }, 500)
};

// Clone the item in the middle of item showcase, cover it on the same position
function createCurrentItem() {
  var $item = $allMysteryItems.eq(midItemIndex).clone();
  $item.attr("id", `${$item.attr("src").split("/")[2]}`);
  $item.removeClass('mystery-item');
  $item.addClass('currentItem')
  $item.css({
    "position": "absolute",
    "width": "180px",
    "animation": "none",
    "filter": "none",
    "top": $midItemPosition.top,
    "left": $midItemPosition.left
  })
  return $item;
}

// Move bins to home page position
function moveBins_home() {
  $bins.animate({
    left: "0",
    top: "0",
    width: "500px"
  }, 500)
}

// Move bins to recyclable page position
function moveBins_recyclable() {
  var offset = $bins.offset();

  let verticalMovement = $(window).height() - offset.top - $bins.height() - 50;

  if (verticalMovement < 0) {
    verticalMovement = 100;
  }

  $bins.animate({
    left: "+=" + $pageWrapper.width() * 0.1,
    top: "+=" + verticalMovement,
    width: "630px"
  }, 500)
}

// Show item list on the side
function revealItemList() {
  let id = $('.currentItem').attr('id');
  $('.currentSelectedItem').removeClass('currentSelectedItem');
  $(`#${id}-list`).addClass('currentSelectedItem');
  $itemList.slideDown(400);
}

// Hide item list on the side
function hideItemList(callback) {
  $itemList.slideUp(400, () => { callback() });
}

/*************************** Item List functions **********************************/
var fullItemList;

// Get the item list ready when page loaded
retrieveItems();

// Set on click listener for each item in the list
function setItemListListener() {
  $("#item-list-container li").on("click", function () {
    $('.currentItem').stop();
    $('.bin').stop();
    $(".currentSelectedItem").removeClass("currentSelectedItem");
    $(this).addClass("currentSelectedItem");

    $(".currentItem").fadeOut(400, function () {
      $(this).remove();
    });

    let itemID = $(this).attr('id').split('-')[0];
    let itemSrc = `img/recyclables/${itemID}/${itemID}.png`;
    var $item = createCurrentItem();

    $item.attr('src', itemSrc);
    $item.attr('id', itemID);

    $item.css({
      "left": "+=" + $pageWrapper.width() * 0.1,
      "top": "+=50px",
      "width": "130px"
    })
    $mysteryItemsWrapper.prepend($item);
    $item.hide().fadeIn(500, () => {
      assignBinAnimation();
    });
  })
}

// Get all items from firebase create the item list
function retrieveItems() {
  firebase.database().ref("recyclables").once("value", snap => {
    fullItemList = snap.val();
    creatItemList()
  })
}

// Append items to the item list as html elements
function creatItemList() {
  $itemList.hide();
  $itemList.html("<ul></ul>");
  var $unorderList = $("#item-list-container ul");

  console.log(fullItemList);

  for (var item in fullItemList) {
    $unorderList.append(`<li id='${item}-list'>${item.split("_").join(" ")}</li>`);
  }

  let middleItemName = $allMysteryItems.eq(midItemIndex).attr("src").split("/")[2];
  $("#" + middleItemName + "-list").addClass("currentSelectedItem");

  setItemListListener();
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

// Set click listener on left arrow
$("#left-arrow").on("click", throttle(moveToPreviousItem, 250));

// Set click listener on right arrow
$("#right-arrow").on("click", throttle(moveToNextItem, 250));

$($allMysteryItems).on('click', () => {
  navItemActive($("#nav-recyclable"));
  recyclablePageChage();
})

// Move the middle item of item showcase to the previous one
function moveToPreviousItem() {
  midItemIndex -= 1;
  if (midItemIndex == -2) {
    midItemIndex = $allMysteryItems.length - 2;
  };
  itemsRevealAndHide();
  lastItemToFirst();
}

// Move the middle item of item showcase to the next one
function moveToNextItem() {
  midItemIndex += 1;
  if (midItemIndex == $allMysteryItems.length) {
    midItemIndex = 0;
  };
  itemsRevealAndHide();
  firstItemToLast();
}

// Reveal and resize the middle item and the items next to it
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

// Move the last item in item showcase to the start of the list
function lastItemToFirst() {
  var $lastItem = $(".item").last().detach();

  $lastItem.css("width", "0");
  $scrollingWrapper.prepend($lastItem);
  $lastItem.animate({
    width: "220"
  }, 250);
}

// Move the first item in item showcase to the end of the list
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

// Add a limit on how often a function can be called
function throttle(callback, limit) {
  var wait = false;
  return function () {
    if (!wait) {
      callback.call();
      wait = true;
      setTimeout(() => {
        wait = false;
      }, limit);
    }
  }
}

/**************************** Recyables animation *******************************/

function assignBinAnimation() {
  let $currentItem = $('.currentItem');
  let itemID = $currentItem.attr('id');
  let partsInfo = Object.entries(fullItemList[itemID]);

  if (partsInfo.length > 1) {
    let srcArray = $currentItem.attr('src').split('/');
    srcArray.pop()
    let src = srcArray.join('/') + '/';
    for (const [item, bin] of partsInfo) {
      let $itemPart = $currentItem.clone();
      $itemPart.attr('src', src + item + '.png');
      $itemPart.addClass('part');
      $itemPart.hide();
      $mysteryItemsWrapper.append($itemPart);
      setTimeout(() => {
        moveToBin($itemPart, bin);
      }, 800);
    }
    $currentItem.animate({
      opacity: '0'
    }, 200, () => {
      $('.part').fadeIn(300);
    });

  } else {
    moveToBin($currentItem, partsInfo[0][1]);
  }
}

function moveToBin($item, typeOfBin) {
  var binOffset = $(`#${typeOfBin}_bin`).offset();
  var itemOffset = $item.offset();
  var randomAngle = (Math.random() - 0.5) * 80;
  var randomTop = Math.random() * 40 + 100;
  let randomLeft = Math.random() * 30 + 10;

  if ($item.attr('src').split('/')[3] == 'lid.png') {
    randomTop -= 70;
    randomAngle = Math.random() * 50;;
  }

  $item.animate({
    top: "+=" + (binOffset.top - itemOffset.top - randomTop),
    left: "+=" + (binOffset.left - itemOffset.left - randomLeft),
  }, 1100);
  $item.animateRotate(randomAngle, 1000);
}

// jQuery plugin for object rotation
$.fn.animateRotate = function (angle, duration, easing, complete) {
  var args = $.speed(duration, easing, complete);
  var step = args.step;
  return this.each(function (i, e) {
    args.complete = $.proxy(args.complete, e);
    args.step = function (now) {
      $.style(e, 'transform', 'rotate(' + now + 'deg)');
      if (step) return step.apply(e, arguments);
    };

    $({ deg: 0 }).animate({ deg: angle }, args);
  });
};