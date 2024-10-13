function loadBarChart(data, colors) {
    const labels = data.map(d => d.name);
    const values = data.map(d => d.value);

    const ctx = document.getElementById('chartCanvas').getContext('2d');
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Bar Chart Data',
                data: values,
                backgroundColor: colors,
            }]
        }
    });
}
