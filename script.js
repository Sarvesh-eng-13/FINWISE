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
// ==========================================
// SAVE MODE CALCULATOR
// ==========================================

function calculateSavings() {

    const income = Number(document.getElementById("income").value);
    const expenses = Number(document.getElementById("expenses").value);
    const currentSavings = Number(document.getElementById("currentSavings").value);
    const savingGoal = Number(document.getElementById("savingGoal").value);

    if (income <= 0 || expenses < 0 || currentSavings < 0 || savingGoal < 0) {
        alert("Please enter valid amounts.");
        return;
    }

    const available = income - expenses;

    document.getElementById("savingAmount").textContent =
        "₹ " + available.toLocaleString("en-IN");

    const message = document.getElementById("savingMessage");

    if (available <= 0) {

        message.textContent =
            "Your current expenses are equal to or higher than your income. Consider reviewing your expenses before increasing your savings goal.";

    } else if (savingGoal <= available) {

        message.textContent =
            "Good! Your saving goal fits within your estimated monthly available amount.";

    } else {

        message.textContent =
            "Your saving goal is higher than your current available amount. Consider lowering the goal or reviewing your expenses.";

    }

}
