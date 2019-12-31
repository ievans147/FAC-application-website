'use strict';


let imageSet = document.querySelectorAll(".image");
let imageStrip = document.querySelector(".carousel_images"); // this updates intelligently
let jumpWidth
let pixelPosition
let currentPicture = 1; // 0 is a looping picture, as is 9
let numberOfPictures = imageSet.count // still haven't actually used this....
let indexedDots = document.querySelectorAll(".carousel_dots button")

recalibrate();
window.addEventListener('resize', recalibrate);

function recalibrate() {
  jumpWidth = imageStrip.offsetWidth;
  pixelPosition = -(currentPicture * jumpWidth);
  imageStrip.style.transform = "translateX(" + pixelPosition + "px)"
}


document.getElementById('leftButton').addEventListener('click', () => move(1));
document.getElementById('rightButton').addEventListener('click', () => move(-1));
imageStrip.addEventListener('transitionend', revertPosition);
document.body.querySelector(".carousel_dots").addEventListener('click', dotNav);
window.addEventListener('keydown', (keypress) => {
  if (keypress.key == "ArrowLeft") {move(1)}
  if (keypress.key == "ArrowRight") {move(-1)}
  // if (keypress.key == " ") {
  //   keypress.preventDefault();
  //   // play pause function
  // }
}) /*TODO: currently, holding this down scrolls super fast, faster than the loop updates. Either make this a keyup event, thus precluding scrolling, or find that youtube video containing a fix. */



function move(n) {
  indexedDots[currentPicture - 1].classList.remove("current_dot");
  imageStrip.style.transition = "transform 0.15s ease-in-out";
  pixelPosition += (n * jumpWidth);
  currentPicture -= n // pixel position decreases for every picture increase
  imageStrip.style.transform = "translateX(" + pixelPosition + "px)";
  try {indexedDots[currentPicture - 1].classList.add("current_dot")}
  catch {n > 0 ? indexedDots[indexedDots.length - 1].classList.add("current_dot")
      : indexedDots[0].classList.add("current_dot")}
}

function revertPosition() {
  imageStrip.style.transition = "none";
  if (currentPicture >= 9) {
    currentPicture = 1;
    pixelPosition = - (jumpWidth);
  } else if (currentPicture <= 0) {
    currentPicture = 8;
    pixelPosition -= jumpWidth * 8;
  }
  imageStrip.style.transform = "translateX(" + pixelPosition + "px)";
}

function dotNav(event) {
  let target = event.target;
  if (target.tagName == "BUTTON") {
    move(currentPicture - (+target.id));
  }
  /* make it go the shortest possible path.
  if the target is greater than current, you find the positive steps by subtracting current from target

  If the target is lesser than current, you find the positive steps by subtracting the current value from the max and then adding the target

  If the target is greater than current, you find the negative steps by negating ((max - target) + current) // I'm sure there's a better way but I'm sleepy lol.

  If the target is lesser than current, you find the negative steps by subtracting current from the target

  so this would be a two-way conditional that encoded a two-value array. We'd then call move(Math.min(...arr)); A nice excuse to practice the rest operator too.
  */
}

let touchArea = document.querySelector(".carousel");
touchArea.addEventListener('touchstart', logStart);
touchArea.addEventListener('touchend', mobileSliderNav);
let startX = 0;

function logStart(touches) {startX = parseInt(touches.changedTouches[0].clientX);}

function mobileSliderNav(touchends) {
  let endX = touchends.changedTouches[0].clientX;

  if (Math.abs(startX - endX) > 10) {
    startX < endX ? move(1) : move(-1);
  } else {
    // playPause()
    // pause button flash and remove after a certain amount of time??
  }
}


/*
To-Dos
TODO: add timer function and play/pause function
TODO: add time updater
TODO: style buttons for desktop. Keep dots visible for both desktop and mobile users.
Finish mobile styling. */
