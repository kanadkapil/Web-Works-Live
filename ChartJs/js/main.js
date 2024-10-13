document.addEventListener('DOMContentLoaded', () => {
    const dataSetCountInput = document.getElementById('data-set-count');
    const dataInputFieldsContainer = document.getElementById('data-input-fields');
    const chartTypeSelector = document.getElementById('chart-type');
    const generateChartButton = document.getElementById('generate-chart');
    let chartInstance = null;

    // Event listener for number of data sets input
    dataSetCountInput.addEventListener('change', () => {
        const numberOfDataSets = parseInt(dataSetCountInput.value) || 1;
        dataInputFieldsContainer.innerHTML = '';  // Clear previous cards

        // Generate cards for each data set
        for (let i = 0; i < numberOfDataSets; i++) {
            const card = document.createElement('div');
            card.classList.add('card', 'bg-base-100', 'shadow-xl', 'p-4');

            card.innerHTML = `
                <div class="card-body">
                    <h2 class="card-title">Data Set ${i + 1}</h2>
                    <label class="label">Data Name:</label>
                    <input type="text" class="input input-bordered w-full data-name" placeholder="Data Name">

                    <label class="label mt-2">Data Value:</label>
                    <input type="number" class="input input-bordered w-full data-value" placeholder="Value">

                    <label class="label mt-2">Data Color:</label>
                    <input type="color" class="input w-full data-color">
                </div>
            `;

            dataInputFieldsContainer.appendChild(card);
        }
    });

    // Function to generate the chart
    function generateChart(chartType) {
        const dataNames = Array.from(document.querySelectorAll('.data-name')).map(input => input.value);
        const dataValues = Array.from(document.querySelectorAll('.data-value')).map(input => parseFloat(input.value));
        const dataColors = Array.from(document.querySelectorAll('.data-color')).map(input => input.value);

        const data = {
            labels: dataNames,
            datasets: [{
                label: chartType + ' Data',
                data: dataValues,
                backgroundColor: dataColors,
                borderColor: dataColors,
                borderWidth: 1
            }]
        };

        const config = {
            type: chartType,
            data: data,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };

        const ctx = document.getElementById('chartCanvas').getContext('2d');
        if (chartInstance) {
            chartInstance.destroy(); // Destroy previous chart before creating a new one
        }
        chartInstance = new Chart(ctx, config);
    }

    // Event listener for chart generation
    generateChartButton.addEventListener('click', () => {
        const selectedChartType = chartTypeSelector.value;
        generateChart(selectedChartType);
    });
});
