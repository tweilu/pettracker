var symbols = ["fun", "bath", "medicine", "walk", "feed"];
var IMG_WIDTH = 80;
var IMG_SPACING = 30;
var IMG_MARGIN = 20;
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

function loadImage(plodo_type, time, info) {
    console.log("loading: " + plodo_type+" "+time+" "+info)
    var canvas = document.getElementById("timelineCanvas");
    var img = document.createElement("img");
    img.src = "/assets/"+plodo_type+"-icon.png";
    img.style.height = IMG_WIDTH / 2 + "px";
    img.setAttribute("class", "icon smallIcon");
    img.style.left = time;
    img.style.top = "315px";
    $(img).draggable({containment: 'parent'});
    $(img).on("dragstop", function (event, ui) {
        tileDrop(event.currentTarget);
    });
    $(img).on("drag", function (event, ui) {
        tileDrag(event.currentTarget);
    });
    $(img).on("click", function (event, ui) {
        toggleNote(event.currentTarget);
    });
    $("#timeline").append(img);
}

function nameFromSrc(src) {
    var path = src.split("/");
    return path[path.length - 1].split("-")[0];
}

function tileDrag(target) {
    $("#note").remove();

    target.style.height = IMG_WIDTH + "px";
    target.style.zIndex = "12";

    var canvas = document.getElementById("timelineCanvas");
    var ctx = canvas.getContext("2d");
    canvas.width = canvas.width;
    ctx.moveTo(target.offsetLeft + canvas.offsetLeft + IMG_WIDTH/2, target.offsetTop + IMG_WIDTH/2);
    ctx.lineTo(target.offsetLeft + canvas.offsetLeft + IMG_WIDTH/2, 335);
    ctx.stroke();
}

function tileNewPlace(target) {
    var canvas = document.getElementById("timelineCanvas");
    canvas.width = canvas.width;

    if(true) { // check for removal!((target.offsetLeft + 0.5*IMG_WIDTH > $("#trashcan").position().left) && (target.offsetTop < $("#trashcan").position().top + 0.5*IMG_WIDTH)) && target.offsetTop > TOP_ZONE) {
        // Make the smallIcon and put it on the timeline
        var canvas = document.getElementById("timelineCanvas");
        var img = document.createElement("img");
        img.src = target.src;
        img.style.height = IMG_WIDTH / 2 + "px";
        img.setAttribute("class", "icon smallIcon");
        img.style.left = target.offsetLeft + IMG_WIDTH / 4 + canvas.offsetLeft + "px";
        img.style.top = "315px";
        $(img).draggable({containment: 'parent'});
        $(img).on("dragstop", function (event, ui) {
            tileDrop(event.currentTarget);
        });
        $(img).on("drag", function (event, ui) {
            tileDrag(event.currentTarget);
        });
        $(img).on("click", function (event, ui) {
            toggleNote(event.currentTarget);
        });
        $("#timeline").append(img);
        createNote(img.offsetLeft + IMG_WIDTH / 2, 290);

        // Send form data
        $("#add_plodo_form_type")[0].value = nameFromSrc(target.src);
        $("#add_plodo_form_time")[0].value = img.style.left;
        $("#add_plodo_form_info")[0].value = " ";
        console.log($("#add_plodo_form_type")[0].value);
        console.log($("#add_plodo_form_time")[0].value);
        console.log($("#add_plodo_form_info")[0].value);
        $("#add_plodo_form").submit();

        // Restore icon to original place
        var offsetIndex = symbols.indexOf(nameFromSrc(target.src));
        target.style.zIndex = "1";
        target.style.left = IMG_MARGIN + offsetIndex*(IMG_WIDTH + IMG_SPACING) + "px";
        target.style.top = IMG_MARGIN + "px";
    } else {
        target.remove();
    }
}

function tileDrop(target) {
    var canvas = document.getElementById("timelineCanvas");
    canvas.width = canvas.width;

    target.style.height = IMG_WIDTH / 2 + "px";
    target.style.top = "315px";
    target.style.left = target.offsetLeft + IMG_WIDTH / 4 + canvas.offsetLeft + "px";
    
    createNote(target.offsetLeft + IMG_WIDTH / 2, 290);
}

function toggleNote(target) {
    if ($("#note").length)
        $("#note").remove();
    else
        createNote(target.offsetLeft + IMG_WIDTH / 2, 290);
}

function initialize() {

    for (var i=0; i<symbols.length; i++) {
        var icon = symbols[i];
        var offset = 0;

        var img = document.createElement("img");
        img.src = "/assets/" + icon + "-icon.png";
        img.setAttribute("class", "icon largeIcon");
        img.style.height = IMG_WIDTH + "px";
        img.style.left = IMG_MARGIN + i*(IMG_WIDTH + IMG_SPACING) + "px";
        img.style.top = IMG_MARGIN + "px";
        img.style.zIndex = "1";
        $(img).draggable({containment: 'parent'});
        $(img).on("dragstop", function (event, ui) {
            tileNewPlace(event.currentTarget);
        });
        $(img).on("drag", function (event, ui) {
            tileDrag(event.currentTarget);
        });
        $("#timeline").append(img);

        var img = document.createElement("img");
        img.src = "/assets/" + icon + "-icon.png";
        img.setAttribute("class", "icon topIcon");
        img.style.height = IMG_WIDTH + "px";
        img.style.left = IMG_MARGIN + i*(IMG_WIDTH + IMG_SPACING) + "px";
        img.style.top = IMG_MARGIN + "px";
        $("#timeline").append(img);
    }

    // Create trashcan
    var trashcan = document.createElement("img");
    trashcan.src = "/assets/trashcan.png";
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

    $('#add_event_form');
});
