document.getElementById('glucoseForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const glucoseLevel = parseFloat(document.getElementById('glucoseInput').value);

    if (isNaN(glucoseLevel) || glucoseLevel < 0) {
        alert('Please enter a valid glucose level.');
        return;
    }

    const resultCard = document.getElementById('resultCard');
    const resultRange = document.getElementById('resultRange');
    const resultDescription = document.getElementById('resultDescription');
    const resultStatus = document.getElementById('resultStatus');
    const resultSteps = document.getElementById('resultSteps');
    const resultBreakfast = document.getElementById('resultBreakfast');
    const resultLunch = document.getElementById('resultLunch');
    const resultSnacks = document.getElementById('resultSnacks');
    const resultDinner = document.getElementById('resultDinner');
    const resultCheatMeal = document.getElementById('resultCheatMeal');
    const resultAvoid = document.getElementById('resultAvoid');
    const resultConsult = document.getElementById('resultConsult');




    if (glucoseLevel < 70) {
        // Hypoglycemia
        resultRange.innerHTML = "<b>Range:</b> Less than 70 mg/dL";
        resultDescription.innerHTML = "<b>Description:</b> Blood glucose levels lower than normal.";
        resultStatus.innerHTML = "<b>Status:  </b> <span class= \"font-bold text-xl\" style=\"color: #ff7070;\">Not Ok</span>";
        resultSteps.innerHTML = "<b>Steps to Take:</b> Immediate intake of fast-acting carbs (e.g., glucose tablets, juice), Follow-up with a snack or meal containing protein, Regular monitoring of blood glucose levels";
        resultBreakfast.innerHTML = "<b>Breakfast:</b> Whole grain toast with peanut butter";
        resultLunch.innerHTML = "<b>Lunch:</b> Grilled chicken salad";
        resultSnacks.innerHTML = "<b>Snacks:</b> Greek yogurt with berries";
        resultDinner.innerHTML = "<b>Dinner:</b> Steamed vegetables with quinoa";
        resultCheatMeal.innerHTML = "<b>Cheat Meal Suggestions:</b> Keep to healthy snacks to prevent spikes and drops";
        resultAvoid.innerHTML = "<b>Foods to Avoid:</b> Sugary foods without a protein or fiber balance";
        resultConsult.innerHTML = "<b>Consult Doctor:</b> Yes, especially if episodes are frequent";
    } else if (glucoseLevel < 100) {
        // Normal
        resultRange.innerHTML = "<b>Range:</b> 70 to 99 mg/dL";
        resultDescription.innerHTML = "<b>Description:</b> Glucose levels within the normal range.";
        resultStatus.innerHTML = "<b>Status:  </b> <span class= \"font-bold text-xl\" style=\"color: #38f54e;\">Free to Live 👍</span>";
        resultSteps.innerHTML = "<b>Steps to Take:</b> Maintain a balanced diet, Regular physical activity, Regular monitoring of glucose levels";
        resultBreakfast.innerHTML = "<b>Breakfast:</b> Oatmeal with fruits";
        resultLunch.innerHTML = "<b>Lunch:</b> Turkey sandwich with whole grain bread";
        resultSnacks.innerHTML = "<b>Snacks:</b> Apple slices with almond butter";
        resultDinner.innerHTML = "<b>Dinner:</b> Grilled fish with brown rice";
        resultCheatMeal.innerHTML = "<b>Cheat Meal Suggestions:</b> Occasional indulgence in sweets or high-carb foods";
        resultAvoid.innerHTML = "<b>Foods to Avoid:</b> None specifically, but moderation is key";
        resultConsult.innerHTML = "<b>Consult Doctor:</b> Routine check-ups";
    } else if (glucoseLevel < 126) {
        // Prediabetes
        resultRange.innerHTML = "<b>Range:</b> 100 to 125 mg/dL";
        resultDescription.innerHTML = "<b>Description:</b> Elevated glucose levels, higher than normal but not yet in the diabetes range.";
        resultStatus.innerHTML = "<b>Status:  </b> <span class= \"font-bold text-xl\" style=\"color: #ff7070;\">You should be Tensed...!</span>";
        resultSteps.innerHTML = "<b>Steps to Take:</b> Weight management, Increased physical activity, Monitoring blood glucose levels regularly";
        resultBreakfast.innerHTML = "<b>Breakfast:</b> Scrambled eggs with spinach";
        resultLunch.innerHTML = "<b>Lunch:</b> Lentil soup with vegetables";
        resultSnacks.innerHTML = "<b>Snacks:</b> Nuts and seeds";
        resultDinner.innerHTML = "<b>Dinner:</b> Chicken stir-fry with vegetables";
        resultCheatMeal.innerHTML = "<b>Cheat Meal Suggestions:</b> Small portions of sweets or high-carb foods occasionally";
        resultAvoid.innerHTML = "<b>Foods to Avoid:</b> Sugary beverages, refined carbs, excessive processed foods";
        resultConsult.innerHTML = "<b>Consult Doctor:</b> Yes, for regular monitoring and preventive measures";
    } else if (glucoseLevel < 200) {
        // Diabetes
        resultRange.innerHTML = "<b>Range:</b> 126 to 199 mg/dL";
        resultDescription.innerHTML = "<b>Description:</b> High blood glucose levels consistent with diabetes.";
        resultStatus.innerHTML = "<b>Status:  </b> <span class= \"font-bold text-xl\" style=\"color: #ff7070;\">Not Ok</span>";
        resultSteps.innerHTML = "<b>Steps to Take:</b> Medication or insulin therapy as prescribed, Regular monitoring of blood glucose levels, Lifestyle changes (diet and exercise)";
        resultBreakfast.innerHTML = "<b>Breakfast:</b> Smoothie with greens and protein powder";
        resultLunch.innerHTML = "<b>Lunch:</b> Quinoa salad with beans";
        resultSnacks.innerHTML = "<b>Snacks:</b> Carrot sticks with hummus";
        resultDinner.innerHTML = "<b>Dinner:</b> Baked salmon with roasted vegetables";
        resultCheatMeal.innerHTML = "<b>Cheat Meal Suggestions:</b> Controlled portions of favorite foods";
        resultAvoid.innerHTML = "<b>Foods to Avoid:</b> Sugary drinks, trans fats, excessive refined carbs, high-fat meats";
        resultConsult.innerHTML = "<b>Consult Doctor:</b> Yes, regularly for management and medication adjustments";
    } else {
        // Hyperglycemia
        resultRange.innerHTML = "<b>Range:</b> 200 mg/dL and above";
        resultDescription.innerHTML = "<b>Description:</b> Blood glucose levels higher than normal, not immediately critical.";
        resultStatus.innerHTML = "<b>Status:  </b> <span class= \"font-bold text-2xl\" style=\"color: #ff7070;\">Dead 💀</span>";
        resultSteps.innerHTML = "<b>Steps to Take:</b> Adjust medication if needed, Increase water intake, Physical activity, Monitoring blood glucose levels frequently";
        resultBreakfast.innerHTML = "<b>Breakfast:</b> Avocado toast with whole grain bread";
        resultLunch.innerHTML = "<b>Lunch:</b> Chicken and vegetable stew";
        resultSnacks.innerHTML = "<b>Snacks:</b> Cheese sticks";
        resultDinner.innerHTML = "<b>Dinner:</b> Grilled tofu with vegetables";
        resultCheatMeal.innerHTML = "<b>Cheat Meal Suggestions:</b> Occasional indulgence in high-carb foods";
        resultAvoid.innerHTML = "<b>Foods to Avoid:</b> Sugary drinks, candies, baked goods";
        resultConsult.innerHTML = "<b>Consult Doctor:</b> Yes, especially for medication adjustments";
    }

    resultCard.classList.remove('hidden');
});

// Function to download prescription
document.getElementById('downloadBtn').addEventListener('click', function () {
    const resultCard = document.getElementById('resultCard');
    const content = resultCard.innerHTML;
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prescription.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

