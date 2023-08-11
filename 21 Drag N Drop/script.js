const box = document.getElementById('box');
const container = document.getElementById('container');

box.addEventListener('mousedown', function (event) {

    offsetx = event.clientX - box.offsetLeft;
    offsety = event.clientY - box.offsetTop;

    document.addEventListener('mousemove', mousemoveHandler);
    select(event);
    document.addEventListener('mouseup', mouseupHandler);
});

function mousemoveHandler(event) {
    box.style.left = event.clientX - offsetx + "px";
    box.style.top = event.clientY - offsety + "px";
}

function mouseupHandler() {
    document.removeEventListener('mousemove', mousemoveHandler);
    document.removeEventListener('mouseup', mouseupHandler);
}

function select(event) {
    switch (true) {
        case (event.clientX > 450 && event.clientX < 552) && (event.clientY > 300 && event.clientY < 400):
            box.style.left = "451px";
            box.style.top = "301px";
            break;
        case (event.clientX > 600 && event.clientX < 702) && (event.clientY > 300 && event.clientY < 400):
            box.style.left = "601px";
            box.style.top = "301px";
            break;
        case (event.clientX > 750 && event.clientX < 852) && (event.clientY > 300 && event.clientY < 400):
            box.style.left = "751px";
            box.style.top = "301px";
            break;
        case (event.clientX > 900 && event.clientX < 1002) && (event.clientY > 300 && event.clientY < 400):
            box.style.left = "901px";
            box.style.top = "301px";
            break;
        case (event.clientX > 1050 && event.clientX < 1152) && (event.clientY > 300 && event.clientY < 400):
            box.style.left = "1051px";
            box.style.top = "301px";
            break;
        default:
            box.style.left = "451px";
            box.style.top = "301px";
    }
}
