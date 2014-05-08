// Javascript can't access the filsystem directly, so we hard code the stock photo names. Unfortunately this means we have to manually update this list if we want to add new stock photos

var petphotolist = ["bird1.jpg",  "bunny1.jpg",  "cat1.jpg",  "cat2.jpg",  "cat3.jpg",  "dog1.jpg",  "dog2.jpg",  "dog3.jpg",  "hamster1.jpg",  "turtle1.jpg"];

function getRandomPet() {
    return "/assets/stockphotos/" + petphotolist[Math.floor(Math.random()*petphotolist.length)];
}

function addRandomPet() {
    var img = document.createElement("img");
    img.src = getRandomPet();
    var div = document.createElement("div");
    div.setAttribute("class", "crop");
    div.appendChild(img);
    $("#photos").append(div);
}



