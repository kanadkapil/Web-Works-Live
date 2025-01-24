document.getElementById('submit').addEventListener('click', function() {
    const income = parseFloat(document.getElementById('income').value);
    const budget = parseFloat(document.getElementById('budget').value);
    const expensesInput = document.getElementById('expenses').value;

    if (isNaN(income) || isNaN(budget)) {
        alert("Please enter valid numbers for income and budget.");
        return;
    }

    // Parse the expenses input
    const expenses = expensesInput.split(',').map(expense => {
        const [name, amount] = expense.split(' ');
        return { name: name.trim(), amount: parseFloat(amount.trim()) };
    });

    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const remainingBudget = budget - totalExpenses;

    // Update the chart
    updateChart(income, budget, totalExpenses, remainingBudget);
});

let budgetChart;
function updateChart(income, budget, totalExpenses, remainingBudget) {
    const ctx = document.getElementById('budgetChart').getContext('2d');

    if (budgetChart) {
        budgetChart.destroy();  // Destroy the existing chart to update with new data
    }

    budgetChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Income', 'Budget', 'Expenses', 'Remaining'],
            datasets: [{
                label: 'Amount ($)',
                data: [income, budget, totalExpenses, remainingBudget],
                backgroundColor: ['#4caf50', '#2196f3', '#f44336', '#ff9800'],
                borderColor: ['#388e3c', '#1976d2', '#c62828', '#f57c00'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
