'use strict';

let leftImage = document.getElementById("left-image");
let middleImage = document.getElementById("middle-image");
let rightImage = document.getElementById("right-image");

let usersAttempts = 0;
let maxAttempts = 25;
let leftImageIndex = 0;
let middleImageIndex = 0;
let rightImageIndex = 0;
let shownNO = 0;

let leftImageElement = document.getElementById("left-image");
let middleImageElement = document.getElementById("middle-image");
let rightImageElement = document.getElementById("right-image");


function ChooseFavImage(name, source) {
    this.name = name;
    this.source = source;
    this.votes = 0;
    this.shownNO = shownNO;
    ChooseFavImage.imagesArr.push(this);
}
ChooseFavImage.imagesArr = [];

new ChooseFavImage("bag", "images/bag.jpg");
new ChooseFavImage("banana", "images/banana.jpg");
new ChooseFavImage("bathroom", "images/bathroom.jpg");
new ChooseFavImage("boots", "images/boots.jpg");
new ChooseFavImage("breakfast", "images/breakfast.jpg");
new ChooseFavImage("bubblegum", "images/bubblegum.jpg");
new ChooseFavImage("chair", "images/chair.jpg");
new ChooseFavImage("cthulhu", "images/cthulhu.jpg");
new ChooseFavImage("dog-duck", "images/dog-duck.jpg");
new ChooseFavImage("dragon", "images/dragon.jpg");
new ChooseFavImage("pen", "images/pen.jpg");
new ChooseFavImage("pet-sweep", "images/pet-sweep.jpg");
new ChooseFavImage("scissors", "images/scissors.jpg");
new ChooseFavImage("shark", "images/shark.jpg");
new ChooseFavImage("sweep", "images/sweep.png");
new ChooseFavImage("tauntaun", "images/tauntaun.jpg");
new ChooseFavImage("unicorn", "images/unicorn.jpg");
new ChooseFavImage("usb", "images/usb.gif");
new ChooseFavImage("water-can", "images/water-can.jpg");
new ChooseFavImage("wine-glass", "images/wine-glass.jpg");

// console.log(ChooseFavImage.imagesArr);

function generateRandomIndex() {
    return Math.floor(Math.random() * ChooseFavImage.imagesArr.length);
}

function renderThreeImages() {
    leftImageIndex = generateRandomIndex();
    ChooseFavImage.imagesArr[leftImageIndex].shownNO++;

    do {
        middleImageIndex = generateRandomIndex();
        ChooseFavImage.imagesArr[middleImageIndex].shownNO++;
    } while (leftImageIndex === middleImageIndex)

    do {
        rightImageIndex = generateRandomIndex();
        ChooseFavImage.imagesArr[rightImageIndex].shownNO++;
    } while (leftImageIndex === rightImageIndex || middleImageIndex === rightImageIndex)

    leftImageElement.src = ChooseFavImage.imagesArr[leftImageIndex].source;
    middleImageElement.src = ChooseFavImage.imagesArr[middleImageIndex].source;
    rightImageElement.src = ChooseFavImage.imagesArr[rightImageIndex].source;

}
renderThreeImages();


leftImageElement.addEventListener('click', handleUserClick);
middleImageElement.addEventListener('click', handleUserClick);
rightImageElement.addEventListener('click', handleUserClick);

function handleUserClick(event) {
    usersAttempts++;

    if (usersAttempts <= maxAttempts) {
        if (event.target.id === 'left-image') {
            ChooseFavImage.imagesArr[leftImageIndex].votes++;

        } else if (event.target.id === 'middle-image') {
            ChooseFavImage.imagesArr[middleImageIndex].votes++;
        } else {
            ChooseFavImage.imagesArr[rightImageIndex].votes++;
        }
        renderThreeImages();
    } else {
       let clickButton = document.getElementById("view-results");
        clickButton.addEventListener('click', renderResults);
        
        leftImageElement.removeEventListener('click', handleUserClick);
        middleImageElement.removeEventListener('click', handleUserClick);
        rightImageElement.removeEventListener('click', handleUserClick);
    }
}

function renderResults(event) {
    let resultList = document.getElementById("result-list");
    let imagesResult;
    for (let i = 0; i < ChooseFavImage.imagesArr.length; i++) {
        imagesResult = document.createElement("li");
        resultList.appendChild(imagesResult);
        imagesResult.textContent = ChooseFavImage.imagesArr[i].name + " had" + ChooseFavImage.imagesArr[i].votes + " votes," + " and was seen" + ChooseFavImage.imagesArr[i].shownNO + " times.";
    }
}