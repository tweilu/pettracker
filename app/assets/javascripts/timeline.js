var symbols = ["fun", "bath", "medicine", "walk", "feed"];
var IMG_WIDTH = 80;
var IMG_SPACING = 30;
var IMG_MARGIN = 20;
var dragging = false;
var staticDragging = false;
var draggedImage;
var TOP_ZONE = 100;

function createNote(x, y) {
    var note = document.createElement("div");
    note.setAttribute("id", "note");
    note.style.left = x + "px";
    note.style.top = y + "px";
    note.style.backgroundColor = "white";

    var f = document.createElement("form");
    f.setAttribute("method", "post");
    f.setAttribute("action", "submit.php");

    var text = document.createElement("textarea");
    text.setAttribute("rows", "4");
    text.setAttribute("cols", "30");
    text.setAttribute("placeholder", "Details...");

    var s = document.createElement("input");
    s.setAttribute("type", "submit");
    s.setAttribute("value", "save");

    var tbdy = document.createElement("tbody");
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    td.appendChild(text)
    tr.appendChild(td);
    tbdy.appendChild(tr);
    tr = document.createElement("tr");
    td = document.createElement("td");
    td.appendChild(s);
    tr.appendChild(td);
    tbdy.appendChild(tr);

    f.appendChild(tbdy);
    note.appendChild(f);

    $("#timeline").append(note);
}

function dropImage() {
    var min = 315;
    $(".smallIcon").each(function() {
        var center = draggedImage.offsetLeft + IMG_WIDTH / 2;
        var left = this.offsetLeft - IMG_WIDTH / 2;
        var right = this.offsetLeft + IMG_WIDTH;
        if((left < center) && (center < right)) {
            min = Math.min(min, this.offsetTop - IMG_WIDTH / 2);
        }
    });
    console.log("here");
    var canvas = document.getElementById("timelineCanvas");
    var img = document.createElement("img");
    img.src = draggedImage.src;
    img.style.height = IMG_WIDTH / 2 + "px";
    img.setAttribute("class", "icon smallIcon");
    img.style.left = draggedImage.offsetLeft + IMG_WIDTH / 4 + canvas.offsetLeft + "px";
    img.style.top = min + "px";
    $(img).draggable({containment: 'parent'});
    $(img).mouseup(iconMouseUp);
    $(img).mousedown(iconMouseDown);
    $(img).mousemove(iconMouseMove);
    $("#timeline").append(img);
}

function nameFromSrc(src) {
    var path = src.split("/");
    return path[path.length - 1].split("-")[0];
}

function topIconDown() {
    var img = document.createElement("img");
    img.src = this.src;
    img.setAttribute("class", "icon largeIcon");
    img.style.height = IMG_WIDTH + "px";
    img.style.left = this.style.left;
    img.style.top = this.style.top;
    img.style.zIndex = "1";
    $(img).mouseup(iconMouseUp);
    $(img).draggable({containment: 'parent'});
    $(img).mousedown(iconMouseDown);
    $(img).mousemove(iconMouseMove);
    $("#timeline").append(img);
    $(img).mousedown();
}


function iconMouseUp() {
    if(this === draggedImage) {
        dragging = false;
        this.style.zIndex = "1";
        var offset = symbols.indexOf(nameFromSrc(this.src));
        var canvas = document.getElementById("timelineCanvas");
        canvas.width = canvas.width;

        if(!((this.offsetLeft + 0.5*IMG_WIDTH > $("#trashcan").position().left) && (this.offsetTop < $("#trashcan").position().top + 0.5*IMG_WIDTH)) && this.offsetTop > TOP_ZONE) {
            dropImage();
            createNote(this.offsetLeft + IMG_WIDTH / 2, 345);
        }

        this.style.top = IMG_MARGIN + "px";
        this.style.left = IMG_MARGIN + offset*(IMG_WIDTH + IMG_SPACING) + "px";
    }
}

function staticMouseUp() {
    if(this === draggedImage) {
        this.style.zIndex = "1";
        staticDragging = false;
        var offset = symbols.indexOf(this.id);
        var canvas = document.getElementById("timelineCanvas");
        canvas.width = canvas.width;
        var leftOffset = this.offsetLeft;
        var src = this.src;
        
        if(!(( + this.offsetLeft + 0.5*IMG_WIDTH > $("#trashcan").position().left) && (this.offsetTop < $("#trashcan").position().top + 0.5*IMG_WIDTH)) && this.offsetTop > TOP_ZONE) {
            var img = document.createElement("img");
            img.src = src;
            img.style.height = IMG_WIDTH / 2 + "px";
            img.setAttribute("class", "icon smallIcon");
            img.style.left = leftOffset + IMG_WIDTH / 4 + canvas.offsetLeft + "px";
            img.style.top = 315 + "px";
            $(img).draggable({containment: 'parent'});
            $(img).mouseup(iconMouseUp);
            $(img).mousedown(iconMouseDown);
            $(img).mousemove(iconMouseMove);
            dropImage();
            $("#timeline").append(img);
            createNote(this.offsetLeft + IMG_WIDTH / 2, 345);
        }
        this.remove();
    }
}

function iconMouseDown() {
    draggedImage = this;
    dragging = true;
    this.style.height = IMG_WIDTH + "px";
    this.style.zIndex = "12";
    $("#note").remove();
}

function iconMouseMove() {
    var canvas = document.getElementById("timelineCanvas");
    var ctx = canvas.getContext("2d");
    canvas.width = canvas.width;
    if(dragging && this.offsetTop > TOP_ZONE) {
        ctx.moveTo(this.offsetLeft + canvas.offsetLeft + IMG_WIDTH/2, this.offsetTop + IMG_WIDTH/2);
        ctx.lineTo(this.offsetLeft + canvas.offsetLeft + IMG_WIDTH/2, 335);
        ctx.stroke();
    }
}




function initialize() {

    for (var i=0; i<symbols.length; i++) {
        var icon = symbols[i];
        var offset = 0;

        var img = document.createElement("img");
        img.src = "img/" + icon + "-icon.jpg";
        img.setAttribute("class", "icon largeIcon");
        img.style.height = IMG_WIDTH + "px";
        img.style.left = IMG_MARGIN + i*(IMG_WIDTH + IMG_SPACING) + "px";
        img.style.top = IMG_MARGIN + "px";
        img.style.zIndex = "1";
        $(img).mouseup(iconMouseUp);
        $(img).draggable({containment: 'parent'});
        $(img).mousedown(iconMouseDown);
        $(img).mousemove(iconMouseMove);
        $("#timeline").append(img);

        var img = document.createElement("img");
        img.src = "img/" + icon + "-icon.jpg";
        img.setAttribute("class", "icon topIcon");
        img.style.height = IMG_WIDTH + "px";
        img.style.left = IMG_MARGIN + i*(IMG_WIDTH + IMG_SPACING) + "px";
        img.style.top = IMG_MARGIN + "px";
        $(img).mousedown(topIconDown);
        $("#timeline").append(img);
    }

    // Create trashcan
    var trashcan = document.createElement("img");
    trashcan.src = "img/trashcan.png";
    trashcan.style.height = IMG_WIDTH + "px";
    trashcan.setAttribute("id", "trashcan");
    trashcan.style.right = IMG_MARGIN + "px";
    trashcan.style.top = IMG_MARGIN + "px";
    $("#timeline").append(trashcan);

}


$(document).ready(function() {
    initialize();
    $("#timelineCanvas").click(function() {
        $("#note").remove();
    });
});
