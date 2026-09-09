// ==========================================
// FINWISE - DECISION ENGINE
// ==========================================


// ================= GENERAL =================

function startPlanning() {
    document.getElementById("modes").scrollIntoView({
        behavior: "smooth"
    });
}


function showMode(mode) {

    const boxes = [
        "saveBox",
        "investBox",
        "goalBox",
        "healthBox"
    ];

    boxes.forEach(function(box) {
        document.getElementById(box).classList.add("hidden");
    });

    const selectedBox = document.getElementById(mode + "Box");

    if (selectedBox) {
        selectedBox.classList.remove("hidden");
    }

    document.getElementById("analysis").scrollIntoView({
        behavior: "smooth"
    });
}


// ================= RESULT ENGINE =================

function showResult(mode, title, score, primary, secondary, status, recommendation) {

    document.getElementById("resultMode").textContent =
        mode.toUpperCase() + " ANALYSIS";

    document.getElementById("resultTitle").textContent = title;

    document.getElementById("resultScore").textContent = score;

    document.getElementById("resultPrimary").textContent = primary;

    document.getElementById("resultSecondary").textContent = secondary;

    document.getElementById("resultStatus").textContent = status;

    document.getElementById("resultRecommendation").textContent =
        recommendation;

    document.getElementById("results").classList.remove("hidden");

    document.getElementById("results").scrollIntoView({
        behavior: "smooth"
    });
}


// ================= SAVE MODE =================

function calculateSavings() {

    const income = Number(document.getElementById("income").value);
    const expenses = Number(document.getElementById("expenses").value);
    const currentSavings =
        Number(document.getElementById("currentSavings").value);
    const savingGoal =
        Number(document.getElementById("savingGoal").value);


    if (
        income <= 0 ||
        expenses < 0 ||
        currentSavings < 0 ||
        savingGoal < 0
    ) {
        alert("Please enter valid financial values.");
        return;
    }


    if (expenses > income) {

        showResult(
            "Save",
            "Saving Capacity Needs Attention",
            "35",
            "₹ 0",
            "Negative",
            "Review Expenses",
            "Your expenses are higher than your income. Review spending categories before setting a higher monthly saving target."
        );

        return;
    }


    const available = income - expenses;

    const savingRate = (available / income) * 100;

    let score = Math.round(savingRate * 2);

    if (score > 100) {
        score = 100;
    }


    let status;

    if (savingRate >= 30) {
        status = "Strong Saving Capacity";
    }

    else if (savingRate >= 20) {
        status = "Healthy";
    }

    else if (savingRate >= 10) {
        status = "Needs Improvement";
    }

    else {
        status = "Low Saving Capacity";
    }


    let recommendation;

    if (savingGoal <= available) {

        recommendation =
            "Your monthly saving goal fits within your current estimated saving capacity. Maintain consistency and review your plan periodically.";

    }

    else {

        recommendation =
            "Your saving goal is higher than your current estimated saving capacity. Consider adjusting expenses or setting a gradual target.";

    }


    showResult(
        "Save",
        "Your Saving Plan",
        score + "%",
        "₹ " + available.toLocaleString("en-IN"),
        savingRate.toFixed(1) + "%",
        status,
        recommendation
    );
}



// ================= INVEST MODE =================

function analyzeInvestment() {

    const amount =
        Number(document.getElementById("investAmount").value);

    const horizon =
        document.getElementById("horizon").value;

    const risk =
        document.getElementById("risk").value;

    const objective =
        document.getElementById("objective").value;


    if (
        amount <= 0 ||
        horizon === "" ||
        risk === "" ||
        objective === ""
    ) {
        alert("Please complete all investment fields.");
        return;
    }


    let category;
    let riskLevel;
    let liquidity;
    let score;


    if (horizon === "short") {

        category = "Savings / Deposits & Short-Term Debt";
        riskLevel = "Lower Risk";
        liquidity = "Higher";

        score = 75;

    }

    else if (horizon === "medium") {

        if (risk === "conservative") {

            category = "Deposits / Debt-Oriented Options";
            score = 72;

        }

        else if (risk === "moderate") {

            category = "Balanced / Diversified Options";
            score = 80;

        }

        else {

            category = "Diversified Growth Options";
            score = 78;

        }

        riskLevel = "Moderate";
        liquidity = "Medium";

    }

    else {

        if (risk === "conservative") {

            category = "Diversified Debt & Balanced Options";
            score = 75;

        }

        else if (risk === "moderate") {

            category = "Diversified Equity & Balanced Options";
            score = 85;

        }

        else {

            category = "Diversified Equity-Oriented Options";
            score = 82;

        }

        riskLevel = "Higher Volatility Possible";
        liquidity = "Medium to Higher";

    }


    let recommendation =
        "Based on the selected horizon and risk comfort, this category may be worth exploring. Compare fees, risk, liquidity and historical behavior before making any decision.";


    if (objective === "capital") {

        recommendation =
            "Your objective emphasizes capital preservation. Lower-volatility categories may align better with this objective, but every investment option has its own risks.";

    }

    else if (objective === "growth") {

        recommendation =
            "Your objective emphasizes long-term growth. A longer horizon can allow consideration of diversified growth-oriented categories while accepting market fluctuations.";

    }


    showResult(
        "Invest",
        "Investment Category Analysis",
        score + "/100",
        category,
        riskLevel,
        "Educational Match",
        recommendation +
        " Liquidity: " + liquidity + "."
    );
}



