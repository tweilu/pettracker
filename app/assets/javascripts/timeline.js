var symbols = ["fun", "bath", "medicine", "walk", "feed"];
var IMG_WIDTH = 80;
var IMG_SPACING = 30;
var IMG_MARGIN = 20;

function createNote(x, y, target) {
    var note = document.createElement("div");
    $(note).data("target", target);
    note.setAttribute("id", "note");
    note.style.left = x + "px";
    note.style.top = y + "px";
    note.style.backgroundColor = "white";

    var f = document.createElement("text");

    var text = document.createElement("textarea");
    text.setAttribute("rows", "4");
    text.setAttribute("cols", "30");
    text.setAttribute("id", "notevalue");
    text.setAttribute("placeholder", "Enter details!");
    text.value = $(target).data("info");

    var s = document.createElement("input");
    s.setAttribute("type", "submit");
    s.setAttribute("value", "Okay");
    $(s).on("click", function (event, ui) {
        toggleNote(target);
    });

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

function loadImage(plodo_type, time, info, rand) {
    var canvas = document.getElementById("timelineCanvas");
    var img = document.createElement("img");
    img.src = "/assets/"+plodo_type+"-icon.png";
    img.style.height = IMG_WIDTH / 2 + "px";
    img.setAttribute("class", "icon smallIcon");
    img.setAttribute("id", rand);
    img.style.left = time;
    img.style.top = "315px";
    
    $(img).data("info", info);

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
    $(img).on("dragstart", function (event, ui) {
        startTileDrag(event.currentTarget);
    });
    $("#timeline").append(img);
}

function nameFromSrc(src) {
    var path = src.split("/");
    return path[path.length - 1].split("-")[0];
}

function startTileDrag(target) {
    saveNote(target);
    $("#note").remove();

    target.style.height = IMG_WIDTH + "px";
    target.style.zIndex = "12";
}

function tileDrag(target) {
    if ($(target).hasClass("smallIcon")) {
        // If small icon, don't display lines over the trash
        if (!overTrash(target)) {
            drawTimelineLine(target);
        } else {
            clearCanvas();
        }
    } else {
        // If large icon, don't display lines over the trash or the original icon
        if (!overTrash(target) && !overOriginal(target)) {
            drawTimelineLine(target);
        } else {
            clearCanvas();
        }
    }
}

function overTrash(target) {
    var vertical = target.offsetTop < $("#trashcan").position().top + 0.5*IMG_WIDTH;
    var horizontal = target.offsetLeft > $("#trashcan").position().left - 0.5*IMG_WIDTH;
    return (vertical && horizontal);
}

function overOriginal(target) {
    var offsetIndex = symbols.indexOf(nameFromSrc(target.src));
    var offset = IMG_MARGIN + offsetIndex*(IMG_WIDTH + IMG_SPACING);
    var vertical = target.offsetTop < IMG_MARGIN + 0.5*IMG_WIDTH;
    var left = target.offsetLeft > offset - 0.5*IMG_WIDTH;
    var right = target.offsetLeft < offset + 0.5*IMG_WIDTH;
    return (vertical && left && right);
}

function drawTimelineLine(target) {
    var canvas = document.getElementById("timelineCanvas");
    var ctx = canvas.getContext("2d");
    canvas.width = canvas.width;
    ctx.moveTo(target.offsetLeft + canvas.offsetLeft + IMG_WIDTH/2, target.offsetTop + IMG_WIDTH/2);
    ctx.lineTo(target.offsetLeft + canvas.offsetLeft + IMG_WIDTH/2, 335);
    ctx.stroke();
}

function clearCanvas() {
    var canvas = document.getElementById("timelineCanvas");
    var ctx = canvas.getContext("2d");
    canvas.width = canvas.width;
}

function saveNote(target) {
    if ($("#note").length) {
        $(target).data("info", $("#notevalue").val());
    }
}

function tileNewPlace(target) {
    var canvas = document.getElementById("timelineCanvas");
    canvas.width = canvas.width;

    if (!overTrash(target) && !overOriginal(target)) {
        // Make the smallIcon and put it on the timeline
        var canvas = document.getElementById("timelineCanvas");
        var img = document.createElement("img");
        img.src = target.src;
        img.style.height = IMG_WIDTH / 2 + "px";
        img.setAttribute("class", "icon smallIcon");
        img.style.left = target.offsetLeft + IMG_WIDTH / 4 + canvas.offsetLeft + "px";
        img.style.top = "315px";
        var randStr = randomString();
        img.id = randStr;
        $(img).data("info", "Enter details here!");
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
        $(img).on("dragstart", function (event, ui) {
            startTileDrag(event.currentTarget);
        });
        $("#timeline").append(img);
        createNote(img.offsetLeft + IMG_WIDTH / 2, 290, img);

        // Send form data
        $("#add_plodo_form_type")[0].value = nameFromSrc(target.src);
        $("#add_plodo_form_time")[0].value = img.style.left;
        $("#add_plodo_form_info")[0].value = $(img).data("info");
        $("#add_plodo_form_rand")[0].value = randStr;
        $("#add_plodo_form").submit();
    }

    // Restore icon to original place
    var offsetIndex = symbols.indexOf(nameFromSrc(target.src));
    target.style.zIndex = "1";
    target.style.left = IMG_MARGIN + offsetIndex*(IMG_WIDTH + IMG_SPACING) + "px";
    target.style.top = IMG_MARGIN + "px";
}

function tileDrop(target) {
    var canvas = document.getElementById("timelineCanvas");
    canvas.width = canvas.width;

    if (!overTrash(target)) {
        target.style.height = IMG_WIDTH / 2 + "px";
        target.style.top = "315px";
        target.style.left = target.offsetLeft + IMG_WIDTH / 4 + canvas.offsetLeft + "px";

        sendEditForm(target);
    } else {
        sendDeleteForm(target);
        target.remove();
    }
}

function sendDeleteForm(target) {
    $("#delete_plodo_form_rand")[0].value = target.id;
    $("#delete_plodo_form").submit();
}

function sendEditForm(target) {
    // Send form data
    $("#edit_plodo_form_time")[0].value = target.style.left;
    $("#edit_plodo_form_info")[0].value = $(target).data("info");
    $("#edit_plodo_form_rand")[0].value = target.id;
    $("#edit_plodo_form").submit();
}

function toggleNote(target) {
    if ($("#note").length) {
        saveNote(target);
        $("#note").remove();
        sendEditForm(target);
        $(target).removeClass("selected-icon");
    } else {
        createNote(target.offsetLeft + IMG_WIDTH / 2, 290, target);
        $(target).addClass("selected-icon");
    }
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

function randomString() {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = 15; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}

$(document).ready(function() {
    initialize();
    $('#add_event_form');
});
