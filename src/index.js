var accoItem = document.getElementsByClassName("acco-item"),
  accoTrigger = document.getElementsByClassName("acco-trigger");

for (var i = 0; i < accoTrigger.length; i++) {
  accoItem[i].addEventListener("click", accoFunction);
}

function accoFunction(e) {
  e.preventDefault();

  var contentHeight = this.classList.contains("active")
    ? 0
    : this.lastElementChild.firstElementChild.clientHeight;

  this.classList.toggle("active");

  accoAnimation(this.lastElementChild, contentHeight, 200);

  for (var i = 0; i < accoTrigger.length; i++) {
    if (accoItem[i] != this) {
      accoItem[i].classList.remove("active");
      accoAnimation(accoItem[i].lastElementChild, 0, 200);
    }
  }
}

function accoAnimation(element, height, time) {
  var speed = 10,
    timestep = time / speed,
    direction = element.clientHeight < height ? "down" : "up",
    timer;

  var currentHeight = element.clientHeight;

  if (direction == "down") {
    var heightStep = Math.ceil(height / timestep);

    timer = setInterval(function() {
      currentHeight += heightStep;
      element.style.height = currentHeight + "px";

      if (currentHeight >= height) {
        clearInterval(timer);
        element.style.height = height + "px";
      }
    }, speed);
  }

  if (direction == "up") {
    var heightStep = Math.floor(currentHeight / timestep);

    timer = setInterval(function() {
      currentHeight -= heightStep;
      element.style.height = currentHeight + "px";

      if (currentHeight <= height) {
        clearInterval(timer);
        element.style.height = 0 + "px";
      }
    }, speed);
  }
}
