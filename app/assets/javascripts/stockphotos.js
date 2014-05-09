// Javascript can't access the filsystem directly, so we hard code the stock photo names. Unfortunately this means we have to manually update this list if we want to add new stock photos

var petphotolist = ["bird1.jpg",  "bunny1.jpg",  "cat1.jpg",  "cat2.jpg",  "cat3.jpg", "cat4.jpg", "cat5.jpg", "cat6.jpg", "cuttlefish1.jpg",  "dog1.jpg",  "dog2.jpg",  "dog3.jpg", "dog4.jpg", "dog5.jpg", "dog6.jpg", "dog7.jpg", "hedgehog1.jpg", "hedgehog2.jpg", "pig1.jpg", "seahorse1.jpg", "sloth1.jpg", "sloth2.jpg", "sloth3.jpg",  "hamster1.jpg",  "turtle1.jpg"];

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
    $("#add_update_form_info")[0].value = img.src;
    $("#add_update_form").submit();
}

function addSpecificPet(src) {
    var img = document.createElement("img");
    img.src = src;
    var div = document.createElement("div");
    div.setAttribute("class", "crop");
    div.appendChild(img);
    $("#photos").append(div);
}


hashCode = function(s){
      return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
}


function getNonrandomPet(s) {
    return "/assets/stockphotos/" + petphotolist[((hashCode(s) % petphotolist.length) + petphotolist.length) % petphotolist.length];
}

