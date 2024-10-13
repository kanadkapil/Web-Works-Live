function loadRadarChart(data, colors) {
    const labels = data.map(d => d.name);
    const values = data.map(d => d.value);

    const ctx = document.getElementById('chartCanvas').getContext('2d');
    chart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Radar Chart Data',
                data: values,
                backgroundColor: colors[0] + '66', // Transparency for radar
                borderColor: colors[0],
                borderWidth: 2,
            }]
        }
    });
}
