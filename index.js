var navLinks = document.querySelectorAll(".nav-link");
var numberOfLinks = navLinks.length;
var previouslyClicked = null;

for (var i = 0; i < numberOfLinks; i++) {
  navLinks[i].addEventListener('click', buttonHandler);
}

function buttonHandler() {

  if (previouslyClicked) {
    previouslyClicked.style.backgroundColor = "";
    previouslyClicked.style.color = " #2196f3";
  }

  this.style.backgroundColor = "rgb(236, 236, 56)";
  this.style.borderRadius = "5px";
  this.style.color = "rgb(19, 18, 18)"
  previouslyClicked = this;

};


