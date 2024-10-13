document.addEventListener('DOMContentLoaded', function () {
    const chartTypeSelector = document.getElementById('chart-type');
    const dataSetCountInput = document.getElementById('data-set-count');
    const dataInputFieldsContainer = document.getElementById('data-input-fields');
    const generateChartButton = document.getElementById('generate-chart');
    let chart;

    // Generate dynamic input fields based on data set count
    dataSetCountInput.addEventListener('input', () => {
        const dataSetCount = parseInt(dataSetCountInput.value);
        dataInputFieldsContainer.innerHTML = ''; // Clear previous inputs

        for (let i = 0; i < dataSetCount; i++) {
            const dataField = `
                <div class="mb-4">
                    <label class="label">Data Set ${i + 1} Name:</label>
                    <input type="text" id="data-name-${i}" class="input input-bordered w-full max-w-xs" placeholder="Enter name">
                    <label class="label">Value:</label>
                    <input type="number" id="data-value-${i}" class="input input-bordered w-full max-w-xs" placeholder="Enter value">
                    <label class="label">Color:</label>
                    <input type="color" id="data-color-${i}" class="input input-bordered w-full max-w-xs">
                </div>`;
            dataInputFieldsContainer.insertAdjacentHTML('beforeend', dataField);
        }
    });

    // Generate Chart based on selected chart type
    generateChartButton.addEventListener('click', () => {
        const chartType = chartTypeSelector.value;
        const dataSetCount = parseInt(dataSetCountInput.value);
        const data = [];
        const colors = [];

        for (let i = 0; i < dataSetCount; i++) {
            const name = document.getElementById(`data-name-${i}`).value;
            const value = parseInt(document.getElementById(`data-value-${i}`).value);
            const color = document.getElementById(`data-color-${i}`).value;
            data.push({ name, value });
            colors.push(color);
        }

        if (chart) chart.destroy(); // Destroy previous chart instance

        // Load appropriate chart script based on chart type
        switch (chartType) {
            case 'bar':
                loadBarChart(data, colors);
                break;
            case 'line':
                loadLineChart(data, colors);
                break;
            case 'donut':
                loadDonutChart(data, colors);
                break;
            case 'polar':
                loadPolarChart(data, colors);
                break;
            case 'radar':
                loadRadarChart(data, colors);
                break;
            default:
                break;
        }
    });
});
