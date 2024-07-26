document.addEventListener('DOMContentLoaded', function () {
    const hypertensionForm = document.getElementById('hypertensionForm');
    const systolicInput = document.getElementById('systolicInput');
    const diastolicInput = document.getElementById('diastolicInput');
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
    const downloadBtn = document.getElementById('downloadBtn');

    hypertensionForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const systolic = parseInt(systolicInput.value);
        const diastolic = parseInt(diastolicInput.value);

        let bpData = {
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

        if (systolic < 120 && diastolic < 80) {
            bpData.range = 'Normal (<120/<80 mmHg)';
            bpData.description = 'Your blood pressure is in the normal range.';
            bpData.status = 'Maintain a healthy lifestyle.';
            bpData.diet.breakfast = 'Whole grains, fruits, and lean protein.';
            bpData.diet.lunch = 'Vegetable salad with lean protein.';
            bpData.diet.snacks = 'Fruits and nuts.';
            bpData.diet.dinner = 'Vegetable stir-fry with lean protein.';
            bpData.medication = 'No medication needed.';
            bpData.avoid = 'Excessive salt and junk food.';
            bpData.consult = 'No need to consult a doctor.';
        } else if (systolic >= 120 && systolic < 130 && diastolic < 80) {
            bpData.range = 'Elevated (120-129/<80 mmHg)';
            bpData.description = 'Your blood pressure is elevated.';
            bpData.status = 'Adopt a healthier lifestyle.';
            bpData.diet.breakfast = 'Oatmeal with fruits.';
            bpData.diet.lunch = 'Grilled chicken with vegetables.';
            bpData.diet.snacks = 'Low-sodium snacks.';
            bpData.diet.dinner = 'Baked fish with steamed vegetables.';
            bpData.medication = 'No medication needed.';
            bpData.avoid = 'High sodium foods.';
            bpData.consult = 'Monitor regularly and consult if it persists.';
        } else if (systolic >= 130 && systolic < 140 || diastolic >= 80 && diastolic < 90) {
            bpData.range = 'Hypertension Stage 1 (130-139/80-89 mmHg)';
            bpData.description = 'You have Hypertension Stage 1.';
            bpData.status = 'Adopt lifestyle changes and monitor.';
            bpData.diet.breakfast = 'Low-fat dairy, whole grains.';
            bpData.diet.lunch = 'Steamed vegetables with lean protein.';
            bpData.diet.snacks = 'Low-fat yogurt and fruits.';
            bpData.diet.dinner = 'Brown rice with steamed vegetables.';
            bpData.medication = 'Consult a doctor for medication.';
            bpData.avoid = 'High sodium and high-fat foods.';
            bpData.consult = 'Consult a doctor for further advice.';
        } else if (systolic >= 140 && systolic < 180 || diastolic >= 90 && diastolic < 120) {
            bpData.range = 'Hypertension Stage 2 (140-179/90-119 mmHg)';
            bpData.description = 'You have Hypertension Stage 2.';
            bpData.status = 'Consult a doctor for management.';
            bpData.diet.breakfast = 'Low-fat dairy, fruits.';
            bpData.diet.lunch = 'Steamed vegetables with lean protein.';
            bpData.diet.snacks = 'Low-fat snacks, fruits.';
            bpData.diet.dinner = 'Whole grains with vegetables.';
            bpData.medication = 'Consult a doctor for medication.';
            bpData.avoid = 'High sodium and processed foods.';
            bpData.consult = 'Consult a doctor for immediate advice.';
        } else {
            bpData.range = 'Hypertensive Crisis (≥180/≥120 mmHg)';
            bpData.description = 'You have Hypertensive Crisis.';
            bpData.status = 'Seek immediate medical attention.';
            bpData.diet.breakfast = 'Seek immediate medical advice.';
            bpData.diet.lunch = 'Seek immediate medical advice.';
            bpData.diet.snacks = 'Seek immediate medical advice.';
            bpData.diet.dinner = 'Seek immediate medical advice.';
            bpData.medication = 'Seek immediate medical advice.';
            bpData.avoid = 'Seek immediate medical advice.';
            bpData.consult = 'Seek immediate medical advice.';
        }

        resultRange.textContent = bpData.range;
        resultDescription.textContent = bpData.description;
        resultStatus.textContent = bpData.status;
        resultBreakfast.textContent = `Breakfast: ${bpData.diet.breakfast}`;
        resultLunch.textContent = `Lunch: ${bpData.diet.lunch}`;
        resultSnacks.textContent = `Snacks: ${bpData.diet.snacks}`;
        resultDinner.textContent = `Dinner: ${bpData.diet.dinner}`;
        resultMedication.textContent = `Medication: ${bpData.medication}`;
        resultAvoid.textContent = `Avoid: ${bpData.avoid}`;
        resultConsult.textContent = `Consult: ${bpData.consult}`;

        resultCard.classList.remove('hidden');

        downloadBtn.addEventListener('click', function () {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            doc.text('Blood Pressure Report', 10, 10);
            doc.text(`Range: ${bpData.range}`, 10, 20);
            doc.text(`Description: ${bpData.description}`, 10, 30);
            doc.text(`Status: ${bpData.status}`, 10, 40);
            doc.text('Diet:', 10, 50);
            doc.text(`  Breakfast: ${bpData.diet.breakfast}`, 10, 60);
            doc.text(`  Lunch: ${bpData.diet.lunch}`, 10, 70);
            doc.text(`  Snacks: ${bpData.diet.snacks}`, 10, 80);
            doc.text(`  Dinner: ${bpData.diet.dinner}`, 10, 90);
            doc.text(`Medication: ${bpData.medication}`, 10, 100);
            doc.text(`Avoid: ${bpData.avoid}`, 10, 110);
            doc.text(`Consult: ${bpData.consult}`, 10, 120);

            doc.save('Blood_Pressure_Report.pdf');
        });
    });
});
