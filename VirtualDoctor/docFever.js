document.addEventListener('DOMContentLoaded', function () {
    const feverForm = document.getElementById('feverForm');
    const tempInput = document.getElementById('tempInput');
    const resultCard = document.getElementById('resultCard');
    const resultRange = document.getElementById('resultRange');
    const resultDescription = document.getElementById('resultDescription');
    const resultStatus = document.getElementById('resultStatus');
    const resultDiet = document.getElementById('resultDiet');
    const resultBreakfast = document.getElementById('resultBreakfast');
    const resultLunch = document.getElementById('resultLunch');
    const resultSnacks = document.getElementById('resultSnacks');
    const resultDinner = document.getElementById('resultDinner');
    const resultMedication = document.getElementById('resultMedication');
    const resultAvoid = document.getElementById('resultAvoid');
    const resultConsult = document.getElementById('resultConsult');

    feverForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const tempValue = parseFloat(tempInput.value);
        const tempUnit = document.querySelector('input[name="tempUnit"]:checked').value;
        
        if (isNaN(tempValue)) {
            alert('Please enter a valid temperature.');
            return;
        }

        let tempInFahrenheit = tempUnit === 'F' ? tempValue : (tempValue * 9/5) + 32;

        let feverData = {
            range: '',
            description: '',
            status: '',
            diet: {
                breakfast: '',
                lunch: '',
                snacks: '',
                dinner: ''
            },
            medication: '',
            avoid: '',
            consult: ''
        };

        if (tempInFahrenheit < 95) {
            feverData.range = 'Hypothermia (Below 95°F)';
            feverData.description = 'Your body temperature is below normal.';
            feverData.status = 'Seek medical attention immediately.';
            feverData.diet.breakfast = 'Warm drinks and high-calorie foods.';
            feverData.diet.lunch = 'Soup with lean meat.';
            feverData.diet.snacks = 'Nuts and seeds.';
            feverData.diet.dinner = 'Hot meals with carbohydrates.';
            feverData.medication = 'Immediate medical attention required.';
            feverData.avoid = 'Cold drinks and raw foods.';
            feverData.consult = 'Consult a doctor immediately.';
        } else if (tempInFahrenheit >= 95 && tempInFahrenheit < 98.6) {
            feverData.range = 'Normal (95°F to 98.6°F)';
            feverData.description = 'Your body temperature is normal.';
            feverData.status = 'No action required.';
            feverData.diet.breakfast = 'Balanced diet with fruits and cereals.';
            feverData.diet.lunch = 'Vegetables and lean proteins.';
            feverData.diet.snacks = 'Fresh fruits or yogurt.';
            feverData.diet.dinner = 'Balanced meal with vegetables.';
            feverData.medication = 'No medication needed.';
            feverData.avoid = 'Unhealthy processed foods.';
            feverData.consult = 'No need to consult a doctor.';
        } else if (tempInFahrenheit >= 98.6 && tempInFahrenheit < 100.4) {
            feverData.range = 'Mild Fever (98.6°F to 100.4°F)';
            feverData.description = 'You have a mild fever.';
            feverData.status = 'Monitor your symptoms and rest.';
            feverData.diet.breakfast = 'Light and easy to digest foods.';
            feverData.diet.lunch = 'Soup with vegetables.';
            feverData.diet.snacks = 'Fruit juices or smoothies.';
            feverData.diet.dinner = 'Light meals like soup or porridge.';
            feverData.medication = 'Paracetamol or ibuprofen if needed.';
            feverData.avoid = 'Spicy and heavy foods.';
            feverData.consult = 'Consult a doctor if fever persists.';
        } else if (tempInFahrenheit >= 100.4 && tempInFahrenheit < 103) {
            feverData.range = 'Moderate Fever (100.4°F to 103°F)';
            feverData.description = 'You have a moderate fever.';
            feverData.status = 'Rest and stay hydrated.';
            feverData.diet.breakfast = 'Hydrating fluids and light meals.';
            feverData.diet.lunch = 'Broth-based soups.';
            feverData.diet.snacks = 'Electrolyte drinks.';
            feverData.diet.dinner = 'Light and easy to digest meals.';
            feverData.medication = 'Paracetamol or ibuprofen.';
            feverData.avoid = 'Caffeine and sugary drinks.';
            feverData.consult = 'Consult a doctor if symptoms worsen.';
        } else {
            feverData.range = 'High Fever (Above 103°F)';
            feverData.description = 'You have a high fever.';
            feverData.status = 'Seek medical attention.';
            feverData.diet.breakfast = 'Hydrating fluids and easy to digest foods.';
            feverData.diet.lunch = 'Clear soups and broths.';
            feverData.diet.snacks = 'Electrolyte drinks.';
            feverData.diet.dinner = 'Light meals like porridge.';
            feverData.medication = 'Seek medical attention.';
            feverData.avoid = 'Solid foods and caffeine.';
            feverData.consult = 'Consult a doctor immediately.';
        }

        resultRange.textContent = feverData.range;
        resultDescription.textContent = feverData.description;
        resultStatus.textContent = feverData.status;
        resultBreakfast.textContent = `Breakfast: ${feverData.diet.breakfast}`;
        resultLunch.textContent = `Lunch: ${feverData.diet.lunch}`;
        resultSnacks.textContent = `Snacks: ${feverData.diet.snacks}`;
        resultDinner.textContent = `Dinner: ${feverData.diet.dinner}`;
        resultMedication.textContent = `Medication: ${feverData.medication}`;
        resultAvoid.textContent = `Avoid: ${feverData.avoid}`;
        resultConsult.textContent = `Consult: ${feverData.consult}`;

        resultCard.classList.remove('hidden');
    });
});

// Function to download prescription as PDF
document.getElementById('downloadBtn').addEventListener('click', function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const resultCard = document.getElementById('resultCard');
    const text = resultCard.innerText; // Get text content for PDF

    doc.text(text, 10, 10);
    doc.save('Fever_Prescription.pdf');
});