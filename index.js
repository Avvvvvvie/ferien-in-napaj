
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

        interactions.push({
            parent: panel.parentElement,
            panel: panel,
            axis: axis
        });
    });
}

function updateInteraction(interaction) {

    let max = window.innerHeight / 2;
    let now = max - ((interaction.parent.getBoundingClientRect().bottom + 10) - window.innerHeight / 2)

    if(now > 0 && now < max) {
        let angle = 180 * now / max;
        console.log(angle);
        interaction.panel.style.transform = `rotate3D(${interaction.axis[0]}, ${interaction.axis[1]}, ${interaction.axis[2]}, ${angle}deg)`;
    }
}