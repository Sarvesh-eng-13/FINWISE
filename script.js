// ==========================================
// FINWISE - Main JavaScript
// ==========================================

// Start Planning button
function startPlanning() {
    const modesSection = document.getElementById("modes");

    modesSection.scrollIntoView({
        behavior: "smooth"
    });
}


// ==========================================
// MODE SELECTION
// ==========================================

function selectMode(mode) {

    if (mode === "save") {
        alert("SAVE MODE selected 💰");
    }

    else if (mode === "invest") {
        alert("INVEST MODE selected 📈");
    }

    else if (mode === "goal") {
        alert("GOAL PLANNER selected 🎯");
    }

    else if (mode === "health") {
        alert("FINANCIAL HEALTH selected 🧠");
    }

}
