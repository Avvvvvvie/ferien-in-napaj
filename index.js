
document.addEventListener("DOMContentLoaded", function () {
    initInteractivePanels();
    window.addEventListener("scroll", function () {
        for(let interaction of interactions) {
            updateInteraction(interaction);
        }
    });
});

let interactions;

function getInteractivePanels() {
    return document.querySelectorAll("[data-x]");
}

function initInteractivePanels() {
    interactions = [];
    getInteractivePanels().forEach((panel) => {
        let axis = [
            parseInt(panel.getAttribute("data-x")) || 0,
            parseInt(panel.getAttribute("data-y")) || 0,
            parseInt(panel.getAttribute("data-z")) || 0
        ];
        let invert = (panel.getAttribute("data-invert") === "true");
        interactions.push({
            parent: panel.parentElement,
            panel: panel,
            axis: axis,
            invert: invert
        });
        if(invert) {
            panel.style.transform = `rotate3D(${axis[0]}, ${axis[1]}, ${axis[2]}, 180deg)`;
        }
    });
}

function updateInteraction(interaction) {
    let max = window.innerHeight / 2;
    let offset = -50;
    let now = max - ((interaction.parent.getBoundingClientRect().bottom + offset) - window.innerHeight / 2)

    if(now > offset && now < max + offset) {
        let angle = 180 * (now - offset) / max;
        if(interaction.invert) {
            angle = 180 - angle;
        }
        console.log(angle);
        interaction.panel.style.transform = `rotate3D(${interaction.axis[0]}, ${interaction.axis[1]}, ${interaction.axis[2]}, ${angle}deg)`;
    }
}