function loadPolarChart(data, colors) {
    const labels = data.map(d => d.name);
    const values = data.map(d => d.value);

    const ctx = document.getElementById('chartCanvas').getContext('2d');
    chart = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: colors,
            }]
        }
    });
}
