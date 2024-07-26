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

    let status = '';
    let steps = '';
    let breakfast = '';
    let lunch = '';
    let snacks = '';
    let dinner = '';
    let cheatMeal = '';
    let avoid = '';
    let consult = '';

    if (glucoseLevel < 70) {
        status = 'Not Ok';
        steps = 'Immediate intake of fast-acting carbs (e.g., glucose tablets, juice), Follow-up with a snack or meal containing protein, Regular monitoring of blood glucose levels';
        breakfast = 'Whole grain toast with peanut butter';
        lunch = 'Grilled chicken salad';
        snacks = 'Greek yogurt with berries';
        dinner = 'Steamed vegetables with quinoa';
        cheatMeal = 'Keep to healthy snacks to prevent spikes and drops';
        avoid = 'Sugary foods without a protein or fiber balance';
        consult = 'Yes, especially if episodes are frequent';
    } else if (glucoseLevel < 100) {
        status = 'Free to Live 👍';
        steps = 'Maintain a balanced diet, Regular physical activity, Regular monitoring of glucose levels';
        breakfast = 'Oatmeal with fruits';
        lunch = 'Turkey sandwich with whole grain bread';
        snacks = 'Apple slices with almond butter';
        dinner = 'Grilled fish with brown rice';
        cheatMeal = 'Occasional indulgence in sweets or high-carb foods';
        avoid = 'None specifically, but moderation is key';
        consult = 'Routine check-ups';
    } else if (glucoseLevel < 126) {
        status = 'You should be Tensed...!';
        steps = 'Weight management, Increased physical activity, Monitoring blood glucose levels regularly';
        breakfast = 'Scrambled eggs with spinach';
        lunch = 'Lentil soup with vegetables';
        snacks = 'Nuts and seeds';
        dinner = 'Chicken stir-fry with vegetables';
        cheatMeal = 'Small portions of sweets or high-carb foods occasionally';
        avoid = 'Sugary beverages, refined carbs, excessive processed foods';
        consult = 'Yes, for regular monitoring and preventive measures';
    } else if (glucoseLevel < 200) {
        status = 'Not Ok';
        steps = 'Medication or insulin therapy as prescribed, Regular monitoring of blood glucose levels, Lifestyle changes (diet and exercise)';
        breakfast = 'Smoothie with greens and protein powder';
        lunch = 'Quinoa salad with beans';
        snacks = 'Carrot sticks with hummus';
        dinner = 'Baked salmon with roasted vegetables';
        cheatMeal = 'Controlled portions of favorite foods';
        avoid = 'Sugary drinks, trans fats, excessive refined carbs, high-fat meats';
        consult = 'Yes, regularly for management and medication adjustments';
    } else {
        status = 'Dead 💀';
        steps = 'Adjust medication if needed, Increase water intake, Physical activity, Monitoring blood glucose levels frequently';
        breakfast = 'Avocado toast with whole grain bread';
        lunch = 'Chicken and vegetable stew';
        snacks = 'Cheese sticks';
        dinner = 'Grilled tofu with vegetables';
        cheatMeal = 'Occasional indulgence in high-carb foods';
        avoid = 'Sugary drinks, candies, baked goods';
        consult = 'Yes, especially for medication adjustments';
    }

    // Update the result card
    resultRange.innerHTML = `<b>Range:</b> ${resultRange.innerHTML}`;
    resultDescription.innerHTML = `<b>Description:</b> ${resultDescription.innerHTML}`;
    resultStatus.innerHTML = `<b>Status:</b> <span class="font-bold text-xl" style="color: ${status === 'Not Ok' ? '#ff7070' : '#38f54e'};">${status}</span>`;
    resultSteps.innerHTML = `<b>Steps to Take:</b> ${steps}`;
    resultBreakfast.innerHTML = `<b>Breakfast:</b> ${breakfast}`;
    resultLunch.innerHTML = `<b>Lunch:</b> ${lunch}`;
    resultSnacks.innerHTML = `<b>Snacks:</b> ${snacks}`;
    resultDinner.innerHTML = `<b>Dinner:</b> ${dinner}`;
    resultCheatMeal.innerHTML = `<b>Cheat Meal Suggestions:</b> ${cheatMeal}`;
    resultAvoid.innerHTML = `<b>Foods to Avoid:</b> ${avoid}`;
    resultConsult.innerHTML = `<b>Consult Doctor:</b> ${consult}`;

    resultCard.classList.remove('hidden');
});

// Function to download prescription as PDF
document.getElementById('downloadBtn').addEventListener('click', function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const resultCard = document.getElementById('resultCard');
    const text = resultCard.innerText; // Get text content for PDF

    doc.text(text, 10, 10);
    doc.save('Diabetes_Prescription.pdf');
});
