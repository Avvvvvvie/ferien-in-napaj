
document.addEventListener("DOMContentLoaded", function () {

});

function getInteractivePanels() {
    return document.querySelectorAll("[data-px]");
}

function initInteractivePanels() {
    getInteractivePanels().forEach(function (panel) {
        let parent = panel.parentElement;
        let axis = [
            parseInt(panel.getAttribute("data-axisx")),
            parseInt(panel.getAttribute("data-axisy"))
        ];
        let center = [
            parseInt(panel.getAttribute("data-px")),
            parseInt(panel.getAttribute("data-py"))
        ];
        let movement = [0,0];
        let lastPosition = [0, 0];

        panel.addEventListener("touchmove", function (e) {
            movement[0] = e.touches[0].clientX - lastPosition[0];
            movement[1] = e.touches[0].clientY - lastPosition[1];
            lastPosition = [e.touches[0].clientX, e.touches[0].clientY];

            movePanel(panel, movement, axis, center);
        });
    });
}

// move panel around th axis, which is located along the center
function movePanel(panel, vector, axis, center) {
    let vectorToCenter = [
        center[0] - vector[0],
        center[1] - vector[1]
    ];

    panel.style.transform = "rotate3d(" + axis[0] + ", " + axis[1] + ", 0, " + scaleVectorToRotation(panel.height, vectorToCenter, axis) + "deg)";
}

function vectorLength(vector) {
    return Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);
}

function project(vector, axis) {
    let axisLength = vectorLength(axis);
    if (axisLength === 0) return 0;
    let dotProduct = vector[0] * axis[0] + vector[1] * axis[1];
    return dotProduct / axisLength;
}

function scaleVectorToRotation(max, vector, axis) {
    let projectedDistance = project(vector, axis);
    let len = vectorLength(projectedDistance);
    if (len === 0) return 0;
    return projectedDistance * 180 / max;
}