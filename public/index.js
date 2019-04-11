/*************************** Navbar functions ******************************/
var pageChanging = false;
const pageChangingDelay = 800;

// Set click event listener for nav elements
$("#nav-logo").on("click", function () {
  if (!$(this).hasClass("active") && !pageChanging) {
    pageChanging = true;
    timeout.forEach(clearTimeout);
    homePageChange();
    navItemActive($(this));
    setTimeout(() => {
      pageChanging = false;
    }, pageChangingDelay);
  }
})
$("#nav-home").on("click", function () {
  if (!$(this).hasClass("active") && !pageChanging) {
    pageChanging = true;
    timeout.forEach(clearTimeout);
    homePageChange();
    navItemActive($(this));
    setTimeout(() => {
      pageChanging = false;
    }, pageChangingDelay);
  }
})
$("#nav-recyclable").on("click", function () {
  if (!$(this).hasClass("active") && !pageChanging) {
    pageChanging = true;
    timeout.forEach(clearTimeout);
    recyclablePageChange();
    navItemActive($(this));
    setTimeout(() => {
      pageChanging = false;
    }, pageChangingDelay);
  }
})
$("#nav-play").on("click", function () {
  if (!$(this).hasClass("active") && !pageChanging) {
    pageChanging = true;
    timeout.forEach(clearTimeout);
    playPageChange();
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
function homePageChange() {
  $('.gameItem').fadeOut(400, () => $(this).remove());
  $('#score').fadeOut(400, () => $(this).remove());
  $('#result').fadeOut(400, () => $(this).remove());
  removeBinListener();
  $mysteryItemsWrapper.css('visibility', 'visible');
  $mysteryItemsWrapper.fadeTo(400, 1);
  $searchBar.css('visibility', 'visible');
  $searchBar.fadeTo(400, 1);
  moveItemShowcase_home();
  hideItemList(moveSearchBar_home);
  moveBins_home();
};

// Change the layout to recyclable page
function recyclablePageChange() {
  $('.gameItem').fadeOut(400, () => $(this).remove());
  $('#score').fadeOut(400, () => $(this).remove());
  $('#result').fadeOut(400, () => $(this).remove());
  removeBinListener();
  showHiddenThings();
  moveItemShowcase_recyclable();
  moveSearchBar_recyclable(revealItemList);
  moveBins_recyclable();
  timeout.push(setTimeout(() => assignBinAnimation(), 800));
};

// Change the layout to Play page
function playPageChange() {
  hideThingsForPlayPage(moveItemShowcase_home);
  moveBins_play();
  showRandomItem();
  showScores();
  setBinsListener();
};

/******************************* Home page switching  *********************************/

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

// Move item showcase to home page position
function moveItemShowcase_home() {
  $(".currentItem").fadeOut(400, function () {
    $(this).remove();
  });
  $mysteryItemsWrapper.children().not('.currentItem').fadeIn(400);
};

// Move bins to home page position
function moveBins_home() {
  $bins.animate({
    left: "0",
    top: "0",
    width: "500px"
  }, 500)
}

/***************************** Recyclable page switching *********************************/

// Move search bar to recyclable page position
function moveSearchBar_recyclable(callback) {
  var offset = $searchBar.offset();

  var left = 20;
  var top = $("nav").height() * 0.6 - offset.top;

  if ($searchBar.width() == 300) {
    left = 0;
    top = 0;
  }

  $searchBar.animate({
    top: "+=" + top,
    left: "+=" + left,
    zoom: "0.7",
    width: "300px",
    margin: "0"
  }, 400, () => {
    if (typeof callback === "function") {
      callback();
    }
  })
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
    width: "150px"
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
    "width": "220px",
    "animation": "none",
    "filter": "none",
    "top": $midItemPosition.top,
    "left": $midItemPosition.left
  })
  return $item;
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
  $itemList.slideUp(400, () => {
    if (typeof callback === "function") {
      callback()
    }
  });
}

/***************************** Play page switching *********************************/

// Hide item list, search bar, and mystery items for Play page
function hideThingsForPlayPage(callback) {

  $mysteryItemsWrapper.fadeTo(400, 0, () => {
    $mysteryItemsWrapper.css('visibility', 'hidden');
  });
  $searchBar.fadeTo(400, 0, () => {
    $searchBar.css('visibility', 'hidden');
  });
  $itemList.fadeTo(400, 0, () => {
    $itemList.css('visibility', 'hidden');
  });

  $(".currentItem").fadeOut(400, function () {
    $(this).remove();
    if (typeof callback === "function") {
      callback()
    }
  });
}

function showHiddenThings() {
  $mysteryItemsWrapper.css('visibility', 'visible');
  $mysteryItemsWrapper.fadeTo(400, 1);
  $searchBar.css('visibility', 'visible');
  $searchBar.fadeTo(400, 1);
  $itemList.css('visibility', 'visible');
  $itemList.fadeTo(400, 1);
}

// Move bins to recyclable page position
function moveBins_play() {
  var offset = $bins.offset();
  let verticalMovement = $(window).height() - offset.top - $bins.height() - 50;

  if (verticalMovement < 0) {
    verticalMovement = 100;
  }

  $bins.animate({
    left: "0",
    top: "+=" + verticalMovement,
    width: "630px"
  }, 500)
}

var score;

function showScores() {
  score = 0;
  $('nav').after(`<div id='score'><div>Score: ${score}</div></div>`);
}

function setBinsListener() {
  $('.bin').css('cursor', 'pointer');
  $('#recycling_bin').on('click', function () {
    if (correctAnswer == $(this).attr('id')) {
      score += 5;
      $('#score').text(`Score: ${score}`);
      $(this).effect('bounce', { times: 3 }, "slow");
      nextGameItem();
    } else {
      $(this).effect('shake');
      score--;
      $('#score').text(`Score: ${score}`);
    }
  });
  $('#paper_bin').on('click', function () {
    if (correctAnswer == $(this).attr('id')) {
      score += 5;
      $('#score').text(`Score: ${score}`);
      $(this).effect('bounce', { times: 3 }, "slow");
      nextGameItem();
    } else {
      $(this).effect('shake');
      score--;
      $('#score').text(`Score: ${score}`);
    }
  });
  $('#composting_bin').on('click', function () {
    if (correctAnswer == $(this).attr('id')) {
      score += 5;
      $('#score').text(`Score: ${score}`);
      $(this).effect('bounce', { times: 3 }, "slow");
      nextGameItem();
    } else {
      $(this).effect('shake');
      score--;
      $('#score').text(`Score: ${score}`);
    }
  });
  $('#garbage_bin').on('click', function () {
    if (correctAnswer == $(this).attr('id')) {
      score += 5;
      $('#score').text(`Score: ${score}`);
      $(this).effect('bounce', { times: 3 }, "slow");
      nextGameItem();
    } else {
      $(this).effect('shake');
      score--;
      $('#score').text(`Score: ${score}`);
    }
  });
}

function removeBinListener() {
  $('.bin').css('cursor', 'auto');
  $('.bin').off('click');
}

/**************************** Play page Game functions ************************/
var correctAnswer;
var $item;
var $itemPart2;

function showRandomItem() {
  $item = $allMysteryItems.eq(midItemIndex).clone();

  $item.attr('id', 'plastic_bottle');
  $item.attr('src', 'img/recyclables/plastic_bottle/bottle.png')
  $item.removeClass('mystery-item');
  $item.addClass('gameItem');
  $item.css({
    "position": "absolute",
    "width": "180px",
    "animation": "none",
    "filter": "none",
    "visibility": "visible",
    "left": ($(window).width() / 2 - 90),
    "top": "+=230"
  })

  correctAnswer = 'recycling_bin';

  $itemPart2 = $item.clone();
  $itemPart2.attr('src', 'img/recyclables/plastic_bottle/lid.png')

  $item.hide();
  $itemPart2.hide();
  $('nav').after($itemPart2);
  $('nav').after($item);
  $item.fadeIn(800);
  $itemPart2.fadeIn(400, () => {
    $itemPart2.animate({
      left: "+=40"
    })
    $itemPart2.fadeOut(700);
  });

  lastItem = false;
}

var lastItem;
function nextGameItem() {
  if (lastItem) {
    endGame();
  } else {
    $item.fadeOut(400);
    $itemPart2.css('left', '-=40');
    $itemPart2.fadeIn(400);
    correctAnswer = 'garbage_bin';
    lastItem = true;
  }
}

function endGame() {
  $('nav').after(`<div id="result"><div><br><br><br><p>Good Job!</p><p>Your score is: ${score}</p></div></div>`);
  var $result = $pageWrapper.find('#result');
  $result.hide();
  $result.fadeIn(400);
}



/*************************** Item List functions **********************************/
var fullItemList;

// Get the item list ready when page loaded
retrieveItems();

// Set on click listener for each item in the list
function setItemListListener() {
  $("#item-list-container li").on("click", function () {
    timeout.forEach(clearTimeout);
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
    $item.hide().fadeIn(400, () => {
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
  recyclablePageChange();
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
var timeout = [];


function assignBinAnimation() {
  let $currentItem = $('.currentItem');
  let itemID = $currentItem.attr('id');
  let partsInfo = Object.entries(fullItemList[itemID]);

  if (partsInfo.length > 1) {
    let srcArray = $currentItem.attr('src').split('/');
    srcArray.pop();
    let src = srcArray.join('/') + '/';
    for (const [item, bin] of partsInfo) {
      let $itemPart = $currentItem.clone();
      $itemPart.attr('src', src + item + '.png');
      $itemPart.addClass('part');
      $itemPart.hide();
      $mysteryItemsWrapper.append($itemPart);
      if ($('.active').attr('id') == 'nav-recyclable') {
        timeout.push(setTimeout(() => {
          if ($('.active').attr('id') == 'nav-recyclable') {
            moveToBin($itemPart, bin, () => {
              timeout.push(setTimeout(() => {
                $(`#${itemID}-list`).click();
              }, 1800));
            });
          }
        }, 600))
      }
    }
    $currentItem.css({ opacity: '0' });
    $('.part').show();

  } else {
    if ($('.active').attr('id') == 'nav-recyclable') {
      timeout.push(setTimeout(() => {
        if ($('.active').attr('id') == 'nav-recyclable') {
          moveToBin($currentItem, partsInfo[0][1], () => {
            timeout.push(setTimeout(() => {
              $(`#${itemID}-list`).click();
            }, 1800));
          });
        }
      }, 600));
    }
  }
}

function moveToBin($item, typeOfBin, callback) {
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
  }, 1200, () => {
    if (typeof callback === "function") {
      callback()
    }
  });
  $item.animateRotate(randomAngle, 900);
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