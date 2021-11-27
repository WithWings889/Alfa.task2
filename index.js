import SuperArray from "./SuperArray.js";

document.addEventListener('DOMContentLoaded', () => {

    const superArray = new SuperArray(3, 5, { min: 10, max: 55 });
    superArray.clear('column', 4);
    superArray.setMarker({x: 1, y: 1});
    superArray.goTo({x: 2, y: 1});
    superArray.shift('right');
    superArray.render('.matrix', '<br>');
})
