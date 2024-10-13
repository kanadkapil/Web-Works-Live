function loadLineChart(data, colors) {
    const labels = data.map(d => d.name);
    const values = data.map(d => d.value);

    const ctx = document.getElementById('chartCanvas').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Line Chart Data',
                data: values,
                borderColor: colors[0],
                borderWidth: 2,
                fill: false
            }]
        }
    });
}