// ================= GOAL PLANNER =================

function calculateGoal() {

    const goalName =
        document.getElementById("goalName").value.trim();

    const target =
        Number(document.getElementById("targetAmount").value);

    const current =
        Number(document.getElementById("goalCurrent").value);

    const months =
        Number(document.getElementById("goalMonths").value);

    const contribution =
        Number(document.getElementById("goalContribution").value);


    if (
        goalName === "" ||
        target <= 0 ||
        current < 0 ||
        months <= 0 ||
        contribution < 0
    ) {
        alert("Please complete all goal fields.");
        return;
    }


    if (current >= target) {

        showResult(
            "Goals",
            goalName + " Goal Completed",
            "100%",
            "₹ " + current.toLocaleString("en-IN"),
            "Target Reached",
            "Completed",
            "You have already reached or exceeded this goal amount."
        );

        return;
    }


    const remaining = target - current;

    const requiredMonthly = remaining / months;

    const projected =
        current + (contribution * months);

    const progress =
        (current / target) * 100;


    let status;
    let recommendation;


    if (contribution >= requiredMonthly) {

        status = "On Track";

        recommendation =
            "Your current monthly contribution is enough to cover the remaining target over the selected time period, assuming contributions remain consistent.";

    }

    else {

        status = "Needs Higher Contribution";

        recommendation =
            "Your current contribution is below the estimated monthly amount required. Consider increasing contributions gradually or extending the timeline.";

    }


    showResult(
        "Goals",
        goalName + " Goal Plan",
        Math.min(progress, 100).toFixed(0) + "%",
        "₹ " + Math.ceil(requiredMonthly).toLocaleString("en-IN") + "/month",
        "₹ " + Math.round(projected).toLocaleString("en-IN"),
        status,
        recommendation
    );
}



// ================= FINANCIAL HEALTH =================

function calculateHealth() {

    const income =
        Number(document.getElementById("healthIncome").value);

    const expenses =
        Number(document.getElementById("healthExpenses").value);

    const debt =
        Number(document.getElementById("debt").value);

    const emergency =
        Number(document.getElementById("emergencyFund").value);

    const investments =
        Number(document.getElementById("investments").value);

    const savings =
        Number(document.getElementById("healthSavings").value);


    if (
        income <= 0 ||
        expenses < 0 ||
        debt < 0 ||
        emergency < 0 ||
        investments < 0 ||
        savings < 0
    ) {
        alert("Please enter valid financial values.");
        return;
    }


    let score = 0;


    // Saving capacity

    const available = income - expenses;

    const savingRate =
        (available / income) * 100;


    if (savingRate >= 30) {
        score += 30;
    }

    else if (savingRate >= 20) {
        score += 25;
    }

    else if (savingRate >= 10) {
        score += 15;
    }

    else if (savingRate > 0) {
        score += 8;
    }


    // Debt ratio

    const debtRatio =
        (debt / income) * 100;


    if (debtRatio <= 10) {
        score += 20;
    }

    else if (debtRatio <= 20) {
        score += 15;
    }

    else if (debtRatio <= 35) {
        score += 8;
    }


    // Emergency fund

    const essentialExpenses =
        expenses > 0 ? expenses : 1;

    const emergencyMonths =
        emergency / essentialExpenses;


    if (emergencyMonths >= 6) {
        score += 25;
    }

    else if (emergencyMonths >= 3) {
        score += 20;
    }

    else if (emergencyMonths >= 1) {
        score += 10;
    }


    // Investments

    if (investments > 0) {
        score += 15;
    }


    // Current savings

    if (savings > 0) {
        score += 10;
    }


    if (score > 100) {
        score = 100;
    }


    let status;
    let recommendation;


    if (score >= 80) {

        status = "Strong";

        recommendation =
            "Your overall financial indicators are strong. Continue maintaining a healthy saving habit, manageable debt and an adequate emergency buffer.";

    }

    else if (score >= 60) {

        status = "Healthy";

        recommendation =
            "Your financial foundation looks reasonably healthy. Focus on strengthening the areas with lower scores, especially emergency savings or debt management.";

    }

    else if (score >= 40) {

        status = "Needs Improvement";

        recommendation =
            "Some important financial indicators need attention. Prioritize building a stronger cash buffer, controlling expenses and maintaining consistent savings.";

    }

    else {

        status = "Needs Attention";

        recommendation =
            "Your current indicators suggest that your financial foundation needs attention. Start with manageable expense control and building an emergency buffer.";

    }


    showResult(
        "Financial Health",
        "Your Financial Health Score",
        score + "/100",
        "Health Score " + score,
        emergencyMonths.toFixed(1) + " months",
        status,
        recommendation
    );
}



// ================= NEW ANALYSIS =================

function newAnalysis() {

    document.getElementById("results").classList.add("hidden");

    document.getElementById("analysis").scrollIntoView({
        behavior: "smooth"
    });
}
