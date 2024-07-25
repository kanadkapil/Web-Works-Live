document.getElementById('glucoseForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const glucoseLevel = parseFloat(document.getElementById('glucoseInput').value);

    if (isNaN(glucoseLevel) || glucoseLevel < 0) {
        alert('Please enter a valid glucose level.');
        return;
    }

    const resultCard = document.getElementById('resultCard');
    const resultDescription = document.getElementById('resultDescription');
    const resultStatus = document.getElementById('resultStatus');
    const resultSteps = document.getElementById('resultSteps');
    const resultDiet = document.getElementById('resultDiet');
    const resultCheatMeal = document.getElementById('resultCheatMeal');
    const resultAvoid = document.getElementById('resultAvoid');
    const resultConsult = document.getElementById('resultConsult');

    if (glucoseLevel < 70) {
        // Hypoglycemia
        resultDescription.innerText = "Description: Blood glucose levels lower than normal.";
        resultStatus.innerText = "Status: Not Ok";
        resultSteps.innerText = "Steps to Take: Immediate intake of fast-acting carbs (e.g., glucose tablets, juice), Follow-up with a snack or meal containing protein, Regular monitoring of blood glucose levels";
        resultDiet.innerText = "Diet to Eat: Frequent small meals, balanced with proteins and healthy carbs";
        resultCheatMeal.innerText = "Cheat Meal Suggestions: Keep to healthy snacks to prevent spikes and drops";
        resultAvoid.innerText = "Foods to Avoid: Sugary foods without a protein or fiber balance";
        resultConsult.innerText = "Consult Doctor: Yes, especially if episodes are frequent";
    } else if (glucoseLevel < 100) {
        // Normal
        resultDescription.innerText = "Description: Glucose levels within the normal range.";
        resultStatus.innerText = "Status: Ok";
        resultSteps.innerText = "Steps to Take: Maintain a balanced diet, Regular physical activity, Regular monitoring of glucose levels";
        resultDiet.innerText = "Diet to Eat: Whole grains, lean proteins, vegetables, fruits, low-fat dairy";
        resultCheatMeal.innerText = "Cheat Meal Suggestions: Occasional indulgence in sweets or high-carb foods";
        resultAvoid.innerText = "Foods to Avoid: None specifically, but moderation is key";
        resultConsult.innerText = "Consult Doctor: Routine check-ups";
    } else if (glucoseLevel < 126) {
        // Prediabetes
        resultDescription.innerText = "Description: Elevated glucose levels, higher than normal but not yet in the diabetes range.";
        resultStatus.innerText = "Status: Not Ok";
        resultSteps.innerText = "Steps to Take: Weight management, Increased physical activity, Monitoring blood glucose levels regularly";
        resultDiet.innerText = "Diet to Eat: High-fiber foods, lean proteins, vegetables, whole grains, nuts";
        resultCheatMeal.innerText = "Cheat Meal Suggestions: Small portions of sweets or high-carb foods occasionally";
        resultAvoid.innerText = "Foods to Avoid: Sugary beverages, refined carbs, excessive processed foods";
        resultConsult.innerText = "Consult Doctor: Yes, for regular monitoring and preventive measures";
    } else if (glucoseLevel < 200) {
        // Diabetes
        resultDescription.innerText = "Description: High blood glucose levels consistent with diabetes.";
        resultStatus.innerText = "Status: Not Ok";
        resultSteps.innerText = "Steps to Take: Medication or insulin therapy as prescribed, Regular monitoring of blood glucose levels, Lifestyle changes (diet and exercise)";
        resultDiet.innerText = "Diet to Eat: Non-starchy vegetables, lean proteins, healthy fats, whole grains";
        resultCheatMeal.innerText = "Cheat Meal Suggestions: Controlled portions of favorite foods";
        resultAvoid.innerText = "Foods to Avoid: Sugary drinks, trans fats, excessive refined carbs, high-fat meats";
        resultConsult.innerText = "Consult Doctor: Yes, regularly for management and medication adjustments";
    } else {
        // Hyperglycemia
        resultDescription.innerText = "Description: Blood glucose levels higher than normal, not immediately critical.";
        resultStatus.innerText = "Status: Not Ok";
        resultSteps.innerText = "Steps to Take: Adjust medication if needed, Increase water intake, Physical activity, Monitoring blood glucose levels frequently";
        resultDiet.innerText = "Diet to Eat: Non-starchy vegetables, lean proteins, whole grains";
        resultCheatMeal.innerText = "Cheat Meal Suggestions: Limit cheat meals; opt for small portions of desired foods";
        resultAvoid.innerText = "Foods to Avoid: High-sugar foods, refined carbs, sugary beverages";
        resultConsult.innerText = "Consult Doctor: Yes, especially if levels remain high consistently";
    }

    resultCard.classList.remove('hidden');

    document.getElementById('downloadBtn').onclick = function() {
        const prescription = `
            Your Glucose Level Result

            ${resultDescription.innerText}
            ${resultStatus.innerText}
            ${resultSteps.innerText}
            ${resultDiet.innerText}
            ${resultCheatMeal.innerText}
            ${resultAvoid.innerText}
            ${resultConsult.innerText}
        `;
        const blob = new Blob([prescription], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'prescription.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
});
